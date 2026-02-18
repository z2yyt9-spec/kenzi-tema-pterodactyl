<?php
return [
    // Informasi dasar tema
    'name' => 'Kenzi',
    'version' => '1.0.0',
    'author' => 'Kenzi Dev',
    'description' => 'Tema Kustom Pterodactyl dengan Desain Modern',
    
    // Warna tema
    'colors' => [
        'primary' => '#165DFF',
        'secondary' => '#FF7D00',
        'background' => '#F8F9FA',
        'text' => '#333333',
        'dark_background' => '#121212',
        'dark_text' => '#FFFFFF'
    ],
    
    // Path lokasi file asset
    'assets' => [
        'css' => '/themes/kenzi/assets/css/custom.css',
        'js' => '/themes/kenzi/assets/js/main.js',
        'logo' => '/themes/kenzi/images/logo.png',
        'favicon' => '/themes/kenzi/images/favicon.ico',
        'banner' => '/themes/kenzi/images/banner.png'
    ],
    
    // Fitur yang diaktifkan
    'features' => [
        'dark_mode' => true,
        'quick_actions' => true,
        'responsive_design' => true,
        'server_stats' => true
    ],
    
    // Bagian database yang ditambahkan
    'database' => [
        'enable' => true,
        'cache' => 300 // Waktu cache data dalam detik
    ]
];
