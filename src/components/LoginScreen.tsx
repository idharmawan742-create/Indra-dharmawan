import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';
import { BptiLogo } from './BptiLogo';
import { UserProfile } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (user: UserProfile) => void;
  onExploreCatalog: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onExploreCatalog
}) => {
  const [username, setUsername] = useState('peminjam@uhamka.ac.id');
  const [password, setPassword] = useState('••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim()) {
      setErrorMessage('Silakan masukkan Username atau Email Anda.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        id: 'usr-' + Date.now(),
        name: username.includes('@') ? username.split('@')[0].replace('.', ' ').toUpperCase() : username,
        email: username.includes('@') ? username : `${username}@uhamka.ac.id`,
        role: username.toLowerCase().includes('admin') ? 'Admin BPTI' : 'Mahasiswa',
        nimOrNidn: '2204015112',
        faculty: 'Fakultas Teknologi Industri dan Informatika (FTII)'
      });
    }, 600);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        id: 'usr-google-01',
        name: 'Ahmad Fauzan (Google Account)',
        email: 'ahmad.fauzan@uhamka.ac.id',
        role: 'Mahasiswa',
        nimOrNidn: '2204015112',
        faculty: 'Fakultas Teknologi Industri dan Informatika (FTII)'
      });
    }, 600);
  };

  const handleQuickDemo = (role: 'Mahasiswa' | 'Dosen' | 'Admin') => {
    if (role === 'Mahasiswa') {
      setUsername('ahmad.fauzan@uhamka.ac.id');
      setPassword('uhamka2026');
    } else if (role === 'Dosen') {
      setUsername('fahri.ramadhan@uhamka.ac.id');
      setPassword('dosen2026');
    } else {
      setUsername('admin.bpti@uhamka.ac.id');
      setPassword('admin2026');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
      {/* LEFT PANEL - Deep Navy branding (Matches Image 1) */}
      <div className="w-full md:w-[38%] lg:w-[32%] bg-[#0b3b60] text-white flex flex-col justify-between p-8 sm:p-12 relative overflow-hidden shadow-2xl">
        {/* Subtle decorative background patterns */}
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

        {/* Top: BPTI Logo container */}
        <div className="relative z-10 space-y-8">
          <div className="inline-block bg-white rounded-lg p-2.5 shadow-md">
            <BptiLogo variant="light-bg" showSubtitle={false} className="h-10" />
          </div>

          <div className="pt-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-white">
              Sistem Peminjaman<br />
              Barang BPTI UHAMKA
            </h1>
            <p className="mt-3 text-sm text-blue-200/90 leading-relaxed max-w-xs font-normal">
              Layanan digital peminjaman peralatan IT, multimedia, kamera, proyektor, dan aksesoris audio untuk sivitas akademika UHAMKA.
            </p>
          </div>
        </div>

        {/* Middle highlight info */}
        <div className="my-8 py-5 border-y border-blue-400/20 text-xs text-blue-200/80 space-y-2 hidden md:block">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Katalog alat terupdate real-time</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Verifikasi peminjaman cepat & surat digital</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Pengembalian tertib & transparan</span>
          </div>
        </div>

        {/* Bottom branding (Matches Image 1) */}
        <div className="relative z-10 pt-6">
          <div className="text-sm font-semibold text-white/95 leading-snug">
            Universitas Muhammadiyah<br />
            Prof. DR. HAMKA
          </div>
          <p className="text-[11px] text-blue-300/70 mt-1">
            Badan Pengembangan Teknologi Informasi (BPTI)
          </p>
        </div>
      </div>

      {/* RIGHT PANEL - Login Form (Matches Image 1) */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 sm:px-12 lg:px-20 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Header text */}
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Masuk
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Gunakan akun Anda untuk mengakses layanan terintegrasi.
            </p>
          </div>

          {/* Google SSO Button */}
          <div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs active:scale-[0.99] cursor-pointer"
            >
              {/* Google G Multi-color SVG */}
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Lanjutkan dengan Google</span>
            </button>
          </div>

          {/* Divider "atau" */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-300 w-full" />
            <span className="bg-white px-4 text-xs uppercase tracking-wider font-semibold text-slate-500">
              atau
            </span>
          </div>

          {/* Error notice */}
          {errorMessage && (
            <div className="p-3 text-xs bg-red-50 text-red-700 rounded-lg border border-red-200">
              {errorMessage}
            </div>
          )}

          {/* Main Credentials Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username / Email field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Username / Email <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Contoh: ahmad.fauzan@uhamka.ac.id"
                  className="block w-full pl-11 pr-4 py-2.5 text-sm bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-blue-600 rounded-md transition-colors outline-none text-slate-900"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi akun"
                  className="block w-full pl-11 pr-11 py-2.5 text-sm bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-blue-600 rounded-md transition-colors outline-none text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  title={showPassword ? 'Sembunyikan password' : 'Lihat password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit button: Log in */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-2.5 px-4 rounded-md font-semibold text-sm text-white bg-[#0275d8] hover:bg-[#0262b8] active:bg-[#014f96] shadow-sm transition-colors cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Memproses Masuk...
                  </span>
                ) : (
                  'Log in'
                )}
              </button>
            </div>
          </form>

          {/* Direct Catalog Access & Quick Demo Selector */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">Akun Demo Cepat:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('Mahasiswa')}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Mahasiswa
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('Dosen')}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Dosen
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('Admin')}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Admin BPTI
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={onExploreCatalog}
              className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Jelajahi Katalog Barang Tanpa Login</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
