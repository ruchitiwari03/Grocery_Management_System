# 🍏 Grocery Management System

A highly polished, responsive, and secure full-stack database-backed application designed for eco-friendly modern food retailers. This application serves as a comprehensive administrative interface for managing **products, inventory thresholds, customers, point-of-sale orders, and live reports**.

---

## 🎨 Visual Identity & Aesthetic Choices

The application's interface features a meticulously crafted **Organic Meadow** theme emphasizing visual composure and professional utility:
* **Color Palette**: Off-white canvases, deep forest greens (`#15803d`), and modern charcoal typography paired with crisp container borders.
* **Typography**: Clean display sans-serif fonts for headings paired with proportional numeric monospaced formatting where financial data, quantities, and dates are rendered.
* **Transitions**: Powered by fluid CSS transforms and **Motion (framer-motion)** for fine-grained page entries, hover-state highlights, and real-time indicators.

---

## 🛠️ Technology Stack

The system is constructed with a reliable, ultra-fast full-stack architecture running entirely in TypeScript.

### **Frontend (Client-Side)**
* **React 19**: Responsive component architecture emphasizing modular design.
* **Vite 6**: Native bundle pipelining resulting in sub-millisecond build speeds.
* **Tailwind CSS v4**: Post-processor styling configuration with customized themed components.
* **Motion**: Physical-physics visual animations and clean spring effects.
* **Lucide React**: Modern, scalable icon framework styled directly via custom SVG attributes.

### **Backend (Server-Side)**
* **Express.js (Node.js)**: RESTful API server proxying requests, validating schemas, and handling standard errors.
* **File-Based JSON Database**: Safe read-modify-write persistence matching operational data schemas to prevent data loss.
* **Esbuild & TSX**: Dev-time execution via `tsx` and high-speed production bundling into a single lightweight bundle (`dist/server.cjs`).

---

## 📂 Project Architecture

```markdown
├── backend/                  # Additional server logic/scripts (if any)
├── src/                      # Client-Side Codebase
│   ├── components/           # Extracted UI Views and Cards
│   │   ├── CustomerManagement.tsx  # Customer CRM and visual metrics
│   │   ├── Dashboard.tsx           # Real-time indicators, stats cards, and logs
│   │   ├── InventoryManagement.tsx # Automated stock thresholds & inventory flags
│   │   ├── Login.tsx               # Access controls
│   │   ├── OrderManagement.tsx     # Interactive cart, POS, and Invoice tracker
│   │   ├── ProductManagement.tsx   # Fresh produce, bakery, and meat CRUD panels
│   │   ├── Reports.tsx             # Interactive breakdown and dynamic charts
│   │   ├── Sidebar.tsx             # Responsive layout switcher
│   │   └── TopNavbar.tsx           # Top status indicators and user profiles
│   ├── App.tsx               # Main routing & layout controller
│   ├── index.css             # Unified global CSS with `@import "tailwindcss"`
│   ├── main.tsx              # React mounting root
│   └── types.ts              # Statically typed TypeScript schemas (Product, Order, etc.)
├── server.ts                 # Full-stack API & Asset Server
├── package.json              # Dependency tree, runtime targets, build commands
├── tsconfig.json             # Compiler configurations
└── vite.config.ts            # Vite asset pipeline configuration
```

---

## 🚀 Getting Started

### **Prerequisites**
* [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
* NPM (pre-packaged with Node.js)

### **1. Installation**
Clone or download the repository, navigate to the target directory, and run the dependency solver:
```bash
npm install
```

### **2. Development Mode**
Boots up the unified interactive server. This launches the TypeScript Express server, which acts as a proxy for the Vite hot-reloading compiler on port `3000`:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### **3. Production Compilation & Start**
To generate a production-ready, fully compiled, self-contained single-node application:

```bash
# Deletes old build directories
npm run clean

# Compiles assets and bundles the backend server using esbuild
npm run build

# Launches the production server
npm run start
```

---

## 📊 Key Operational Features

1. **Dashboard & Indicators**: Visualizes key metrics such as *Total Revenue, Ongoing Orders, Low-Stock items,* and *Active Subscribers* alongside persistent live activity trail updates.
2. **Interactive Point of Sale (POS)**: Select products, search dynamically by name or category, build a nested checkout cart, update quantities with dynamic state recalculations, and complete order placement to trigger real-time stock deduction.
3. **Threshold-based Inventory Engine**: Sets custom low stock alerts. Identifies expiring food or dairy batches automatically to assist in waste reduction.
4. **Reliable Client-Server Sync**: Data stays aligned with the backend server filesystem (`db.json`) ensuring robust offline safety.
