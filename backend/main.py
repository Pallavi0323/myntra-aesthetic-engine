import json
import os
import io
import torch
import open_clip
from fastapi import FastAPI, UploadFile, File
from PIL import Image

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Loading OpenCLIP model...")
model, _, preprocess = open_clip.create_model_and_transforms('ViT-B-32', pretrained='openai')
tokenizer = open_clip.get_tokenizer('ViT-B-32')
model.eval()
print("Model loaded successfully!")

DATASET_DIR = "dataset"
catalog_embeddings = []
catalog_filenames = []

if os.path.exists(DATASET_DIR):
    print("Processing catalog images...")
    for filename in os.listdir(DATASET_DIR):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            img_path = os.path.join(DATASET_DIR, filename)
            image = Image.open(img_path).convert("RGB")
            image_tensor = preprocess(image).unsqueeze(0)
            with torch.no_grad():
                features = model.encode_image(image_tensor)
                features /= features.norm(dim=-1, keepdim=True)
                catalog_embeddings.append(features)
                catalog_filenames.append(filename)

if catalog_embeddings:
    catalog_embeddings = torch.cat(catalog_embeddings, dim=0)
    print(f"Loaded {len(catalog_filenames)} items into the catalog.")

AESTHETIC_CLASSES = ["Clean Girl", "Streetwear", "Vintage", "Formal Elegant", "Casual Minimalist"]
text_tokens = tokenizer(AESTHETIC_CLASSES)

@app.get("/")
def read_root():
    return {"message": "Outfit Recommendation & Analysis API is running!"}

@app.post("/recommend/")
async def recommend_clothing(file: UploadFile = File(...)):
    if len(catalog_embeddings) == 0:
        return {"error": "Catalog is empty."}

    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    image_tensor = preprocess(image).unsqueeze(0)

    with torch.no_grad():
        query_features = model.encode_image(image_tensor)
        query_features /= query_features.norm(dim=-1, keepdim=True)

        text_features = model.encode_text(text_tokens)
        text_features /= text_features.norm(dim=-1, keepdim=True)

        similarity_text = (100.0 * query_features @ text_features.T).softmax(dim=-1)
        best_aesthetic_idx = similarity_text.argmax().item()
        confidence_score = round(similarity_text[0][best_aesthetic_idx].item() * 100, 2)
        detected_aesthetic = AESTHETIC_CLASSES[best_aesthetic_idx]

        similarity_catalog = (query_features @ catalog_embeddings.T).squeeze(0)
        best_match_idx = similarity_catalog.argmax().item()
        best_score = similarity_catalog[best_match_idx].item()

    img_small = image.resize((50, 50))
    colors = img_small.getcolors(maxcolors=2500)
    dominant_color = max(colors, key=lambda item: item[0])[1] if colors else (0, 0, 0)

    return {
        "query_filename": file.filename,
        "aesthetic": detected_aesthetic,
        "confidence": f"{confidence_score}%",
        "dominant_color_rgb": dominant_color,
        "recommended_item": catalog_filenames[best_match_idx],
        "similarity_score": round(best_score, 4),
        "message": "Analysis generated successfully!"
    }

@app.post("/generate-capsule/")
async def generate_capsule(aesthetic: str = "Clean Girl", max_budget: float = 5000):
    with open("products.json", "r") as f:
        PRODUCTS_DATA = json.load(f)

    filtered_items = [p for p in PRODUCTS_DATA if p.get("aesthetic") == aesthetic]
    categories = ["Blazer", "Tank Top", "Trouser", "Shoes", "Bag"]
    capsule_selection = []
    total_price = 0

    for cat in categories:
        cat_items = [p for p in filtered_items if p["category"] == cat]
        cat_items.sort(key=lambda x: x["price"])
        
        match = next((p for p in cat_items if total_price + p["price"] <= max_budget), None)
        if not match and cat_items:
            match = cat_items[0]
            
        if match:
            capsule_selection.append(match)
            total_price += match["price"]

    return {
        "capsule_wardrobe": capsule_selection,
        "total_budget": total_price
    }

@app.get("/trends/")
def get_trends():
    trending_styles = [
        {"aesthetic": "Clean Girl", "popularity": "94%", "growth": "+12%"},
        {"aesthetic": "Formal Elegant", "popularity": "88%", "growth": "+8%"},
        {"aesthetic": "Streetwear", "popularity": "82%", "growth": "-3%"}
    ]
    return {"trends": trending_styles}