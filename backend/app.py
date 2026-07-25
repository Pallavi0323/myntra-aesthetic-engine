import streamlit as st
import requests

st.set_page_config(page_title="AI Capsule Wardrobe Generator", layout="wide")

st.title("✨ AI-Powered Capsule Wardrobe & Outfit Recommender")

tab = st.sidebar.selectbox("Choose Feature", ["Outfit Analyzer", "Capsule Wardrobe", "Trend Dashboard"])

if tab == "Outfit Analyzer":
    st.header("🔍 Analyze Your Outfit & Find Matches")
    uploaded_file = st.file_uploader("Upload clothing image...", type=["jpg", "jpeg", "png"])
    
    if uploaded_file and st.button("Analyze Image"):
        files = {"file": uploaded_file.getvalue()}
        res = requests.post("http://127.0.0.1:8000/recommend/", files=files)
        if res.status_code == 200:
            data = res.json()
            st.success(f"Detected Aesthetic: **{data['aesthetic']}** ({data['confidence']})")
            st.write(f"Recommended Match: **{data['recommended_item']}**")
        else:
            st.error("API connection error.")

elif tab == "Capsule Wardrobe":
    st.header("👗 Smart Budget Capsule Wardrobe")
    aesthetic = st.selectbox("Aesthetic", ["Clean Girl", "Streetwear", "Vintage", "Formal Elegant", "Casual Minimalist"])
    max_budget = st.slider("Max Budget (₹)", 1000, 15000, 5000, 500)
    
    if st.button("Generate Capsule"):
        res = requests.post(f"http://127.0.0.1:8000/generate-capsule/?aesthetic={aesthetic}&max_budget={max_budget}")
        if res.status_code == 200:
            data = res.json()
            st.write(f"### Total Cost: ₹{data['total_budget']}")
            items = data.get("capsule_wardrobe", [])
            if items:
                cols = st.columns(len(items))
                for i, item in enumerate(items):
                    with cols[i]:
                        st.write(f"**{item['name']}**")
                        st.write(f"Category: {item['category']}")
                        st.write(f"Price: ₹{item['price']}")
            else:
                st.warning("No items found matching this budget or aesthetic.")
        else:
            st.error("Failed to generate capsule.")

elif tab == "Trend Dashboard":
    st.header("📈 Live Fashion Trends")
    res = requests.get("http://127.0.0.1:8000/trends/")
    if res.status_code == 200:
        trends = res.json().get("trends", [])
        cols = st.columns(len(trends))
        for i, trend in enumerate(trends):
            with cols[i]:
                st.metric(label=trend["aesthetic"], value=trend["popularity"], delta=trend["growth"])
    else:
        st.error("Could not fetch trends.")