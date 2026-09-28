import React from 'react';
import {
  LayoutDashboard,
  Boxes,
  ShoppingBag,
  History,
  FileText,
  HelpCircle,
  PhoneCall,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export type NavTab = 'dashboard' | 'catalog' | 'history' | 'sop';

interface SidebarProps {
  isOpen: boolean;
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  cartCount: number;
  activeLoansCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  activeTab,
  onSelectTab,
  cartCount,
  activeLoansCount
}) => {
  return (
    <aside
      className={`fixed lg:static top-14 left-0 z-30 h-[calc(100vh-3.5rem)] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-200 flex flex-col justify-between overflow-y-auto ${
        isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-16 lg:translate-x-0'
      }`}
    >
      {/* Navigation Links */}
      <div className="py-4 px-2 space-y-1">
        {/* Dasbor Utama */}
        <button
          type="button"
          onClick={() => onSelectTab('dashboard')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'dashboard'
              ? 'bg-blue-50 dark:bg-blue-950/60 text-[#0275d8] dark:text-blue-400 font-bold'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title="Dasbor Ringkasan"
        >
          <LayoutDashboard className="w-5 h-5 shrink-0" />
          <span className={`${isOpen ? 'block' : 'hidden lg:hidden'} truncate`}>
            Dasbor Ringkasan
          </span>
        </button>

        {/* Katalog Barang Pinjam */}
        <button
          type="button"
          onClick={() => onSelectTab('catalog')}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'catalog'
              ? 'bg-blue-50 dark:bg-blue-950/60 text-[#0275d8] dark:text-blue-400 font-bold'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title="Katalog Barang & Alat"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Boxes className="w-5 h-5 shrink-0" />
            <span className={`${isOpen ? 'block' : 'hidden lg:hidden'} truncate`}>
              Katalog Peralatan
            </span>
          </div>
          {isOpen && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
              6 Alat
            </span>
          )}
        </button>

        {/* Riwayat Peminjaman */}
        <button
          type="button"
          onClick={() => onSelectTab('history')}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'history'
              ? 'bg-blue-50 dark:bg-blue-950/60 text-[#0275d8] dark:text-blue-400 font-bold'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title="Riwayat & Status Peminjaman"
        >
          <div className="flex items-center gap-3 min-w-0">
            <History className="w-5 h-5 shrink-0" />
            <span className={`${isOpen ? 'block' : 'hidden lg:hidden'} truncate`}>
              Riwayat Pengajuan
            </span>
          </div>
          {activeLoansCount > 0 && isOpen && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
              {activeLoansCount} Aktif
            </span>
          )}
        </button>

        {/* SOP & Ketentuan BPTI */}
        <button
          type="button"
          onClick={() => onSelectTab('sop')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'sop'
              ? 'bg-blue-50 dark:bg-blue-950/60 text-[#0275d8] dark:text-blue-400 font-bold'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title="Aturan & SOP Peminjaman"
        >
          <FileText className="w-5 h-5 shrink-0" />
          <span className={`${isOpen ? 'block' : 'hidden lg:hidden'} truncate`}>
            Ketentuan & SOP
          </span>
        </button>
      </div>

      {/* Footer Info Box */}
      {isOpen && (
        <div className="p-3 m-2 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200/80 dark:border-slate-700/60 text-slate-600 dark:text-slate-400 text-[11px] space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
            <HelpCircle className="w-3.5 h-3.5 text-[#0275d8]" />
            <span>Pusat Bantuan BPTI</span>
          </div>
          <p className="text-[10.5px] leading-relaxed">
            Pengambilan alat dilayani pada jam operasional: Senin - Jumat (08.00 - 16.00 WIB) di Kantor BPTI UHAMKA.
          </p>
          <div className="pt-1 border-t border-slate-200 dark:border-slate-700 flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 font-medium">
            <PhoneCall className="w-3 h-3" />
            <span>WA Helpdesk: 0812-9988-7766</span>
          </div>
        </div>
      )}
    </aside>
  );
};
