// Utility to add test data to localStorage for admin panel testing

export const addTestOrders = () => {
  const testOrders = [
    {
      id: 'ORD' + Date.now(),
      customerId: 'cust1',
      customerName: 'Priya Sharma',
      customerPhone: '+91 98765 43210',
      restaurant: {
        id: '1',
        name: 'Saravana Bhavan',
        phone: '+91 44 2434 4999'
      },
      items: [
        {
          id: 'item1',
          name: 'Masala Dosa',
          price: 120,
          quantity: 2,
          totalPrice: 240
        },
        {
          id: 'item2',
          name: 'Filter Coffee',
          price: 50,
          quantity: 2,
          totalPrice: 100
        }
      ],
      totalAmount: 365,
      status: 'confirmed',
      paymentMethod: 'upi',
      paymentStatus: 'completed',
      createdAt: new Date().toISOString(),
      orderDate: new Date().toISOString(),
      deliveryAddress: {
        street: '123 Anna Nagar',
  city: 'Perundurai',
        pincode: '600040'
      },
      deliveryPartner: {
        id: 'dp1',
        name: 'Rajesh Kumar',
        phone: '+91 98765 12345'
      }
    },
    {
      id: 'ORD' + (Date.now() + 1),
      customerId: 'cust2',
      customerName: 'Anita Patel',
      customerPhone: '+91 87654 32109',
      restaurant: {
        id: '2',
        name: 'Anjappar Chettinad Restaurant',
        phone: '+91 44 2567 8901'
      },
      items: [
        {
          id: 'item3',
          name: 'Chettinad Chicken',
          price: 280,
          quantity: 1,
          totalPrice: 280
        },
        {
          id: 'item4',
          name: 'Mutton Biryani',
          price: 320,
          quantity: 1,
          totalPrice: 320
        }
      ],
      totalAmount: 645,
      status: 'preparing',
      paymentMethod: 'card',
      paymentStatus: 'completed',
      createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
      orderDate: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      deliveryAddress: {
        street: '456 T. Nagar',
  city: 'Perundurai',
        pincode: '600017'
      },
      deliveryPartner: {
        id: 'dp2',
        name: 'Suresh Kumar',
        phone: '+91 87654 56789'
      }
    },
    {
      id: 'ORD' + (Date.now() + 2),
      customerId: 'cust3',
      customerName: 'Vikram Singh',
      customerPhone: '+91 76543 21098',
      restaurant: {
        id: '3',
        name: 'Murugan Idli Shop',
        phone: '+91 44 2345 6789'
      },
      items: [
        {
          id: 'item5',
          name: 'Idli Sambar',
          price: 80,
          quantity: 3,
          totalPrice: 240
        },
        {
          id: 'item6',
          name: 'Vada',
          price: 40,
          quantity: 4,
          totalPrice: 160
        }
      ],
      totalAmount: 425,
      status: 'delivered',
      paymentMethod: 'cod',
      paymentStatus: 'completed',
      createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
      orderDate: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      deliveryAddress: {
        street: '789 Adyar',
  city: 'Perundurai',
        pincode: '600020'
      },
      deliveryPartner: {
        id: 'dp3',
        name: 'Mohammed Ali',
        phone: '+91 65432 10987'
      }
    }
  ];

  // Get existing orders and add new ones
  const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
  const updatedOrders = [...existingOrders, ...testOrders];
  
  localStorage.setItem('orders', JSON.stringify(updatedOrders));
  
  console.log('✅ Test orders added to localStorage!');
  console.log(`Total orders now: ${updatedOrders.length}`);
  
  return updatedOrders;
};

export const addTestUsers = () => {
  const testUsers = [
    {
      id: 'user1',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43210',
      role: 'customer',
      status: 'active',
      joinDate: '2024-01-15',
      totalOrders: 12,
      totalSpent: 4500
    },
    {
      id: 'user2',
      name: 'Anita Patel',
      email: 'anita.patel@email.com',
      phone: '+91 87654 32109',
      role: 'customer',
      status: 'active',
      joinDate: '2024-02-20',
      totalOrders: 8,
      totalSpent: 2800
    },
    {
      id: 'user3',
      name: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      phone: '+91 76543 21098',
      role: 'customer',
      status: 'suspended',
      joinDate: '2024-03-10',
      totalOrders: 3,
      totalSpent: 950
    }
  ];

  localStorage.setItem('users', JSON.stringify(testUsers));
  console.log('✅ Test users added to localStorage!');
  
  return testUsers;
};

// Function to simulate real-time order updates
export const simulateOrderUpdate = () => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  
  if (orders.length > 0) {
    // Find a random order that's not delivered or cancelled
    const activeOrders = orders.filter(order => 
      !['delivered', 'cancelled'].includes(order.status)
    );
    
    if (activeOrders.length > 0) {
      const randomOrder = activeOrders[Math.floor(Math.random() * activeOrders.length)];
      const statusProgression = ['confirmed', 'preparing', 'ready', 'picked_up', 'delivered'];
      const currentIndex = statusProgression.indexOf(randomOrder.status);
      
      if (currentIndex < statusProgression.length - 1) {
        randomOrder.status = statusProgression[currentIndex + 1];
        
        // Update the orders array
        const updatedOrders = orders.map(order => 
          order.id === randomOrder.id ? randomOrder : order
        );
        
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        console.log(`📦 Order ${randomOrder.id} status updated to: ${randomOrder.status}`);
        
        return randomOrder;
      }
    }
  }
  
  return null;
};

// Auto-update orders every 30 seconds (for demo purposes)
export const startOrderSimulation = () => {
  const interval = setInterval(() => {
    simulateOrderUpdate();
  }, 30000); // 30 seconds
  
  console.log('🔄 Order simulation started - orders will update every 30 seconds');
  
  return interval;
};
