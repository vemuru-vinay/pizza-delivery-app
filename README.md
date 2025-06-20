#**🍕 Full-Stack Pizza Delivery App (MERN)**

A full-stack MERN (MongoDB, Express, React, Node.js) web application that allows users to explore popular pizzas, customize their own pizza with various ingredients, make payments via Razorpay, and place orders. Admins can securely log in to view all custom pizza orders.

📂 Project Structure

📁 pizza-delivery-app/
├── 📁 client/           # React frontend (user & admin interface)
├── 📁 server/           # Node.js + Express backend
├── .gitignore          # Ignored files/folders for Git
├── README.md           # You're reading it 👋

🚀 Features

👤 User Functionality

Register/Login with JWT authentication

Explore popular pizzas

Customize your own pizza (select base, sauce, cheese, veggies)

Razorpay integrated payments

View success message after placing orders

🔐 Admin Functionality

Admin login using email/password

Access secure route: /admin-orders

View all custom pizza orders placed by users

🧠 Tech Stack

Frontend: React.js, React Router DOM, TailwindCSS / CSS Modules

Backend: Node.js, Express.js

Database: MongoDB + Mongoose

Authentication: JSON Web Token (JWT)

Payments: Razorpay integration



⚙️ Installation & Setup

1. Clone the repo

git clone https://github.com/your-username/pizza-delivery-app.git
cd pizza-delivery-app

2. Setup Backend

cd server
npm install
# Create a .env file and add:
# MONGO_URI=your_mongo_db_url
# JWT_SECRET=your_secret
# RAZORPAY_KEY_ID=your_key
# RAZORPAY_KEY_SECRET=your_secret
npm run dev

3. Setup Frontend

cd ../client
npm install
npm start

Your app should now be running at http://localhost:3000

🧪 Test Credentials (Optional)

🔐 Admin Login

Email: admin@pizza.com
Password: admin123

You can modify these in your MongoDB manually or add a seeder file.

📦 API Overview

🔐 Auth Routes

Method

Endpoint

Description

POST

/api/users/register

Register a user

POST

/api/users/login

Login & receive JWT

🍕 Pizza Routes

Method

Endpoint

Description

GET

/api/pizzas

Fetch popular pizzas

POST

/api/custom-pizza/save

Save custom pizza to DB

GET

/api/custom-pizza/admin-orders

Admin can view all orders

💳 Payments

Razorpay checkout integration

Orders placed only after successful payment

Transaction ID saved along with order details

🔐 Authentication & Authorization

JWT used for both user and admin login

Admin routes protected using middleware: protect and isAdmin

Frontend stores token in localStorage and sends it in Authorization headers

📚 Learnings & Challenges

This section reflects your personal journey:

Understood how JWT works in real-world projects

Integrated third-party payment gateways (Razorpay)

Learned route protection for both users and admin

Faced bugs like token errors, 403/401 issues, and resolved them step-by-step

Practiced debugging via browser dev tools and Thunder Client/Postman

Understood how to structure a MERN app professionally

🛠️ To Do (Future Improvements)

✅ Add user order history

✅ Add toast notifications

🔗 Connect with Me

LinkedIn: www.linkedin.com/in/vemuru-vinay-569655277

GitHub: vemuru-vinay


📌 Final Note

This project is built not just to showcase tech skills but also the ability to debug, structure code professionally, and learn fast.The foundational architecture and logic are clean, scalable, and well-thought out.

Feel free to fork this repo, improve it, and make it your own. Contributions welcome 🍕

⭐ If you like this project, give it a star on GitHub!

git clone https://github.com/vemuru-vinay/pizza-delivery-app.git
cd pizza-delivery-app

Happy Coding ❤️

