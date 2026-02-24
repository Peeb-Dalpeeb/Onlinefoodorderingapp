import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Burgers' | 'Sides' | 'Drinks';
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Completed';
  createdAt: string;
}

interface AppState {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  
  // Product Actions
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Cart Actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Order Actions
  createOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: 'Pending' | 'Completed') => void;
}

export const useStore = create<AppState>((set) => ({
  products: [
    {
      id: '1',
      name: 'Classic Cheeseburger',
      description: 'Juicy beef patty with cheddar cheese, lettuce, tomato, and our secret sauce.',
      price: 12.99,
      category: 'Burgers',
      image: 'https://images.unsplash.com/photo-1625331725309-83e4f3c1373b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBidXJnZXJ8ZW58MXx8fHwxNzcxODc2NjE1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '2',
      name: 'Crispy French Fries',
      description: 'Golden crispy fries seasoned with sea salt.',
      price: 4.99,
      category: 'Sides',
      image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllc3xlbnwxfHx8fDE3NzE3ODY3MTd8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '3',
      name: 'Refreshing Cola',
      description: 'Ice-cold cola to quench your thirst.',
      price: 2.99,
      category: 'Drinks',
      image: 'https://images.unsplash.com/photo-1594881798661-4c77c99551a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xhJTIwZHJpbmt8ZW58MXx8fHwxNzcxODk3MDI0fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '4',
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce with parmesan, croutons, and caesar dressing.',
      price: 9.99,
      category: 'Sides',
      image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWVzYXIlMjBzYWxhZHxlbnwxfHx8fDE3NzE4NzA0Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '5',
      name: 'Chocolate Milkshake',
      description: 'Creamy chocolate milkshake topped with whipped cream.',
      price: 5.99,
      category: 'Drinks',
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBtaWxrc2hha2V8ZW58MXx8fHwxNzcxODE5Mjg4fDA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ],
  cart: [],
  orders: [
    {
      id: 'ord_123',
      items: [
        {
          id: '1',
          name: 'Classic Cheeseburger',
          description: 'Juicy beef patty with cheddar cheese, lettuce, tomato, and our secret sauce.',
          price: 12.99,
          category: 'Burgers',
          image: 'https://images.unsplash.com/photo-1625331725309-83e4f3c1373b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBidXJnZXJ8ZW58MXx8fHwxNzcxODc2NjE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
          quantity: 2
        },
        {
          id: '3',
          name: 'Refreshing Cola',
          description: 'Ice-cold cola to quench your thirst.',
          price: 2.99,
          category: 'Drinks',
          image: 'https://images.unsplash.com/photo-1594881798661-4c77c99551a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xhJTIwZHJpbmt8ZW58MXx8fHwxNzcxODk3MDI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
          quantity: 2
        }
      ],
      total: 31.96,
      status: 'Pending',
      createdAt: new Date().toISOString()
    },
    {
      id: 'ord_124',
      items: [
        {
          id: '2',
          name: 'Crispy French Fries',
          description: 'Golden crispy fries seasoned with sea salt.',
          price: 4.99,
          category: 'Sides',
          image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllc3xlbnwxfHx8fDE3NzE3ODY3MTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
          quantity: 1
        }
      ],
      total: 4.99,
      status: 'Completed',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ],
  
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  
  updateProduct: (id, updatedProduct) => set((state) => ({
    products: state.products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
  })),
  
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter((p) => p.id !== id)
  })),
  
  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find((item) => item.id === product.id);
    if (existingItem) {
      return {
        cart: state.cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),
  
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== productId)
  })),
  
  updateCartQuantity: (productId, quantity) => set((state) => {
    if (quantity <= 0) {
      return { cart: state.cart.filter((item) => item.id !== productId) };
    }
    return {
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    };
  }),
  
  clearCart: () => set({ cart: [] }),
  
  createOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
  
  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map((o) => (o.id === orderId ? { ...o, status } : o))
  }))
}));
