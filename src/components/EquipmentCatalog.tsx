import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, CheckCircle2, RotateCcw, PackageCheck } from 'lucide-react';
import { Equipment, Category } from '../types';
import { EquipmentCard } from './EquipmentCard';

interface EquipmentCatalogProps {
  equipments: Equipment[];
  onOpenDetail: (equipment: Equipment) => void;
  onQuickBorrow: (equipment: Equipment) => void;
  onAddToCart: (equipment: Equipment) => void;
  onBorrowBundle: (bundleEquipmentIds: string[]) => void;
  cartItemIds: string[];
}

const CATEGORIES: Category[] = [
  'Semua',
  'Komputer & Laptop',
  'Kamera & Dokumentasi',
  'Aksesoris Fotografi',
  'Kabel & Konverter',
  'Proyektor & Tampilan',
  'Audio & Suara'
];

export const EquipmentCatalog: React.FC<EquipmentCatalogProps> = ({
  equipments,
  onOpenDetail,
  onQuickBorrow,
  onAddToCart,
  onBorrowBundle,
  cartItemIds
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Semua');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'borrowed'>('all');

  const filteredEquipments = useMemo(() => {
    return equipments.filter((item) => {
      // Category filter
      if (selectedCategory !== 'Semua' && item.category !== selectedCategory) {
        return false;
      }
      // Status filter
      if (statusFilter === 'available' && item.availableStock === 0) {
        return false;
      }
      if (statusFilter === 'borrowed' && item.availableStock > 0) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.shortDescription.toLowerCase().includes(query);
        const matchCode = item.code.toLowerCase().includes(query);
        const matchCategory = item.category.toLowerCase().includes(query);
        return matchName || matchDesc || matchCode || matchCategory;
      }
      return true;
    });
  }, [equipments, selectedCategory, statusFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold mb-2">
            <PackageCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Inventaris Resmi BPTI UHAMKA</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Katalog Peminjaman Peralatan IT & Multimedia
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-blue-100 leading-relaxed">
            Disediakan untuk mendukung perkuliahan, presentasi skripsi, seminar, praktikum, dan dokumentasi kegiatan kampus.
          </p>
        </div>

        {/* Quick Bundle Action */}
        <div className="relative z-10 shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center sm:text-right">
          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
            Paket Rekomendasi Seminar
          </p>
          <p className="text-xs text-white mt-0.5">
            Laptop + Proyektor Epson + Kabel HDMI
          </p>
          <button
            type="button"
            onClick={() => onBorrowBundle(['eq-1', 'eq-4', 'eq-5'])}
            className="mt-2.5 px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-900 rounded-lg text-xs font-bold shadow-sm transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pinjam Paket Presentasi</span>
          </button>
        </div>

        {/* Subtle decorative circles */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        {/* Top: Search input & Status segmented filter */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari laptop, kamera canon, tripot, kabel hdmi, proyektor..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          {/* Availability Status Segmented Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg shrink-0">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Semua ({equipments.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('available')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                statusFilter === 'available'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Tersedia</span>
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('borrowed')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                statusFilter === 'borrowed'
                  ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Dipinjam</span>
            </button>
          </div>
        </div>

        {/* Bottom: Category Chips (Functional filter buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Kategori:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#0275d8] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Equipment Cards */}
      {filteredEquipments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipments.map((item) => (
            <EquipmentCard
              key={item.id}
              equipment={item}
              onOpenDetail={onOpenDetail}
              onQuickBorrow={onQuickBorrow}
              onAddToCart={onAddToCart}
              isInCart={cartItemIds.includes(item.id)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
            <RotateCcw className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            Tidak ada alat yang cocok dengan pencarian
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Coba gunakan kata kunci lain seperti "laptop", "kamera", "tripot", "hdmi", atau reset filter kategori.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Semua');
              setStatusFilter('all');
            }}
            className="mt-2 px-4 py-2 text-xs font-semibold text-[#0275d8] bg-blue-50 dark:bg-blue-950/40 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
          >
            Reset Semua Filter
          </button>
        </div>
      )}
    </div>
  );
};
