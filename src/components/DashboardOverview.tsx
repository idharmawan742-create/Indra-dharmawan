import React from 'react';
import {
  Boxes,
  CheckCircle2,
  Clock,
  Laptop,
  Camera,
  Projector,
  ShoppingBag,
  ArrowRight,
  FileCheck,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { Equipment, BorrowRequest, UserProfile } from '../types';

interface DashboardOverviewProps {
  equipments: Equipment[];
  borrowRequests: BorrowRequest[];
  currentUser: UserProfile | null;
  onNavigateToCatalog: () => void;
  onNavigateToHistory: () => void;
  onOpenDetail: (equipment: Equipment) => void;
  onQuickBorrow: (equipment: Equipment) => void;
  onBorrowBundle: (ids: string[]) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  equipments,
  borrowRequests,
  currentUser,
  onNavigateToCatalog,
  onNavigateToHistory,
  onOpenDetail,
  onQuickBorrow,
  onBorrowBundle
}) => {
  const totalEquipments = equipments.length;
  const totalUnits = equipments.reduce((acc, curr) => acc + curr.totalStock, 0);
  const availableUnits = equipments.reduce((acc, curr) => acc + curr.availableStock, 0);
  const borrowedUnits = equipments.reduce((acc, curr) => acc + curr.borrowedCount, 0);

  const activeRequests = borrowRequests.filter(
    (r) => r.status === 'Sedang Dipinjam' || r.status === 'Menunggu Persetujuan' || r.status === 'Disetujui'
  );

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0b3b60] via-[#0275d8] to-blue-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-blue-200 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-xs">
            Universitas Muhammadiyah Prof. DR. HAMKA
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Selamat Datang, {currentUser ? currentUser.name : 'Sivitas Akademika UHAMKA'}!
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed pt-1">
            Sistem Peminjaman Barang BPTI memudahkan Anda mengajukan peminjaman laptop, kamera Canon, tripod, kabel HDMI, proyektor, dan peralatan audio visual kampus secara terintegrasi dan akuntabel.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onNavigateToCatalog}
              className="px-4 py-2.5 bg-white text-[#0275d8] hover:bg-blue-50 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Boxes className="w-4 h-4" />
              <span>Lihat Katalog Alat Tersedia</span>
            </button>

            <button
              type="button"
              onClick={() => onBorrowBundle(['eq-1', 'eq-4', 'eq-5'])}
              className="px-4 py-2.5 bg-amber-400 text-slate-900 hover:bg-amber-300 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Paket Seminar (Laptop + HDMI + Proyektor)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Ambient decorative circle */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Alat */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Katalog Inventaris
            </span>
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0275d8] dark:text-blue-400">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white tabular-nums">
            {totalEquipments} <span className="text-xs font-medium text-slate-500">Jenis Alat</span>
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Total {totalUnits} unit aset BPTI
          </p>
        </div>

        {/* Card 2: Unit Tersedia */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Siap Dipinjam
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
            {availableUnits} <span className="text-xs font-medium text-slate-500">Unit</span>
          </p>
          <p className="mt-1 text-[11px] text-emerald-600/80">
            Kondisi siap pakai di kantor BPTI
          </p>
        </div>

        {/* Card 3: Sedang Dipinjam */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Sedang Dipinjam
            </span>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-amber-600 dark:text-amber-400 tabular-nums">
            {borrowedUnits} <span className="text-xs font-medium text-slate-500">Unit</span>
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Digunakan di kegiatan kampus
          </p>
        </div>

        {/* Card 4: Pengajuan Aktif */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Pengajuan Aktif
            </span>
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
            {activeRequests.length} <span className="text-xs font-medium text-slate-500">Berkas</span>
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Diverifikasi oleh BPTI
          </p>
        </div>
      </div>

      {/* Featured Equipment Showcase (Laptop, Kamera Canon, Tripod, HDMI, Proyektor) */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Peralatan Utama Paling Sering Dipinjam
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pilihan alat standar untuk perkuliahan, seminar prodi, dan dokumentasi foto/video UHAMKA.
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateToCatalog}
            className="text-xs font-bold text-[#0275d8] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Semua Alat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipments.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="flex gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-blue-400 transition-all cursor-pointer group"
              onClick={() => onOpenDetail(item)}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {item.shortDescription}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="font-mono text-emerald-600 font-bold">
                    Tersedia: {item.availableStock} Unit
                  </span>
                  <span className="text-blue-600 font-semibold group-hover:underline">
                    Pinjam →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Borrowing Activity Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Aktivitas Peminjaman Terkini
            </h3>
            <p className="text-xs text-slate-500">
              Daftar transaksi peminjaman barang inventaris BPTI oleh sivitas akademika.
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateToHistory}
            className="text-xs font-bold text-[#0275d8] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Lihat Semua Riwayat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold">
                <th className="pb-3 pr-4">No. Resi & Tanggal</th>
                <th className="pb-3 pr-4">Peminjam</th>
                <th className="pb-3 pr-4">Daftar Barang</th>
                <th className="pb-3 pr-4">Keperluan</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {borrowRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 pr-4">
                    <p className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {req.receiptNumber.split('/')[4] || req.id}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {req.borrowDate} s/d {req.returnDate}
                    </p>
                  </td>

                  <td className="py-3 pr-4">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {req.borrowerName}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate max-w-[180px]">
                      {req.facultyDepartment}
                    </p>
                  </td>

                  <td className="py-3 pr-4">
                    <div className="space-y-0.5">
                      {req.equipmentItems.map((item, i) => (
                        <p key={i} className="text-slate-700 dark:text-slate-300 truncate max-w-[220px]">
                          • {item.name} ({item.quantity}x)
                        </p>
                      ))}
                    </div>
                  </td>

                  <td className="py-3 pr-4">
                    <p className="text-slate-600 dark:text-slate-300 truncate max-w-[200px]">
                      {req.purpose}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                      Lokasi: {req.locationUsed}
                    </p>
                  </td>

                  <td className="py-3 text-right">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        req.status === 'Sedang Dipinjam'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : req.status === 'Selesai'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
