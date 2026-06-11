# ShopEZ Stock Trading Platform

## Project Architecture Plan

ShopEZ is planned as a full-stack MERN application for exploring stocks, viewing market trends, simulating trades, and managing investment portfolios. The system supports secure user authentication, role-based admin access, real-time market-style updates, portfolio tracking, and transaction monitoring.

## Technical Architecture

```text
Client Layer
  - React.js frontend
  - React Router for navigation
  - Axios for API requests
  - Chart.js-ready dashboard sections
  - Responsive CSS layout

        |
        v

API Layer
  - Node.js and Express.js
  - REST API routing
  - JWT authentication
  - Role-based authorization
  - Centralized error handling

        |
        v

Business Logic Layer
  - Authentication service
  - Stock browsing service
  - Trade execution service
  - Portfolio calculation service
  - Admin moderation service

        |
        v

Data Layer
  - MongoDB
  - Mongoose schemas
  - Users, stocks, transactions, portfolios
  - Indexed stock symbols for faster search

        |
        v

External Services
  - Stock market API integration placeholder
  - Environment-based API keys
  - API polling support for price refresh
```

## ER Diagram

```text
User
  _id
  name
  email
  password
  role: USER | ADMIN
  createdAt
      |
      | 1
      |------< Transaction
      |           _id
      |           user
      |           stock
      |           type: BUY | SELL
      |           quantity
      |           price
      |           total
      |           status
      |
      | 1
      |------< Portfolio
                  _id
                  user
                  cashBalance
                  holdings[]

Stock
  _id
  symbol
  name
  price
  change
  changePercent
  volume
  active
      |
      | 1
      |------< Transaction
      |
      | 1
      |------< Portfolio.holdings

PortfolioHolding
  stock
  quantity
  averageBuyPrice
```

## Features

- JWT-based registration and login
- Password hashing using bcrypt.js
- User and admin roles
- Stock browsing and search
- Market dashboard with featured stock data
- Buy and sell stock simulation
- Portfolio holdings and cash balance tracking
- Transaction history
- Admin endpoints for managing stock listings
- MongoDB models with Mongoose
- React frontend pages for dashboard, portfolio, trading, and admin

## Roles And Responsibilities

```text
Investor
  - Register and login
  - Browse market stocks
  - Buy and sell stocks using virtual balance
  - Track holdings and transaction history
  - Review portfolio performance

Admin
  - Manage stock records
  - Monitor platform activity
  - View user and transaction data
  - Keep market listings accurate

System
  - Authenticate requests
  - Protect role-based routes
  - Validate trading actions
  - Update portfolio after trades
  - Store transaction history
```

## User Flow

```text
Investor Flow

Open App
  -> Register or Login
  -> View Market Dashboard
  -> Browse Stocks
  -> Select Stock
  -> Buy or Sell
  -> Confirm Trade
  -> Portfolio Updates
  -> View Transaction History

Admin Flow

Open App
  -> Login as Admin
  -> Open Admin Dashboard
  -> Add or Update Stocks
  -> Monitor Transactions
  -> Manage Platform Data
```

## MVC Pattern

```text
Model
  - User
  - Stock
  - Transaction
  - Portfolio

View
  - React Home page
  - Market Dashboard
  - Portfolio page
  - Admin page
  - Reusable UI components

Controller
  - Auth controller
  - Stock controller
  - Trade controller
  - Portfolio controller
  - Admin controller

Service
  - Market data service
  - Portfolio service
  - Trade calculation logic
```

## Project Setup And Configuration

### Creating Project Folder

```text
SHOPEEEZZ/
  client/
  server/
  README.md
  package.json
  .gitignore
```

- Create the main project folder named `SHOPEEEZZ`.
- Initialize Git for version control.
- Connect the local repository to GitHub.
- Create separate folders for frontend and backend development.

### Client Setup Installing React App

- Create the React frontend inside the `client` folder.
- Use Vite with React for fast development and build performance.
- Install frontend dependencies:
  - `react`
  - `react-dom`
  - `react-router-dom`
  - `axios`
  - `bootstrap`
  - `chart.js`
  - `react-chartjs-2`

Client command:

```bash
npm install --prefix client
```

### Server Setup NPM Init

- Create the Express backend inside the `server` folder.
- Initialize backend package configuration.
- Install backend dependencies:
  - `express`
  - `mongoose`
  - `jsonwebtoken`
  - `bcryptjs`
  - `cors`
  - `dotenv`
  - `axios`

Server command:

```bash
npm install --prefix server
```

## Backend Development

### Backend Structure

```text
server/
  src/
    config/
      db.js
    controllers/
      adminController.js
      authController.js
      portfolioController.js
      stockController.js
      tradeController.js
    middleware/
      authMiddleware.js
      errorMiddleware.js
    models/
      Portfolio.js
      Stock.js
      Transaction.js
      User.js
    routes/
      adminRoutes.js
      authRoutes.js
      portfolioRoutes.js
      stockRoutes.js
      tradeRoutes.js
    services/
      marketService.js
      tokenService.js
    app.js
    seed.js
    server.js
```

### Development And Explanation

- `server.js` starts the backend server.
- `app.js` configures Express middleware and API routes.
- `db.js` creates the MongoDB connection using Mongoose.
- Controllers handle request and response logic.
- Models define database schemas.
- Routes map API URLs to controller functions.
- Middleware protects private routes and handles errors.
- Services keep reusable business logic separate from controllers.

Main backend modules:

- Authentication module for registration, login, and current user details.
- Stock module for browsing, searching, refreshing, creating, updating, and disabling stocks.
- Trade module for buy and sell simulation.
- Portfolio module for cash balance, holdings, and total value.
- Admin module for protected platform overview and user management.

## Database Development

### Configure MongoDB

- MongoDB stores users, stock listings, trade history, and portfolios.
- The database URL is configured in `server/.env` using `MONGO_URI`.
- Mongoose is used to connect Express with MongoDB.
- Stock symbols are indexed for faster search.

Example environment value:

```bash
MONGO_URI=mongodb://127.0.0.1:27017/shopeeezz
```

### Create Database Connection

Database connection file:

```text
server/src/config/db.js
```

Connection flow:

```text
Load environment variables
  -> Read MONGO_URI
  -> Connect using mongoose.connect
  -> Start Express server after successful connection
```

### Create Schema And Models

The project uses these MongoDB collections:

- `Users`: stores name, email, encrypted password, and role.
- `Stocks`: stores symbol, name, current price, market change, volume, and history.
- `Transactions`: stores buy/sell trade records.
- `Portfolios`: stores user cash balance and stock holdings.

Schema relationships:

```text
User 1 -> many Transactions
User 1 -> one Portfolio
Stock 1 -> many Transactions
Portfolio 1 -> many Holdings
Holding many -> one Stock
```

## Frontend Development

### Frontend Structure

```text
client/
  src/
    components/
      Navbar.jsx
      StockCard.jsx
    pages/
      Admin.jsx
      Home.jsx
      Market.jsx
      Portfolio.jsx
    api.js
    App.jsx
    demoData.js
    main.jsx
    styles.css
  index.html
  package.json
```

### Development And Execution

- `main.jsx` renders the React application.
- `App.jsx` defines frontend routes.
- `api.js` configures Axios for backend API requests.
- `Navbar.jsx` provides navigation between main pages.
- `Home.jsx` introduces the platform.
- `Market.jsx` displays stocks and trade actions.
- `Portfolio.jsx` displays balance, holdings, and transactions.
- `Admin.jsx` displays protected admin overview data.
- `styles.css` contains responsive layout and UI styling.

Frontend execution command:

```bash
npm run dev --prefix client
```

## Project Structure

```text
SHOPEEEZZ/
  client/          React frontend
  server/          Express and MongoDB backend
  README.md        Architecture and project plan
  package.json     Root scripts
```

## Run Locally

Install all dependencies:

```bash
npm run setup
```

Create `server/.env` from `server/.env.example`, then seed sample stocks if needed:

```bash
npm run seed
```

```bash
npm run dev
```


