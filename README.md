# ecommerce-backend

## Ecommerce Cosmetics App

## Hosting URL - Frontend: https://cosmetics-1e95b.web.app

## Hosting URL - Backend: https://ecommerce-cosmetics-backend.herokuapp.com/

![](images/cosmetics.JPG)

## Development

This app was developed by a team of two members: Olabisi Odusanya and Veronika Maisuradze. The aim is to allow users to shop for cosmetics (register, login, add products to shopping cart, search and filter products, pay with either a credit card or paypal etc.) and admin - to manage products, orders and categories.

## Software

The application utilizes the MERN stack: React on the frontend; and Node.js, Express and Mongoose on the backend. On reaching the URL, the user has the option to either log in (if previously registered) or register, if they're totally new to the app. Once registered, this information will be stored in the database and the user will be taken to the home page. Once there, the user can start shopping, search products by category or product name, filter by price, view producs in detail, add to cart, remove from cart, see related products, see the final price and proceed with payment.

## Connection

The backend is a RESTful API and was built with the Node.js and Express which was connected to the MongoDB, to store the user details, products' information and categories, while the frontend (user interface) was built using the React.js. Both applications were connected and are linked to each other. Backend is hosted on heroku, and frontend - on firebase. The frontend design was made using the react bootstrap, (app.js) uses the hooks implementation of the react functional component as opposed to the 'state' in class component.

## Installation and Setup Instructions

You will need node installed on your machine.
Installation: npm install.

## Local

## Server

To start the server locally: \***\*Installations are without quotes\*\***
-Clone the backend repository from: https://github.com/olabee87-stack/ecommerce-backend
-In the terminal, run 'npm install'
-On competion of npm install, navigate to the src folder and run 'npm run dev'

## Client

To view run locally and view on the browser:
-Create a folder and name it
-Clone the frontend repository from: https://github.com/veronika333/ecommerce-frontend
-Navigate to your folder and run 'npm install'
-Make sure the server is running locally
-To view, 'run npm start'. Will open at https://localhost:3000

## Reflection

This was an 8 week long project built during the last module at Fullstack Web Development programme at Business College Helsinki. Project goals included using technologies learned up until this point and familiarizing ourselves with documentation for new features.
