# Walton Plaza - Senior Frontend Developer Task

A high-performance, premium e-commerce Product Listing (PLP) and Product Detail Page (PDP) built with the latest modern web technologies. This project demonstrates advanced React patterns, high-end UI design, and production-ready architecture.

## 🔗 Live Demo

**[Launch Walton Plaza Demo](https://walton-plaza.vercel.app/)**

---

## 🚀 Key Features

### 1. Modern UI/UX (Fantastical Design)

- **Premium Aesthetics**: Vibrant color palettes, curated typography, and consistent spacing.
- **Micro-Interactions**: Smooth hover effects, shine animations on buttons, and active state transitions.
- **Responsive Layout**: Fully optimized for Mobile, Tablet, and Desktop.

### 2. React 19 Innovations

- **Optimistic Updates**: Uses `useOptimistic` to show "Adding to Cart" status instantly without waiting for background logic.
- **Non-blocking Operations**: Implements `useTransition` for smooth state updates, ensuring the UI remains interactive during heavy actions.

### 3. Advanced PDP (Product Details)

- **Modular Component Architecture**: Divided into reusable modules (`ProductGallery`, `ProductPricing`, `ProductActions`, `TrustBadges`).
- **Interactive Gallery**: Features a sophisticated magnifying glass effect for deep-diving into product images.
- **Smart Pricing Box**: Automatically calculates savings, discounts, and handles "Out of Stock" logic gracefully.

### 4. Robust State Management

- **Zustand Store**: Lightweight and fast state management for the Cart and Wishlist.
- **Persistence**: Cart items are persisted locally, ensuring a seamless shopping experience even after page refreshes.

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Library**: React 19
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Icons**: Lucide React
- **Data Fetching**: Server Actions with GraphQL queries

---

## 🏗 Architecture Decisions

- **Server-Side Rendering (SSR)**: All product data is fetched on the server for maximum SEO performance and faster initial load.
- **Component Modularity**: Logic and UI are separated. Small, single-responsibility components make the codebase easy to maintain and scale.
- **Design System**: A unified design system using branded blue (`#233f6c`) and consistent border-radii (`rounded-lg`).

---

## ⚙️ Setup & Installation

### 1. Requirements

Ensure you have **Node.js 18+** installed on your machine.

### 2. Environment Configuration

Create a `.env` file in the root directory and add the following:

```env
API=https://devapi.waltonplaza.com.bd/graphql
```

### 3. Installation

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```text
/actions    - Server-side data fetching logic
/components - Modular UI components (product-specific, layout, etc.)
/store       - Zustand state management (Cart & Wishlist)
/types       - Strict TypeScript interfaces
/app         - Next.js App Router (Pages & Routes)
```

---

**Developed with ❤️ and React 19.**
