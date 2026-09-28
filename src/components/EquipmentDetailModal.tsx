import React from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, Tag, Box, ArrowRight, ShoppingBag } from 'lucide-react';
import { Equipment } from '../types';

interface EquipmentDetailModalProps {
  equipment: Equipment | null;
  onClose: () => void;
  onBorrow: (equipment: Equipment) => void;
  onAddToCart: (equipment: Equipment) => void;
  isInCart: boolean;
}

export const EquipmentDetailModal: React.FC<EquipmentDetailModalProps> = ({
  equipment,
  onClose,
  onBorrow,
  onAddToCart,
  isInCart
}) => {
  if (!equipment) return null;

  const isAvailable = equipment.availableStock > 0 && equipment.status === 'Tersedia';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 my-8 overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image Container */}
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full bg-slate-100 dark:bg-slate-800">
            <img
              src={equipment.imageUrl}
              alt={equipment.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {/* Status overlay */}
            <div className="absolute bottom-4 left-4">
              <span
                className={`px-3 py-1.5 rounded-lg text-xs font-bold shadow-md flex items-center gap-1.5 backdrop-blur-md ${
                  isAvailable ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>{isAvailable ? 'Status: Tersedia untuk Dipinjam' : 'Status: Sedang Dipinjam'}</span>
              </span>
            </div>
          </div>

          {/* Right: Details & Specs */}
          <div className="p-6 sm:p-7 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div className="space-y-4">
              {/* Category & Code */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md">
                  {equipment.category}
                </span>
                <span className="font-mono font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                  {equipment.code}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {equipment.name}
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {equipment.fullDescription}
              </p>

              {/* Specs List */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">
                  Spesifikasi & Kelengkapan Unit:
                </h4>
                <div className="space-y-1.5 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                  {equipment.specifications.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location & Condition Info */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                  <p className="text-[10px] text-slate-500 font-medium">Lokasi Penyimpanan:</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 truncate mt-0.5">
                    {equipment.location}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                  <p className="text-[10px] text-slate-500 font-medium">Kondisi Alat:</p>
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400 truncate mt-0.5">
                    {equipment.condition}
                  </p>
                </div>
              </div>

              {/* Stock Count */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-xs">
                <span className="font-medium text-slate-600 dark:text-slate-300">Ketersediaan Unit:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {equipment.availableStock} Tersedia / {equipment.totalStock} Total Stok
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <button
                type="button"
                disabled={!isAvailable}
                onClick={() => {
                  onClose();
                  onAddToCart(equipment);
                }}
                className={`py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isInCart
                    ? 'border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                    : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isInCart ? 'Sudah di Keranjang' : '+ Keranjang'}</span>
              </button>

              <button
                type="button"
                disabled={!isAvailable}
                onClick={() => {
                  onClose();
                  onBorrow(equipment);
                }}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isAvailable
                    ? 'bg-[#0275d8] hover:bg-[#0262b8] active:bg-[#014f96] text-white shadow-md'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>{isAvailable ? 'Pinjam Alat Ini Sekarang' : 'Stok Sedang Kosong'}</span>
                {isAvailable && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
