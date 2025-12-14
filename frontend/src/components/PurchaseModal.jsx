import { useState } from "react";
import { X, ShoppingCart } from "lucide-react";


export default function PurchaseModal({
  onClose,
  onPurchase,
  maxQuantity,
  loading
}) {
  const [quantity, setQuantity] = useState();
  console.log(maxQuantity);

  const handleSubmit = (e) => {
    e.preventDefault();
    onPurchase(quantity);
  };

  return (
    <div className="fixed inset-0 bg-white/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Purchase Sweets</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Quantity to Purchase
            </label>
            <input
              id="quantity"
              type="number"
              min={1}
              max={maxQuantity}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-lg font-semibold text-center"
            />
            {maxQuantity !== undefined && (
              <p className="mt-2 text-sm text-gray-600 text-center">
                Available stock: {maxQuantity}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                quantity < 1 ||
                (maxQuantity !== undefined && quantity > maxQuantity)
              }
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
             {loading ? "Purchasing...": "Purchase"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
