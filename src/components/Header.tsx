import React, { useState } from 'react';
import { Menu, Settings, Moon, Sun, ShoppingBag, User as UserIcon, LogOut, LogIn } from 'lucide-react';
import { BptiLogo } from './BptiLogo';
import { UserProfile } from '../types';

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  currentUser: UserProfile | null;
  onOpenSettings: () => void;
  onOpenCart: () => void;
  cartCount: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onGoToLogin: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  currentUser,
  onOpenSettings,
  onOpenCart,
  cartCount,
  darkMode,
  onToggleDarkMode,
  onGoToLogin,
  onLogout
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0275d8] text-white shadow-md">
      <div className="flex items-center justify-between h-14 px-3 sm:px-4">
        {/* Left Side: Dark Blue Hamburger Box + BPTI Branding (Matches Image 2) */}
        <div className="flex items-center gap-3">
          {/* Hamburger button in dark navy box */}
          <button
            type="button"
            onClick={onToggleSidebar}
            className="w-11 h-11 bg-[#003865] hover:bg-[#002d52] active:bg-[#00223e] flex items-center justify-center text-white transition-colors cursor-pointer rounded-xs"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* BPTI UHAMKA Logo & Subtitle */}
          <div className="flex items-center">
            <BptiLogo variant="header" showSubtitle={true} />
          </div>
        </div>

        {/* Right Side: Quick Action Controls (Matches Image 2) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cart Icon / Keranjang Peminjaman */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative p-2 rounded-md hover:bg-white/10 active:bg-white/20 transition-colors text-white cursor-pointer"
            title="Keranjang Peminjaman Barang"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Settings Cog Icon (Matches Image 2 gear box) */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="p-2 bg-[#005bb5] hover:bg-[#004f9e] rounded-xs text-white transition-colors cursor-pointer"
            title="Pengaturan Sistem & Informasi BPTI"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Dark / Light Mode Switch (Matches Image 2 toggle switch) */}
          <div className="flex items-center bg-[#005bb5] rounded-xs p-1">
            <button
              type="button"
              onClick={onToggleDarkMode}
              className={`flex items-center justify-center w-7 h-7 rounded transition-colors cursor-pointer ${
                darkMode ? 'bg-slate-900 text-amber-300' : 'bg-white text-slate-800'
              }`}
              title={darkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
            >
              {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>

          {/* User Account / Profile Menu */}
          {currentUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer text-left"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-xs font-bold text-white">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden lg:block text-xs leading-tight">
                  <p className="font-semibold text-white truncate max-w-[120px]">{currentUser.name}</p>
                  <p className="text-[10px] text-blue-100">{currentUser.role}</p>
                </div>
              </button>

              {userMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 text-slate-800 z-50 text-sm"
                  onMouseLeave={() => setUserMenuOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="font-semibold text-slate-900 truncate">{currentUser.name}</p>
                    <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {currentUser.role} · {currentUser.nimOrNidn}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      onGoToLogin();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4 text-slate-400" />
                    <span>Lihat Halaman Login Asli</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-2 text-xs font-semibold text-red-600 cursor-pointer border-t border-slate-100"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Keluar Akun</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onGoToLogin}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#0275d8] text-xs font-bold rounded hover:bg-blue-50 transition-colors shadow-xs cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Masuk</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
