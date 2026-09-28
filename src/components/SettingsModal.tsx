import React from 'react';
import { X, Settings, Moon, Sun, RotateCcw, User, MapPin, Clock, Phone, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onSwitchUser: (role: 'Mahasiswa' | 'Dosen' | 'Admin BPTI') => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onResetData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSwitchUser,
  darkMode,
  onToggleDarkMode,
  onResetData
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0275d8] text-white">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            <h3 className="font-bold text-base">Pengaturan & Informasi BPTI</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto text-xs">
          {/* Section: Mode Tampilan */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-500 uppercase tracking-wider text-[11px]">
              Tema & Tampilan
            </h4>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">Mode Gelap (Dark Mode)</p>
                <p className="text-slate-500 text-[11px]">Sesuaikan kenyamanan mata Anda</p>
              </div>
              <button
                type="button"
                onClick={onToggleDarkMode}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {darkMode ? <Moon className="w-3.5 h-3.5 text-amber-400" /> : <Sun className="w-3.5 h-3.5 text-slate-600" />}
                <span>{darkMode ? 'Aktif' : 'Nonaktif'}</span>
              </button>
            </div>
          </div>

          {/* Section: Akun Pengguna & Role Demo */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-500 uppercase tracking-wider text-[11px]">
              Ganti Profil Pengguna (Demo Role)
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onSwitchUser('Mahasiswa')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  currentUser?.role === 'Mahasiswa'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <p className="font-semibold">Mahasiswa</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Ahmad Fauzan</p>
              </button>

              <button
                type="button"
                onClick={() => onSwitchUser('Dosen')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  currentUser?.role === 'Dosen'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <p className="font-semibold">Dosen</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Fahri Ramadhan</p>
              </button>

              <button
                type="button"
                onClick={() => onSwitchUser('Admin BPTI')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  currentUser?.role === 'Admin BPTI'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <p className="font-semibold">Admin BPTI</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Mulyono, S.Kom</p>
              </button>
            </div>
          </div>

          {/* Section: Info Layanan BPTI */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-500 uppercase tracking-wider text-[11px]">
              Informasi Operasional BPTI
            </h4>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-slate-900 dark:text-white">Lokasi Pengambilan Alat:</strong> Ruang Layanan BPTI, Gedung B Lt. 2 Kampus A Limau UHAMKA, Kebayoran Baru, Jakarta Selatan.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-slate-900 dark:text-white">Jam Kerja:</strong> Senin - Jumat: 08.00 - 16.00 WIB (Istirahat 12.00 - 13.00 WIB).
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-slate-900 dark:text-white">Layanan Cepat WhatsApp:</strong> 0812-9988-7766 (Helpdesk IT BPTI).
                </p>
              </div>
            </div>
          </div>

          {/* Section: Reset Data */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">Reset Data Inventaris</p>
              <p className="text-slate-500 text-[10px]">Kembalikan semua stok barang & riwayat ke awal</p>
            </div>
            <button
              type="button"
              onClick={onResetData}
              className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
