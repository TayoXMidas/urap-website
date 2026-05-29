# Tropical Minecraft Server - Complete Backend Setup Guide

## 🚀 Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/tropical-server
JWT_SECRET=your_super_secret_key
STRIPE_PUBLIC_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
PAYPAL_CLIENT_ID=xxx
DISCORD_BOT_TOKEN=xxx
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 3. Start the Server
```bash
# Development
npm run dev

# Production
npm start
```

## 📚 API Documentation

### Authentication Endpoints

**Register User**
```
POST /api/auth/register
Body: { username, email, password, passwordConfirm }
```

**Login User**
```
POST /api/auth/login
Body: { email, password }
Response: { token, user }
```

**Get Current User**
```
GET /api/auth/me
Headers: Authorization: Bearer <token>
```

**Update Profile**
```
PUT /api/auth/profile
Headers: Authorization: Bearer <token>
Body: { minecraftUsername, discordUsername, avatar }
```

### Product Endpoints

**Get All Products**
```
GET /api/products?category=spawners&sort=price-low&page=1&limit=10
```

**Get Single Product**
```
GET /api/products/:id
```

**Get Featured Products**
```
GET /api/products/featured
```

**Get Best Sellers**
```
GET /api/products/best-sellers
```

**Create Product (Admin Only)**
```
POST /api/products
Headers: Authorization: Bearer <token>
Body: { name, price, category, image, features, ... }
```

**Update Product (Admin Only)**
```
PUT /api/products/:id
Headers: Authorization: Bearer <token>
Body: { ...updateFields }
```

**Delete Product (Admin Only)**
```
DELETE /api/products/:id
Headers: Authorization: Bearer <token>
```

### Order Endpoints

**Create Order**
```
POST /api/orders
Headers: Authorization: Bearer <token>
Body: { products: [{productId, quantity}], paymentMethod, discordUsername, minecraftUsername }
```

**Get My Orders**
```
GET /api/orders/my-orders
Headers: Authorization: Bearer <token>
```

**Get Single Order**
```
GET /api/orders/:id
Headers: Authorization: Bearer <token>
```

**Get All Orders (Admin Only)**
```
GET /api/orders
Headers: Authorization: Bearer <token>
```

**Update Order Status (Admin Only)**
```
PUT /api/orders/:id/status
Headers: Authorization: Bearer <token>
Body: { paymentStatus, deliveryStatus }
```

### Payment Endpoints

**Process Stripe Payment**
```
POST /api/payments/stripe
Headers: Authorization: Bearer <token>
Body: { orderId, token }
```

**Process PayPal Payment**
```
POST /api/payments/paypal
Headers: Authorization: Bearer <token>
Body: { orderId, paymentId }
```

**Process Shop Credits Payment**
```
POST /api/payments/credits
Headers: Authorization: Bearer <token>
Body: { orderId }
```

**Add Shop Credits (Admin Only)**
```
POST /api/payments/credits/add
Headers: Authorization: Bearer <token>
Body: { userId, amount }
```

### Donation Endpoints

**Create Donation**
```
POST /api/donations
Headers: Authorization: Bearer <token>
Body: { amount, message, isPublic, paymentMethod }
```

**Get Top Donors**
```
GET /api/donations/top-donors?limit=5
```

**Get My Donations**
```
GET /api/donations/my-donations
Headers: Authorization: Bearer <token>
```

**Get All Donations (Admin Only)**
```
GET /api/donations
Headers: Authorization: Bearer <token>
```

**Get Donation Stats (Admin Only)**
```
GET /api/donations/stats
Headers: Authorization: Bearer <token>
```

## 🗄️ Database Models

### User Model
- username (unique, required)
- email (unique, required)
- password (hashed)
- discordUsername
- minecraftUsername
- shopCredits
- totalSpent
- donationAmount
- donationRank
- role (user, admin, moderator)

### Product Model
- name
- description
- price
- currency
- category
- image
- stock
- features
- deliveryTime
- paymentMethods
- discountPercentage
- views
- purchases

### Order Model
- orderNumber (auto-generated)
- user (reference)
- products (array)
- totalAmount
- paymentMethod
- paymentStatus
- deliveryStatus
- discordUsername
- minecraftUsername

### Donation Model
- user (reference)
- amount
- status
- message
- isPublic
- donationRank

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT authentication
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Request validation
- ✅ Admin role-based access control
- ✅ Order ownership verification

## 📧 Email Notifications

The system sends automatic emails for:
- Order confirmations
- Payment confirmations
- Delivery notifications
- Donation thank you
- Welcome emails

## 🛠️ Technologies Used

- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- JWT - Authentication
- Stripe - Payment processing
- Nodemailer - Email service
- Axios - HTTP client
- Helmet - Security middleware
- CORS - Cross-origin support

## 📝 Notes

- All prices are in EUR (€)
- Shop credits are calculated as ceil(amount)
- Donation ranks update automatically
- Products auto-increment purchases count
- Orders generate unique order numbers

## 🐛 Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check MONGODB_URI in .env

**Payment Processing Error**
- Verify Stripe keys are correct
- Check payment token validity

**Email Not Sending**
- Verify SMTP credentials
- Check SMTP host/port settings
- Enable "Less secure app access" for Gmail

## 📞 Support

For issues or questions, contact support through Discord or email.

---

**Version:** 1.0.0  
**Last Updated:** 2025-05-29
