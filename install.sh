#!/bin/bash
# ==============================================
# TEMA KENZI - AUTO EKSTRAK & INSTALASI OTOMATIS
# ==============================================
echo -e "\n=== 🌟 INSTALASI TEMA KENZI v1.0.0 ==="

# Konfigurasi
REPO_URL="https://github.com/[USERNAME-KAMU]/tema-kenzi-pterodactyl"
ZIP_FILE="tema-kenzi.zip"
TEMP_DIR="/tmp/tema-kenzi"

# Langkah 1: Download file tema
echo "📥 Mengunduh tema dari GitHub..."
wget "${REPO_URL}/archive/refs/heads/main.zip" -O "${ZIP_FILE}"

# Langkah 2: Auto ekstrak
echo "📦 Mengekstrak file..."
unzip "${ZIP_FILE}" -d "${TEMP_DIR}"

# Langkah 3: Salin ke direktori tema Pterodactyl
echo "🚚 Memindahkan folder tema..."
sudo cp -r "${TEMP_DIR}/tema-kenzi-pterodactyl-main/kenzi" "/var/www/pterodactyl/themes/"

# Langkah 4: Atur izin akses
echo "🔒 Mengatur izin akses..."
sudo chown -R www-data:www-data "/var/www/pterodactyl/themes/kenzi"
sudo chmod -R 755 "/var/www/pterodactyl/themes/kenzi"

# Langkah 5: Restart panel
echo "🔄 Merestart panel..."
sudo systemctl restart pterodactyl-panel

# Selesai
echo -e "\n✅ INSTALASI SELESAI!"
echo "Tema Kenzi sudah aktif, buka panel kamu untuk melihatnya 😉"
