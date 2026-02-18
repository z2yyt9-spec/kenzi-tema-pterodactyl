#!/bin/bash
clear

echo -e "\e[1;34m====================================="
echo -e "      UNINSTALL TEMA KENZI        "
echo -e "=====================================\e[0m"

if [ "$(id -u)" != "0" ]; then
    echo -e "\e[1;31m⚠️  Error: Jalankan dengan sudo atau root!\e[0m"
    exit 1
fi

PTERO_DIR="/var/www/pterodactyl"
if [ ! -d "$PTERO_DIR" ]; then
    echo -e "\e[1;31m⚠️  Error: Pterodactyl tidak ditemukan!\e[0m"
    exit 1
fi

# Hapus tema Kenzi
echo -e "\e[1;33m🧹 Menghapus tema Kenzi...\e[0m"
rm -rf "$PTERO_DIR/public/themes/kenzi"

# Kembalikan tema default
echo -e "\e[1;33m🔄 Mengembalikan tema default...\e[0m"
sed -i "s/APP_THEME=kenzi/APP_THEME=default/" "$PTERO_DIR/.env"

# Bersihkan cache
cd "$PTERO_DIR" || exit
php artisan cache:clear
php artisan view:clear

echo -e "\n\e[1;32m✅ UNINSTALL SELESAI! Panel kembali ke tema default\e[0m"
