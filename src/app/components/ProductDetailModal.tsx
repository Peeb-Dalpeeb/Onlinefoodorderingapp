import { AnimatePresence, motion } from "motion/react";
import { useStore } from "../store";
import { X, ShoppingBag, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Product } from "../store";

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export function ProductDetailModal({ isOpen, onClose, product }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useStore((state) => state.addToCart);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`Added ${quantity} ${product.name} to cart`);
    setQuantity(1);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          <div className="relative h-64 sm:h-72 shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur text-gray-800 p-2 rounded-full hover:bg-white hover:text-red-600 transition-colors shadow-lg"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 sm:p-8 flex flex-col flex-1 overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h2>
                <span className="text-red-600 font-semibold bg-red-50 px-3 py-1 rounded-full text-sm uppercase tracking-wide">
                  {product.category}
                </span>
              </div>
              <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              {product.description}
            </p>

            <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:text-red-600 transition-colors text-gray-600"
                >
                  <Minus size={20} />
                </button>
                <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:text-red-600 transition-colors text-gray-600"
                >
                  <Plus size={20} />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="w-full bg-red-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-200"
              >
                <ShoppingBag size={20} />
                Add to Order - ${(product.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
