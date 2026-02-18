// QUICK-ACTIONS.JS - TEMA KENZI (ALASAN REVIACTYL)
'use strict';

// Inisialisasi aksi cepat saat halaman dimuat
document.addEventListener('DOMContentLoaded', initQuickActions);

/**
 * Inisialisasi semua elemen quick actions
 */
function initQuickActions() {
    // Ambil konfigurasi dari config.js
    const config = window.KenziTheme || window.THEME_CONFIG;
    if (!config?.quickActions) return;

    // Buat kontainer quick actions jika belum ada
    createQuickActionsContainer();
    
    // Tambahkan tombol aksi sesuai konfigurasi
    addQuickActionButtons(config.quickActions);
    
    // Pasang event listener ke semua tombol
    bindQuickActionEvents();
}

/**
 * Membuat kontainer untuk quick actions
 */
function createQuickActionsContainer() {
    const cardBody = document.querySelector('.card-body');
    if (!cardBody) return;

    // Cek apakah kontainer sudah ada
    if (document.querySelector('.quick-actions-container')) return;

    const container = document.createElement('div');
    container.className = 'quick-actions-container card';
    container.innerHTML = `
        <div class="quick-actions-header">
            <h5 class="mb-0">${window.KenziTheme?.lang?.quickActions || 'Aksi Cepat'}</h5>
        </div>
        <div class="quick-actions-grid"></div>
    `;

    // Sisipkan kontainer di atas konten utama
    const serverStatus = document.querySelector('.server-status');
    if (serverStatus) {
        serverStatus.parentNode.insertBefore(container, serverStatus.nextSibling);
    } else {
        cardBody.insertBefore(container, cardBody.firstChild);
    }
}

/**
 * Menambahkan tombol quick actions ke kontainer
 * @param {Array} actions - Daftar aksi yang akan ditampilkan
 */
function addQuickActionButtons(actions) {
    const grid = document.querySelector('.quick-actions-grid');
    if (!grid) return;

    // Ikon dan label sesuai Reviactyl
    const actionConfig = {
        start: { icon: 'fa-play', color: '#28A745', label: 'Nyalakan' },
        stop: { icon: 'fa-stop', color: '#DC3545', label: 'Matikan' },
        restart: { icon: 'fa-refresh', color: '#FFC107', label: 'Mulai Ulang' },
        kill: { icon: 'fa-power-off', color: '#6610F2', label: 'Hentikan Paksa' },
        console: { icon: 'fa-terminal', color: '#17A2B8', label: 'Konsol' },
        files: { icon: 'fa-files-o', color: '#6F42C1', label: 'File' }
    };

    actions.forEach(action => {
        if (!actionConfig[action]) return;

        const btn = document.createElement('button');
        btn.className = 'quick-action-btn';
        btn.dataset.action = action;
        btn.style.backgroundColor = actionConfig[action].color;
        
        btn.innerHTML = `
            <i class="fa ${actionConfig[action].icon}"></i>
            <span>${actionConfig[action].label}</span>
        `;

        grid.appendChild(btn);
    });
}

/**
 * Menambahkan event listener ke tombol quick actions
 */
function bindQuickActionEvents() {
    const buttons = document.querySelectorAll('.quick-action-btn');
    const serverUuid = document.querySelector('meta[name="server-uuid"]')?.content;

    buttons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const action = btn.dataset.action;

            // Tampilkan loading state
            btn.classList.add('loading');
            
            try {
                // Kirim permintaan ke API Pterodactyl
                const response = await fetch(`/api/client/servers/${serverUuid}/power`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                    },
                    body: JSON.stringify({ signal: action })
                });

                if (!response.ok) throw new Error('Permintaan gagal');
                
                // Tampilkan notifikasi sukses
                showToast(`Server ${actionConfig[action].label} berhasil!`, 'success');
            } catch (err) {
                showToast(`Gagal menjalankan ${actionConfig[action].label}!`, 'error');
            } finally {
                btn.classList.remove('loading');
            }
        });

        // Animasi saat tombol di-hover (sama Reviactyl)
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.05)';
            btn.style.boxShadow = `0 0 15px rgba(${hexToRgb(btn.style.backgroundColor)}, 0.5)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
            btn.style.boxShadow = 'none';
        });
    });
}

/**
 * Konversi warna HEX ke RGB
 * @param {string} hex - Kode warna HEX
 * @returns {string} Kode warna RGB
 */
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}

/**
 * Toast notification sama seperti Reviactyl
 * @param {string} message - Pesan yang akan ditampilkan
 * @param {string} type - Tipe notifikasi (success/error/info)
 */
function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Animasi masuk
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Animasi keluar
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
