# 🛒 Full Stack E-Commerce Platform

A modern, full-featured **MERN-style e-commerce web application** with advanced cart system, wishlist, authentication, payments, admin dashboard, and analytics.

---

## 🚀 Live Demo

> (Add your links here after deployment)

* Frontend: [https://doodle-delight-india-s-best-statine.vercel.app](https://doodle-delight-india-s-best-statine.vercel.app)
* Backend: [https://doodle-delight-india-sbeststatinerystore.onrender.com](https://doodle-delight-india-sbeststatinerystore.onrender.com)
* Admin Panel: /admin route
{For admin login details - contact me on asthapitambarwale@gmail.com}

---

# ✨ Features

## 🛍️ 1. Core E-Commerce Features

### 🛒 Advanced Cart System

* Add / remove items
* Increment / decrement quantity
* Persistent cart across devices
* Guest cart → merge after login
* MongoDB synced cart
* Real-time cart updates

---

### ❤️ Wishlist System

* Add / remove items
* Prevent duplicate entries
* Move item from wishlist → cart
* Persistent wishlist sync across devices

---

### 📦 Product System

* Product variants (size, color, pack type)
* Image gallery per product
* Stock tracking system
* Low stock alerts
* Out-of-stock blocking

---

### 🔎 Search & Filtering

* Search by product name & category
* Advanced filters:

  * Price range
  * Brand
  * Rating
  * Availability
* Sorting:

  * Price: Low → High
  * Price: High → Low
  * Newest first
  * Popularity

---

## 👤 2. User Experience

### 🔐 Authentication System

* JWT authentication
* Role-based access (Admin / User)
* Login / Signup system
* Google OAuth (optional extension)
* Password reset (email-based)

---

### 👤 User Profile System

* Edit profile
* Multiple shipping addresses
* Order history tracking
* Saved wishlist preferences

---

### 📱 UI/UX Improvements

* Mobile-first responsive design
* Loading skeletons
* Toast notifications
* Smooth cart animations
* Fast navigation

---

## 💳 3. Payment & Order System

### 💰 Payments

* Razorpay / Stripe integration
* Cash on Delivery (COD)
* Payment status tracking:

  * Pending
  * Paid
  * Failed

---

### 📦 Orders

* Order lifecycle:

  * Placed
  * Paid
  * Shipped
  * Delivered
  * Cancelled
  * Refunded
* Order history page
* Order tracking system
* Cancel / return / refund support
* Invoice generation (PDF download)

---

## 📊 4. Admin Panel (Enterprise Level)

### 📦 Product Management

* Add / edit / delete products
* Bulk upload (CSV/Excel support)
* Category management
* Inventory control

---

### 📦 Order Management

* View all orders
* Update order status
* Filter by status & date
* Order analytics

---

### 👥 User Management

* View all users
* Search / filter / sort users
* Block / unblock users

---

### 📊 Dashboard Analytics

* Daily / weekly revenue charts
* Recent orders overview
* Top customers
* Low stock alerts
* Sales performance insights

---

# 🧱 Tech Stack

## Frontend

* React.js (Vite)
* TypeScript
* Tailwind CSS
* React Router DOM
* Context API / State management
* Firebase (Goodle Authentication Login)
* NodeMailer Crypto(password reset)

## Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* REST APIs

## Integrations

* Razorpay / Stripe
* Cloudinary (images)
* Nodemailer (emails)
* PDF Invoice generation

---

# 📁 Project Structure

```bash
frontend/
  ├── src/
  ├── components/
  ├── pages/
  ├── routes/
  ├── App.tsx

backend/
  ├── controllers/
  ├── models/
  ├── routes/
  ├── middleware/
  ├── server.js
```

---

# 🔐 Environment Variables

## Frontend (.env)

```env
VITE_BASE_URL=https://your-backend-url.com/api
EMAIL_USER=your_email@gmail.com
VITE_FIREBASE_API_KEY=api_key_firebase
VITE_FIREBASE_AUTH_DOMAIN=app_domain_firebase
VITE_FIREBASE_PROJECT_ID=project_id_firebase
VITE_FIREBASE_APP_ID=app_ID_firebase
```

## Backend (.env)

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000
RAZORPAY_KEY_ID=rzp_test_your-key
RAZORPAY_KEY_SECRET=Your_secret_key
EMAIL_PASS=you_app_password
FRONTEND_URL=http://localhost:5173  //for localhost
FRONTEND_URL=http://you-vercel.com  //after deploy your frontend link
```

Add cors in server.js your frontend link.
---

# 🚀 How to run on localhost

## Frontend (Vercel / Netlify)

```bash
npm install
npm run build
```

Output:

```
 Local:   http://localhost:5173/
```

## Backend (Render)

```bash
npm install
node server.js
```

---

# ⚡ API Features

* Auth APIs (login/signup/logout)
* Product APIs (CRUD + filters)
* Cart APIs (sync + persistent)
* Wishlist APIs
* Order APIs
* Admin APIs

---

# 📦 Key Highlights

* 🔥 Fully dynamic e-commerce system
* 🔐 Secure authentication (JWT)
* 🛒 Advanced cart + wishlist logic
* 💳 Payment gateway ready
* 📊 Admin analytics dashboard
* 📱 Mobile-first UI
* ⚡ Fast & scalable architecture

---

# 🧠 Future Improvements

* AI product recommendations
* Chat support system
* PWA support (installable app)
* Multi-vendor marketplace
* Inventory automation system

---

# 👨‍💻 Author

**Your Name**

* GitHub: [https://github.com/AsthaPitambarwale](https://github.com/AsthaPitambarwale)
* LinkedIn: [https://linkedin.com/in/astha-pitambarwale-a32028316](https://linkedin.com/in/astha-pitambarwale-a32028316)

---

# 📄 License

This project is licensed under the MIT License.

---