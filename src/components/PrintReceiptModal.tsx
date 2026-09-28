import React from 'react';
import { X, Printer, CheckCircle2, ShieldCheck, Download } from 'lucide-react';
import { BorrowRequest } from '../types';
import { BptiLogo } from './BptiLogo';

interface PrintReceiptModalProps {
  request: BorrowRequest | null;
  onClose: () => void;
}

export const PrintReceiptModal: React.FC<PrintReceiptModalProps> = ({
  request,
  onClose
}) => {
  if (!request) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-300 my-6 overflow-hidden text-slate-900">
        {/* Top Floating Control Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#0b3b60] text-white print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold">Bukti Tanda Terima Peminjaman BPTI UHAMKA</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet (Letterhead / Kop Surat) */}
        <div className="p-8 sm:p-12 space-y-6 bg-white print:p-6" id="printable-receipt">
          {/* Formal Kop Surat BPTI UHAMKA */}
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-black text-xs text-[#0b3b60] text-center leading-none">
                <span>LOGO<br/>UHAMKA</span>
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight text-slate-900 uppercase">
                  UNIVERSITAS MUHAMMADIYAH PROF. DR. HAMKA
                </h3>
                <h2 className="text-base font-extrabold text-[#0b3b60] uppercase tracking-wide">
                  BADAN PENGEMBANGAN TEKNOLOGI INFORMASI (BPTI)
                </h2>
                <p className="text-[10px] text-slate-600 mt-0.5">
                  Jl. Limau II, Kebayoran Baru, Jakarta Selatan 12130 | Telp: (021) 7394451 | Website: bpti.uhamka.ac.id
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-slate-100 border border-slate-300 rounded">
                FORMULIR BPTI-04
              </span>
            </div>
          </div>

          {/* Title & Document Code */}
          <div className="text-center pt-2">
            <h3 className="text-base font-extrabold uppercase tracking-wider text-slate-900 underline underline-offset-4">
              SURAT BUKTI PEMINJAMAN BARANG INVENTARIS
            </h3>
            <p className="font-mono text-xs text-slate-700 font-semibold mt-1">
              Nomor: {request.receiptNumber}
            </p>
          </div>

          {/* Statement Paragraph */}
          <p className="text-xs text-slate-700 leading-relaxed text-justify">
            Pada hari ini telah diserahkan peminjaman barang/peralatan inventaris dari Badan Pengembangan Teknologi Informasi (BPTI) Universitas Muhammadiyah Prof. DR. HAMKA kepada pihak peminjam dengan keterangan sebagai berikut:
          </p>

          {/* Section 1: Data Peminjam */}
          <div className="space-y-1.5 text-xs">
            <h4 className="font-bold text-slate-900 uppercase text-[11px] bg-slate-100 px-2 py-1 rounded">
              I. IDENTITAS PEMINJAM
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 px-2 pt-1 font-normal">
              <div>
                <span className="text-slate-500 w-32 inline-block">Nama Lengkap</span>
                <span className="font-bold text-slate-900">: {request.borrowerName}</span>
              </div>
              <div>
                <span className="text-slate-500 w-32 inline-block">NIM / NIDN / NIP</span>
                <span className="font-mono font-semibold text-slate-900">: {request.borrowerIdNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 w-32 inline-block">Status Sivitas</span>
                <span className="font-semibold text-slate-900">: {request.borrowerRole}</span>
              </div>
              <div>
                <span className="text-slate-500 w-32 inline-block">No. WhatsApp</span>
                <span className="font-mono font-semibold text-slate-900">: {request.whatsapp}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 w-32 inline-block">Fakultas / Unit</span>
                <span className="font-semibold text-slate-900">: {request.facultyDepartment}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Keperluan & Waktu */}
          <div className="space-y-1.5 text-xs">
            <h4 className="font-bold text-slate-900 uppercase text-[11px] bg-slate-100 px-2 py-1 rounded">
              II. KEPERLUAN & WAKTU PEMAKAIAN
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 px-2 pt-1 font-normal">
              <div className="col-span-2">
                <span className="text-slate-500 w-32 inline-block">Keperluan Acara</span>
                <span className="font-semibold text-slate-900">: {request.purpose}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 w-32 inline-block">Lokasi Pemakaian</span>
                <span className="font-semibold text-slate-900">: {request.locationUsed}</span>
              </div>
              <div>
                <span className="text-slate-500 w-32 inline-block">Tanggal Pinjam</span>
                <span className="font-mono font-semibold text-slate-900">: {request.borrowDate}</span>
              </div>
              <div>
                <span className="text-slate-500 w-32 inline-block">Tanggal Kembali</span>
                <span className="font-mono font-semibold text-slate-900">: {request.returnDate}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Daftar Barang */}
          <div className="space-y-1.5 text-xs">
            <h4 className="font-bold text-slate-900 uppercase text-[11px] bg-slate-100 px-2 py-1 rounded">
              III. RINCIAN BARANG YANG DIPINJAM
            </h4>
            <table className="w-full text-left border border-slate-300 mt-2 text-xs">
              <thead className="bg-slate-100 font-bold border-b border-slate-300">
                <tr>
                  <th className="py-2 px-3 w-10 text-center">No</th>
                  <th className="py-2 px-3">Kode Aset</th>
                  <th className="py-2 px-3">Nama Peralatan</th>
                  <th className="py-2 px-3 text-center">Qty</th>
                  <th className="py-2 px-3">Kondisi Serah Terima</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {request.equipmentItems.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2 px-3 text-center font-mono">{idx + 1}</td>
                    <td className="py-2 px-3 font-mono font-semibold text-slate-700">{item.code}</td>
                    <td className="py-2 px-3 font-medium text-slate-900">{item.name}</td>
                    <td className="py-2 px-3 text-center font-mono font-bold">{item.quantity} Unit</td>
                    <td className="py-2 px-3 text-slate-600 text-[11px]">Lengkap, Berfungsi Baik</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Ketentuan Ringkas */}
          <div className="text-[10px] text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-200 leading-relaxed">
            <p className="font-bold text-slate-800 mb-0.5">Ketentuan:</p>
            1. Peminjam wajib menjaga dan merawat peralatan dengan baik.<br/>
            2. Kerusakan atau kehilangan akibat kelalaian menjadi tanggung jawab peminjam sepenuhnya.<br/>
            3. Pengembalian barang harus tepat waktu sesuai tanggal yang telah disepakati.
          </div>

          {/* Signatures */}
          <div className="pt-6 grid grid-cols-2 text-center text-xs">
            <div>
              <p className="text-slate-600">Peminjam,</p>
              <div className="h-16" />
              <p className="font-bold text-slate-900 underline">{request.borrowerName}</p>
              <p className="text-[11px] text-slate-500 font-mono">NIM/NIDN. {request.borrowerIdNumber}</p>
            </div>

            <div>
              <p className="text-slate-600">Petugas Inventaris BPTI,</p>
              <div className="h-16 flex items-center justify-center">
                <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-1 rounded">
                  [ TERVERIFIKASI SISTEM BPTI ]
                </span>
              </div>
              <p className="font-bold text-slate-900 underline">BPTI UHAMKA</p>
              <p className="text-[11px] text-slate-500">NIP. 198403152010121002</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
