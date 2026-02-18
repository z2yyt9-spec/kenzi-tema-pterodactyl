// MAIN_CORE.JS - TEMA KENZI
'use strict';

// Sistem inti tema Kenzi
window.KenziCore = {
    // Inisialisasi sistem inti
    init: function() {
        this.loadConfig();
        this.bindCoreEvents();
        this.initDependencies();
    },

    // Muat konfigurasi dari config.js dan custom_config.php
    loadConfig: function() {
        this.config = window.KenziTheme || window.KenziCoreConfig || {};
        console.log('✅ Kenzi Core Sistem Dimuat');
    },

    // Pasang event listener inti
    bindCoreEvents: function() {
        document.addEventListener('DOMContentLoaded', () => {
            this.onPageLoad();
        });
    },

    // Fungsi saat halaman dimuat
    onPageLoad: function() {
        // Inisialisasi semua modul inti
        this.initDarkMode();
        this.initServerStats();
        this.initUserSession();
    },

    // Modul inti tambahan
    initDarkMode: function() {
        const darkMode = new DarkModeToggle(this.config);
        darkMode.init();
    },

    initServerStats: function() {
        // Fungsi monitoring status server
        setInterval(() => {
            fetch('/api/client/servers/' + this.config.serverUuid + '/resources')
                .then(res => res.json())
                .then(data => this.updateServerStats(data));
        }, 5000);
    },

    updateServerStats: function(data) {
        document.getElementById('cpu-usage').textContent = data.resources.cpu_absolute + '%';
        document.getElementById('ram-usage').textContent = (data.resources.memory_bytes / 1073741824).toFixed(2) + ' GB';
    },

    initUserSession: function() {
        // Simpan sesi pengguna
        const user = document.querySelector('meta[name="user"]').content;
        localStorage.setItem('kenzi-user', user);
    },

    // Fungsi bantu
    formatBytes: function(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i))
