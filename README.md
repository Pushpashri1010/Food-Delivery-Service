# 🍽️ FoodieExpress - Food Delivery App

A simple Food Delivery web application built using React.js. This project demonstrates a basic frontend system with restaurant listings, menu browsing, and shopping cart functionality.

It is also integrated with Jenkins for Continuous Integration (CI), where the project is automatically built on every code change pushed to GitHub.

---

## 🚀 Features

### 🎨 User Interface
- Responsive design using Tailwind CSS
- Clean and simple layout
- Mobile-friendly UI

### 🏪 Restaurant System
- Display list of restaurants
- View menu items for each restaurant
- Tamil Nadu based restaurant data

### 🔍 Search & Filter
- Search restaurants or dishes
- Filter based on categories

### 🛒 Shopping Cart
- Add/remove items from cart
- Update item quantity
- View total price

---

## 🛠 Tech Stack

- React.js
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios

---

## 🔄 CI/CD Pipeline (Jenkins)

This project is integrated with **Jenkins** for Continuous Integration.

### CI Workflow:
1. Code is pushed to GitHub
2. Jenkins detects changes from repository
3. Jenkins automatically pulls latest code
4. Jenkins runs build commands:
   ```bash
   npm install
   npm run build
