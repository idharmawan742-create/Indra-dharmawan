import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { Equipment } from '../types';

export interface CartItem {
  equipment: Equipment;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (equipmentId: string, quantity: number) => void;
  onRemoveItem: (equipmentId: string) => void;
  onClearCart: () => void;
  onProceedToBorrow: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToBorrow
}) => {
  if (!isOpen) return null;

  const totalItemsCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800">
          {/* Top Bar */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#0275d8]" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Keranjang Pengajuan
              </h3>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-[#0275d8] dark:text-blue-300">
                {totalItemsCount} Unit
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-slate-400">
                <ShoppingBag className="w-12 h-12 stroke-[1.5]" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Keranjang masih kosong
                </p>
                <p className="text-xs text-slate-500 max-w-xs">
                  Pilih barang dari katalog (seperti Laptop, Proyektor, Kabel HDMI, Kamera Canon) untuk mengajukan peminjaman sekaligus.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
                  <span>Daftar item terpilih:</span>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-red-500 hover:underline cursor-pointer"
                  >
                    Kosongkan Semua
                  </button>
                </div>

                {cartItems.map(({ equipment, quantity }) => (
                  <div
                    key={equipment.id}
                    className="flex gap-3 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80"
                  >
                    <img
                      src={equipment.imageUrl}
                      alt={equipment.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {equipment.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(equipment.id)}
                            className="text-slate-400 hover:text-red-500 p-0.5 transition-colors cursor-pointer"
                            title="Hapus dari keranjang"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] font-mono text-slate-500">
                          {equipment.code} · Stok Sisa: {equipment.availableStock}
                        </p>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[11px] text-slate-500">Jumlah Pinjam:</span>
                        <div className="flex items-center gap-2 bg-white dark:bg-slate-700 rounded-md border border-slate-200 dark:border-slate-600 px-1 py-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(equipment.id, quantity - 1)}
                            disabled={quantity <= 1}
                            className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold px-1 tabular-nums">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(equipment.id, quantity + 1)}
                            disabled={quantity >= equipment.availableStock}
                            className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Bottom Checkout Actions */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Total Item yang Akan Diajukan:</span>
                <span className="font-mono font-bold text-sm text-[#0275d8] dark:text-blue-400">
                  {totalItemsCount} Unit
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onProceedToBorrow();
                }}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#0275d8] hover:bg-[#0262b8] active:bg-[#014f96] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Isi Formulir & Ajukan Peminjaman</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
