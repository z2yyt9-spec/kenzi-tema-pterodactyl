// THEME-TOGGLE.JS - TEMA KENZI (ALASAN REVIACTYL)
'use strict';

// Inisialisasi mode tema saat halaman dimuat
document.addEventListener('DOMContentLoaded', initThemeToggle);

/**
 * Inisialisasi semua fungsi toggle tema
 */
function initThemeToggle() {
    // Ambil konfigurasi dari config.js
    const themeConfig = window.KenziTheme;
    if (!themeConfig?.features?.darkMode) return;

    // Buat tombol toggle jika belum ada
    createToggleButton();
    
    // Muat preferensi pengguna
    loadSavedThemePreference();
    
    // Pasang event listener ke tombol toggle
    bindToggleEvents();
    
    // Mode gelap otomatis berdasarkan waktu (sama Reviactyl)
    initAutoThemeSwitch();
}

/**
 * Membuat tombol toggle mode gelap/terang
 */
function createToggleButton() {
    // Cek apakah tombol sudah ada
    if (document.getElementById('theme-toggle-btn')) return;

    const navbar = document.querySelector('.app-header .navbar-nav');
    if (!navbar) return;

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'theme-toggle-btn';
    toggleBtn.className = 'btn btn-sm';
    toggleBtn.innerHTML = '<i class="fa fa-moon-o" aria-hidden="true"></i>';
    toggleBtn.title = 'Ubah Mode Tema';

    navbar.appendChild(toggleBtn);
}

/**
 * Memuat preferensi tema yang disimpan pengguna
 */
function loadSavedThemePreference() {
    const savedMode = localStorage.getItem('kenzi-theme-mode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set mode berdasarkan preferensi atau sistem
    if (savedMode === 'dark' || (!savedMode && prefersDark)) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
}

/**
 * Pasang event listener ke tombol toggle
 */
function bindToggleEvents() {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        
        if (isDark) {
            enableLightMode();
        } else {
            enableDarkMode();
        }
    });
}

/**
 * Mengaktifkan mode gelap
 */
function enableDarkMode() {
    document.body.classList.add('dark-mode');
    document.getElementById('theme-toggle-btn').innerHTML = '<i class="fa fa-sun-o" aria-hidden="true"></i>';
    localStorage.setItem('kenzi-theme-mode', 'dark');
    updateThemeColors('dark');
}

/**
 * Mengaktifkan mode terang
 */
function enableLightMode() {
    document.body.classList.remove('dark-mode');
    document.getElementById('theme-toggle-btn').innerHTML = '<i class="fa fa-moon-o" aria-hidden="true"></i>';
    localStorage.setItem('kenzi-theme-mode', 'light');
    updateThemeColors('light');
}

/**
 * Memperbarui warna tema berdasarkan mode yang aktif
 * @param {string} mode - 'light' atau 'dark'
 */
function updateThemeColors(mode) {
    const theme = window.KenziTheme;
    const root = document.documentElement;

    if (mode === 'dark') {
        root.style.setProperty('--primary-color', theme.colors.darkPrimary || '#0D47A1');
        root.style.setProperty('--text-color', theme.colors.darkText || '#FFFFFF');
    } else {
        root.style.setProperty('--primary-color', theme.colors.primary);
        root.style.setProperty('--text-color', theme.colors.text);
    }
}

/**
 * Mode otomatis berdasarkan waktu (sama Reviactyl)
 */
function initAutoThemeSwitch() {
    const now = new Date().getHours();
    const autoSwitch = window.KenziTheme?.features?.autoThemeSwitch;
    
    if (!autoSwitch) return;

    // Mode gelap antara 18.00 - 06.00
    if (now >= 18 || now < 6) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
}

/**
 * Fungsi bantu untuk memperbarui tampilan elemen
 */
function updateElementThemes() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.borderRadius = window.KenziTheme?.layout?.borderRadius || '8px';
    });
}
