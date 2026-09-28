import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, MapPin, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Equipment, BorrowRequest, UserProfile } from '../types';

interface BorrowModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemsToBorrow: {
    equipment: Equipment;
    quantity: number;
  }[];
  currentUser: UserProfile | null;
  onSubmitBorrow: (request: Omit<BorrowRequest, 'id' | 'receiptNumber' | 'status' | 'requestTimestamp'>) => void;
}

export const BorrowModal: React.FC<BorrowModalProps> = ({
  isOpen,
  onClose,
  itemsToBorrow,
  currentUser,
  onSubmitBorrow
}) => {
  const [borrowerName, setBorrowerName] = useState(currentUser?.name || 'Ahmad Fauzan');
  const [borrowerIdNumber, setBorrowerIdNumber] = useState(currentUser?.nimOrNidn || '2204015112');
  const [borrowerRole, setBorrowerRole] = useState<'Mahasiswa' | 'Dosen' | 'Tendik / Staf'>(
    currentUser?.role === 'Dosen' ? 'Dosen' : 'Mahasiswa'
  );
  const [facultyDepartment, setFacultyDepartment] = useState(
    currentUser?.faculty || 'Fakultas Teknologi Industri & Informatika (FTII)'
  );
  const [whatsapp, setWhatsapp] = useState('081298765432');
  const [purpose, setPurpose] = useState('');
  const [locationUsed, setLocationUsed] = useState('');
  const [borrowDate, setBorrowDate] = useState('2026-09-28');
  const [returnDate, setReturnDate] = useState('2026-09-29');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || itemsToBorrow.length === 0) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!purpose.trim()) {
      setErrorMsg('Mohon isi keperluan atau tujuan peminjaman barang.');
      return;
    }
    if (!locationUsed.trim()) {
      setErrorMsg('Mohon isi lokasi ruangan pemakaian barang.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      const equipmentItems = itemsToBorrow.map((item) => ({
        id: item.equipment.id,
        name: item.equipment.name,
        quantity: item.quantity,
        code: item.equipment.code,
        imageUrl: item.equipment.imageUrl
      }));

      onSubmitBorrow({
        equipmentIds: itemsToBorrow.map((i) => i.equipment.id),
        equipmentNames: itemsToBorrow.map((i) => i.equipment.name),
        equipmentItems,
        borrowerName,
        borrowerIdNumber,
        borrowerRole,
        facultyDepartment,
        whatsapp,
        purpose,
        locationUsed,
        borrowDate,
        returnDate,
        notes
      });
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 my-8 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0275d8] text-white">
          <div>
            <h2 className="text-base sm:text-lg font-bold">
              Formulir Pengajuan Peminjaman Barang
            </h2>
            <p className="text-xs text-blue-100">
              BPTI Universitas Muhammadiyah Prof. DR. HAMKA
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Summary of Items */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Daftar Barang yang Dipinjam ({itemsToBorrow.length} Jenis Alat)
            </h4>
            <div className="space-y-2 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
              {itemsToBorrow.map(({ equipment, quantity }) => (
                <div key={equipment.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={equipment.imageUrl}
                      alt={equipment.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-md object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 dark:text-white truncate">
                        {equipment.name}
                      </p>
                      <p className="text-[11px] font-mono text-slate-500">
                        {equipment.code} · Stok Sisa: {equipment.availableStock}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">
                    {quantity} Unit
                  </span>
                </div>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section: Identitas Peminjam */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Identitas Peminjam
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Lengkap Peminjam <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={borrowerName}
                  onChange={(e) => setBorrowerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  NIM / NIDN / NIP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={borrowerIdNumber}
                  onChange={(e) => setBorrowerIdNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none focus:border-blue-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Peran / Status Sivitas <span className="text-red-500">*</span>
                </label>
                <select
                  value={borrowerRole}
                  onChange={(e) => setBorrowerRole(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none focus:border-blue-500"
                >
                  <option value="Mahasiswa">Mahasiswa</option>
                  <option value="Dosen">Dosen</option>
                  <option value="Tendik / Staf">Tenaga Kependidikan / Staf</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  No. WhatsApp Aktif <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Fakultas / Program Studi / Unit Kerja <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={facultyDepartment}
                onChange={(e) => setFacultyDepartment(e.target.value)}
                placeholder="Contoh: FTII - Teknik Informatika"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Section: Detail Keperluan & Jadwal */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Detail Kegiatan & Jadwal Peminjaman
            </h4>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Keperluan / Nama Acara <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Contoh: Sidang Skripsi Informatika / Dokumentasi Acara Seminar"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Lokasi Penggunaan Barang di Kampus <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={locationUsed}
                onChange={(e) => setLocationUsed(e.target.value)}
                placeholder="Contoh: Ruang Sidang Utama FTII Gedung B Lt. 3"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tanggal Mulai Pinjam <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={borrowDate}
                  onChange={(e) => setBorrowDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tanggal Rencana Kembali <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Catatan / Kelengkapan Tambahan (Opsional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Mohon disertakan charger laptop original dan kabel sambung roll jika tersedia."
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none focus:border-blue-500 resize-none"
              />
            </div>
          </div>

          {/* Submission Notice */}
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200/80 dark:border-blue-800/80 text-[11px] text-blue-800 dark:text-blue-300 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0275d8] shrink-0 mt-0.5" />
            <p>
              Dengan mengirim formulir ini, peminjam bertanggung jawab penuh atas keutuhan peralatan inventaris BPTI UHAMKA dan bersedia mematuhi tata tertib peminjaman.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-bold text-white bg-[#0275d8] hover:bg-[#0262b8] active:bg-[#014f96] rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Mengirim Pengajuan...
                </>
              ) : (
                'Kirim Pengajuan Peminjaman'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
