# Vite + Node.js + MongoDB Atlas Full Stack App

This is a full stack JavaScript application using:

- **Frontend:** [Vite](https://vitejs.dev/)
- **Backend:** [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

Go to MongoDB Atlas

Create a cluster (free tier is fine)

Create a database and collection

Whitelist your IP address

Create a database user and password

---

Get your connection URI (e.g. mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority)

- **Backend Setup Below**

cd server
npm install
npm start

---

- Create a .env file seperately for both Client(Front end) and Server(Node) --

- **.env file of backend**

PORT = your_port_number
EMAIL_ADDRESS = your_email_id
PASSWORD= **Generate gmail app password from gmail app and security tab.**

# MONGODB_URI = your_mongodb_atlas_uri

CLIENT_LOCALHOST = http://localhost:5173
JSON_SECRET_KEY= **Generate a random string using numbers, alphabets and special characters.(Whichever combination you want.)**

---

- **Frontend Setup Below**

- **.env file of backend** --> VITE_URL = your_backend_url

cd client
npm install
npm run dev

---
