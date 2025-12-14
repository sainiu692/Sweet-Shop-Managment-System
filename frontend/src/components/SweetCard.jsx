import { ShoppingCart, Package } from 'lucide-react';


export default function SweetCard({
  sweet,
  onPurchase,
  onRestock,
  isAdmin,
  onEdit,
  onDelete,
}) {
  const isOutOfStock = sweet.quantity === 0;
  console.log(sweet)

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center">
        {sweet.imageUrl ? (
          <img
            src={sweet.imageUrl}
            alt={sweet.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Package className="w-20 h-20 text-orange-300" />
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{sweet.name}</h3>
          <span className="text-2xl font-bold text-orange-600">
            ₹{sweet.price.toFixed(2)}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3">
          <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
            {sweet.category}
          </span>
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">
            Stock: <span className={`font-semibold ${isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>
              {sweet.quantity}
            </span>
          </span>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => onPurchase?.(sweet)}
            disabled={isOutOfStock}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition duration-200 ${
              isOutOfStock
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:from-pink-600 hover:to-orange-600'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            Purchase
          </button>

          {isAdmin && (
            <div className="flex gap-2">
              <button
                onClick={() => onEdit?.(sweet)}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete?.(sweet._id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
              <button
                onClick={() => onRestock?.(sweet._id)}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
              >
                Restock
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
