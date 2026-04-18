import React, { useState, useEffect } from 'react';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('menus');
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    loadContentData();
  }, []);

  const loadContentData = () => {
    // Load menu items from localStorage or mockData
    const mockMenuItems = [
      {
        id: 'item1',
        name: 'Masala Dosa',
        description: 'Crispy dosa with spiced potato filling',
        price: 120,
        category: 'South Indian',
        restaurant: 'Saravana Bhavan',
        image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400',
        isVegetarian: true,
        isAvailable: true,
        preparationTime: 15
      },
      {
        id: 'item2',
        name: 'Chicken Biryani',
        description: 'Aromatic basmati rice with tender chicken',
        price: 280,
        category: 'Biryani',
        restaurant: 'Anjappar Chettinad',
        image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400',
        isVegetarian: false,
        isAvailable: true,
        preparationTime: 25
      }
    ];

    const mockCategories = [
      { id: 'cat1', name: 'South Indian', description: 'Traditional South Indian cuisine', itemCount: 45, isActive: true },
      { id: 'cat2', name: 'North Indian', description: 'Rich North Indian dishes', itemCount: 32, isActive: true },
      { id: 'cat3', name: 'Chinese', description: 'Indo-Chinese fusion', itemCount: 28, isActive: true },
      { id: 'cat4', name: 'Biryani', description: 'Aromatic rice dishes', itemCount: 15, isActive: true }
    ];

    const mockBanners = [
      {
        id: 'banner1',
        title: 'Weekend Special',
        description: '50% off on all orders above ₹500',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800',
        isActive: true,
        startDate: '2024-03-01',
        endDate: '2024-03-31',
        priority: 1
      },
      {
        id: 'banner2',
        title: 'New Restaurant',
        description: 'Golden Dragon now available on FoodieExpress',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
        isActive: true,
        startDate: '2024-03-15',
        endDate: '2024-04-15',
        priority: 2
      }
    ];

    setMenuItems(mockMenuItems);
    setCategories(mockCategories);
    setBanners(mockBanners);
  };

  const handleAddNew = (type) => {
    setModalType(type);
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (item, type) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  const handleToggleStatus = (id, type) => {
    if (type === 'menu') {
      setMenuItems(items => 
        items.map(item => 
          item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
        )
      );
    } else if (type === 'category') {
      setCategories(cats => 
        cats.map(cat => 
          cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
        )
      );
    } else if (type === 'banner') {
      setBanners(banners => 
        banners.map(banner => 
          banner.id === id ? { ...banner, isActive: !banner.isActive } : banner
        )
      );
    }
  };

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 font-medium text-sm rounded-lg transition-colors ${
        isActive 
          ? 'bg-orange-500 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  const MenuItemsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Menu Items Management</h3>
        <button
          onClick={() => handleAddNew('menu')}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          + Add Menu Item
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Restaurant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {menuItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img className="h-12 w-12 rounded-lg object-cover" src={item.image} alt={item.name} />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                      <div className="text-xs text-gray-400">
                        {item.isVegetarian ? '🥬 Veg' : '🍖 Non-Veg'} • {item.preparationTime} min
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.restaurant}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.category}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{item.price}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    item.isAvailable 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEdit(item, 'menu')}
                    className="text-orange-600 hover:text-orange-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleStatus(item.id, 'menu')}
                    className={item.isAvailable ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                  >
                    {item.isAvailable ? 'Disable' : 'Enable'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const CategoriesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Categories Management</h3>
        <button
          onClick={() => handleAddNew('category')}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          + Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{category.name}</h4>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                category.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {category.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">{category.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{category.itemCount} items</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(category, 'category')}
                  className="text-orange-600 hover:text-orange-900 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleToggleStatus(category.id, 'category')}
                  className={`text-sm ${category.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                >
                  {category.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const BannersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Banners & Promotions</h3>
        <button
          onClick={() => handleAddNew('banner')}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          + Add Banner
        </button>
      </div>

      <div className="space-y-4">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="flex">
              <img 
                src={banner.image} 
                alt={banner.title}
                className="w-32 h-24 object-cover"
              />
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{banner.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{banner.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>Priority: {banner.priority}</span>
                      <span>From: {banner.startDate}</span>
                      <span>To: {banner.endDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      banner.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {banner.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <button
                      onClick={() => handleEdit(banner, 'banner')}
                      className="text-orange-600 hover:text-orange-900 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleStatus(banner.id, 'banner')}
                      className={`text-sm ${banner.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                    >
                      {banner.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600">Manage menu items, categories, and promotional content</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <TabButton 
            id="menus" 
            label="Menu Items" 
            isActive={activeTab === 'menus'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="categories" 
            label="Categories" 
            isActive={activeTab === 'categories'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="banners" 
            label="Banners" 
            isActive={activeTab === 'banners'} 
            onClick={setActiveTab} 
          />
        </div>

        {/* Tab Content */}
        {activeTab === 'menus' && <MenuItemsTab />}
        {activeTab === 'categories' && <CategoriesTab />}
        {activeTab === 'banners' && <BannersTab />}

        {/* Modal Placeholder */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">
                {editingItem ? 'Edit' : 'Add New'} {modalType}
              </h3>
              <p className="text-gray-600 mb-6">
                {modalType} management form would go here. This is a placeholder for the full implementation.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentManagement;
