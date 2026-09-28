import React from 'react';
import { FileText, CheckCircle2, AlertOctagon, HelpCircle, ShieldAlert, ArrowRight } from 'lucide-react';

export const SopInfo: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Standar Operasional Prosedur (SOP) Peminjaman Barang BPTI
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Tata tertib resmi Badan Pengembangan Teknologi Informasi (BPTI) Universitas Muhammadiyah Prof. DR. HAMKA.
        </p>
      </div>

      {/* 4-Step Flow */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
          Alur Prosedur Peminjaman Alat
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center font-mono">
              1
            </span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Pengajuan Online</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Pilih alat di katalog (Laptop, Kamera, Proyektor, dll) dan isi formulir peminjaman minimal H-1 sebelum kegiatan.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center font-mono">
              2
            </span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Verifikasi BPTI</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Petugas memverifikasi ketersediaan unit dan jadwal kegiatan. Pemohon menerima konfirmasi WhatsApp & Tanda Terima.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center font-mono">
              3
            </span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Serah Terima Fisik</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Ambil alat di Kantor BPTI Gedung B Lt. 2 dengan menunjukkan KTM / Identitas & menandatangani berita acara fisik.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center font-mono">
              4
            </span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Pengembalian Alat</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Kembalikan alat tepat waktu beserta seluruh kelengkapan (kabel, tas, charger, remote) dalam kondisi bersih dan baik.
            </p>
          </div>
        </div>
      </div>

      {/* Rules & Policies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hak & Tanggung Jawab */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>Kewajiban & Tanggung Jawab</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              <span>Peralatan hanya diperkenankan untuk keperluan akademik atau kegiatan resmi kampus UHAMKA.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              <span>Peminjam wajib menguji fungsi alat (tes nyala laptop/kamera/proyektor) saat serah terima di kantor BPTI.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              <span>Menjaga kebersihan dan keamanan barang selama berada dalam masa tanggung jawab peminjam.</span>
            </li>
          </ul>
        </div>

        {/* Larangan & Sanksi */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Larangan & Ketentuan Khusus</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>Dilarang memindahtangankan barang pinjaman kepada pihak ketiga tanpa izin resmi dari BPTI.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>Kerusakan atau kehilangan unit menjadi tanggung jawab peminjam untuk mengganti unit sesuai spesifikasi asli.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>Keterlambatan tanpa konfirmasi akan mengakibatkan penangguhan hak peminjaman selama 1 semester.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
