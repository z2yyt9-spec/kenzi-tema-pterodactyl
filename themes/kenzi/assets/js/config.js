// CONFIG.JS - TEMA KENZI (ALASAN REVIACTYL)
'use strict';

// Konfigurasi utama tema
window.KenziTheme = {
    // Informasi tema
    name: 'Kenzi',
    version: '1.0.0',
    author: 'Kenzi Dev',
    basePath: '/themes/kenzi/',

    // Warna tema (sama dengan Reviactyl)
    colors: {
        primary: '#165DFF',
        secondary: '#FF7D00',
        success: '#28A745',
        danger: '#DC3545',
        warning: '#FFC107',
        info: '#17A2B8',
        light: '#F8F9FA',
        dark: '#121212',
        muted: '#6C757D'
    },

    // Konfigurasi tampilan
    layout: {
        borderRadius: 8,
        shadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        navbarHeight: 56,
        cardSpacing: 20
    },

    // Konfigurasi fitur
    features: {
        darkMode: true,
        autoDarkMode: true,
        quickActions: true,
        serverStats: true,
        notification: true
    },

    // Konfigurasi server
    server: {
        powerSignals: ['start', 'stop', 'restart', 'kill'],
        statusLabels: {
            running: 'Berjalan',
            offline: 'Mati',
            starting: 'Menyala',
            stopping: 'Mati',
            crashed: 'Error'
        }
    },

    // Path asset
    paths: {
        css: '/themes/kenzi/assets/css/custom.css',
        js: '/themes/kenzi/assets/js/main.js',
        images: '/themes/kenzi/images/'
    },

    // Localization (bahasa Indonesia)
    lang: {
        welcome: 'Selamat datang di Panel Kenzi',
        quickActions: 'Aksi Cepat',
        serverStatus: 'Status Server',
        darkMode: 'Mode Gelap',
        lightMode: 'Mode Terang',
        serverStart: 'Nyalakan Server',
        serverStop: 'Matikan Server',
        serverRestart: 'Mulai Ulang Server',
        serverKill: 'Hentikan Paksa Server'
    }
};

// Inisialisasi konfigurasi ke dalam sistem Pterodactyl
if (typeof window.Pterodactyl !== 'undefined') {
    window.Pterodactyl.theme = window.KenziTheme;
}
