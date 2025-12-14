import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import SweetCard from "../components/SweetCard";
import SearchBar from "../components/SearchBar";
import RestockModal from "../components/RestockModal";
import { LogOut, Plus, Candy } from "lucide-react";
import DeleteModal from "../components/DeleteModal";
import PurchaseModal from "../components/PurchaseModal";
import AddSweets from "../components/AddSweets";

export default function Dashboard() {
  const { user, logout, isAdmin } = useAuth();

  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSweetModal, setShowSweetModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState(null);
  const [restockSweetId, setRestockSweetId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteSweetId, setDeleteSweetId] = useState(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const categories = Array.from(new Set(sweets.map((s) => s.category)));

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {
    try {
      setLoading(true);
      const data = await api.getSweets();
      setSweets(data);
      setFilteredSweets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (params) => {
    try {
      setLoading(true);
      const hasFilters =
        params.name || params.category || params.minPrice || params.maxPrice;

      if (hasFilters) {
        const data = await api.searchSweets(params);
        setFilteredSweets(data);
      } else {
        setFilteredSweets(sweets);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPurchaseModal = (sweet) => {
    setShowPurchaseModal(true);
    setSelectedSweet(sweet);
  };

  const handlePurchase = async (id, quantity) => {
    try {
      setLoading(true);
      await api.purchaseSweet(id, quantity);
      await loadSweets();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Purchase failed");
    } finally {
      setLoading(false);
      setShowPurchaseModal(false);
      setSelectedSweet(null);
    }
  };

  const handleRestock = (id) => {
    setRestockSweetId(id);
    setShowRestockModal(true);
  };

  const handleRestockSubmit = async (quantity) => {
    console.log(quantity,restockSweetId)
    if (!restockSweetId) return;

    try {
      await api.restockSweet(restockSweetId, quantity);
      setShowRestockModal(false);
      setRestockSweetId(null);
      await loadSweets();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Restock failed");
    }
  };

  const handleEdit = (sweet) => {
    setSelectedSweet(sweet);
    setShowSweetModal(true);
  };

  const handleShowDeleteModal = (id) => {
    setShowDeleteModal(true);
    setDeleteSweetId(id);
  };

  const handleDeleteSweet = async () => {
    try {
      await api.deleteSweet(deleteSweetId);
      await loadSweets();
      setShowDeleteModal(false);
      setDeleteSweetId(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const handleSweetModalClose = () => {
    setShowSweetModal(false);
    setSelectedSweet(null);
  };

  const handleSweetSave = async () => {
    setShowSweetModal(false);
    setSelectedSweet(null);
    await loadSweets();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-2 rounded-lg">
                <Candy className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Sweet Shop</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-semibold text-gray-800">
                  {user?.firstName} {user?.lastName}
                  {isAdmin && (
                    <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                      Admin
                    </span>
                  )}
                </p>
              </div>

              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition duration-200"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Discover Our Sweets
            </h2>
            <p className="text-gray-600">
              Browse through our delicious collection
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => setShowSweetModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-orange-600 transition duration-200"
            >
              <Plus className="w-5 h-5" />
              Add Sweet
            </button>
          )}
        </div>

        <SearchBar onSearch={handleSearch} categories={categories} />

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : filteredSweets.length === 0 ? (
          <div className="text-center py-16">
            <Candy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No sweets found</p>
            <p className="text-gray-500 mt-2">
              Try adjusting your search filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSweets.map((sweet) => (
              <SweetCard
                key={sweet._id}
                sweet={sweet}
                onPurchase={handleOpenPurchaseModal}
                onRestock={handleRestock}
                isAdmin={isAdmin}
                onEdit={handleEdit}
                onDelete={handleShowDeleteModal}
              />
            ))}
          </div>
        )}
      </div>

      {showSweetModal && (
        <AddSweets
          sweet={selectedSweet}
          onClose={handleSweetModalClose}
          onSave={handleSweetSave}
        />
      )}

      {showRestockModal && (
        <RestockModal
          onClose={() => {
            setShowRestockModal(false);
            setRestockSweetId(null);
          }}
          onRestock={handleRestockSubmit}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          onClose={() => {
            setShowDeleteModal(false);
            setDeleteSweetId(null);
          }}
          onDelete={handleDeleteSweet}
          loading={loading}
        />
      )}

      {showPurchaseModal && (
        <PurchaseModal
          maxQuantity={selectedSweet?.quantity}
          onClose={() => setShowPurchaseModal(false)}
          onPurchase={(qty) =>
            handlePurchase(selectedSweet?._id, qty)
          }
          loading={loading}
        />
      )}
    </div>
  );
}
