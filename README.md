# ShopWave

A full-featured e-commerce storefront built as a learning/portfolio project — customer-facing storefront and a complete admin dashboard, built with a modern React + TypeScript stack following production-style architecture and best practices.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2-764ABC?logo=redux&logoColor=white)

---

## Overview

ShopWave is a two-sided application:

- **Storefront** — browse products, search/filter, cart, wishlist, checkout, order history/tracking, product reviews, contact form, and user authentication.
- **Admin Dashboard** — analytics, product/category/order/user management, review moderation, contact message inbox, and store settings — protected by role-based access control.

The project currently runs against local mock data (JSON + Redux state) in place of a real backend, structured so that swapping in a real API (Express + MongoDB) later requires changing only the data layer, not the UI.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 (CSS-first config, OKLCH tokens) |
| UI Components | shadcn/ui (Base UI flavor) |
| State Management | Redux Toolkit + RTK Query |
| Forms | React Hook Form + Zod |
| Routing | React Router v7 |
| Charts | Recharts |
| Icons | Lucide React, Simple Icons (brand logos) |
| Notifications | react-hot-toast |

---

## Features

### Storefront
- Home page (hero, categories, featured products, value props, newsletter)
- Product listing with loading/error/empty states, and product detail pages
- Cart (add/remove/update quantity, persisted via Redux)
- Wishlist
- Checkout with validated shipping form
- Authentication (login/signup) with role support (`user` / `admin`)
- Profile area: personal details, change password, order history, order tracking, theme preference
- Product reviews (star ratings, moderated before appearing publicly)
- Contact page with validated form, FAQ accordion, embedded map
- About page
- Full light/dark/system theme support with persistence

### Admin Dashboard
- Role-protected (`requiredRole="admin"`) with its own layout and sidebar
- **Dashboard** — revenue chart, stat cards with trend indicators, low-stock/pending-order alerts, top-selling products
- **Products** — full CRUD, low-stock warnings, active/hidden toggle, search
- **Orders** — status pipeline, order detail with itemized breakdown and status history, search/filter
- **Users** — role promotion/demotion, account suspension, search
- **Categories** — CRUD with slug auto-generation, delete protection when products are assigned
- **Analytics** — revenue trends (7d/30d), category breakdown, customer split, all backed by charts
- **Reviews** — moderation queue (approve/reject), store replies
- **Messages** — contact form inbox with read/unread state and reply
- **Settings** — store info, shipping/tax, notification preferences (tabbed)

---

## Project Structure

```
src/
├── assets/              # Static assets
├── components/
│   └── ui/              # shadcn/ui components + custom design-system components
├── features/            # Feature-based modules (one folder per domain)
│   ├── about/
│   ├── admin/           # Admin dashboard pages, types, mock data
│   ├── auth/            # Login/Signup, authSlice, schemas
│   ├── cart/
│   ├── checkout/
│   ├── contact/
│   ├── design-system/   # Internal component QA page
│   ├── home/
│   ├── products/        # Product listing/detail, RTK Query API
│   ├── profile/
│   ├── reviews/         # Shared review types/slice (storefront + admin)
│   └── wishlist/
├── hooks/               # Shared custom hooks (typed Redux hooks, etc.)
├── layouts/             # MainLayout, AuthLayout, AdminLayout, Header, Footer
├── routes/              # Router config, ProtectedRoute
├── store/               # Redux store configuration
├── styles/              # Global CSS, design tokens
├── utils/               # Shared helper functions
├── App.tsx
└── main.tsx
```

**Convention:** code used by only one feature lives inside that feature's folder. Code shared across multiple features lives in the top-level `components`, `hooks`, or `utils` folders.

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/dammar2171/shopwave
cd shopwave
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173`.

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Environment Variables

Currently the app runs entirely on local mock data and does not require environment variables. Once a backend is connected, create a `.env` file based on `.env.example`:

```
VITE_API_URL=http://localhost:5000/api
```

---

## State Management Notes

- **RTK Query** (`productsApi`) handles product data — currently backed by a local JSON file via `fakeBaseQuery`, structured to swap to `fetchBaseQuery` with zero component changes once a real API exists.
- **Redux Toolkit slices** handle client-side state: `auth`, `cart`, `wishlist`, `reviews`.
- Typed hooks (`useAppDispatch`, `useAppSelector`) are used throughout instead of the plain `react-redux` hooks, for full TypeScript inference on the store.

---

## Authentication & Roles

Two roles are supported: `user` and `admin`. Every account registers as `user` by default — role elevation is never user-selectable during signup (a security-conscious default, even in this mock-data stage). `ProtectedRoute` supports an optional `requiredRole` prop to gate admin-only routes.

> **Note:** frontend role checks here are for UX/navigation purposes only. In a production deployment, all authorization must also be enforced server-side.

---

## Roadmap

- [ ] Express + PostgreSQL backend
- [ ] Real authentication (JWT) replacing mock credentials
- [ ] Real transactional email for contact form replies and order notifications
- [ ] Payment gateway integration (Stripe test mode)
- [ ] Product image upload (Cloudinary or similar)
- [ ] Deployment (Vercel + Render/Railway)

---

## License

This project is for educational/portfolio purposes.