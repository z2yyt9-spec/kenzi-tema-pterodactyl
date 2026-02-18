// MAIN.JS - TEMA KENZI (ALASAN REVIACTYL)
'use strict';

// Inisialisasi tema saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi semua modul tema
    initTheme();
    initServerControls();
    initDarkMode();
    initQuickActions();
    initNotifications();
});

// Fungsi utama tema
function initTheme() {
    const theme = window.KenziTheme;
    if (!theme) return;

    // Terapkan warna utama
    document.documentElement.style.setProperty('--primary-color', theme.colors.primary);
    document.documentElement.style.setProperty('--secondary-color', theme.colors.secondary);

    // Terapkan gaya navbar
    const navbar = document.querySelector('.app-header');
    if (navbar) {
        navbar.style.backgroundColor = theme.colors.primary;
        navbar.style.boxShadow = '0 2px 10px rgba(22, 93, 255, 0.2)';
    }
}

// Kontrol server ala Reviactyl
function initServerControls() {
    const serverUuid = document.querySelector('meta[name="server-uuid"]')?.content;
    if (!serverUuid) return;

    // Tombol power server
    const powerButtons = document.querySelectorAll('[data-action]');
    powerButtons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const action = btn.dataset.action;

            // Tampilkan animasi loading
            btn.classList.add('loading');
            try {
                const response = await fetch(`/api/client/servers/${serverUuid}/power`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                    },
                    body: JSON.stringify({ signal: action })
                });

                const data = await response.json();
                if (data.success) showToast(`Server ${action} berhasil!`, 'success');
            } catch (err) {
                showToast('Gagal menjalankan perintah!', 'error');
            } finally {
                btn.classList.remove('loading');
            }
        });
    });
}

// Mode gelap ala Reviactyl
function initDarkMode() {
    const toggleBtn = document.getElementById('dark-mode-toggle');
    const isDark = localStorage.getItem('kenzi-dark-mode') === 'true' || 
                  (localStorage.getItem('kenzi-dark-mode') === null && 
                   window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) document.body.classList.add('dark-mode');

    toggleBtn?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('kenzi-dark-mode', document.body.classList.contains('dark-mode'));
    });
}

// Quick Actions seperti Reviactyl
function initQuickActions() {
    const quickActions = document.querySelector('.quick-actions');
    if (!quickActions) return;

    const actions = ['start', 'stop', 'restart', 'kill'];
    actions.forEach(action => {
        const btn = document.createElement('button');
        btn.className = `quick-btn btn-${action}`;
        btn.innerHTML = `<i class="icon-${action}"></i>`;
        btn.dataset.action = action;
        
        btn.addEventListener('click', () => {
            document.querySelector(`[data-action="${action}"]`).click();
        });

        quickActions.appendChild(btn);
    });
}

// Notifikasi ala Reviactyl
function initNotifications() {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);

    window.showToast = (message, type = 'info') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        toastContainer.appendChild(toast);
        setTimeout(() => toast.classList.add('fade-out'), 3000);
        setTimeout(() => toast.remove(), 3500);
    };
}

// Fungsi bantu
function showToast(message, type) {
    window.showToast(message, type);
}
