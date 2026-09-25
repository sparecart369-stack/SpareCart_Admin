# Supabase Connection Guide

## Connection Status ✅

Your SpareKart Admin Dashboard is now configured to connect to Supabase with the following details:

- **Project URL**: https://hdydlfaabjtdkgmiavcq.supabase.co
- **Anon Key**: Connected ✓
- **Service Role Key**: Connected ✓

## Setup Instructions

### 1. Create Required Tables in Supabase

Log into your Supabase dashboard and create the following tables:

#### Table: `spare_parts`
```sql
CREATE TABLE spare_parts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image TEXT,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  seller TEXT NOT NULL,
  status TEXT NOT NULL,
  date_added DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Table: `customers`
```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  avatar TEXT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  total_orders INTEGER DEFAULT 0,
  total_purchase DECIMAL(10, 2) DEFAULT 0,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Table: `sellers`
```sql
CREATE TABLE sellers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop TEXT NOT NULL,
  owner TEXT NOT NULL,
  products INTEGER DEFAULT 0,
  rating DECIMAL(2, 1) DEFAULT 0,
  revenue DECIMAL(10, 2) DEFAULT 0,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Table: `orders`
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer TEXT NOT NULL,
  seller TEXT NOT NULL,
  product TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_status TEXT DEFAULT 'Pending',
  delivery_status TEXT DEFAULT 'Pending',
  order_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Enable Row Level Security (RLS)

For development, you can disable RLS or set it up properly:

```sql
-- For each table, run:
ALTER TABLE spare_parts DISABLE ROW LEVEL SECURITY;
ALTER TABLE customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE sellers DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
```

### 3. Verify Connection

Run this in your terminal to test the connection:

```bash
npm run dev
```

Check the browser console for connection status. You should see: `✅ Supabase connection successful!`

### 4. Import Sample Data (Optional)

Use the Supabase dashboard to import CSV/JSON data or use the admin-data.ts mock data as reference.

## Available Functions

Use these functions in your pages:

```typescript
import { fetchSpareParts, fetchCustomers, fetchSellers, fetchOrders } from "@/lib/supabase-queries";

// Fetch data
const spareParts = await fetchSpareParts();
const customers = await fetchCustomers();
const sellers = await fetchSellers();
const orders = await fetchOrders();
```

## Connection Files

- **Client**: `/lib/supabase.ts` - Supabase client initialization
- **Queries**: `/lib/supabase-queries.ts` - Pre-built fetch functions
- **Config**: `.env.local` - Environment variables

## Next Steps

1. ✅ Verify Supabase connection in browser console
2. Create tables in Supabase dashboard
3. Update data-fetching logic in page components
4. Replace mock data with real Supabase queries
5. Set up authentication (optional)

---

**Need help?** Check Supabase docs: https://supabase.com/docs
