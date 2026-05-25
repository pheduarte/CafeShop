# Cafe Shop

Cafe Shop is a React and TypeScript web application for browsing cafe beverages, managing a cart, signing in, and placing pickup orders. The app is built with Vite and uses Firebase for backend services such as authentication, Firestore beverage data, and order storage.

## Features

- Browse hot, cold, and specialty beverages
- View beverage details before adding items to the cart
- Persist cart items with local storage
- Open cart and checkout flows in mobile-friendly card overlays
- Sign up and sign in users with Firebase Authentication
- Store user, beverage, and order data with Firestore
- Display order confirmation after checkout
- Admin panel entry point for catalog and stock management

## Tech Stack

- React
- TypeScript
- Vite
- Sass
- Firebase Authentication
- Cloud Firestore
- Tabler Icons

## Project Structure

```text
src/
  Admin/          Admin panel components and helpers
  api/            Data access helpers for beverages and local seed data
  components/     Main UI components such as cart, checkout, drawer, and beverage list
  config/         Firebase configuration
  context/        React context providers
  firestore/      Firestore helper functions
  hooks/          Custom React hooks
  types/          Shared TypeScript types
  ui/             Reusable UI components and shared styles
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

## Author

Phelippe Duarte Ambrosio
