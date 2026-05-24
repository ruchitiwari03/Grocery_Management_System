import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

// Data structure inside server database
interface DB {
  products: any[];
  orders: any[];
  customers: any[];
  inventory: any[];
  activity_logs: any[];
}

const DB_FILE = path.join(process.cwd(), "db.json");

// Define initial gorgeous seeds representing an organic and premium green grocery store
const SEED_DATA: DB = {
  products: [
    {
      product_id: "PROD-101",
      name: "Organic Honeycrisp Apples",
      category: "Produce",
      price: 4.99,
      quantity: 120,
      unit: "kg",
      supplier: "Green Valley Orchards",
      image_url: "🍎",
      expiry_date: "2026-06-12"
    },
    {
      product_id: "PROD-102",
      name: "Fresh Avocado Giant Hass",
      category: "Produce",
      price: 1.89,
      quantity: 15, // Low stock on purpose
      unit: "pcs",
      supplier: "Verde Farms",
      image_url: "🥑",
      expiry_date: "2026-06-03"
    },
    {
      product_id: "PROD-103",
      name: "Sourdough Artisan Bread",
      category: "Bakery",
      price: 3.50,
      quantity: 45,
      unit: "pcs",
      supplier: "Rise & Bake Co.",
      image_url: "🍞",
      expiry_date: "2026-05-26"
    },
    {
      product_id: "PROD-104",
      name: "Grass-Fed Milk 2%",
      category: "Dairy & Eggs",
      price: 5.25,
      quantity: 80,
      unit: "liters",
      supplier: "Harmony Pastures Dairy",
      image_url: "🥛",
      expiry_date: "2026-05-30"
    },
    {
      product_id: "PROD-105",
      name: "Atlantic Salmon Fillet",
      category: "Meat & Seafood",
      price: 18.99,
      quantity: 25,
      unit: "kg",
      supplier: "Coastal Bounty Seafood",
      image_url: "🐟",
      expiry_date: "2026-05-25"
    },
    {
      product_id: "PROD-106",
      name: "Extra Virgin Olive Oil",
      category: "Pantry",
      price: 12.99,
      quantity: 50,
      unit: "liters",
      supplier: "Apulia Vineyards",
      image_url: "🫒",
      expiry_date: "2027-02-15"
    },
    {
      product_id: "PROD-107",
      name: "Organic Baby Spinach Bunch",
      category: "Produce",
      price: 2.99,
      quantity: 8, // Low Stock on purpose
      unit: "kg",
      supplier: "Pure Earth Greens",
      image_url: "🥬",
      expiry_date: "2026-05-28"
    },
    {
      product_id: "PROD-108",
      name: "Free Range Large Eggs",
      category: "Dairy & Eggs",
      price: 4.50,
      quantity: 110,
      unit: "pcs",
      supplier: "Happy Hens Farm",
      image_url: "🥚",
      expiry_date: "2026-06-15"
    }
  ],
  orders: [
    {
      order_id: "ORD-1001",
      customer_id: "CUST-1001",
      customer_name: "Sarah Jenkins",
      items: [
        { product_id: "PROD-101", name: "Organic Honeycrisp Apples", price: 4.99, quantity: 2 },
        { product_id: "PROD-104", name: "Grass-Fed Milk 2%", price: 5.25, quantity: 1 },
        { product_id: "PROD-103", name: "Sourdough Artisan Bread", price: 3.50, quantity: 1 }
      ],
      total_amount: 18.73,
      payment_status: "Paid",
      delivery_status: "Delivered",
      order_date: "2026-05-20"
    },
    {
      order_id: "ORD-1002",
      customer_id: "CUST-1002",
      customer_name: "David Miller",
      items: [
        { product_id: "PROD-105", name: "Atlantic Salmon Fillet", price: 18.99, quantity: 1 },
        { product_id: "PROD-106", name: "Extra Virgin Olive Oil", price: 12.99, quantity: 1 },
        { product_id: "PROD-102", name: "Fresh Avocado Giant Hass", price: 1.89, quantity: 3 }
      ],
      total_amount: 37.65,
      payment_status: "Paid",
      delivery_status: "Shipped",
      order_date: "2026-05-21"
    },
    {
      order_id: "ORD-1003",
      customer_id: "CUST-1003",
      customer_name: "Emily Rodriguez",
      items: [
        { product_id: "PROD-107", name: "Organic Baby Spinach Bunch", price: 2.99, quantity: 2 },
        { product_id: "PROD-108", name: "Free Range Large Eggs", price: 4.50, quantity: 2 }
      ],
      total_amount: 14.98,
      payment_status: "Pending",
      delivery_status: "Pending",
      order_date: "2026-05-22"
    }
  ],
  customers: [
    {
      customer_id: "CUST-1001",
      name: "Sarah Jenkins",
      email: "sarah.j@gmail.com",
      phone: "+1 (555) 234-5678",
      address: "742 Evergreen Terrace, Springfield",
      purchase_count: 14,
      total_spent: 312.40
    },
    {
      customer_id: "CUST-1002",
      name: "David Miller",
      email: "david.miller@yahoo.com",
      phone: "+1 (555) 876-5432",
      address: "102 Pine Crest Lane, Riverwood",
      purchase_count: 8,
      total_spent: 184.20
    },
    {
      customer_id: "CUST-1003",
      name: "Emily Rodriguez",
      email: "emily.r99@outlook.com",
      phone: "+1 (555) 456-7890",
      address: "589 Oakwood Court, Silver Spring",
      purchase_count: 3,
      total_spent: 45.10
    },
    {
      customer_id: "CUST-1004",
      name: "Marcus Aurelius",
      email: "marcus.meditations@philosophy.org",
      phone: "+1 (555) 111-2222",
      address: "100 Imperial Gardens, Rome",
      purchase_count: 12,
      total_spent: 289.00
    }
  ],
  inventory: [
    {
      inventory_id: "INV-101",
      product_id: "PROD-101",
      product_name: "Organic Honeycrisp Apples",
      stock: 120,
      min_threshold: 30,
      status: "In Stock"
    },
    {
      inventory_id: "INV-102",
      product_id: "PROD-102",
      product_name: "Fresh Avocado Giant Hass",
      stock: 15,
      min_threshold: 20,
      status: "Low Stock"
    },
    {
      inventory_id: "INV-103",
      product_id: "PROD-103",
      product_name: "Sourdough Artisan Bread",
      stock: 45,
      min_threshold: 15,
      status: "In Stock"
    },
    {
      inventory_id: "INV-104",
      product_id: "PROD-104",
      product_name: "Grass-Fed Milk 2%",
      stock: 80,
      min_threshold: 20,
      status: "In Stock"
    },
    {
      inventory_id: "INV-105",
      product_id: "PROD-105",
      product_name: "Atlantic Salmon Fillet",
      stock: 25,
      min_threshold: 10,
      status: "In Stock"
    },
    {
      inventory_id: "INV-106",
      product_id: "PROD-106",
      product_name: "Extra Virgin Olive Oil",
      stock: 50,
      min_threshold: 15,
      status: "In Stock"
    },
    {
      inventory_id: "INV-107",
      product_id: "PROD-107",
      product_name: "Organic Baby Spinach Bunch",
      stock: 8,
      min_threshold: 15,
      status: "Low Stock"
    },
    {
      inventory_id: "INV-108",
      product_id: "PROD-108",
      product_name: "Free Range Large Eggs",
      stock: 110,
      min_threshold: 25,
      status: "In Stock"
    }
  ],
  activity_logs: [
    {
      id: "LOG-1",
      type: "order",
      description: "Order ORD-1003 pending payment initialized for $14.98",
      timestamp: "2026-05-22T19:45:00Z"
    },
    {
      id: "LOG-2",
      type: "inventory",
      description: "Low stock alert: Organic Baby Spinach Bunch quantity is at 8 Bunch",
      timestamp: "2026-05-22T18:15:00Z"
    },
    {
      id: "LOG-3",
      type: "product",
      description: "Product Free Range Large Eggs added to catalog with 110 qty",
      timestamp: "2026-05-22T14:30:00Z"
    }
  ]
};

// Database Access helpers
function readDB(): DB {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(SEED_DATA, null, 2));
      return SEED_DATA;
    }
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Failed to read database file:", err);
    return SEED_DATA;
  }
}

function writeDB(data: DB) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Failed to write database file:", err);
  }
}

// Helper to log actions
function logActivity(type: 'product' | 'order' | 'customer' | 'inventory', description: string) {
  const db = readDB();
  const log = {
    id: `LOG-${Date.now()}`,
    type,
    description,
    timestamp: new Date().toISOString()
  };
  db.activity_logs.unshift(log);
  // Keep last 15 logs
  if (db.activity_logs.length > 25) {
    db.activity_logs = db.activity_logs.slice(0, 25);
  }
  writeDB(db);
}

// Helper to determine status based on stock & threshold
function computeStatus(stock: number, minThreshold: number): 'In Stock' | 'Low Stock' | 'Out of Stock' {
  if (stock <= 0) return 'Out of Stock';
  if (stock <= minThreshold) return 'Low Stock';
  return 'In Stock';
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // PRE-SERVE HEALTH CHECK
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // ========== AUTHENTICATION ==========
  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    // Simple mock check
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password are required" });
    }
    if (email === "admin@grocery.com" && password === "admin123") {
      logActivity("customer", `Admin logged in successfully from session`);
      return res.json({
        success: true,
        token: "mock-sess-jwt-12345",
        user: {
          id: "admin-1",
          email: "admin@grocery.com",
          name: "Manager Admin"
        }
      });
    } else {
      return res.status(401).json({ success: false, error: "Invalid email or password" });
    }
  });

  // ========== PRODUCTS API (CRUD) ==========
  app.get("/api/products", (req, res) => {
    const db = readDB();
    res.json(db.products);
  });

  app.post("/api/products", (req, res) => {
    const db = readDB();
    const product = req.body;

    if (!product.name || !product.category || product.price === undefined || product.quantity === undefined) {
      return res.status(400).json({ error: "Missing required fields (name, category, price, quantity)" });
    }

    const newId = `PROD-${Math.floor(100 + Math.random() * 900)}`;
    const newProduct = {
      product_id: newId,
      name: product.name,
      category: product.category,
      price: Number(product.price),
      quantity: Number(product.quantity),
      unit: product.unit || "kg",
      supplier: product.supplier || "Direct Vendor",
      image_url: product.image_url || "📦",
      expiry_date: product.expiry_date || new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    // Insert to DB
    db.products.push(newProduct);

    // Also auto-add to Inventory
    const mThreshold = product.min_threshold !== undefined ? Number(product.min_threshold) : Math.floor(newProduct.quantity * 0.2) || 10;
    const invItem = {
      inventory_id: `INV-${Math.floor(100 + Math.random() * 900)}`,
      product_id: newId,
      product_name: newProduct.name,
      stock: newProduct.quantity,
      min_threshold: mThreshold,
      status: computeStatus(newProduct.quantity, mThreshold)
    };
    db.inventory.push(invItem);

    writeDB(db);
    logActivity("product", `Created product: ${newProduct.name} (${newId}) with quantity ${newProduct.quantity}`);

    res.status(201).json(newProduct);
  });

  app.put("/api/products/:id", (req, res) => {
    const db = readDB();
    const { id } = req.params;
    const idx = db.products.findIndex(p => p.product_id === id);

    if (idx === -1) {
      return res.status(404).json({ error: "Product not found" });
    }

    const payload = req.body;
    const existing = db.products[idx];

    const updated = {
      ...existing,
      name: payload.name !== undefined ? payload.name : existing.name,
      category: payload.category !== undefined ? payload.category : existing.category,
      price: payload.price !== undefined ? Number(payload.price) : existing.price,
      quantity: payload.quantity !== undefined ? Number(payload.quantity) : existing.quantity,
      unit: payload.unit !== undefined ? payload.unit : existing.unit,
      supplier: payload.supplier !== undefined ? payload.supplier : existing.supplier,
      image_url: payload.image_url !== undefined ? payload.image_url : existing.image_url,
      expiry_date: payload.expiry_date !== undefined ? payload.expiry_date : existing.expiry_date
    };

    db.products[idx] = updated;

    // Synchronize inventory record
    const invIdx = db.inventory.findIndex(i => i.product_id === id);
    if (invIdx !== -1) {
      const inv = db.inventory[invIdx];
      db.inventory[invIdx] = {
        ...inv,
        product_name: updated.name,
        stock: updated.quantity,
        status: computeStatus(updated.quantity, inv.min_threshold)
      };
    }

    writeDB(db);
    logActivity("product", `Updated product details for ${updated.name} (${id})`);
    res.json(updated);
  });

  app.delete("/api/products/:id", (req, res) => {
    const db = readDB();
    const { id } = req.params;
    const idx = db.products.findIndex(p => p.product_id === id);

    if (idx === -1) {
      return res.status(404).json({ error: "Product not found" });
    }

    const pName = db.products[idx].name;
    db.products.splice(idx, 1);

    // Remove from inventory
    db.inventory = db.inventory.filter(i => i.product_id !== id);

    writeDB(db);
    logActivity("product", `Deleted product ${pName} (${id})`);
    res.json({ success: true, message: `Product ${id} deleted successfully` });
  });

  // ========== ORDERS API (CRUD) ==========
  app.get("/api/orders", (req, res) => {
    const db = readDB();
    res.json(db.orders);
  });

  app.post("/api/orders", (req, res) => {
    const db = readDB();
    const orderData = req.body;

    if (!orderData.customer_name || !orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
      return res.status(400).json({ error: "Customer name and ordered items are required" });
    }

    // Match customer_id or find/generate
    let customer_id = orderData.customer_id;
    if (!customer_id) {
      const custMatch = db.customers.find(c => c.name.toLowerCase() === orderData.customer_name.toLowerCase());
      if (custMatch) {
        customer_id = custMatch.customer_id;
      } else {
        // Create a customer
        customer_id = `CUST-${Math.floor(1000 + Math.random() * 9000)}`;
        const emailSafe = orderData.customer_email || `${orderData.customer_name.toLowerCase().replace(/\s+/g, '')}@example.com`;
        db.customers.push({
          customer_id,
          name: orderData.customer_name,
          email: emailSafe,
          phone: orderData.customer_phone || "+1 (555) 000-0000",
          address: orderData.customer_address || "Default Address",
          purchase_count: 0,
          total_spent: 0
        });
      }
    }

    // Generate Order ID
    const order_id = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    let total_amount = 0;

    // Deduct stock in DB Products and DB Inventory
    const orderItemsProcessed = orderData.items.map((item: any) => {
      const dbProd = db.products.find(p => p.product_id === item.product_id);
      const price = dbProd ? dbProd.price : (item.price || 1.0);
      const name = dbProd ? dbProd.name : item.name;
      const buyQty = Number(item.quantity);

      total_amount += price * buyQty;

      if (dbProd) {
        // Decrement product qty (prevent falling below zero)
        dbProd.quantity = Math.max(0, dbProd.quantity - buyQty);

        // Update inventory record
        const invIdx = db.inventory.findIndex(inv => inv.product_id === item.product_id);
        if (invIdx !== -1) {
          const invItem = db.inventory[invIdx];
          invItem.stock = dbProd.quantity;
          invItem.status = computeStatus(invItem.stock, invItem.min_threshold);
          if (invItem.stock <= invItem.min_threshold) {
            logActivity("inventory", `Low stock notice: product ${invItem.product_name} dropped to ${invItem.stock}`);
          }
        }
      }

      return {
        product_id: item.product_id,
        name,
        price,
        quantity: buyQty
      };
    });

    // Formatting total to decimals
    total_amount = Number(total_amount.toFixed(2));

    const newOrder = {
      order_id,
      customer_id,
      customer_name: orderData.customer_name,
      items: orderItemsProcessed,
      total_amount,
      payment_status: orderData.payment_status || "Pending",
      delivery_status: orderData.delivery_status || "Pending",
      order_date: orderData.order_date || new Date().toISOString().split('T')[0]
    };

    db.orders.push(newOrder);

    // Update customer stats
    const custIdx = db.customers.findIndex(c => c.customer_id === customer_id);
    if (custIdx !== -1) {
      db.customers[custIdx].purchase_count += 1;
      db.customers[custIdx].total_spent = Number((db.customers[custIdx].total_spent + total_amount).toFixed(2));
    }

    writeDB(db);
    logActivity("order", `Placed order ${order_id} for customer ${orderData.customer_name} totaling $${total_amount}`);

    res.status(201).json(newOrder);
  });

  app.put("/api/orders/:id", (req, res) => {
    const db = readDB();
    const { id } = req.params;
    const idx = db.orders.findIndex(o => o.order_id === id);

    if (idx === -1) {
      return res.status(404).json({ error: "Order not found" });
    }

    const payload = req.body;
    const existing = db.orders[idx];

    const updated = {
      ...existing,
      payment_status: payload.payment_status !== undefined ? payload.payment_status : existing.payment_status,
      delivery_status: payload.delivery_status !== undefined ? payload.delivery_status : existing.delivery_status,
    };

    db.orders[idx] = updated;
    writeDB(db);
    logActivity("order", `Updated status for order ${id} to Payment: ${updated.payment_status}, Delivery: ${updated.delivery_status}`);
    res.json(updated);
  });

  app.delete("/api/orders/:id", (req, res) => {
    const db = readDB();
    const { id } = req.params;
    const idx = db.orders.findIndex(o => o.order_id === id);

    if (idx === -1) {
      return res.status(404).json({ error: "Order not found" });
    }

    db.orders.splice(idx, 1);
    writeDB(db);
    logActivity("order", `Canceled/Deleted Order ${id}`);
    res.json({ success: true, message: `Order ${id} deleted successfully` });
  });

  // ========== CUSTOMERS API (CRUD) ==========
  app.get("/api/customers", (req, res) => {
    const db = readDB();
    res.json(db.customers);
  });

  app.post("/api/customers", (req, res) => {
    const db = readDB();
    const customer = req.body;

    if (!customer.name || !customer.email) {
      return res.status(400).json({ error: "Name and Email are required" });
    }

    // Check duplicate email
    if (db.customers.some(c => c.email.toLowerCase() === customer.email.toLowerCase())) {
      return res.status(400).json({ error: "A customer with this email already exists." });
    }

    const newId = `CUST-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCust = {
      customer_id: newId,
      name: customer.name,
      email: customer.email,
      phone: customer.phone || "+1 (555) 000-0000",
      address: customer.address || "No address supplied",
      purchase_count: 0,
      total_spent: 0
    };

    db.customers.push(newCust);
    writeDB(db);
    logActivity("customer", `Registered new Customer: ${customer.name} (${newId})`);
    res.status(201).json(newCust);
  });

  app.put("/api/customers/:id", (req, res) => {
    const db = readDB();
    const { id } = req.params;
    const idx = db.customers.findIndex(c => c.customer_id === id);

    if (idx === -1) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const payload = req.body;
    const existing = db.customers[idx];

    const updated = {
      ...existing,
      name: payload.name !== undefined ? payload.name : existing.name,
      email: payload.email !== undefined ? payload.email : existing.email,
      phone: payload.phone !== undefined ? payload.phone : existing.phone,
      address: payload.address !== undefined ? payload.address : existing.address
    };

    db.customers[idx] = updated;

    // Async sync client name in orders
    db.orders.forEach((ord: any) => {
      if (ord.customer_id === id) {
        ord.customer_name = updated.name;
      }
    });

    writeDB(db);
    logActivity("customer", `Updated customer profile for ${updated.name} (${id})`);
    res.json(updated);
  });

  app.delete("/api/customers/:id", (req, res) => {
    const db = readDB();
    const { id } = req.params;
    const idx = db.customers.findIndex(c => c.customer_id === id);

    if (idx === -1) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const cName = db.customers[idx].name;
    db.customers.splice(idx, 1);
    writeDB(db);
    logActivity("customer", `Deleted customer records for ${cName}`);
    res.json({ success: true, message: `Customer ${id} deleted` });
  });

  // ========== INVENTORY API ==========
  app.get("/api/inventory", (req, res) => {
    const db = readDB();
    res.json(db.inventory);
  });

  app.put("/api/inventory/:id", (req, res) => {
    const db = readDB();
    const { id } = req.params;
    const idx = db.inventory.findIndex(i => i.inventory_id === id);

    if (idx === -1) {
      return res.status(404).json({ error: "Inventory log not found" });
    }

    const payload = req.body;
    const existing = db.inventory[idx];

    const updatedStock = payload.stock !== undefined ? Number(payload.stock) : existing.stock;
    const updatedThreshold = payload.min_threshold !== undefined ? Number(payload.min_threshold) : existing.min_threshold;

    const updated = {
      ...existing,
      stock: updatedStock,
      min_threshold: updatedThreshold,
      status: computeStatus(updatedStock, updatedThreshold)
    };

    db.inventory[idx] = updated;

    // Sync product quantity back to catalog
    const pIdx = db.products.findIndex(p => p.product_id === existing.product_id);
    if (pIdx !== -1) {
      db.products[pIdx].quantity = updatedStock;
    }

    writeDB(db);
    logActivity("inventory", `Manually updated inventory stock for ${existing.product_name}: ${updatedStock} units`);
    res.json(updated);
  });

  // ========== SYSTEM LOGS ==========
  app.get("/api/logs", (req, res) => {
    const db = readDB();
    res.json(db.activity_logs);
  });

  // Vite middleware or Client static builder for Spa
  const isProduction = process.env.NODE_ENV === "production" || 
                       (typeof process !== "undefined" && 
                        process.argv && 
                        process.argv[1] && 
                        (process.argv[1].includes("dist") || process.argv[1].endsWith(".cjs")));

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express multi-function grocery server listening on http://localhost:${PORT}`);
  });
}

startServer();
