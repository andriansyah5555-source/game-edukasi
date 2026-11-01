/**
 * ============================================================================
 * BANK SOAL & DATA PEMBELAJARAN (MEDIA PEMBELAJARAN RPG)
 * ============================================================================
 * File ini dirancang khusus agar mudah dibaca dan diedit oleh siapa saja
 * (Guru, Siswa, Orang Tua, atau Pengembang Game).
 * 
 * PANDUAN CARA MENGEDIT / MENAMBAH SOAL:
 * 1. Setiap soal adalah satu objek di dalam array `RPG_QUESTIONS_DATA`.
 * 2. Anda bisa mengubah teks soal, pilihan jawaban, kunci jawaban, dan hadiahnya.
 * 3. Format struktur setiap soal:
 *    {
 *        id: 'soal_mtk_01',                  // Identitas unik soal (bebas, tidak boleh sama)
 *        subject: 'Matematika',              // Nama Mata Pelajaran: 'Matematika', 'IPA', 'IPS', 'Bahasa Indonesia', 'Bahasa Inggris', dll.
 *        category: 'mushroom',               // Kategori game:
 *                                            //   'mushroom' -> Soal saat memetik jamur ajaib
 *                                            //   'portal'   -> Soal saat masuk portal dimensi
 *                                            //   'npc'      -> Soal saat interaksi dengan NPC warga desa
 *                                            //   'chest'    -> Soal saat membuka peti harta karun
 *                                            //   'general'  -> Soal umum (bisa muncul di mana saja)
 *        difficulty: 'Mudah',                // 'Mudah', 'Sedang', atau 'Sulit'
 *        npcName: 'Village Elder',           // (Opsional) Nama NPC khusus yang memberikan soal ini
 *        question: 'Berapa hasil 15 x 4?',  // Teks pertanyaan yang diajukan ke pemain
 *        options: [                          // 4 pilihan jawaban
 *            'A. 50',
 *            'B. 60',
 *            'C. 70',
 *            'D. 80'
 *        ],
 *        correctIndex: 1,                    // Indeks jawaban benar (0 = A, 1 = B, 2 = C, 3 = D)
 *        explanation: '15 dikali 4 sama dengan 60.', // Penjelasan materi edukasi
 *        reward: {                           // Hadiah jika pemain menjawab benar:
 *            points: 25,                     // Poin Pembelajaran / Skor Kuis
 *            gold: 50,                       // Emas / Duit game
 *            hp: 30,                         // Pemulihan Darah (HP) pemain
 *            exp: 40                         // Poin Pengalaman (EXP) pemain
 *        }
 *    }
 * ============================================================================
 */

const RPG_QUESTIONS_DATA = [
    // -------------------------------------------------------------------------
    // KATEGORI 1: JAMUR AJAIB (MUSHROOM) - SAINS, BIOLOGI, MATEMATIKA ALAM
    // -------------------------------------------------------------------------
    {
        id: 'shroom_ipa_01',
        subject: 'IPA (Sains & Biologi)',
        category: 'mushroom',
        difficulty: 'Mudah',
        question: 'Zat hijau daun pada tumbuhan yang berfungsi menangkap cahaya matahari untuk fotosintesis disebut...?',
        options: [
            'A. Stomata',
            'B. Klorofil',
            'C. Epidermis',
            'D. Floem'
        ],
        correctIndex: 1,
        explanation: 'Klorofil adalah zat hijau daun yang menyerap energi cahaya matahari untuk proses pembuatan makanan (fotosintesis).',
        reward: { points: 20, gold: 50, hp: 30, exp: 35 }
    },
    {
        id: 'shroom_ipa_02',
        subject: 'IPA (Sains)',
        category: 'mushroom',
        difficulty: 'Mudah',
        question: 'Gas apakah yang diserap oleh tumbuhan hijau saat proses fotosintesis di siang hari?',
        options: [
            'A. Karbondioksida (CO2)',
            'B. Oksigen (O2)',
            'C. Nitrogen (N2)',
            'D. Helium (He)'
        ],
        correctIndex: 0,
        explanation: 'Tumbuhan menyerap karbondioksida (CO2) dan air, lalu mengubahnya menjadi glukosa dan oksigen (O2) melalui fotosintesis.',
        reward: { points: 20, gold: 50, hp: 35, exp: 40 }
    },
    {
        id: 'shroom_ipa_03',
        subject: 'IPA (Biologi Jamur)',
        category: 'mushroom',
        difficulty: 'Sedang',
        question: 'Jamur tidak memiliki klorofil dan memperoleh makanan dengan menguraikan sisa organisme mati. Peran jamur dalam ekosistem adalah sebagai...?',
        options: [
            'A. Produsen utama',
            'B. Konsumen tingkat satu',
            'C. Dekomposer (Pengurai)',
            'D. Predator puncak'
        ],
        correctIndex: 2,
        explanation: 'Jamur bertindak sebagai dekomposer (pengurai) yang menguraikan zat organik menjadi mineral tanah yang menyuburkan lingkungan.',
        reward: { points: 25, gold: 60, hp: 40, exp: 45 }
    },
    {
        id: 'shroom_mtk_01',
        subject: 'Matematika (Aritmatika)',
        category: 'mushroom',
        difficulty: 'Mudah',
        question: 'Jika 1 tangkai jamur menghasilkan 12 tetes ramuan herbal, berapakah tetes ramuan yang dihasilkan dari 5 tangkai jamur?',
        options: [
            'A. 50 tetes',
            'B. 55 tetes',
            'C. 60 tetes',
            'D. 65 tetes'
        ],
        correctIndex: 2,
        explanation: '12 x 5 = 60 tetes ramuan herbal.',
        reward: { points: 20, gold: 55, hp: 30, exp: 35 }
    },
    {
        id: 'shroom_ipa_04',
        subject: 'IPA (Wujud Zat)',
        category: 'mushroom',
        difficulty: 'Mudah',
        question: 'Peristiwa perubahan wujud benda dari cair menjadi gas saat air mendidih disebut...?',
        options: [
            'A. Membeku',
            'B. Menguap',
            'C. Menyublim',
            'D. Mengembun'
        ],
        correctIndex: 1,
        explanation: 'Menguap adalah proses perubahan wujud zat dari cair menjadi gas saat menerima energi kalor (panas).',
        reward: { points: 20, gold: 50, hp: 25, exp: 30 }
    },
    {
        id: 'shroom_ipa_05',
        subject: 'IPA (Ekosistem)',
        category: 'mushroom',
        difficulty: 'Sedang',
        question: 'Hubungan saling menguntungkan antara dua makhluk hidup yang berbeda jenis dinamakan simbiosis...?',
        options: [
            'A. Parasitisme',
            'B. Komensalisme',
            'C. Mutualisme',
            'D. Amensalisme'
        ],
        correctIndex: 2,
        explanation: 'Simbiosis mutualisme adalah interaksi dua organisme yang saling memberikan keuntungan satu sama lain (misal: lebah dan bunga).',
        reward: { points: 25, gold: 65, hp: 35, exp: 45 }
    },

    // -------------------------------------------------------------------------
    // KATEGORI 2: PORTAL DIMENSI (PORTAL) - GEOGRAFI, ASTRONOMI, FISIKA, INGGRIS
    // -------------------------------------------------------------------------
    {
        id: 'portal_geo_01',
        subject: 'IPS (Geografi)',
        category: 'portal',
        difficulty: 'Mudah',
        question: 'Pulau manakah di Indonesia yang merupakan pulau terluas kedua di dunia setelah Greenland?',
        options: [
            'A. Pulau Jawa',
            'B. Pulau Papua (Irian)',
            'C. Pulau Kalimantan',
            'D. Pulau Sumatera'
        ],
        correctIndex: 1,
        explanation: 'Pulau Papua (New Guinea) adalah pulau terbesar kedua di dunia dengan luas sekitar 785.753 km² setelah Greenland.',
        reward: { points: 30, gold: 80, hp: 45, exp: 50 }
    },
    {
        id: 'portal_ipa_01',
        subject: 'IPA (Tata Surya)',
        category: 'portal',
        difficulty: 'Mudah',
        question: 'Planet apakah di Tata Surya yang memiliki ukuran terbesar dan terkenal dengan Bintik Merah Raksasanya?',
        options: [
            'A. Mars',
            'B. Saturnus',
            'C. Jupiter',
            'D. Neptunus'
        ],
        correctIndex: 2,
        explanation: 'Jupiter adalah planet terbesar di Tata Surya kita dengan diameter sekitar 11 kali diameter Bumi.',
        reward: { points: 30, gold: 80, hp: 50, exp: 55 }
    },
    {
        id: 'portal_ipa_02',
        subject: 'IPA (Fisika Gaya)',
        category: 'portal',
        difficulty: 'Sedang',
        question: 'Gaya tarik tak kasat mata yang menarik benda-benda menuju pusat Bumi sehingga kita tidak melayang disebut gaya...?',
        options: [
            'A. Magnet',
            'B. Gravitasi',
            'C. Gesek',
            'D. Pegas'
        ],
        correctIndex: 1,
        explanation: 'Gaya gravitasi bumi menarik semua benda bermassa menuju pusat massa Bumi dengan percepatan sekitar 9,8 m/s².',
        reward: { points: 30, gold: 85, hp: 40, exp: 50 }
    },
    {
        id: 'portal_eng_01',
        subject: 'Bahasa Inggris',
        category: 'portal',
        difficulty: 'Mudah',
        question: 'What is the opposite meaning (antonym) of the word "ANCIENT" (Kuno)?',
        options: [
            'A. Old',
            'B. Historic',
            'C. Modern',
            'D. Powerful'
        ],
        correctIndex: 2,
        explanation: '"Ancient" artinya kuno/purba, lawan katanya adalah "Modern" (terkini/baru).',
        reward: { points: 25, gold: 75, hp: 35, exp: 45 }
    },
    {
        id: 'portal_mtk_01',
        subject: 'Matematika (Geometri)',
        category: 'portal',
        difficulty: 'Sedang',
        question: 'Berapakah keliling dari sebuah lingkaran portal jika panjang diameternya adalah 14 meter? (Gunakan π = 22/7)',
        options: [
            'A. 28 meter',
            'B. 44 meter',
            'C. 88 meter',
            'D. 154 meter'
        ],
        correctIndex: 1,
        explanation: 'Rumus keliling lingkaran: K = π x d = (22/7) x 14 = 44 meter.',
        reward: { points: 35, gold: 100, hp: 50, exp: 60 }
    },
    {
        id: 'portal_geo_02',
        subject: 'IPS (Geografi Dunia)',
        category: 'portal',
        difficulty: 'Sedang',
        question: 'Selat yang memisahkan antara Pulau Jawa dan Pulau Sumatera di Indonesia dinamakan...?',
        options: [
            'A. Selat Malaka',
            'B. Selat Sunda',
            'C. Selat Makassar',
            'D. Selat Bali'
        ],
        correctIndex: 1,
        explanation: 'Selat Sunda adalah selat strategis yang menghubungkan Laut Jawa dengan Samudra Hindia, memisahkan Jawa dan Sumatera.',
        reward: { points: 30, gold: 90, hp: 40, exp: 50 }
    },

    // -------------------------------------------------------------------------
    // KATEGORI 3: INTERAKSI DENGAN NPC (NPC CHALLENGE) - SEJARAH, BAHASA, SAINS
    // -------------------------------------------------------------------------
    {
        id: 'npc_elder_01',
        subject: 'IPS (Sejarah Indonesia)',
        category: 'npc',
        npcName: 'Village Elder',
        difficulty: 'Mudah',
        question: 'Siapakah dua tokoh Proklamator yang menandatangani naskah Proklamasi Kemerdekaan Indonesia pada 17 Agustus 1945?',
        options: [
            'A. Ir. Soekarno & Mohammad Hatta',
            'B. Soepomo & Mohammad Yamin',
            'C. Ki Hajar Dewantara & Sutan Sjahrir',
            'D. Jenderal Soedirman & Bung Tomo'
        ],
        correctIndex: 0,
        explanation: 'Teks Proklamasi ditandatangani oleh Ir. Soekarno dan Drs. Mohammad Hatta atas nama bangsa Indonesia.',
        reward: { points: 35, gold: 100, hp: 50, exp: 60 }
    },
    {
        id: 'npc_elder_02',
        subject: 'PPKn & Sejarah',
        category: 'npc',
        npcName: 'Village Elder',
        difficulty: 'Sedang',
        question: 'Kerajaan maritim bercorak Hindu-Buddha di Nusantara yang berhasil menyatukan nusantara di bawah Sumpah Palapa Gajah Mada adalah...?',
        options: [
            'A. Kerajaan Sriwijaya',
            'B. Kerajaan Kutai',
            'C. Kerajaan Majapahit',
            'D. Kerajaan Tarumanegara'
        ],
        correctIndex: 2,
        explanation: 'Patih Gajah Mada dari Kerajaan Majapahit mengucapkan Sumpah Palapa untuk mempersatukan wilayah Nusantara.',
        reward: { points: 35, gold: 110, hp: 55, exp: 65 }
    },
    {
        id: 'npc_alchemist_01',
        subject: 'IPA (Sains Kimia & Biologi)',
        category: 'npc',
        npcName: 'Alchemist Sylva',
        difficulty: 'Sedang',
        question: 'Organ tubuh manusia yang berfungsi utama memompa darah kaya oksigen ke seluruh bagian tubuh adalah...?',
        options: [
            'A. Paru-paru',
            'B. Hati (Liver)',
            'C. Jantung',
            'D. Ginjal'
        ],
        correctIndex: 2,
        explanation: 'Jantung berdetak tanpa henti untuk memompa darah beroksigen melalui pembuluh darah ke seluruh organ dan sel tubuh.',
        reward: { points: 30, gold: 90, hp: 60, exp: 50 }
    },
    {
        id: 'npc_alchemist_02',
        subject: 'IPA (Kesehatan)',
        category: 'npc',
        npcName: 'Alchemist Sylva',
        difficulty: 'Mudah',
        question: 'Vitamin apakah yang penting untuk kesehatan mata dan banyak terkandung dalam wortel serta sayuran jingga?',
        options: [
            'A. Vitamin A',
            'B. Vitamin B',
            'C. Vitamin C',
            'D. Vitamin D'
        ],
        correctIndex: 0,
        explanation: 'Vitamin A (beta-karoten) berperan penting menjaga fungsi retina dan kejernihan kornea mata.',
        reward: { points: 25, gold: 75, hp: 45, exp: 40 }
    },
    {
        id: 'npc_guard_01',
        subject: 'Matematika (Logika & Kecepatan)',
        category: 'npc',
        npcName: 'Penjaga Gerbang Roland',
        difficulty: 'Sedang',
        question: 'Seorang prajurit menunggang kuda menempuh jarak 60 km dalam waktu 2 jam. Berapakah kecepatan rata-rata prajurit tersebut?',
        options: [
            'A. 20 km/jam',
            'B. 25 km/jam',
            'C. 30 km/jam',
            'D. 40 km/jam'
        ],
        correctIndex: 2,
        explanation: 'Kecepatan = Jarak / Waktu = 60 km / 2 jam = 30 km/jam.',
        reward: { points: 30, gold: 80, hp: 40, exp: 50 }
    },
    {
        id: 'npc_bard_01',
        subject: 'Bahasa Indonesia (Peribahasa)',
        category: 'npc',
        npcName: 'Lyra the Bard',
        difficulty: 'Mudah',
        question: 'Apakah makna dari peribahasa terkenal: "Tong kosong berbunyi nyaring"?',
        options: [
            'A. Orang yang kaya selalu suka bersedekah',
            'B. Orang yang bodoh atau tak berilmu biasanya banyak membual/berbicara',
            'C. Orang yang pendiam tetapi memiliki ilmu sangat tinggi',
            'D. Barang antik memiliki nilai sejarah berharga'
        ],
        correctIndex: 1,
        explanation: '"Tong kosong berbunyi nyaring" mengibaratkan orang yang minim pengetahuan namun suka banyak bicara dan membanggakan diri.',
        reward: { points: 30, gold: 85, hp: 35, exp: 45 }
    },
    {
        id: 'npc_bard_02',
        subject: 'Bahasa Indonesia (Sinonim)',
        category: 'npc',
        npcName: 'Lyra the Bard',
        difficulty: 'Mudah',
        question: 'Sinonim (persamaan kata) yang paling tepat untuk kata "HARMONI" dalam musik adalah...?',
        options: [
            'A. Kebisingan',
            'B. Keselarasan',
            'C. Perpecahan',
            'D. Kejutan'
        ],
        correctIndex: 1,
        explanation: 'Harmoni bermakna keselarasan atau perpaduan yang indah dan seimbang antar nada atau elemen.',
        reward: { points: 25, gold: 75, hp: 30, exp: 40 }
    },
    {
        id: 'npc_blacksmith_01',
        subject: 'IPA (Fisika Sifat Logam)',
        category: 'npc',
        npcName: 'Blacksmith Vulcan',
        difficulty: 'Sedang',
        question: 'Benda yang mampu menghantarkan panas dan arus listrik dengan sangat baik disebut sebagai...?',
        options: [
            'A. Isolator',
            'B. Konduktor',
            'C. Radiator',
            'D. Reflektor'
        ],
        correctIndex: 1,
        explanation: 'Konduktor adalah bahan (seperti besi, tembaga, dan baja) yang mudah menghantarkan panas dan listrik.',
        reward: { points: 30, gold: 95, hp: 40, exp: 50 }
    },
    {
        id: 'npc_shopkeeper_01',
        subject: 'Matematika (Diskon & Transaksi)',
        category: 'npc',
        npcName: 'Shopkeeper',
        difficulty: 'Sedang',
        question: 'Sebuah perisai dijual seharga 200 Gold. Jika pedagang memberikan diskon sebesar 20%, berapakah harga yang harus dibayar?',
        options: [
            'A. 140 Gold',
            'B. 150 Gold',
            'C. 160 Gold',
            'D. 180 Gold'
        ],
        correctIndex: 2,
        explanation: 'Besar diskon = 20% x 200 = 40 Gold. Harga akhir = 200 - 40 = 160 Gold.',
        reward: { points: 35, gold: 120, hp: 50, exp: 60 }
    },
    {
        id: 'npc_wizard_01',
        subject: 'Bahasa Inggris (Tenses)',
        category: 'npc',
        npcName: 'Angel Wizard',
        difficulty: 'Sedang',
        question: 'Complete the sentence: "Yesterday, the brave hero _______ the dark dungeon."',
        options: [
            'A. enters',
            'B. entered',
            'C. entering',
            'D. will enter'
        ],
        correctIndex: 1,
        explanation: 'Karena menggunakan keterangan waktu lampau "Yesterday", kata kerja yang tepat adalah bentuk Simple Past Tense (V2) yaitu "entered".',
        reward: { points: 30, gold: 90, hp: 45, exp: 50 }
    },
    {
        id: 'npc_drake_01',
        subject: 'IPS (Sejarah Candi)',
        category: 'npc',
        npcName: 'Archaeologist Drake',
        difficulty: 'Sedang',
        question: 'Candi megah bercorak Buddha terbesar di dunia yang terletak di Magelang, Jawa Tengah adalah Candi...?',
        options: [
            'A. Candi Prambanan',
            'B. Candi Borobudur',
            'C. Candi Mendut',
            'D. Candi Penataran'
        ],
        correctIndex: 1,
        explanation: 'Candi Borobudur dibangun pada masa Dinasti Syailendra pada abad ke-8 dan diakui sebagai warisan dunia UNESCO.',
        reward: { points: 35, gold: 105, hp: 50, exp: 60 }
    },

    // -------------------------------------------------------------------------
    // KATEGORI 4: PETI HARTA KARUN (CHEST) - SANDI ANGKA, LOGIKA, DAN TEKA-TEKI
    // -------------------------------------------------------------------------
    {
        id: 'chest_mtk_01',
        subject: 'Matematika (FPB & KPK)',
        category: 'chest',
        difficulty: 'Sedang',
        question: 'Berapakah Faktor Persekutuan Terbesar (FPB) dari angka 24 dan 36?',
        options: [
            'A. 6',
            'B. 8',
            'C. 12',
            'D. 18'
        ],
        correctIndex: 2,
        explanation: 'Faktor dari 24 = {1, 2, 3, 4, 6, 8, 12, 24}. Faktor dari 36 = {1, 2, 3, 4, 6, 9, 12, 18, 36}. FPB terbesar adalah 12.',
        reward: { points: 40, gold: 150, hp: 60, exp: 75 }
    },
    {
        id: 'chest_mtk_02',
        subject: 'Matematika (Pecahan)',
        category: 'chest',
        difficulty: 'Mudah',
        question: 'Bentuk persen (%) yang senilai dengan pecahan 3/4 adalah...?',
        options: [
            'A. 25%',
            'B. 50%',
            'C. 75%',
            'D. 80%'
        ],
        correctIndex: 2,
        explanation: '3/4 x 100% = 75%.',
        reward: { points: 30, gold: 120, hp: 45, exp: 50 }
    },
    {
        id: 'chest_logika_01',
        subject: 'Logika & Angka',
        category: 'chest',
        difficulty: 'Sedang',
        question: 'Perhatikan pola deret angka berikut: 3, 6, 12, 24, ... Angka berikutnya untuk membuka gembok peti adalah?',
        options: [
            'A. 36',
            'B. 40',
            'C. 48',
            'D. 52'
        ],
        correctIndex: 2,
        explanation: 'Pola deret adalah dikali dua (x2) pada tiap langkah: 3 x 2 = 6, 6 x 2 = 12, 12 x 2 = 24, 24 x 2 = 48.',
        reward: { points: 40, gold: 160, hp: 55, exp: 70 }
    },
    {
        id: 'chest_mtk_03',
        subject: 'Matematika (Aljabar Dasar)',
        category: 'chest',
        difficulty: 'Sedang',
        question: 'Jika 3x + 15 = 45, berapakah nilai x yang tepat?',
        options: [
            'A. 5',
            'B. 10',
            'C. 15',
            'D. 20'
        ],
        correctIndex: 1,
        explanation: '3x = 45 - 15 -> 3x = 30 -> x = 30 / 3 = 10.',
        reward: { points: 35, gold: 140, hp: 50, exp: 65 }
    },
    {
        id: 'chest_ipa_01',
        subject: 'IPA (Sains Energi)',
        category: 'chest',
        difficulty: 'Mudah',
        question: 'Energi yang tersimpan di dalam makanan dan bahan bakar dinamakan energi...?',
        options: [
            'A. Kinetik',
            'B. Kimia',
            'C. Listrik',
            'D. Nuklir'
        ],
        correctIndex: 1,
        explanation: 'Energi kimia tersimpan dalam ikatan molekul senyawa (seperti nutrisi makanan, baterai, dan minyak bumi).',
        reward: { points: 30, gold: 120, hp: 40, exp: 55 }
    },

    // -------------------------------------------------------------------------
    // KATEGORI 5: UMUM & SELURUH MAPEL (BAHASA, TIK, SAINS, SEJARAH, LOGIKA)
    // -------------------------------------------------------------------------
    {
        id: 'gen_indo_01',
        subject: 'Bahasa Indonesia (Struktur Kalimat)',
        category: 'general',
        difficulty: 'Mudah',
        question: 'Pada kalimat "Arthur menebas monster dengan pedang sakti", manakah kata yang berfungsi sebagai OBJEK?',
        options: [
            'A. Arthur',
            'B. Menebas',
            'C. Monster',
            'D. Pedang sakti'
        ],
        correctIndex: 2,
        explanation: 'Subjek = Arthur, Predikat = menebas, Objek = monster, Keterangan alat = dengan pedang sakti.',
        reward: { points: 25, gold: 60, hp: 30, exp: 40 }
    },
    {
        id: 'gen_indo_02',
        subject: 'Bahasa Indonesia (Antonim)',
        category: 'general',
        difficulty: 'Mudah',
        question: 'Lawan kata (antonim) dari kata "OPTIMIS" adalah...?',
        options: [
            'A. Dinamis',
            'B. Realistis',
            'C. Pesimis',
            'D. Harmonis'
        ],
        correctIndex: 2,
        explanation: 'Optimis berarti selalu berpengharapan baik; kebalikannya adalah pesimis (mudah putus asa/berpandangan buruk).',
        reward: { points: 20, gold: 50, hp: 25, exp: 35 }
    },
    {
        id: 'gen_eng_01',
        subject: 'Bahasa Inggris (Vocabulary)',
        category: 'general',
        difficulty: 'Mudah',
        question: 'What is the English word for "Perisai Pelindung"?',
        options: [
            'A. Sword',
            'B. Helmet',
            'C. Shield',
            'D. Boots'
        ],
        correctIndex: 2,
        explanation: 'Perisai dalam bahasa Inggris adalah "Shield". (Sword = Pedang, Helmet = Helm, Boots = Sepatu bot).',
        reward: { points: 20, gold: 50, hp: 25, exp: 30 }
    },
    {
        id: 'gen_eng_02',
        subject: 'Bahasa Inggris (Reading)',
        category: 'general',
        difficulty: 'Sedang',
        question: '"She has lived in the village since 2020." The sentence uses which tense?',
        options: [
            'A. Simple Present Tense',
            'B. Present Continuous Tense',
            'C. Present Perfect Tense',
            'D. Simple Past Tense'
        ],
        correctIndex: 2,
        explanation: 'Struktur "has + V3 (lived)" merupakan rumus dari Present Perfect Tense untuk menyatakan aktivitas dari masa lalu yang masih berlanjut.',
        reward: { points: 30, gold: 80, hp: 35, exp: 45 }
    },
    {
        id: 'gen_tik_01',
        subject: 'Teknologi & Informatika (TIK)',
        category: 'general',
        difficulty: 'Mudah',
        question: 'Perangkat keras komputer yang sering disebut sebagai "otak" komputer karena bertugas memproses semua instruksi adalah...?',
        options: [
            'A. Harddisk (HDD)',
            'B. CPU (Processor)',
            'C. RAM',
            'D. Monitor'
        ],
        correctIndex: 1,
        explanation: 'CPU (Central Processing Unit) berfungsi mengendalikan seluruh sistem dan memproses data perhitungan.',
        reward: { points: 25, gold: 70, hp: 35, exp: 40 }
    },
    {
        id: 'gen_tik_02',
        subject: 'Teknologi & Algoritma',
        category: 'general',
        difficulty: 'Sedang',
        question: 'Urutan langkah-langkah logis dan terstruktur untuk menyelesaikan suatu permasalahan tertentu dalam komputer disebut...?',
        options: [
            'A. Algoritma',
            'B. Database',
            'C. Firewall',
            'D. Bandwidth'
        ],
        correctIndex: 0,
        explanation: 'Algoritma adalah urutan instruksi logis bertahap untuk menyelesaikan suatu tugas pemrograman atau perhitungan.',
        reward: { points: 30, gold: 85, hp: 40, exp: 45 }
    },
    {
        id: 'gen_mtk_01',
        subject: 'Matematika (Luas Bangun Datar)',
        category: 'general',
        difficulty: 'Sedang',
        question: 'Sebuah taman berbentuk segitiga memiliki panjang alas 10 meter dan tinggi 8 meter. Berapakah luas taman tersebut?',
        options: [
            'A. 36 meter persegi',
            'B. 40 meter persegi',
            'C. 80 meter persegi',
            'D. 18 meter persegi'
        ],
        correctIndex: 1,
        explanation: 'Rumus luas segitiga = 1/2 x alas x tinggi = 1/2 x 10 x 8 = 40 meter persegi.',
        reward: { points: 30, gold: 85, hp: 35, exp: 45 }
    },
    {
        id: 'gen_ips_01',
        subject: 'IPS (Kenegaraan ASEAN)',
        category: 'general',
        difficulty: 'Sedang',
        question: 'Gedung Sekretariat organisasi regional ASEAN (Perhimpunan Bangsa-Bangsa Asia Tenggara) berlokasi di kota...?',
        options: [
            'A. Bangkok (Thailand)',
            'B. Kuala Lumpur (Malaysia)',
            'C. Jakarta (Indonesia)',
            'D. Singapura'
        ],
        correctIndex: 2,
        explanation: 'Sekretariat Tetap ASEAN diresmikan di Kebayoran Baru, Jakarta, Indonesia sejak tahun 1981.',
        reward: { points: 35, gold: 90, hp: 40, exp: 50 }
    },
    {
        id: 'gen_ipa_01',
        subject: 'IPA (Sains Bunyi)',
        category: 'general',
        difficulty: 'Mudah',
        question: 'Gelombang bunyi TIDAK DAPAT merambat melalui media...?',
        options: [
            'A. Udara',
            'B. Air',
            'C. Besi padat',
            'D. Ruang hampa udara (vakum)'
        ],
        correctIndex: 3,
        explanation: 'Bunyi adalah gelombang mekanik yang membutuhkan medium perambatan (padat, cair, gas), sehingga bunyi tidak bisa merambat di ruang hampa.',
        reward: { points: 25, gold: 70, hp: 30, exp: 40 }
    },
    {
        id: 'gen_ipa_02',
        subject: 'IPA (Tata Surya)',
        category: 'general',
        difficulty: 'Mudah',
        question: 'Benda langit yang mengelilingi planet dan memantulkan sinar matahari (seperti Bulan terhadap Bumi) disebut...?',
        options: [
            'A. Asteroid',
            'B. Komet',
            'C. Satelit alami',
            'D. Meteorit'
        ],
        correctIndex: 2,
        explanation: 'Bulan adalah satelit alami Bumi yang tidak menghasilkan cahaya sendiri melainkan memantulkan cahaya matahari.',
        reward: { points: 25, gold: 75, hp: 30, exp: 35 }
    }
];

/**
 * ============================================================================
 * KELAS PENGELOLA BANK SOAL (QuestionDatabase)
 * ============================================================================
 */
class QuestionDatabase {
    constructor(questionArray) {
        this.questions = Array.isArray(questionArray) ? questionArray : [];
        this.usedQuestionIds = new Set();
        this.lastPickedId = null;
    }

    /**
     * Mengambil 1 soal acak berdasarkan kategori, mata pelajaran, atau nama NPC.
     * Soal diacak secara dinamis dan opsi pilihan (A, B, C, D) turut diacak agar bervariasi.
     * @param {string|null} category - 'mushroom', 'portal', 'npc', 'chest', 'general'
     * @param {string|null} subject - contoh: 'Matematika', 'IPA', dll
     * @param {string|null} npcName - nama NPC penanya
     */
    getRandomQuestion(category = null, subject = null, npcName = null) {
        let pool = [...this.questions];

        // Filter berdasarkan nama NPC jika ada
        if (npcName) {
            const npcPool = pool.filter(q => q.npcName && q.npcName.toLowerCase() === npcName.toLowerCase());
            if (npcPool.length > 0) {
                pool = npcPool;
            }
        }

        // Filter berdasarkan kategori game jika bukan general
        if (category && category !== 'general' && (!npcName || pool.length === this.questions.length)) {
            const catPool = pool.filter(q => q.category === category || q.category === 'general');
            if (catPool.length > 0) {
                pool = catPool;
            }
        }

        // Filter berdasarkan mata pelajaran jika ditentukan
        if (subject) {
            const subPool = pool.filter(q => q.subject.toLowerCase().includes(subject.toLowerCase()));
            if (subPool.length > 0) {
                pool = subPool;
            }
        }

        if (pool.length === 0) return null;

        // Reset riwayat untuk kategori/pool ini jika semua soal di pool sudah pernah keluar
        const allPoolUsed = pool.every(q => this.usedQuestionIds.has(q.id));
        if (allPoolUsed) {
            pool.forEach(q => this.usedQuestionIds.delete(q.id));
        }

        // Prioritaskan soal yang belum pernah ditanyakan pada sesi ini
        let unused = pool.filter(q => !this.usedQuestionIds.has(q.id));
        if (unused.length === 0) unused = pool;

        // Hindari mengulang soal yang persis sama berturut-turut jika pool memiliki lebih dari 1 soal
        if (unused.length > 1 && this.lastPickedId) {
            const diffFromLast = unused.filter(q => q.id !== this.lastPickedId);
            if (diffFromLast.length > 0) {
                unused = diffFromLast;
            }
        }

        const picked = unused[Math.floor(Math.random() * unused.length)];
        this.usedQuestionIds.add(picked.id);
        this.lastPickedId = picked.id;

        // Gandakan objek dan acak susunan pilihan jawaban (A, B, C, D)
        return this.cloneWithShuffledOptions(picked);
    }

    /**
     * Mengacak urutan opsi pilihan (A/B/C/D) dan menyesuaikan correctIndex secara otomatis
     * @param {Object} q - Objek soal
     * @returns {Object} Objek soal baru dengan opsi teracak
     */
    cloneWithShuffledOptions(q) {
        if (!q || !Array.isArray(q.options) || q.options.length < 2) return q;

        const originalCorrectText = q.options[q.correctIndex] || '';
        const cleanCorrectText = originalCorrectText.replace(/^[A-D]\.\s*/, '').trim();

        // Bersihkan prefix huruf lama (A. / B. / C. / D.)
        const rawOptions = q.options.map(opt => opt.replace(/^[A-D]\.\s*/, '').trim());

        // Acak menggunakan algoritma Fisher-Yates
        const shuffled = [...rawOptions];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Cari posisi baru kunci jawaban
        let newCorrectIndex = shuffled.findIndex(text => text === cleanCorrectText);
        if (newCorrectIndex === -1) newCorrectIndex = 0;

        // Pasang kembali label A, B, C, D
        const letters = ['A', 'B', 'C', 'D'];
        const formattedOptions = shuffled.map((text, idx) => `${letters[idx]}. ${text}`);

        return {
            ...q,
            options: formattedOptions,
            correctIndex: newCorrectIndex
        };
    }

    getById(id) {
        return this.questions.find(q => q.id === id) || null;
    }

    getAll() {
        return this.questions;
    }

    addQuestion(newQuestion) {
        if (!newQuestion || !newQuestion.id) return false;
        this.questions.push(newQuestion);
        return true;
    }
}

// Inisialisasi Database Soal Global
window.QuestionDB = new QuestionDatabase(RPG_QUESTIONS_DATA);
