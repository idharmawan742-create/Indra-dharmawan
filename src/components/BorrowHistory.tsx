import React, { useState } from 'react';
import { Search, Printer, CheckCircle, RotateCcw, Clock, AlertCircle, FileText, Calendar } from 'lucide-react';
import { BorrowRequest } from '../types';

interface BorrowHistoryProps {
  borrowRequests: BorrowRequest[];
  onOpenReceipt: (request: BorrowRequest) => void;
  onReturnEquipment: (requestId: string) => void;
}

export const BorrowHistory: React.FC<BorrowHistoryProps> = ({
  borrowRequests,
  onOpenReceipt,
  onReturnEquipment
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = borrowRequests.filter((req) => {
    if (filterStatus !== 'all' && req.status !== filterStatus) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = req.borrowerName.toLowerCase().includes(q);
      const matchReceipt = req.receiptNumber.toLowerCase().includes(q);
      const matchPurpose = req.purpose.toLowerCase().includes(q);
      const matchEquip = req.equipmentNames.some((name) => name.toLowerCase().includes(q));
      return matchName || matchReceipt || matchPurpose || matchEquip;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Riwayat & Status Peminjaman Barang
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Pantau status verifikasi, pencetakan tanda terima resmi BPTI, dan proses serah terima kembali peralatan.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama peminjam, nomor resi, keperluan, atau nama alat..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['all', 'Sedang Dipinjam', 'Menunggu Persetujuan', 'Selesai'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                filterStatus === status
                  ? 'bg-[#0275d8] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {status === 'all' ? 'Semua Berkas' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((req) => (
            <div
              key={req.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-4"
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0275d8] dark:text-blue-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                      {req.receiptNumber}
                    </span>
                    <p className="text-[11px] text-slate-400">
                      Diajukan: {req.requestTimestamp}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-bold ${
                      req.status === 'Sedang Dipinjam'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        : req.status === 'Selesai'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
              </div>

              {/* Body Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Peminjam info */}
                <div>
                  <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                    Identitas Peminjam
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                    {req.borrowerName}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 font-mono">
                    NIM/NIDN: {req.borrowerIdNumber} ({req.borrowerRole})
                  </p>
                  <p className="text-slate-500 mt-0.5">{req.facultyDepartment}</p>
                  <p className="text-blue-600 dark:text-blue-400 mt-1 font-mono">
                    WA: {req.whatsapp}
                  </p>
                </div>

                {/* Acara & Jadwal */}
                <div>
                  <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                    Kegiatan & Waktu
                  </p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 mt-1">
                    {req.purpose}
                  </p>
                  <p className="text-slate-500 mt-0.5">
                    Ruang: {req.locationUsed}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      {req.borrowDate} s/d {req.returnDate}
                    </span>
                  </div>
                </div>

                {/* Items Borrowed */}
                <div>
                  <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                    Barang yang Dipinjam
                  </p>
                  <div className="mt-1 space-y-1.5">
                    {req.equipmentItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-7 h-7 rounded object-cover border border-slate-200 dark:border-slate-700"
                        />
                        <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                          {item.name}
                        </span>
                        <span className="font-mono font-bold text-blue-600 shrink-0">
                          ({item.quantity}x)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <p className="text-[11px] text-slate-500 italic">
                  {req.notes ? `Catatan: ${req.notes}` : 'Disetujui oleh BPTI UHAMKA.'}
                </p>

                <div className="flex items-center gap-2">
                  {/* Print Button */}
                  <button
                    type="button"
                    onClick={() => onOpenReceipt(req)}
                    className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Cetak Bukti Peminjaman</span>
                  </button>

                  {/* Return item button if currently borrowed */}
                  {req.status === 'Sedang Dipinjam' && (
                    <button
                      type="button"
                      onClick={() => onReturnEquipment(req.id)}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Konfirmasi Pengembalian Alat</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center text-slate-500 space-y-2">
            <FileText className="w-10 h-10 mx-auto text-slate-400 stroke-1" />
            <p className="font-bold text-slate-800 dark:text-slate-200">
              Belum ada riwayat peminjaman yang cocok
            </p>
            <p className="text-xs text-slate-400">
              Coba sesuaikan kata kunci pencarian atau ajukan peminjaman baru dari katalog.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
