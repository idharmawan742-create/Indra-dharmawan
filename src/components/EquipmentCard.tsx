import React, { useState } from 'react';
import { CheckCircle2, Clock, AlertCircle, Eye, Plus, ShoppingBag, MapPin, Sparkles } from 'lucide-react';
import { Equipment } from '../types';

interface EquipmentCardProps {
  equipment: Equipment;
  onOpenDetail: (equipment: Equipment) => void;
  onQuickBorrow: (equipment: Equipment) => void;
  onAddToCart: (equipment: Equipment) => void;
  isInCart: boolean;
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({
  equipment,
  onOpenDetail,
  onQuickBorrow,
  onAddToCart,
  isInCart
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isAvailable = equipment.availableStock > 0 && equipment.status === 'Tersedia';

  return (
    <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Top Image Showcase Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        {/* Skeleton while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse flex items-center justify-center">
            <span className="text-xs text-slate-400">Memuat foto...</span>
          </div>
        )}

        <img
          src={equipment.imageUrl}
          alt={equipment.name}
          onLoad={() => setImageLoaded(true)}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Top Badges Overlay: Availability Status & Category */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          {/* Status Badge */}
          <div
            className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-tight shadow-sm flex items-center gap-1.5 backdrop-blur-md ${
              isAvailable
                ? 'bg-emerald-500/90 text-white'
                : 'bg-amber-500/90 text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>{isAvailable ? 'Tersedia' : 'Sedang Dipinjam'}</span>
          </div>

          {/* Item Code badge */}
          <div className="px-2 py-0.5 rounded bg-black/60 text-white/95 text-[11px] font-mono tracking-wide backdrop-blur-md">
            {equipment.code}
          </div>
        </div>

        {/* Floating Quick Detail Trigger Button on hover */}
        <button
          type="button"
          onClick={() => onOpenDetail(equipment)}
          className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-white text-slate-800 rounded-full shadow-md backdrop-blur-xs transition-transform transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 cursor-pointer"
          title="Lihat Detail & Spesifikasi Lengkap"
        >
          <Eye className="w-4 h-4 text-slate-700" />
        </button>
      </div>

      {/* Card Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row: Category & Campus Location */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
            <span className="font-semibold text-blue-600 dark:text-blue-400">{equipment.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              {equipment.location.split('-')[0].trim()}
            </span>
          </div>

          {/* Item Name */}
          <h3
            onClick={() => onOpenDetail(equipment)}
            className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#0275d8] transition-colors cursor-pointer line-clamp-1 leading-snug"
          >
            {equipment.name}
          </h3>

          {/* Short Description */}
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {equipment.shortDescription}
          </p>
        </div>

        {/* Stock & Availability Indicator Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Stok Tersedia:</span>
            <span className="font-mono font-bold tabular-nums text-slate-800 dark:text-slate-200">
              {equipment.availableStock} dari {equipment.totalStock} Unit
            </span>
          </div>

          {/* Visual Stock Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                equipment.availableStock === 0
                  ? 'bg-rose-500'
                  : equipment.availableStock <= 1
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{
                width: `${(equipment.availableStock / equipment.totalStock) * 100}%`
              }}
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {/* Primary Button: Pinjam Sekarang */}
            <button
              type="button"
              disabled={!isAvailable}
              onClick={() => onQuickBorrow(equipment)}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isAvailable
                  ? 'bg-[#0275d8] hover:bg-[#0262b8] active:bg-[#014f96] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>{isAvailable ? 'Pinjam Alat' : 'Habis Dipinjam'}</span>
            </button>

            {/* Secondary Button: Keranjang / Detail */}
            <button
              type="button"
              disabled={!isAvailable}
              onClick={() => onAddToCart(equipment)}
              className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isInCart
                  ? 'border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400'
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title={isInCart ? 'Sudah di Keranjang' : 'Tambah ke Keranjang'}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isInCart ? 'Di Keranjang' : '+ Keranjang'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
