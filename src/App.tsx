/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  INITIAL_EQUIPMENT,
  INITIAL_BORROW_REQUESTS,
  CURRENT_USER_MOCK
} from './data/initialData';
import { Equipment, BorrowRequest, UserProfile } from './types';
import { LoginScreen } from './components/LoginScreen';
import { Header } from './components/Header';
import { Sidebar, NavTab } from './components/Sidebar';
import { DashboardOverview } from './components/DashboardOverview';
import { EquipmentCatalog } from './components/EquipmentCatalog';
import { EquipmentDetailModal } from './components/EquipmentDetailModal';
import { BorrowModal } from './components/BorrowModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { BorrowHistory } from './components/BorrowHistory';
import { PrintReceiptModal } from './components/PrintReceiptModal';
import { SettingsModal } from './components/SettingsModal';
import { SopInfo } from './components/SopInfo';
import { CheckCircle2, Info } from 'lucide-react';

export default function App() {
  // App views: 'login' | 'dashboard'
  const [currentView, setCurrentView] = useState<'login' | 'dashboard'>('dashboard');

  // Navigation tab inside dashboard
  const [activeTab, setActiveTab] = useState<NavTab>('catalog');

  // Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('bpti_theme') === 'dark';
  });

  // Sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('bpti_user');
    return saved ? JSON.parse(saved) : CURRENT_USER_MOCK;
  });

  // Equipments inventory state
  const [equipments, setEquipments] = useState<Equipment[]>(() => {
    const saved = localStorage.getItem('bpti_equipments');
    return saved ? JSON.parse(saved) : INITIAL_EQUIPMENT;
  });

  // Borrow requests state
  const [borrowRequests, setBorrowRequests] = useState<BorrowRequest[]>(() => {
    const saved = localStorage.getItem('bpti_requests');
    return saved ? JSON.parse(saved) : INITIAL_BORROW_REQUESTS;
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bpti_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Modals state
  const [selectedDetailItem, setSelectedDetailItem] = useState<Equipment | null>(null);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [itemsToBorrow, setItemsToBorrow] = useState<{ equipment: Equipment; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<BorrowRequest | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('bpti_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('bpti_theme', 'light');
    }
  }, [darkMode]);

  // Persist inventory
  useEffect(() => {
    localStorage.setItem('bpti_equipments', JSON.stringify(equipments));
  }, [equipments]);

  // Persist requests
  useEffect(() => {
    localStorage.setItem('bpti_requests', JSON.stringify(borrowRequests));
  }, [borrowRequests]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('bpti_cart', JSON.stringify(cart));
  }, [cart]);

  // Persist user
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('bpti_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('bpti_user');
    }
  }, [currentUser]);

  // Login handler
  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
    showToast(`Selamat datang kembali, ${user.name}!`);
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
    showToast('Anda telah keluar dari sistem.');
  };

  // Cart operations
  const handleAddToCart = (equipment: Equipment) => {
    const existing = cart.find((item) => item.equipment.id === equipment.id);
    if (existing) {
      showToast(`${equipment.name} sudah ada di keranjang.`);
    } else {
      setCart((prev) => [...prev, { equipment, quantity: 1 }]);
      showToast(`${equipment.name} berhasil ditambahkan ke keranjang.`);
    }
  };

  const handleUpdateCartQuantity = (equipmentId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.equipment.id === equipmentId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (equipmentId: string) => {
    setCart((prev) => prev.filter((item) => item.equipment.id !== equipmentId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Quick single borrow
  const handleQuickBorrow = (equipment: Equipment) => {
    setItemsToBorrow([{ equipment, quantity: 1 }]);
    setIsBorrowModalOpen(true);
  };

  // Multi-item borrow from cart
  const handleProceedFromCart = () => {
    if (cart.length === 0) return;
    setItemsToBorrow(cart.map((item) => ({ equipment: item.equipment, quantity: item.quantity })));
    setIsBorrowModalOpen(true);
  };

  // Borrow preset bundle (e.g. Laptop + Proyektor + HDMI)
  const handleBorrowBundle = (bundleIds: string[]) => {
    const bundleItems: { equipment: Equipment; quantity: number }[] = [];
    bundleIds.forEach((id) => {
      const found = equipments.find((e) => e.id === id);
      if (found && found.availableStock > 0) {
        bundleItems.push({ equipment: found, quantity: 1 });
      }
    });

    if (bundleItems.length > 0) {
      setItemsToBorrow(bundleItems);
      setIsBorrowModalOpen(true);
    } else {
      showToast('Stok paket saat ini sedang tidak tersedia.');
    }
  };

  // Submit borrow request
  const handleSubmitBorrow = (
    data: Omit<BorrowRequest, 'id' | 'receiptNumber' | 'status' | 'requestTimestamp'>
  ) => {
    const newId = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const receiptNumber = `BPTI/UHAMKA/PINJAM/2026/${Math.floor(1000 + Math.random() * 9000)}`;

    const newRequest: BorrowRequest = {
      ...data,
      id: newId,
      receiptNumber,
      status: 'Sedang Dipinjam',
      requestTimestamp: new Date().toLocaleString('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }) + ' WIB',
      approvedBy: 'Admin BPTI UHAMKA'
    };

    // Update equipments stock
    setEquipments((prev) =>
      prev.map((eq) => {
        const borrowedItem = data.equipmentItems.find((item) => item.id === eq.id);
        if (borrowedItem) {
          const newAvail = Math.max(0, eq.availableStock - borrowedItem.quantity);
          const newBorrowed = eq.borrowedCount + borrowedItem.quantity;
          return {
            ...eq,
            availableStock: newAvail,
            borrowedCount: newBorrowed,
            status: newAvail === 0 ? 'Dipinjam' : 'Tersedia'
          };
        }
        return eq;
      })
    );

    // Add to requests list
    setBorrowRequests((prev) => [newRequest, ...prev]);

    // Clear borrowed items from cart
    const borrowedIds = new Set(data.equipmentIds);
    setCart((prev) => prev.filter((c) => !borrowedIds.has(c.equipment.id)));

    // Open print receipt modal directly so user can review the receipt immediately
    setSelectedReceipt(newRequest);
    showToast('Pengajuan peminjaman berhasil diproses! Surat tanda terima siap dicetak.');
  };

  // Return equipment handler
  const handleReturnEquipment = (requestId: string) => {
    const targetRequest = borrowRequests.find((r) => r.id === requestId);
    if (!targetRequest) return;

    // Restore stock
    setEquipments((prev) =>
      prev.map((eq) => {
        const itemReturned = targetRequest.equipmentItems.find((item) => item.id === eq.id);
        if (itemReturned) {
          const newAvail = Math.min(eq.totalStock, eq.availableStock + itemReturned.quantity);
          const newBorrowed = Math.max(0, eq.borrowedCount - itemReturned.quantity);
          return {
            ...eq,
            availableStock: newAvail,
            borrowedCount: newBorrowed,
            status: 'Tersedia'
          };
        }
        return eq;
      })
    );

    // Update request status to 'Selesai'
    setBorrowRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'Selesai' } : r))
    );

    showToast('Barang berhasil dikembalikan ke inventaris BPTI. Terima kasih!');
  };

  // Reset data to initial mock
  const handleResetData = () => {
    setEquipments(INITIAL_EQUIPMENT);
    setBorrowRequests(INITIAL_BORROW_REQUESTS);
    setCart([]);
    localStorage.removeItem('bpti_equipments');
    localStorage.removeItem('bpti_requests');
    localStorage.removeItem('bpti_cart');
    setIsSettingsOpen(false);
    showToast('Data inventaris berhasil direset ke kondisi awal.');
  };

  // Switch demo user
  const handleSwitchUser = (role: 'Mahasiswa' | 'Dosen' | 'Admin BPTI') => {
    if (role === 'Mahasiswa') {
      setCurrentUser(CURRENT_USER_MOCK);
    } else if (role === 'Dosen') {
      setCurrentUser({
        id: 'usr-002',
        name: 'Fahri Ramadhan, S.Kom',
        email: 'fahri.ramadhan@uhamka.ac.id',
        role: 'Dosen',
        nimOrNidn: '0315088901',
        faculty: 'Fakultas Teknologi Industri & Informatika (FTII)'
      });
    } else {
      setCurrentUser({
        id: 'usr-003',
        name: 'Mulyono, S.Kom (Admin BPTI)',
        email: 'admin.bpti@uhamka.ac.id',
        role: 'Admin BPTI',
        nimOrNidn: '198403152010121002',
        faculty: 'Badan Pengembangan Teknologi Informasi (BPTI)'
      });
    }
    setIsSettingsOpen(false);
    showToast(`Beralih profil ke akun ${role}`);
  };

  const activeLoansCount = borrowRequests.filter((r) => r.status === 'Sedang Dipinjam').length;

  // RENDER: If user is on the Login Screen
  if (currentView === 'login') {
    return (
      <LoginScreen
        onLoginSuccess={handleLoginSuccess}
        onExploreCatalog={() => setCurrentView('dashboard')}
      />
    );
  }

  // RENDER: Dashboard View
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header bar matching Image 2 */}
      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        currentUser={currentUser}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cart.reduce((acc, curr) => acc + curr.quantity, 0)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onGoToLogin={() => setCurrentView('login')}
        onLogout={handleLogout}
      />

      {/* Main Container with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          cartCount={cart.length}
          activeLoansCount={activeLoansCount}
        />

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && (
              <DashboardOverview
                equipments={equipments}
                borrowRequests={borrowRequests}
                currentUser={currentUser}
                onNavigateToCatalog={() => setActiveTab('catalog')}
                onNavigateToHistory={() => setActiveTab('history')}
                onOpenDetail={(item) => setSelectedDetailItem(item)}
                onQuickBorrow={handleQuickBorrow}
                onBorrowBundle={handleBorrowBundle}
              />
            )}

            {activeTab === 'catalog' && (
              <EquipmentCatalog
                equipments={equipments}
                onOpenDetail={(item) => setSelectedDetailItem(item)}
                onQuickBorrow={handleQuickBorrow}
                onAddToCart={handleAddToCart}
                onBorrowBundle={handleBorrowBundle}
                cartItemIds={cart.map((c) => c.equipment.id)}
              />
            )}

            {activeTab === 'history' && (
              <BorrowHistory
                borrowRequests={borrowRequests}
                onOpenReceipt={(req) => setSelectedReceipt(req)}
                onReturnEquipment={handleReturnEquipment}
              />
            )}

            {activeTab === 'sop' && <SopInfo />}
          </div>
        </main>
      </div>

      {/* Modals & Drawers */}
      <EquipmentDetailModal
        equipment={selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
        onBorrow={handleQuickBorrow}
        onAddToCart={handleAddToCart}
        isInCart={selectedDetailItem ? cart.some((c) => c.equipment.id === selectedDetailItem.id) : false}
      />

      <BorrowModal
        isOpen={isBorrowModalOpen}
        onClose={() => setIsBorrowModalOpen(false)}
        itemsToBorrow={itemsToBorrow}
        currentUser={currentUser}
        onSubmitBorrow={handleSubmitBorrow}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedToBorrow={handleProceedFromCart}
      />

      <PrintReceiptModal
        request={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentUser={currentUser}
        onSwitchUser={handleSwitchUser}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onResetData={handleResetData}
      />
    </div>
  );
}
