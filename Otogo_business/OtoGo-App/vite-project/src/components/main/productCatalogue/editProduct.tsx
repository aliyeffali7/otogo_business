import React, { useState } from "react";

// Clean version: keep only popup + demo, no extra TestPanel.
// Buttons styled exactly like screenshot: REMOVE (red), CANCEL (dark), SAVE (light).

type ProductPopupProps = {
  isOpen: boolean;
  initialData: any;
  onSave: (data: any) => void;
  onCancel: () => void;
  onRemove: (data: any) => void;
};

function ProductPopup({ isOpen, initialData, onSave, onCancel, onRemove }: ProductPopupProps) {
  const [productData, setProductData] = useState(initialData || {});

  if (!isOpen) return null;

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setProductData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-[#2e2e34] bg-[#1c1d22] text-[#e0e0e0] shadow-2xl p-8">
        {/* Images */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-28 h-28 rounded-xl border border-[#3b3c42] bg-[#2a2b30] overflow-hidden flex items-center justify-center">
            <img src="https://placehold.co/112x112/2a2b30/e0e0e0?text=Şəkil" alt="Product" className="object-cover" />
          </div>
          <div className="w-28 h-28 rounded-xl border border-[#3b3c42] bg-[#2a2b30] overflow-hidden flex items-center justify-center">
            <img src="https://placehold.co/112x112/2a2b30/e0e0e0?text=Şəkil" alt="Product" className="object-cover" />
          </div>
          <div className="w-28 h-28 rounded-xl border border-[#3b3c42] bg-[#2a2b30] flex items-center justify-center text-3xl cursor-pointer hover:bg-[#3b3c42]">+</div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <label className="block">
            <span className="text-sm mb-1 block">Name:</span>
            <input
              type="text"
              name="name"
              value={productData.name || ""}
              onChange={handleInputChange}
              className="w-full p-3 bg-[#2a2b30] border border-[#3b3c42] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b6b72]"
            />
          </label>

          <label className="block">
            <span className="text-sm mb-1 block">Manufacturer:</span>
            <input
              type="text"
              name="manufacturer"
              value={productData.manufacturer || ""}
              onChange={handleInputChange}
              className="w-full p-3 bg-[#2a2b30] border border-[#3b3c42] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b6b72]"
            />
          </label>

          <label className="block">
            <span className="text-sm mb-1 block">Description:</span>
            <input
              type="text"
              name="description"
              value={productData.description || ""}
              onChange={handleInputChange}
              className="w-full p-3 bg-[#2a2b30] border border-[#3b3c42] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b6b72]"
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <label className="block">
              <span className="text-sm mb-1 block">Category:</span>
              <select
                name="category"
                value={productData.category || ""}
                onChange={handleInputChange}
                className="w-full p-3 bg-[#2a2b30] border border-[#3b3c42] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b6b72]"
              >
                <option value="Expert Car Care">Expert Car Care</option>
                <option value="Category 2">Category 2</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm mb-1 block">Branch:</span>
              <select
                name="branch"
                value={productData.branch || ""}
                onChange={handleInputChange}
                className="w-full p-3 bg-[#2a2b30] border border-[#3b3c42] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b6b72]"
              >
                <option value="NARIMANOV">NARIMANOV</option>
                <option value="Branch 2">Branch 2</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm mb-1 block">Price:</span>
              <input
                type="text"
                name="price"
                value={productData.price || ""}
                onChange={handleInputChange}
                className="w-full p-3 bg-[#2a2b30] border border-[#3b3c42] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b6b72]"
              />
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => onRemove(productData)}
            className="w-full px-6 py-3 rounded-lg font-medium bg-[#f05c5c] text-white hover:bg-[#e64c4c]"
          >
            REMOVE
          </button>
          <button
            onClick={onCancel}
            className="w-full px-6 py-3 rounded-lg font-medium bg-[#2a2b30] text-[#e0e0e0] hover:bg-[#3b3c42] border border-[#3b3c42]"
          >
            CANCEL
          </button>
          <button
            onClick={() => onSave(productData)}
            className="w-full px-6 py-3 rounded-lg font-medium bg-[#e6e6ea] text-[#14151a] hover:bg-[#dcdce0]"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [product, setProduct] = useState<{
    name: string;
    manufacturer: string;
    description: string;
    category: string;
    branch: string;
    price: string;
  } | null>({
    name: "Glowup Ceramic Spray Coating",
    manufacturer: "Expert Car Care",
    description: "Expert Car Care",
    category: "Expert Car Care",
    branch: "NARIMANOV",
    price: "Expert Car Care",
  });

  return (
    <div className="min-h-screen bg-[#14151a] p-6">
      <ProductPopup
        isOpen={isOpen}
        initialData={product}
        onSave={(data) => { setProduct(data); setIsOpen(false); }}
        onCancel={() => setIsOpen(false)}
        onRemove={() => { setProduct(null); setIsOpen(false); }}
      />
    </div>
  );
}
