# ⚔️ Strike & Loot: Fantasy Adventure RPG (Pixel Slayer Saga) 🛡️

Game 3D Open-World Adventure RPG Web modern berbasis HTML5, CSS3, dan JavaScript (Three.js & WebGL) dengan **dunia luas 300x300 Meter yang tampak nyata & hidup**: ribuan rumput 3D yang bergoyang ditiup angin sepoi-sepoi, bunga-bunga liar berwarna-warni, tekstur bebatuan cobblestone artistik, aliran sungai jernih dengan bunga teratai dan ilalang, pencahayaan alami diorama, desa ramai penuh kehidupan, dan pertarungan kombo 3 tebasan!

---

## 🌿 Pembaruan Grafis Realistis & Dunia Enak Dipandang:

### 1. 🌾 Ribuan Rumput 3D Bergoyang Alami (*Procedural Swaying 3D Grass*)
- **3.200+ Rumpun Rumput 3D per Zona**: Hamparan padang rumput hijau subur yang lebat di sekeliling desa, tepi jalan setapak, tepian sungai, dan lereng perbukitan!
- **Animasi Angin GPU Nyata (*GPU Wind Sway Shader*)**: Setiap helai rumput bergoyang lembut meliuk-liuk mengikuti hembusan angin sepoi-sepoi tanpa membebani performa (lancar 60 FPS)!
- **Variasi Warna Organik**: Gradasi warna rumput alami mulai dari hijau musim semi cerah (*spring green*), hijau zamrud (*emerald*), hingga pucuk daun keemasan.

### 2. 🌸 Bunga Liar Mekar (*Wildflowers Field*)
- **Ratusan Bunga Liar 3D**: Tersebar alami di padang rumput, tepi sungai, dan pekarangan rumah warga:
  - Bunga Poppies Merah Membara (`#ef4444`)
  - Bunga Dandelion Kuning Cerah (`#facc15`)
  - Bunga Chamomile Daisy Putih Bersih (`#f8fafc`)
  - Bunga Forget-Me-Not Biru Langit (`#38bdf8`)
  - Bunga Lavender Liar Ungu Semerbak (`#a855f7`)
  - Bunga Blossom Merah Muda Manis (`#f472b6`)
- Bunga-bunga turut bergoyang lembut mengikuti hembusan angin bersama rerumputan!

### 3. 🌊 Sungai Sangat Nyata (*Hyper-Realistic 3D River & Water Simulation*)
- **Kedalaman Alur Sungai & Dasar Berbatu (*Excavated Riverbed Channel*)**: Sungai kini memiliki alur nyata dengan dasar sungai berkerikil halus, pasir keemasan, dan bebatuan kali alami di kedalaman air jernih!
- **Simulasi Gelombang 3D Nyata (*Vertex Wave Simulation*)**: Permukaan air bergelombang riak dinamis meliuk-liuk secara prosedural (*Gerstner compound waves*) dalam 3 dimensi.
- **Efek Pantulan Cahaya Matahari & Jaring Kaustik (*Voronoi Caustics Webbing*)**: Pantulan pola cahaya matahari berayun hidup di atas permukaan dan menembus ke dasar sungai.
- **Busa Aliran Tepian (*Dynamic Shore Foam*)**: Di sepanjang tepian sungai di mana air bertemu daratan, terdapat riak busa putih bergolak yang tampak sangat alami dan hidup!
- **Gradasi Warna Air Jernih (*Depth Gradient Shading*)**: Tepian dangkal tampak jernih biru toska muda (*crystal turquoise cyan*), sedangkan bagian tengah sungai yang dalam berwarna biru safir pekat (*deep oceanic sapphire*).
- **Daun Teratai & Bunga Lotus Mengapung (*Floating Lily Pads*)**: Menghiasi permukaan sungai dengan kelopak merah muda yang mengapung dan berayun naik-turun mengikuti irama gelombang air.
- **Rumpun Ilalang & Gelagah (*Cattail Reeds*)**: Tumbuh alami di sepanjang tepi sungai.

---

## 🦘 Pembaruan Gerakan Hero: Melompat & Berenang di Sungai!

### 1. 🦘 Mekanik Melompat (*Realistic Jump Physics*)
- **Tombol Melompat (`Spasi` / Tombol `🦘` di Layar Sentuh)**: Hero kini dapat melompat lincah ke udara untuk menjelajahi dunia dan melompati rintangan!
- **Animasi Melompat Mulus**: Saat berada di udara, kaki hero menekuk lincah, kedua tangan menyeimbangkan tubuh, dan jubah berkibar dinamis ditiup angin.
- **Dampak Pendaratan (*Landing Impact & Dust*)**: Saat mendarat di tanah bebatuan maupun rerumputan, hero menghasilkan hentakan lembut (*squash & stretch*), kepulan debu tanah, dan suara dentuman kaki `playLand()`.

### 2. 🏊‍♂️ Mode Berenang di Sungai (*Dynamic Swimming & Water Splashes*)
- **Transisi Berenang Otomatis**: Saat hero melangkah atau melompat ke dalam sungai, hero langsung masuk ke status berenang (*isSwimming*)!
- **Gaya Renang Luwes**:
  - **Saat Bergerak di Air**: Tubuh hero condong maju ke dalam air, kepala mendongak ke atas untuk bernapas, kedua lengan mengayuh gaya renang bergantian, dan kedua kaki mengepak lincah membelah air.
  - **Saat Diam di Air**: Hero mengapung santai (*treading water*) dengan gerakan mendayung lembut dan mengapung naik-turun mengikuti gelombang riak air.
- **Efek Riak Gelombang & Cipratan Air (*Interactive Ripples & Splashes*)**:
  - Setiap gerakan kayuhan renang memunculkan lingkaran riak air (*concentric water ripples*) dan gelembung air yang memudar lembut.
  - Saat melompat ke sungai atau melompat keluar dari air (*water breach leap*), hero menghasilkan semburan cipratan air berkilau (*water splash droplets*) dan suara kecipak air segar `playWaterSplash()` dan `playSwim()`.
- **Tetap Berjalan di Atas Jembatan**: Saat melintasi jembatan kayu Oakhaven atau jembatan hutan, hero tetap berjalan normal di atas papan jembatan tanpa basah!

---

### 3. 🏃‍♂️ Animasi Hero & Karakter Tampak Nyata:
- **Langkah Kaki Berdebu (*Running Dust Puffs*)**: Setiap langkah kaki hero kini memunculkan **kepulan debu realistis** di atas tanah yang memudar lembut!
- **Efek Suara Langkah Kaki Dinamis**: Suara langkah kaki hero otomatis membedakan antara lantai bebatuan (*stone cobblestone*) dan tanah rerumputan (*grass thud*)!
- **Kibasan Jubah Bergelombang Luwes**: Jubah merah berkibar mengikuti kecepatan lari dengan gelombang inersia alami.
- **Pernapasan Alami (*Idle Breathing*)**: Saat hero diam, dada dan kepala bergerak bernapas naik-turun halus.

---

### 4. ⚔️ Sistem Kombo 3x Serangan Pedang (3-Hit Combo Attack):
Klik Kiri Mouse / Tombol `F`, `J`, `Enter` secara beruntun untuk melancarkan serangan berantai:
- **Tebasan 1**: Ayunan pedang horizontal cepat dengan busur cahaya tebasan biru.
- **Tebasan 2**: Tebasan serong ke atas (*diagonal uppercut*) dengan kilauan tebasan emas (+25% Damage).
- **Tebasan 3 - HEAVY LEAP SLAM**: Hero melompat tinggi ke udara dan menghujamkan pedang sekuat tenaga ke tanah! Menghasilkan **suara dentuman berat (*heavy impact*)**, guncangan layar, gelombang kejut merah menyala, dan **damage dahsyat 2.4x lipat** ke semua monster di sekitar!

---

### 5. 🔍 Fitur Zoom Kamera Bebas:
- **Scroll Mouse**: Putar roda scroll mouse ke atas untuk zoom mendekat (melihat detail ekspresi karakter), atau scroll ke bawah untuk zoom menjauh (melihat pemandangan kota dan dunia yang membentang luas)!

---

---

## 🎵 Pembaruan Audio & Musik Utama (`musikutama.mp3`):
- **Musik Utama Asli (`musikutama.mp3`)**: File audio MP3 yang diletakkan di `assets/audio/musikutama.mp3` kini menjadi soundtrack dan backsound utama petualangan yang berputar otomatis secara mulus (*looping*).
- **Pengatur Volume Real-Time (Volume Sliders)**:
  1. **Menu Pause (ESC)**: Terdapat slider pengatur volume terpisah untuk **Volume Musik Utama** (0% - 100%) dan **Volume Efek Suara (SFX)** (0% - 100%).
  2. **Layar Judul / Pemilihan Karakter**: Terdapat bar kontrol audio di layar awal untuk menyalakan/mematikan dan mengatur volume musik sebelum memulai permainan.
  3. **Scroll Roda Mouse di Tombol HUD**: Putar roda mouse di atas tombol `🎵` atau `🔊` di sudut kanan bawah untuk menaikkan/menurunkan volume secara instan dengan notifikasi visual!

---

## 🎓 Pembaruan Media Pembelajaran Game (Educational RPG Learning System):

Game ini kini telah dilengkapi dengan **Sistem Kuis & Pembelajaran Edukasi Terintegrasi** yang membuat petualangan RPG menjadi sarana belajar yang seru, interaktif, dan mendidik!

### 1. 🧙 Tantangan Soal dengan NPC Warga & Tokoh Desa
- Setiap kali berbicara dengan NPC (Tetua Desa, Penjaga Gerbang Roland, Alkemis Sylva, Arkeolog Drake, Pandai Besi Vulcan, Lyra the Bard, Shopkeeper, atau Angel Wizard), kotak dialog menampilkan tombol emas: **`🎓 Ambil Tantangan Soal (+Hadiah)`**.
- Soal disesuaikan dengan keahlian tokoh (Sejarah bangsa, Logika pertahanan, Sains kimia/biologi, Sastra & Bahasa Indonesia, Fisika logam, hingga Bahasa Inggris).

### 2. 🌿 Misi Memetik Jamur Ajaib (Teka-Teki Sains Alam)
- Saat mendekati Jamur Ajaib Bercahaya di hutan Whispering Woods dan menekan **`[E]`**, pemain harus memecahkan soal sains/botani terlebih dahulu untuk memetik jamur tersebut.
- Jika berhasil dijawab dengan benar:
  - Jamur berhasil dipetik dan misi bertambah (`1/3 Jamur Ajaib`).
  - Pemain memperoleh **+Poin Edukasi**, **+Gold**, **+Pemulihan Darah (HP)**, dan **+EXP**!

### 3. 🌀 Gerbang Portal Dimensi (Sandi Pengetahuan Antar-Wilayah)
- Saat hero melangkah menuju portal magis (Desa ➔ Hutan ➔ Reruntuhan ➔ Puncak Naga), penjaga dimensi meminta jawaban teka-teki pengetahuan (Geografi, Astronomi, Fisika, Matematika).
- Menjawab dengan benar akan membuka segel portal dan memindahkan hero ke wilayah petualangan berikutnya.

### 4. 🗝️ Peti Harta Karun Purba (Gembok Sandi Logika & Berhitung)
- Peti harta karun emas kini dilindungi gembok sandi kuno. Jawab soal matematika atau logika untuk membuka peti dan mengambil timbunan emas serta EXP!

### 5. 🎁 Sistem Hadiah Nyata di Dalam Game
Setiap jawaban yang benar memberikan hadiah langsung ke karakter hero:
- 🎓 **Poin Edukasi (Skor Kuis)**: Bertambah di badge HUD atas dan menu pause.
- 💰 **Uang / Gold**: Langsung masuk ke kantong emas untuk membeli senjata di toko.
- ❤️ **Darah / HP**: Darah hero langsung pulih (*Heal effect* dengan teks hijau melayang `+30 HP HEAL`).
- ⭐ **EXP**: Menambah pengalaman untuk naik level (*Level Up*).
- 💡 **Umpan Balik Edukatif**: Setiap soal disertai penjelasan materi ringkas agar siswa benar-benar memahami ilmunya.

### 6. 📝 Cara Menambah & Mengganti Soal Sendiri (`js/questions.js`)
Seluruh daftar pertanyaan dan jawaban dikelompokkan secara terpisah di dalam file:  
👉 [**`js/questions.js`**](file:///c:/Users/Andriansyah/Downloads/gamerpg/js/questions.js)

File ini sangat mudah diedit menggunakan Notepad atau teks editor apa pun. Format penulisan soal:
```javascript
{
    id: 'soal_baru_01',                  // ID unik (tidak boleh sama)
    subject: 'Matematika',              // Nama Mata Pelajaran
    category: 'mushroom',               // 'mushroom', 'portal', 'npc', 'chest', atau 'general'
    difficulty: 'Mudah',                // 'Mudah', 'Sedang', atau 'Sulit'
    question: 'Berapakah hasil dari 25 x 4?',
    options: [
        'A. 75',
        'B. 90',
        'C. 100',
        'D. 120'
    ],
    correctIndex: 2,                    // 0 untuk A, 1 untuk B, 2 untuk C, 3 untuk D
    explanation: '25 dikali 4 sama dengan 100.', // Penjelasan materi edukasi
    reward: {
        points: 25,                     // Hadiah Poin Edukasi
        gold: 50,                       // Hadiah Gold
        hp: 30,                         // Hadiah Darah (HP) pulih
        exp: 40                         // Hadiah EXP
    }
}
```

---

---

## 🐎 Pembaruan Spektakuler: Sistem Hewan Tunggangan (Mounts System) & Kandang Oakhaven!

Karakter pahlawan kini dapat **membeli dan menunggangi 6 hewan tunggangan legendaris** dengan visual 3D Low-Poly Stylized yang sangat keren, animasi derap langkah & kepakan sayap nyata, efek partikel magis, serta peningkatan kecepatan lari super kencang!

### 1. 🐾 6 Koleksi Hewan Tunggangan Super Keren:
1. 🐎 **Kuda Perang Ksatria (*Oakhaven Warhorse*)** — *Harga: 200 Gold*
   - Bulu cokelat kastanye tebal, pelana merah ksatria, surai espresso lebat, dan derap langkah kaki mantap!
   - ⚡ **Kecepatan +70%**, derap langkah berdebu, dan suara langkah kaki tapal kuda otentik.
2. 🐗 **Babi Hutan Purba (*Armored War Boar*)** — *Harga: 350 Gold*
   - Tubuh gempal kekar, bulu mohawk landak berduri, armor pelindung baja di panggul, dan 2 pasang taring gading melengkung raksasa!
   - ⚡ **Kecepatan +60%**, 🛡️ **Pertahanan +20**, ❤️ **Max HP +80**.
3. 🐺 **Serigala Bayangan (*Dire Shadow Wolf*)** — *Harga: 500 Gold*
   - Predator malam berbulu abu-abu gelap dan perak, mata merah menyala membara, taring tajam terlihat, kalung berduri besi hitam, dan raungan lolongan serigala `playMountRoar('wolf')`!
   - ⚡ **Kecepatan +75%**, ⚔️ **Serangan +15**, 🎯 **Crit Rate +5%**, jejak asap bayangan.
4. 🐯 **Harimau Baja (*Armored Sabertooth Tiger*)** — *Harga: 700 Gold*
   - Kucing besar loreng jingga menyala dengan taring sabertooth gading panjang, pauldron pelindung bahu emas berkilau, dan mata zamrud hijau tajam!
   - ⚡ **Kecepatan +80%**, ⚔️ **Serangan +25**, lompatan terjang buas.
5. 🦅 **Burung Garuda Raksasa (*Giant Sky Roc / Phoenix*)** — *Harga: 950 Gold*
   - Raptor langit raksasa berbulu emas dan merah bara, paruh kait emas, cakar elang tajam, mahkota jambul bulu, dan sayap megah yang mengepak!
   - ⚡ **Kecepatan +85%**, 🪽 **Sayap Meluncur (*Airborne Gliding*)**, dapat melintasi aliran sungai tanpa basah!
6. 🦄 **Pegasus Surgawi (*Celestial Divine Pegasus*)** — *Harga: 1.400 Gold (LEGENDARY)*
   - Kuda bersayap suci berbulu mutiara putih, surai starlight biru cyan bercahaya (*glow*), tanduk emas celestial di dahi, tapal kaki emas murni, dan sayap bulu malaikat berayun luwes!
   - ⚡ **Kecepatan +100% (2x Lipat!)**, ✨ **Terbang Meluncur di Udara & Menyeberangi Air**, memunculkan jejak bintang stardust kosmik bercahaya!

---

### 2. 🏡 Bangunan Kandang Oakhaven (*Royal Stables*) & Peternak Barnaby
- Di sebelah timur alun-alun desa, berdiri megah **Kandang Hewan Oakhaven** lengkap dengan atap kayu beratap sirap, tumpukan jerami segar, palung air, dan papan nama berukir artistik!
- **NPC Peternak Barnaby (*Stable Master Barnaby*)**: Mengenakan topi rimba bulu merah dan menyapa pemain dengan ramah sambil merawat hewan. Dekati Barnaby dan tekan **`[E]`** atau klik langsung untuk membuka Toko Tunggangan!
- **Hewan Preview di Pekarangan**: Di sekitar kandang, terdapat kuda perang, babi hutan, burung besar, dan pegasus yang sedang beristirahat, bernapas, dan mengibaskan ekor secara hidup!

---

### 3. 🎮 Mekanik Naik & Turun (*Mount / Dismount [R]*):
- **Beli Dahulu di Toko**: Buka Toko (Tab `🐎 Tunggangan`) atau bicara dengan Peternak Barnaby. Setelah dibeli dengan Gold, tunggangan menjadi milik permanenmu!
- **Tombol Pintas `[R]` / Tombol `🐎` di Layar Sentuh**: Tekan `[R]` kapan saja di lapangan untuk langsung menaiki atau turun dari tunggangan pilihanmu.
- **Animasi Pengendara Presisi**: Saat menunggangi hewan, kaki hero membuka menjepit pelana, kedua tangan memegang tali kekang (*reins*), tubuh condong ke depan mengikuti inersia derap lari, dan jubah berkibar dinamis!
- **Efek Panggilan Magis (*Summon FX*)**: Saat menaiki hewan, muncul lingkaran sihir emas di tanah, semburan partikel khas sesuai jenis hewan, dan suara auman/ringkikan otentik!

---

## 🎨 Tampilan Visual Baru: Low-Poly Stylized 3D Isometric Art Style
- **Sudut Kamera Isometrik Diorama**: Sudut pandang kamera 3D isometrik miring khas game mobile RPG modern (Archero, Zelda, Clash Mini) dengan kedalaman dimensi yang menonjol dan enak dipandang.
- **Pencahayaan ACES Filmic Tone Mapping**: Saturasi warna alami, bayangan lembut berkontras tinggi (*soft PCF shadows*), serta kilau cahaya matahari yang hangat (*warm sunlight*).
- **Juicy Mobile UI**: Tombol-tombol HUD bergradasi glossy, floating badge status tunggangan aktif, dan animasi popup bersinar!

---

## 🎮 Panduan Kontrol Lengkap:

| Aksi | Keyboard & Mouse (PC) | Layar Sentuh / HP |
|---|---|---|
| **Bergerak** | `W, A, S, D` atau `Tombol Panah` | Virtual Joystick di kiri bawah |
| **Melompat** | **`Spasi`** *(Hop tinggi / lompat air)* | Tombol lompat **`🦘`** di HUD |
| **Naik / Turun Tunggangan (Mount)** | **`R`** *(Tunggangi Kuda, Pegasus, Serigala, dll.)* | Tombol tunggangan **`🐎`** di HUD |
| **Serang (Sesuai Senjata)** | **Klik Kiri Mouse** / Tombol **`F`, `J`, `Enter`** | Tombol serang `⚔️/🏹/🔮/🪓` |
| **Kuis Cepat / Latihan Soal** | Tombol **`K`** *(Buka Kuis Edukasi Kapan Saja)* | Tombol kuis **`🎓`** di HUD |
| **Jurus 1 Karakter** | Tombol `Q` *(Whirlwind, Nova Api, Panah Kipas, Bintang Suci, Shuriken, Gempa Es)* | Tombol skill `🌀/🔥/🏹/✨/🥷/❄️` |
| **Jurus 2 (Dash / Menghindar)** | Tombol `Shift` *(Dash Ksatria, Blink Api, Langkah Angin, Terjangan Beku)* | Tombol skill `💨/⚡/🍃/🌟/💥` |
| **Minum Ramuan (Potion)** | Tombol `H` *(Memulihkan +60 HP)* | Tombol ramuan `🧪` |
| **Ajak Bicara / Ambil / Peti** | Tombol `E` atau Klik NPC/Objek | Sentuh NPC/Objek di layar |
| **Menu Permainan / Pause** | Tombol `ESC` | Tombol `⚙️ MENU` di atas / kanan bawah |
| **Buka/Tutup Peta Dunia** | Tombol `M` | Sentuh Radar Mini-Map / Tombol `🗺️` |
| **Buku Catatan Misi** | Tombol `L` atau `Tab` | Tombol `📖 Buku Misi` di kiri atas |
| **Buka Toko & Tunggangan** | Tombol `E` (di toko/kandang) atau klik penjaga | Tombol toko `🏪` |
| **Atur Volume Cepat** | Scroll Roda Mouse di tombol `🎵` atau `🔊` | Geser slider di Menu Pause / Layar Judul |
| **Zoom Kamera Dekat/Jauh** | Putar **Roda Scroll Mouse** di area 3D | - |

---

## 🚀 Cara Menjalankan Game:

1. **Cara Paling Praktis (Windows):**  
   Cukup klik ganda file:  
   👉 [**`mainkan.bat`**](file:///c:/Users/Andriansyah/Downloads/gamerpg/mainkan.bat)  
   *(Browser akan otomatis terbuka dan game langsung siap dimainkan!)*

2. **Atau Buka Langsung File HTML:**  
   Buka file [**`index.html`**](file:///c:/Users/Andriansyah/Downloads/gamerpg/index.html) di Chrome, Edge, atau Firefox.

Nikmati dunia petualangan 3D yang megah, ramai, bersuara merdu, dan hidup! 🏰🌾🍺🐕🐉⭐⚔️🎵
