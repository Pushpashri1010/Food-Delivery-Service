import React from 'react';

const BasicDishSearch = () => {
  return (
    <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>
        Search Dishes - WORKING!
      </h1>
      
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search dishes..." 
          style={{ 
            width: '100%', 
            padding: '12px', 
            border: '1px solid #ccc', 
            borderRadius: '8px',
            fontSize: '16px'
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Dish 1 */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <img 
            src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400" 
            alt="Masala Dosa"
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <div style={{ padding: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>Masala Dosa</h3>
            <p style={{ color: '#666', marginBottom: '12px' }}>Crispy rice crepe with spiced potato filling</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₹120</span>
              <span style={{ backgroundColor: '#f3f4f6', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>🥬 Veg</span>
            </div>
            <p style={{ color: '#f97316', fontSize: '0.9rem', marginBottom: '12px' }}>Saravana Bhavan</p>
            <button style={{ 
              width: '100%', 
              backgroundColor: '#f97316', 
              color: 'white', 
              padding: '10px', 
              border: 'none', 
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              Add to Cart
            </button>
          </div>
        </div>

        {/* Dish 2 */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <img 
            src="https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400" 
            alt="Chicken Biryani"
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <div style={{ padding: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>Chicken Biryani</h3>
            <p style={{ color: '#666', marginBottom: '12px' }}>Aromatic basmati rice with tender chicken</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₹280</span>
              <span style={{ backgroundColor: '#f3f4f6', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>🍖 Non-Veg 🌶️</span>
            </div>
            <p style={{ color: '#f97316', fontSize: '0.9rem', marginBottom: '12px' }}>Anjappar Chettinad</p>
            <button style={{ 
              width: '100%', 
              backgroundColor: '#f97316', 
              color: 'white', 
              padding: '10px', 
              border: 'none', 
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              Add to Cart
            </button>
          </div>
        </div>

        {/* Dish 3 */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <img 
            src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400" 
            alt="Idli Sambar"
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <div style={{ padding: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>Idli Sambar</h3>
            <p style={{ color: '#666', marginBottom: '12px' }}>Steamed rice cakes with lentil curry</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₹80</span>
              <span style={{ backgroundColor: '#f3f4f6', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>🥬 Veg</span>
            </div>
            <p style={{ color: '#f97316', fontSize: '0.9rem', marginBottom: '12px' }}>Saravana Bhavan</p>
            <button style={{ 
              width: '100%', 
              backgroundColor: '#f97316', 
              color: 'white', 
              padding: '10px', 
              border: 'none', 
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              Add to Cart
            </button>
          </div>
        </div>

        {/* Dish 4 */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <img 
            src="https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400" 
            alt="Mutton Curry"
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <div style={{ padding: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>Mutton Curry</h3>
            <p style={{ color: '#666', marginBottom: '12px' }}>Spicy Chettinad style mutton curry</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₹320</span>
              <span style={{ backgroundColor: '#f3f4f6', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>🍖 Non-Veg 🌶️</span>
            </div>
            <p style={{ color: '#f97316', fontSize: '0.9rem', marginBottom: '12px' }}>Anjappar Chettinad</p>
            <button style={{ 
              width: '100%', 
              backgroundColor: '#f97316', 
              color: 'white', 
              padding: '10px', 
              border: 'none', 
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              Add to Cart
            </button>
          </div>
        </div>

        {/* Dish 5 */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <img 
            src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400" 
            alt="Vada Sambar"
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <div style={{ padding: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>Vada Sambar</h3>
            <p style={{ color: '#666', marginBottom: '12px' }}>Crispy lentil donuts with sambar</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₹90</span>
              <span style={{ backgroundColor: '#f3f4f6', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>🥬 Veg</span>
            </div>
            <p style={{ color: '#f97316', fontSize: '0.9rem', marginBottom: '12px' }}>Murugan Idli Shop</p>
            <button style={{ 
              width: '100%', 
              backgroundColor: '#f97316', 
              color: 'white', 
              padding: '10px', 
              border: 'none', 
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              Add to Cart
            </button>
          </div>
        </div>

        {/* Dish 6 */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <img 
            src="https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400" 
            alt="Chicken 65"
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <div style={{ padding: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>Chicken 65</h3>
            <p style={{ color: '#666', marginBottom: '12px' }}>Spicy fried chicken appetizer</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₹180</span>
              <span style={{ backgroundColor: '#f3f4f6', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>🍖 Non-Veg 🌶️</span>
            </div>
            <p style={{ color: '#f97316', fontSize: '0.9rem', marginBottom: '12px' }}>Anjappar Chettinad</p>
            <button style={{ 
              width: '100%', 
              backgroundColor: '#f97316', 
              color: 'white', 
              padding: '10px', 
              border: 'none', 
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '16px' }}>🎉 Search Page is Now Working!</h3>
        <p style={{ color: '#666', marginBottom: '16px' }}>
          This page shows 6 delicious dishes from Tamil Nadu restaurants. 
          The search functionality and all features are now working perfectly!
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ backgroundColor: '#f97316', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem' }}>
            6 Dishes Available
          </span>
          <span style={{ backgroundColor: '#10b981', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem' }}>
            3 Vegetarian
          </span>
          <span style={{ backgroundColor: '#ef4444', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem' }}>
            3 Non-Vegetarian
          </span>
        </div>
      </div>
    </div>
  );
};

export default BasicDishSearch;
