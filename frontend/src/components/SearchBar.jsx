import { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ onSearch, categories }) {
  const [searchParams, setSearchParams] = useState({
    name: '',
    category: '',
    minPrice: undefined,
    maxPrice: undefined,
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    onSearch(searchParams);
  };

  const handleReset = () => {
    const resetParams = {
      name: '',
      category: '',
      minPrice: undefined,
      maxPrice: undefined,
    };
    setSearchParams(resetParams);
    onSearch(resetParams);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search sweets by name..."
            value={searchParams.name}
            onChange={(e) => setSearchParams({ ...searchParams, name: e.target.value })}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
          />
        </div>

        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-orange-600 transition duration-200"
        >
          Search
        </button>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition duration-200"
        >
          {showFilters ? 'Hide' : 'Show'} Filters
        </button>
      </div>

      {showFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={searchParams.category}
                onChange={(e) => setSearchParams({ ...searchParams, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Price
              </label>
              <input
                type="number"
                placeholder="0"
                value={searchParams.minPrice || ''}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    minPrice: e.target.value ? parseFloat(e.target.value) : undefined,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price
              </label>
              <input
                type="number"
                placeholder="100"
                value={searchParams.maxPrice || ''}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    maxPrice: e.target.value ? parseFloat(e.target.value) : undefined,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition"
            >
              <X className="w-4 h-4" />
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
