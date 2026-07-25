'use client';

import { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';

type AnalysisResult = {
  aesthetic: string;
  confidence: number;
  trend: string;
  palette: string[];
  breakdown: { item: string; value: string }[];
  products: { name: string; price: string; stock: boolean }[];
};

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [addedItems, setAddedItems] = useState<string[]>([]);

  // Dashboard chart data
  const trendData = [
    { day: 'Mon', engagement: 120 },
    { day: 'Tue', engagement: 145 },
    { day: 'Wed', engagement: 170 },
    { day: 'Thu', engagement: 210 },
    { day: 'Fri', engagement: 265 },
    { day: 'Sat', engagement: 320 },
    { day: 'Sun', engagement: 380 },
  ];

  const aestheticData = [
    { aesthetic: 'Clean Girl', score: 94 },
    { aesthetic: 'Coastal', score: 88 },
    { aesthetic: 'Old Money', score: 76 },
    { aesthetic: 'Y2K', score: 61 },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setShowResults(false);
      setAnalysis(null);
    }
  };

  const handleAnalyze = () => {
    setIsLoading(true);
    setShowResults(false);

    setTimeout(() => {
      let result: AnalysisResult;

      // Simulated AI logic
      if (Math.random() > 0.66) {
        result = {
          aesthetic: 'Quiet Luxury',
          confidence: 96,
          trend: '+118%',
          palette: ['#111827', '#374151', '#9CA3AF', '#F9FAFB'],
          breakdown: [
            { item: 'Outerwear', value: 'Structured black blazer' },
            { item: 'Top', value: 'Silk neutral top' },
            { item: 'Bottom', value: 'Tailored trousers' },
            { item: 'Footwear', value: 'Leather loafers' },
            { item: 'Accessories', value: 'Minimal gold watch' },
          ],
          products: [
            { name: 'MANGO Structured Blazer', price: '₹2,499', stock: true },
            { name: 'H&M Satin Top', price: '₹899', stock: true },
            {
              name: 'Roadster Tailored Trousers',
              price: '₹1,499',
              stock: true,
            },
            {
              name: 'Hush Puppies Leather Loafers',
              price: '₹3,299',
              stock: true,
            },
          ],
        };
      } else if (Math.random() > 0.5) {
        result = {
          aesthetic: 'Y2K Revival',
          confidence: 91,
          trend: '+167%',
          palette: ['#EC4899', '#F472B6', '#C4B5FD', '#FFFFFF'],
          breakdown: [
            { item: 'Top', value: 'Baby tee / cropped top' },
            { item: 'Bottom', value: 'Low-rise denim' },
            { item: 'Footwear', value: 'Chunky sneakers' },
            { item: 'Accessories', value: 'Mini bag + sunglasses' },
          ],
          products: [
            {
              name: 'Tokyo Talkies Baby Tee',
              price: '₹699',
              stock: true,
            },
            { name: 'Ketch Low-Rise Jeans', price: '₹1,299', stock: true },
            {
              name: 'Puma Chunky Sneakers',
              price: '₹3,499',
              stock: false,
            },
            { name: 'DressBerry Mini Bag', price: '₹899', stock: true },
          ],
        };
      } else {
        result = {
          aesthetic: 'Coastal Clean Girl',
          confidence: 94,
          trend: '+142%',
          palette: ['#D6C6B8', '#F8F6F2', '#A8B5A2', '#6B7280'],
          breakdown: [
            { item: 'Outerwear', value: 'Oversized beige blazer' },
            { item: 'Top', value: 'White ribbed tank' },
            { item: 'Bottom', value: 'Wide-leg trousers' },
            { item: 'Footwear', value: 'White sneakers' },
            { item: 'Accessories', value: 'Watch + sunglasses + tote' },
          ],
          products: [
            {
              name: 'MANGO Oversized Blazer',
              price: '₹2,499',
              stock: true,
            },
            { name: 'H&M Ribbed Tank', price: '₹599', stock: true },
            {
              name: 'Roadster Wide-Leg Trousers',
              price: '₹1,299',
              stock: true,
            },
            {
              name: 'Puma White Court Sneakers',
              price: '₹2,999',
              stock: true,
            },
            {
              name: 'Accessorize Tote Bag',
              price: '₹1,499',
              stock: false,
            },
          ],
        };
      }

      setAnalysis(result);
      setIsLoading(false);
      setShowResults(true);
    }, 2200);
  };

  const toggleAdd = (name: string) => {
    setAddedItems((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500" />
            <h1 className="text-2xl font-bold text-gray-900">
              AestheticEngine
            </h1>
          </div>

          <button
            onClick={() => {
              document
                .getElementById('hero')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="rounded-full bg-black px-5 py-2 text-white transition hover:bg-gray-800"
          >
            Try Demo
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="hero"
        className="mx-auto max-w-7xl px-6 py-16 md:py-24"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* LEFT */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-pink-600">
              AI Fashion Intelligence
            </p>

            <h2 className="mb-6 text-5xl font-black leading-tight text-gray-900 md:text-6xl">
              From Social Trend
              <span className="block text-pink-600">
                to Shoppable Capsule
              </span>
            </h2>

            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              Upload a complete outfit image. Our AI extracts every fashion
              component, predicts the aesthetic, and maps the look to
              Myntra-style in-stock recommendations with prices and a capsule
              wardrobe.
            </p>

            <div className="flex flex-wrap gap-4">
              <label
                htmlFor="outfit-upload"
                className="cursor-pointer rounded-2xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
              >
                Upload Outfit
              </label>

              <input
                id="outfit-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />

              <button
                onClick={() => {
                  document
                    .getElementById('dashboard')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-2xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                View Dashboard
              </button>
            </div>

            {selectedImage && (
              <button
                onClick={handleAnalyze}
                className="mt-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 font-semibold text-white transition hover:opacity-90"
              >
                Analyze Complete Outfit
              </button>
            )}
          </div>

          {/* RIGHT CARD */}
          <div className="rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex h-80 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected outfit"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-500">
                  <p className="text-lg font-semibold">Upload an outfit</p>
                  <p className="text-sm">
                    Full-body look, accessories, shoes, bags, and styling
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Pipeline</span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  Frontend + AI Ready
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Vision Model</span>
                <span className="font-bold text-gray-900">OpenCLIP</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Recommendation Source</span>
                <span className="font-bold text-pink-600">Myntra Dataset</span>
              </div>
            </div>

            {/* LOADING */}
            {isLoading && (
              <div className="mt-6 rounded-3xl bg-gray-50 p-6">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-200 border-t-pink-500" />

                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900">
                      AI is analyzing the complete outfit...
                    </h3>
                    <p className="text-gray-600">
                      Detecting top, bottom, footwear, accessories, colors, and
                      silhouette
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* RESULTS */}
            {showResults && analysis && (
              <div className="mt-6 space-y-6">
                {/* Aesthetic */}
                <div className="rounded-3xl border border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        Detected Aesthetic
                      </p>
                      <h3 className="text-2xl font-black text-gray-900">
                        {analysis.aesthetic}
                      </h3>
                    </div>

                    <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                      {analysis.confidence}% Match
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl bg-white p-5 shadow-lg">
                    <p className="text-sm text-gray-500">Trend Momentum</p>
                    <p className="text-3xl font-black text-pink-600">
                      {analysis.trend}
                    </p>
                    <p className="text-sm text-gray-600">
                      Social engagement signal
                    </p>
                  </div>

                  <div className="rounded-3xl bg-white p-5 shadow-lg">
                    <p className="text-sm text-gray-500">Color Palette</p>

                    <div className="mt-3 flex gap-2">
                      {analysis.palette.map((color) => (
                        <div
                          key={color}
                          className="h-8 w-8 rounded-full border border-gray-200"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>

                    <p className="mt-3 text-sm text-gray-600">
                      AI extracted dominant colors
                    </p>
                  </div>
                </div>

                {/* AI Insight */}
                <div className="rounded-3xl bg-black p-5 text-white">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-pink-400" />
                    <p className="font-semibold">AI Insight</p>
                  </div>

                  <p className="text-sm leading-relaxed text-gray-300">
                    The uploaded image has been parsed as a complete outfit.
                    Components were separated into clothing, footwear, and
                    accessories before being mapped to a Myntra-style product
                    catalog for shoppable recommendations.
                  </p>
                </div>

                {/* OUTFIT BREAKDOWN */}
                <div className="rounded-3xl bg-white p-6 shadow-lg">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-widest text-pink-600">
                        Outfit Breakdown
                      </p>
                      <h4 className="text-xl font-black text-gray-900">
                        Complete Look Analysis
                      </h4>
                    </div>

                    <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                      AI Parsed
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-gray-100">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-600">
                            Detected Item
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-600">
                            AI Prediction
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {analysis.breakdown.map((row) => (
                          <tr
                            key={row.item}
                            className="border-t border-gray-100"
                          >
                            <td className="px-4 py-3 font-medium text-gray-900">
                              {row.item}
                            </td>
                            <td className="px-4 py-3 text-gray-700">
                              {row.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* SIMILAR PRODUCTS */}
                <div className="rounded-3xl bg-white p-6 shadow-lg">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-widest text-pink-600">
                        Similar Myntra Products
                      </p>
                      <h4 className="text-xl font-black text-gray-900">
                        In-Stock Recommendations
                      </h4>
                    </div>

                    <div className="rounded-full bg-black px-3 py-1 text-sm font-bold text-white">
                      Live Dataset
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-gray-100">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-600">
                            Product
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-600">
                            Price
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-600">
                            Stock
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-600">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {analysis.products.map((product) => {
                          const isAdded = addedItems.includes(product.name);

                          return (
                            <tr
                              key={product.name}
                              className="border-t border-gray-100"
                            >
                              <td className="px-4 py-3 font-medium text-gray-900">
                                {product.name}
                              </td>

                              <td className="px-4 py-3 font-semibold text-gray-900">
                                {product.price}
                              </td>

                              <td className="px-4 py-3">
                                {product.stock ? (
                                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
                                    In Stock
                                  </span>
                                ) : (
                                  <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-700">
                                    Low Stock
                                  </span>
                                )}
                              </td>

                              <td className="px-4 py-3">
                                <button
                                  onClick={() => toggleAdd(product.name)}
                                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                                    isAdded
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-pink-600 text-white hover:bg-pink-700'
                                  }`}
                                >
                                  {isAdded ? 'Added ✓' : 'Add'}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-2xl bg-gray-50 p-4 md:flex-row md:items-center">
                    <div>
                      <p className="text-sm text-gray-500">
                        Estimated capsule total
                      </p>
                      <p className="text-2xl font-black text-gray-900">
                        ₹7,396
                      </p>
                    </div>

                    <button className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-3 font-semibold text-white transition hover:opacity-90">
                      Add Entire Capsule
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CAPSULE SECTION */}
        <div className="mt-24">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-pink-600">
                Shop the Aesthetic
              </p>
              <h3 className="text-4xl font-black text-gray-900">
                AI Generated Capsule
              </h3>
            </div>

            <div className="flex items-center gap-2 rounded-2xl bg-green-100 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="font-semibold text-green-700">
                Basket Optimization Active
              </span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: 'Oversized Blazer',
                price: '₹1,499',
                category: 'Outerwear',
                image:
                  'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop',
              },
              {
                name: 'Ribbed Tank Top',
                price: '₹499',
                category: 'Top',
                image:
                  'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
              },
              {
                name: 'Wide-Leg Trousers',
                price: '₹999',
                category: 'Bottom',
                image:
                  'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
              },
              {
                name: 'White Sneakers',
                price: '₹899',
                category: 'Footwear',
                image:
                  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
              },
            ].map((item) => (
              <div
                key={item.name}
                className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 backdrop-blur">
                    {item.category}
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="mb-1 text-lg font-bold text-gray-900">
                    {item.name}
                  </h4>

                  <p className="mb-4 text-sm text-gray-500">
                    AI matched to the detected aesthetic
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black text-gray-900">
                      {item.price}
                    </span>

                    <button
                      onClick={() => toggleAdd(item.name)}
                      className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                        addedItems.includes(item.name)
                          ? 'bg-green-100 text-green-700'
                          : 'bg-pink-600 text-white hover:bg-pink-700'
                      }`}
                    >
                      {addedItems.includes(item.name) ? 'Added ✓' : 'Add'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DASHBOARD */}
        <div id="dashboard" className="mt-28">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-pink-600">
              AI Commerce Analytics
            </p>
            <h3 className="text-4xl font-black text-gray-900">
              Trend Intelligence Dashboard
            </h3>
          </div>

          {/* KPI */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <p className="text-sm text-gray-500">Outfits Analyzed</p>
              <p className="mt-2 text-4xl font-black text-gray-900">12.4K</p>
              <p className="mt-2 text-sm font-semibold text-green-600">
                +18.2%
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <p className="text-sm text-gray-500">Capsule Conversion</p>
              <p className="mt-2 text-4xl font-black text-gray-900">31.7%</p>
              <p className="mt-2 text-sm font-semibold text-green-600">
                +9.4%
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <p className="text-sm text-gray-500">Projected GMV</p>
              <p className="mt-2 text-4xl font-black text-gray-900">₹2.8L</p>
              <p className="mt-2 text-sm font-semibold text-green-600">
                +22%
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <p className="text-sm text-gray-500">AI Latency</p>
              <p className="mt-2 text-4xl font-black text-gray-900">1.8s</p>
              <p className="mt-2 text-sm font-semibold text-blue-600">P95</p>
            </div>
          </div>

          {/* Charts */}
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-xl">
              <h4 className="mb-4 text-xl font-bold text-gray-900">
                Weekly Trend Momentum
              </h4>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="engagement"
                      stroke="#EC4899"
                      strokeWidth={4}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-xl">
              <h4 className="mb-4 text-xl font-bold text-gray-900">
                Aesthetic Match Distribution
              </h4>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={aestheticData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="aesthetic" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="score"
                      fill="#8B5CF6"
                      radius={[10, 10, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Rising */}
          <div className="mt-10 rounded-3xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h4 className="text-xl font-bold text-gray-900">
                Rising Aesthetics
              </h4>
              <span className="text-sm text-gray-500">Next 72 hours</span>
            </div>

            <div className="space-y-4">
              {[
                ['Coastal Clean Girl', '+142%'],
                ['Old Money Summer', '+96%'],
                ['Quiet Luxury', '+81%'],
                ['Soft Utility', '+67%'],
              ].map(([name, growth]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-2xl border border-gray-100 p-4"
                >
                  <span className="font-semibold text-gray-900">{name}</span>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                    {growth}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}