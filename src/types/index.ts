export type EquipmentStatus = 'Tersedia' | 'Dipinjam' | 'Perawatan';

export type Category = 
  | 'Semua'
  | 'Komputer & Laptop'
  | 'Kamera & Dokumentasi'
  | 'Aksesoris Fotografi'
  | 'Kabel & Konverter'
  | 'Proyektor & Tampilan'
  | 'Audio & Suara';

export interface Equipment {
  id: string;
  code: string;
  name: string;
  category: Category;
  shortDescription: string;
  fullDescription: string;
  specifications: string[];
  imageUrl: string;
  status: EquipmentStatus;
  totalStock: number;
  availableStock: number;
  borrowedCount: number;
  location: string;
  condition: string;
}

export interface BorrowRequest {
  id: string;
  receiptNumber: string;
  equipmentIds: string[];
  equipmentNames: string[];
  equipmentItems: {
    id: string;
    name: string;
    quantity: number;
    code: string;
    imageUrl: string;
  }[];
  borrowerName: string;
  borrowerIdNumber: string; // NIM or NIDN
  borrowerRole: 'Mahasiswa' | 'Dosen' | 'Tendik / Staf';
  facultyDepartment: string;
  whatsapp: string;
  purpose: string;
  locationUsed: string;
  borrowDate: string;
  returnDate: string;
  status: 'Menunggu Persetujuan' | 'Disetujui' | 'Sedang Dipinjam' | 'Selesai' | 'Ditolak';
  requestTimestamp: string;
  approvedBy?: string;
  notes?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'Mahasiswa' | 'Dosen' | 'Tendik / Staf' | 'Admin BPTI';
  nimOrNidn: string;
  faculty: string;
  avatarUrl?: string;
}
