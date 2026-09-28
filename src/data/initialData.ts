import { Equipment, BorrowRequest, UserProfile } from '../types';

import laptopImg from '../assets/images/laptop_equipment_1790580446508.jpg';
import canonCameraImg from '../assets/images/canon_camera_1790580460133.jpg';
import canonTripodImg from '../assets/images/canon_tripod_1790580473941.jpg';
import hdmiCableImg from '../assets/images/hdmi_cable_1790580486088.jpg';
import projectorImg from '../assets/images/projector_equipment_1790580496713.jpg';
import wirelessMicImg from '../assets/images/wireless_mic_1790580507596.jpg';

export const INITIAL_EQUIPMENT: Equipment[] = [
  {
    id: 'eq-1',
    code: 'BPTI-LPT-01',
    name: 'Laptop ASUS Vivobook Core i7',
    category: 'Komputer & Laptop',
    shortDescription: 'Laptop kinerja tinggi untuk presentasi kuliah, seminar, pengolahan data, dan kegiatan lab komputer.',
    fullDescription: 'Laptop ASUS Vivobook 15 ditenagai prosesor Intel Core i7 generasi terbaru dengan RAM 16GB dan SSD NVMe 512GB ultra-cepat. Dilengkapi port HDMI langsung, 3x USB, WiFi 6, dan Windows 11 terinstal resmi dengan paket Microsoft Office lengkap.',
    specifications: [
      'Prosesor: Intel Core i7-1255U (10 Cores, up to 4.7 GHz)',
      'RAM: 16 GB DDR4 Dual-Channel',
      'Penyimpanan: 512 GB M.2 NVMe PCIe SSD',
      'Layar: 15.6 inci Full HD IPS Anti-Glare',
      'Kelengkapan: Tas laptop resmi, Adapter Charger Original 65W, Mouse Wireless Logitech',
      'OS: Windows 11 Education Licensed + MS Office 365'
    ],
    imageUrl: laptopImg,
    status: 'Tersedia',
    totalStock: 6,
    availableStock: 4,
    borrowedCount: 2,
    location: 'Ruang Server BPTI Lt. 2 - Lemari A1',
    condition: 'Sangat Baik (98%)'
  },
  {
    id: 'eq-2',
    code: 'BPTI-CAM-01',
    name: 'Kamera DSLR Canon EOS 80D + Lensa Kit',
    category: 'Kamera & Dokumentasi',
    shortDescription: 'Kamera DSLR profesional untuk dokumentasi kegiatan wisuda, seminar nasional, dan publikasi prodi.',
    fullDescription: 'Canon EOS 80D menghadirkan sensor APS-C CMOS 24.2 Megapixel dengan sistem Dual Pixel CMOS AF untuk autofocus yang sangat presisi dan halus. Sangat ideal untuk fotografer humas universitas, panitia acara kemahasiswaan, dan liputan multimedia.',
    specifications: [
      'Resolusi: 24.2 Megapixel APS-C CMOS Sensor',
      'Lensa: Canon EF-S 18-135mm f/3.5-5.6 IS USM Nano',
      'Perekaman Video: Full HD 1080p @60fps Dual Pixel AF',
      'Baterai: 2x Original Canon LP-E6N + Dual Charger',
      'Media Simpan: SD Card SanDisk Extreme Pro 64GB 170MB/s',
      'Aksesoris: Strap leher Canon, Lens Hood, Tas Kamera Vanguard'
    ],
    imageUrl: canonCameraImg,
    status: 'Tersedia',
    totalStock: 4,
    availableStock: 2,
    borrowedCount: 2,
    location: 'Studio Multimedia BPTI - Lemari B2',
    condition: 'Optimal / Lensa Bersih Bebas Jamur'
  },
  {
    id: 'eq-3',
    code: 'BPTI-TRP-01',
    name: 'Tripod Kamera Canon Fluid Head Profesional',
    category: 'Aksesoris Fotografi',
    shortDescription: 'Penyangga kamera kokoh berbahan aluminium tebal dengan kepala fluid head untuk pergerakan video halus.',
    fullDescription: 'Tripod kamera Takara / Canon Pro dengan sistem 3-section leg berbahan magnesium-aluminium alloy. Mampu menopang beban kamera dan lensa tele hingga 5 kg tanpa goyang. Dilengkapi fluid head pan & tilt untuk pengambilan video dokumentasi wisuda atau seminar.',
    specifications: [
      'Tinggi Maksimal: 172 cm (Tinggi Terlipat: 68 cm)',
      'Kapasitas Beban Maks: 5.0 kg',
      'Head Type: Fluid Pan-and-Tilt Head 3-Arah dengan handle ergonomis',
      'Fitur Tambahan: Quick Release Plate 1/4", Bubble Level (Waterpass)',
      'Kaki: Karet anti-slip bergelombang untuk lantai ubin / karpet',
      'Kelengkapan: Tas jinjing tripod dengan bantalan pelindung'
    ],
    imageUrl: canonTripodImg,
    status: 'Tersedia',
    totalStock: 8,
    availableStock: 6,
    borrowedCount: 2,
    location: 'Studio Multimedia BPTI - Rak C1',
    condition: 'Kokoh dan Semua Kuncian Kencang'
  },
  {
    id: 'eq-4',
    code: 'BPTI-CAB-01',
    name: 'Kabel HDMI High-Speed 4K (10 Meter)',
    category: 'Kabel & Konverter',
    shortDescription: 'Kabel transmisi video & audio resolusi tinggi 10 meter untuk menghubungkan laptop ke proyektor aula.',
    fullDescription: 'Kabel HDMI versi 2.0 premium dengan panjang 10 meter berlapis anyaman nylon (nylon braided) tahan injak dan tarikan. Konektor tembaga murni berlapis emas 24K menjamin transmisi visual jernih tanpa flicker atau latency bahkan untuk presentasi jarak jauh.',
    specifications: [
      'Panjang Kabel: 10.0 Meter',
      'Standar: HDMI 2.0 High Speed with Ethernet & Audio Return Channel (ARC)',
      'Resolusi Maks: 4K UHD @60Hz, Full HD 1080p @144Hz',
      'Material: Pelindung Braided Nylon tebal anti-kusut',
      'Konektor: Male to Male 24K Gold-Plated anti-oksidasi',
      'Kelengkapan: Velcro cable strap organizer'
    ],
    imageUrl: hdmiCableImg,
    status: 'Tersedia',
    totalStock: 15,
    availableStock: 11,
    borrowedCount: 4,
    location: 'Ruang Inventaris Kabel & Jaringan BPTI - Rak D2',
    condition: 'Normal / Sinyal Video 100% Stabil'
  },
  {
    id: 'eq-5',
    code: 'BPTI-PRJ-01',
    name: 'Proyektor Epson EB-E500 3300 Lumens',
    category: 'Proyektor & Tampilan',
    shortDescription: 'Proyektor presentasi 3LCD terang tajam untuk ruang kuliah, ruang sidang skripsi, dan aula rapat.',
    fullDescription: 'Epson EB-E500 menggunakan teknologi 3LCD 3-chip yang menghasilkan proyeksi warna sama terang dengan cahaya putih (3300 ANSI Lumens). Menghasilkan teks presentasi slide PowerPoint, grafik tabel, dan video yang tajam meski ruangan dalam kondisi lampu menyala.',
    specifications: [
      'Kecerahan: 3.300 ANSI Lumens (Colour Light Output & White Light Output)',
      'Resolusi Asli: XGA (1024 x 768) support up to Full HD 1080p',
      'Rasio Kontras: 15.000 : 1',
      'Konektivitas: Port HDMI In, VGA D-Sub 15-pin In, USB Tipe B',
      'Fitur: Auto Vertical Keystone correction, Instant Off',
      'Kelengkapan: Kabel Power 5M, Remote Control Wireless, Tas Proyektor Epson'
    ],
    imageUrl: projectorImg,
    status: 'Tersedia',
    totalStock: 6,
    availableStock: 3,
    borrowedCount: 3,
    location: 'Ruang Server BPTI Lt. 2 - Lemari A2',
    condition: 'Lampu Baru, Kecerahan 100% Jernih'
  },
  {
    id: 'eq-6',
    code: 'BPTI-MIC-01',
    name: 'Mic Wireless Clip-On Boya Dual Channel',
    category: 'Audio & Suara',
    shortDescription: 'Mikrofon nirkabel 2.4GHz clip-on tanpa kabel untuk pembicara seminar, moderator, dan rekaman kamera.',
    fullDescription: 'Sistem mikrofon nirkabel dual channel Boya dengan 2 transmitter dan 1 receiver. Dilengkapi layar OLED informatif, fitur noise reduction cerdas, dan daya tahan baterai hingga 7 jam. Langsung cocok dicolokkan ke kamera Canon maupun laptop presentasi.',
    specifications: [
      'Frekuensi: ISM 2.4GHz Digital Transmission',
      'Jangkauan Sinyal: Hingga 100 meter di area terbuka',
      'Komponen: 2x Transmitter (TX) + 1x Receiver (RX)',
      'Baterai: Internal Li-ion 7 Jam + Box Charging Case',
      'Output Audio: 3.5mm TRS (Kamera Canon) & TRRS (Laptop/Ponsel)',
      'Kelengkapan: 2x Deadcat Windshield bulu, kabel jumper, hardcase'
    ],
    imageUrl: wirelessMicImg,
    status: 'Tersedia',
    totalStock: 5,
    availableStock: 3,
    borrowedCount: 2,
    location: 'Studio Multimedia BPTI - Lemari B1',
    condition: 'Baterai Sehat & Suara Bersih Rendah Noise'
  }
];

export const INITIAL_BORROW_REQUESTS: BorrowRequest[] = [
  {
    id: 'REQ-2026-0891',
    receiptNumber: 'BPTI/UHAMKA/PINJAM/2026/0891',
    equipmentIds: ['eq-1', 'eq-4', 'eq-5'],
    equipmentNames: ['Laptop ASUS Vivobook Core i7', 'Kabel HDMI High-Speed 4K (10 Meter)', 'Proyektor Epson EB-E500 3300 Lumens'],
    equipmentItems: [
      { id: 'eq-1', name: 'Laptop ASUS Vivobook Core i7', quantity: 1, code: 'BPTI-LPT-01', imageUrl: laptopImg },
      { id: 'eq-4', name: 'Kabel HDMI High-Speed 4K (10 Meter)', quantity: 1, code: 'BPTI-CAB-01', imageUrl: hdmiCableImg },
      { id: 'eq-5', name: 'Proyektor Epson EB-E500 3300 Lumens', quantity: 1, code: 'BPTI-PRJ-01', imageUrl: projectorImg }
    ],
    borrowerName: 'Fahri Ramadhan, S.Kom',
    borrowerIdNumber: '0315088901',
    borrowerRole: 'Dosen',
    facultyDepartment: 'Fakultas Teknologi Industri & Informatika (FTII)',
    whatsapp: '081298765432',
    purpose: 'Sidang Ujian Skripsi & Presentasi Tugas Akhir Mahasiswa Teknik Informatika',
    locationUsed: 'Ruang Sidang Utama FTII Gedung B Lt. 3 Kampus A UHAMKA',
    borrowDate: '2026-09-28',
    returnDate: '2026-09-29',
    status: 'Sedang Dipinjam',
    requestTimestamp: '2026-09-28 08:30 WIB',
    approvedBy: 'Admin BPTI (Bpk. Mulyono)',
    notes: 'Sudah diserahkan lengkap berserta tas, remote, dan kabel power.'
  },
  {
    id: 'REQ-2026-0888',
    receiptNumber: 'BPTI/UHAMKA/PINJAM/2026/0888',
    equipmentIds: ['eq-2', 'eq-3'],
    equipmentNames: ['Kamera DSLR Canon EOS 80D + Lensa Kit', 'Tripod Kamera Canon Fluid Head Profesional'],
    equipmentItems: [
      { id: 'eq-2', name: 'Kamera DSLR Canon EOS 80D + Lensa Kit', quantity: 1, code: 'BPTI-CAM-01', imageUrl: canonCameraImg },
      { id: 'eq-3', name: 'Tripod Kamera Canon Fluid Head Profesional', quantity: 1, code: 'BPTI-TRP-01', imageUrl: canonTripodImg }
    ],
    borrowerName: 'Anisa Nur Azizah',
    borrowerIdNumber: '2103015044',
    borrowerRole: 'Mahasiswa',
    facultyDepartment: 'Himpunan Mahasiswa Ilmu Komunikasi (FISIP)',
    whatsapp: '085712349988',
    purpose: 'Dokumentasi & Siaran Live Streaming Seminar Nasional Kebangsaan UHAMKA',
    locationUsed: 'Auditorium Ahmad Dahlan Kampus B Pasar Rebo',
    borrowDate: '2026-09-28',
    returnDate: '2026-09-30',
    status: 'Sedang Dipinjam',
    requestTimestamp: '2026-09-27 14:15 WIB',
    approvedBy: 'Admin BPTI (Bpk. Hendra)',
    notes: 'Kamera diserahkan dalam kondisi baterai terisi 100% dan SD card kosong.'
  },
  {
    id: 'REQ-2026-0875',
    receiptNumber: 'BPTI/UHAMKA/PINJAM/2026/0875',
    equipmentIds: ['eq-6'],
    equipmentNames: ['Mic Wireless Clip-On Boya Dual Channel'],
    equipmentItems: [
      { id: 'eq-6', name: 'Mic Wireless Clip-On Boya Dual Channel', quantity: 1, code: 'BPTI-MIC-01', imageUrl: wirelessMicImg }
    ],
    borrowerName: 'Dr. Ilham Prasetyo, M.Pd',
    borrowerIdNumber: '0309117802',
    borrowerRole: 'Dosen',
    facultyDepartment: 'Fakultas Keguruan dan Ilmu Pendidikan (FKIP)',
    whatsapp: '081388776655',
    purpose: 'Rekaman Video Pembelajaran Daring & Microteaching Prodi Pendidikan Matematika',
    locationUsed: 'Laboratorium Microteaching FKIP Lt. 4',
    borrowDate: '2026-09-25',
    returnDate: '2026-09-26',
    status: 'Selesai',
    requestTimestamp: '2026-09-25 09:00 WIB',
    approvedBy: 'Admin BPTI (Bpk. Mulyono)',
    notes: 'Alat telah dikembalikan dalam kondisi lengkap dan bersih.'
  }
];

export const CURRENT_USER_MOCK: UserProfile = {
  id: 'usr-001',
  name: 'Ahmad Fauzan',
  email: 'ahmad.fauzan@uhamka.ac.id',
  role: 'Mahasiswa',
  nimOrNidn: '2204015112',
  faculty: 'Fakultas Teknologi Industri dan Informatika (FTII)'
};
