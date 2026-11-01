// SVG Icons and Portraits matching the game screenshot exactly
const GameAssets = {
    // Hero Dialogue Portrait (Blue spiky hair, fierce red eyes, red scarf, warrior stance)
    heroPortrait: `
    <svg viewBox="0 0 160 180" xmlns="http://www.w3.org/2000/svg" class="portrait-svg">
        <defs>
            <linearGradient id="heroHair" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#5588ff"/>
                <stop offset="50%" stop-color="#2454d6"/>
                <stop offset="100%" stop-color="#122c8a"/>
            </linearGradient>
            <linearGradient id="heroHairLight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#88b5ff"/>
                <stop offset="100%" stop-color="#3366ee"/>
            </linearGradient>
            <linearGradient id="heroSkin" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ffe3cf"/>
                <stop offset="100%" stop-color="#f5c29f"/>
            </linearGradient>
            <linearGradient id="heroCape" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ff3344"/>
                <stop offset="70%" stop-color="#cc1122"/>
                <stop offset="100%" stop-color="#880011"/>
            </linearGradient>
            <filter id="heroGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.5"/>
            </filter>
        </defs>

        <!-- Background aura -->
        <circle cx="80" cy="90" r="70" fill="rgba(40,80,200,0.15)"/>

        <!-- Back Cape -->
        <path d="M 35 125 C 20 145 15 170 10 180 L 150 180 C 145 165 140 145 125 125 Z" fill="url(#heroCape)" filter="url(#heroGlow)"/>

        <!-- Back Spikes of Blue Hair -->
        <polygon points="25,50 5,75 35,80" fill="#122c8a"/>
        <polygon points="135,50 155,75 125,80" fill="#122c8a"/>
        <polygon points="15,90 2,115 30,110" fill="#122c8a"/>
        <polygon points="145,90 158,115 130,110" fill="#122c8a"/>

        <!-- Ears -->
        <ellipse cx="40" cy="95" rx="7" ry="10" fill="#f5c29f"/>
        <ellipse cx="120" cy="95" rx="7" ry="10" fill="#f5c29f"/>

        <!-- Face Base -->
        <polygon points="40,80 120,80 115,115 80,135 45,115" fill="url(#heroSkin)"/>
        <!-- Cheek Blushes -->
        <ellipse cx="52" cy="105" rx="6" ry="3" fill="#ff9999" opacity="0.6"/>
        <ellipse cx="108" cy="105" rx="6" ry="3" fill="#ff9999" opacity="0.6"/>

        <!-- Fierce Eyes -->
        <!-- Left Eye -->
        <polygon points="48,88 72,82 68,98 52,98" fill="#ffffff" stroke="#111" stroke-width="2"/>
        <polygon points="56,84 68,83 66,97 54,97" fill="#e72b4b"/>
        <ellipse cx="61" cy="90" rx="3" ry="5" fill="#88001b"/>
        <circle cx="58" cy="88" r="2" fill="#ffffff"/>
        <!-- Fierce Eyebrow Left -->
        <path d="M 45 84 L 74 78" stroke="#122c8a" stroke-width="4.5" stroke-linecap="round"/>

        <!-- Right Eye -->
        <polygon points="88,82 112,88 108,98 92,98" fill="#ffffff" stroke="#111" stroke-width="2"/>
        <polygon points="92,83 104,84 106,97 94,97" fill="#e72b4b"/>
        <ellipse cx="99" cy="90" rx="3" ry="5" fill="#88001b"/>
        <circle cx="96" cy="88" r="2" fill="#ffffff"/>
        <!-- Fierce Eyebrow Right -->
        <path d="M 86 78 L 115 84" stroke="#122c8a" stroke-width="4.5" stroke-linecap="round"/>

        <!-- Nose & Determined Gritted Mouth -->
        <polygon points="79,102 81,102 80,106" fill="#c47b53"/>
        <path d="M 70 118 Q 80 122 90 118" stroke="#331111" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- Tooth glint -->
        <rect x="76" y="117" width="8" height="2" fill="#ffffff"/>

        <!-- Massive Blue Spiky Hair Front & Bangs -->
        <polygon points="80,10 50,45 80,50" fill="url(#heroHairLight)"/>
        <polygon points="80,10 110,45 80,50" fill="url(#heroHair)"/>
        <polygon points="50,15 20,55 55,60" fill="url(#heroHairLight)"/>
        <polygon points="110,15 140,55 105,60" fill="url(#heroHair)"/>
        <polygon points="20,35 2,75 35,75" fill="url(#heroHairLight)"/>
        <polygon points="140,35 158,75 125,75" fill="url(#heroHair)"/>

        <!-- Hair bangs overlapping face -->
        <polygon points="55,55 45,90 65,75" fill="url(#heroHairLight)"/>
        <polygon points="75,55 78,85 88,72" fill="url(#heroHair)"/>
        <polygon points="95,55 112,88 102,72" fill="url(#heroHair)"/>
        <polygon points="35,65 30,95 48,82" fill="url(#heroHairLight)"/>
        <polygon points="125,65 130,95 112,82" fill="url(#heroHair)"/>

        <!-- Red Scarf / Cape Front Knot & Fold -->
        <path d="M 40 125 Q 80 145 120 125 Q 80 155 40 125 Z" fill="url(#heroCape)"/>
        <polygon points="72,130 88,130 92,160 80,168 68,160" fill="#ff3344" stroke="#880011" stroke-width="2"/>
        
        <!-- Muscular Arm & Black Brawler Glove (from screenshot pose) -->
        <rect x="18" y="140" width="28" height="30" rx="8" fill="#ffe3cf"/>
        <!-- Black spiked/brawler fist -->
        <circle cx="28" cy="165" r="14" fill="#22222a"/>
        <rect x="18" y="155" width="20" height="6" rx="3" fill="#444455"/>
        <circle cx="24" cy="160" r="2" fill="#dddddd"/>
        <circle cx="32" cy="160" r="2" fill="#dddddd"/>

        <!-- Right Brawler Glove -->
        <rect x="114" y="140" width="28" height="30" rx="8" fill="#ffe3cf"/>
        <circle cx="132" cy="165" r="14" fill="#22222a"/>
        <rect x="122" y="155" width="20" height="6" rx="3" fill="#444455"/>
    </svg>
    `,

    // Shopkeeper Portrait (Red-haired girl with twin pigtails/horns, red eyes, cute smile)
    shopkeeperPortrait: `
    <svg viewBox="0 0 160 180" xmlns="http://www.w3.org/2000/svg" class="portrait-svg">
        <defs>
            <linearGradient id="shopHair" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ff4455"/>
                <stop offset="50%" stop-color="#d61a30"/>
                <stop offset="100%" stop-color="#800a16"/>
            </linearGradient>
            <linearGradient id="shopSkin" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#fff0ea"/>
                <stop offset="100%" stop-color="#ffd5c4"/>
            </linearGradient>
        </defs>
        <!-- Background aura -->
        <circle cx="80" cy="90" r="70" fill="rgba(255,100,100,0.15)"/>

        <!-- Twin tails / Horns -->
        <path d="M 35 60 C 10 30 5 15 20 10 C 35 15 45 40 45 65 Z" fill="url(#shopHair)"/>
        <path d="M 125 60 C 150 30 155 15 140 10 C 125 15 115 40 115 65 Z" fill="url(#shopHair)"/>
        <!-- Fluffy twin pigtails -->
        <ellipse cx="22" cy="65" rx="14" ry="22" fill="#b01025"/>
        <ellipse cx="138" cy="65" rx="14" ry="22" fill="#b01025"/>

        <!-- Pointy Elf Ears -->
        <polygon points="35,85 10,80 35,95" fill="#ffd5c4"/>
        <polygon points="125,85 150,80 125,95" fill="#ffd5c4"/>

        <!-- Face -->
        <polygon points="40,75 120,75 115,115 80,135 45,115" fill="url(#shopSkin)"/>
        <ellipse cx="55" cy="108" rx="8" ry="4" fill="#ff7788" opacity="0.7"/>
        <ellipse cx="105" cy="108" rx="8" ry="4" fill="#ff7788" opacity="0.7"/>

        <!-- Cute Big Anime Red Eyes -->
        <ellipse cx="60" cy="92" rx="10" ry="14" fill="#ff1133"/>
        <ellipse cx="60" cy="94" rx="7" ry="10" fill="#770011"/>
        <circle cx="57" cy="88" r="4" fill="#ffffff"/>
        <circle cx="63" cy="98" r="2" fill="#ffffff"/>

        <ellipse cx="100" cy="92" rx="10" ry="14" fill="#ff1133"/>
        <ellipse cx="100" cy="94" rx="7" ry="10" fill="#770011"/>
        <circle cx="97" cy="88" r="4" fill="#ffffff"/>
        <circle cx="103" cy="98" r="2" fill="#ffffff"/>

        <!-- Cute Smiling Mouth with little fang -->
        <path d="M 72 118 Q 80 126 88 118 Z" fill="#aa1122"/>
        <polygon points="74,118 77,122 80,118" fill="#ffffff"/>

        <!-- Red Bangs -->
        <polygon points="80,45 65,80 80,72" fill="url(#shopHair)"/>
        <polygon points="80,45 95,80 80,72" fill="url(#shopHair)"/>
        <polygon points="50,48 40,82 58,74" fill="url(#shopHair)"/>
        <polygon points="110,48 120,82 102,74" fill="url(#shopHair)"/>

        <!-- Shopkeeper Maid/Merchant Dress -->
        <path d="M 45 135 L 115 135 L 130 180 L 30 180 Z" fill="#332222"/>
        <!-- White Apron Collar -->
        <path d="M 60 135 L 80 155 L 100 135 Z" fill="#ffffff"/>
        <rect x="70" y="155" width="20" height="25" fill="#fdfdfd"/>
    </svg>
    `,

    // Angel Wizard Portrait (Astral Hat, Celestial Blue Wings, Magic Staff)
    wizardPortrait: `
    <svg viewBox="0 0 160 180" xmlns="http://www.w3.org/2000/svg" class="portrait-svg">
        <defs>
            <linearGradient id="wizHat" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#4a3e7d"/>
                <stop offset="100%" stop-color="#24194c"/>
            </linearGradient>
            <linearGradient id="angelWing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#e0f4ff"/>
                <stop offset="50%" stop-color="#70d6ff"/>
                <stop offset="100%" stop-color="#3a86ff"/>
            </linearGradient>
        </defs>

        <!-- Feathered Angel Wings Glowing Behind -->
        <path d="M 35 70 C 5 40 0 10 30 15 C 20 40 40 60 45 75 Z" fill="url(#angelWing)" opacity="0.9"/>
        <path d="M 125 70 C 155 40 160 10 130 15 C 140 40 120 60 115 75 Z" fill="url(#angelWing)" opacity="0.9"/>

        <!-- Face -->
        <polygon points="45,80 115,80 110,120 80,135 50,120" fill="#fff5ec"/>
        <!-- Silver White Hair -->
        <path d="M 40 75 Q 80 60 120 75 L 125 120 L 110 115 L 100 125 L 80 95 L 60 125 L 50 115 L 35 120 Z" fill="#e2e8f0"/>

        <!-- Mystical Violet Eyes -->
        <circle cx="65" cy="98" r="6" fill="#8338ec"/>
        <circle cx="63" cy="96" r="2" fill="#fff"/>
        <circle cx="95" cy="98" r="6" fill="#8338ec"/>
        <circle cx="93" cy="96" r="2" fill="#fff"/>
        <path d="M 74 122 Q 80 125 86 122" stroke="#664455" stroke-width="2" fill="none"/>

        <!-- Wizard Robe -->
        <path d="M 40 135 L 120 135 L 135 180 L 25 180 Z" fill="#2d2250"/>
        <!-- Star Medallion -->
        <polygon points="80,140 83,148 91,148 85,153 87,161 80,156 73,161 75,153 69,148 77,148" fill="#ffd166"/>

        <!-- Big Pointy Wizard Hat with Crescent Star -->
        <ellipse cx="80" cy="72" rx="55" ry="16" fill="url(#wizHat)" stroke="#ffd166" stroke-width="3"/>
        <polygon points="45,70 115,70 90,10" fill="url(#wizHat)"/>
        <!-- Star on hat tip -->
        <polygon points="90,10 93,17 100,17 95,22 97,29 90,25 83,29 85,22 80,17 87,17" fill="#ffe66d"/>
    </svg>
    `,

    // Weapons Icons (Wooden Sword, Iron Sword, Star Sword, Iron Axe, Magic Staff, Shortbow)
    woodenSword: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="item-icon-svg">
        <!-- Wooden Blade -->
        <polygon points="46,10 54,18 26,46 18,38" fill="#ba7a47" stroke="#633816" stroke-width="2"/>
        <polygon points="46,10 54,18 50,14" fill="#dc9f6c"/>
        <line x1="22" y1="42" x2="48" y2="16" stroke="#874c20" stroke-width="2"/>
        <!-- Guard -->
        <rect x="18" y="42" width="16" height="6" transform="rotate(-45 26 45)" fill="#633816" rx="2"/>
        <!-- Hilt & Pommel -->
        <line x1="18" y1="46" x2="10" y2="54" stroke="#48270f" stroke-width="4" stroke-linecap="round"/>
        <circle cx="9" cy="55" r="4" fill="#a0522d"/>
    </svg>
    `,

    ironSword: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="item-icon-svg">
        <!-- Steel Blade with Shiny Highlights -->
        <polygon points="48,8 56,16 28,44 20,36" fill="#cfd8dc" stroke="#455a64" stroke-width="2"/>
        <polygon points="48,8 56,16 52,12" fill="#ffffff"/>
        <!-- Center Fuller Groove -->
        <line x1="24" y1="40" x2="50" y2="14" stroke="#90a4ae" stroke-width="2.5"/>
        <line x1="23" y1="39" x2="46" y2="16" stroke="#ffffff" stroke-width="1"/>
        <!-- Crossguard (Gold/Steel) -->
        <rect x="20" y="40" width="18" height="6" transform="rotate(-45 29 43)" fill="#d4af37" stroke="#8a7322" stroke-width="1.5" rx="2"/>
        <!-- Grip -->
        <line x1="20" y1="44" x2="11" y2="53" stroke="#263238" stroke-width="4.5" stroke-linecap="round"/>
        <line x1="18" y1="46" x2="13" y2="51" stroke="#d4af37" stroke-width="1"/>
        <!-- Pommel -->
        <circle cx="10" cy="54" r="4.5" fill="#d4af37" stroke="#8a7322" stroke-width="1"/>
    </svg>
    `,

    // Legendary Star Sword (Glowing, cosmic purple/gold blade with star wings and sparkles)
    starSword: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="item-icon-svg star-sword-svg">
        <defs>
            <linearGradient id="starBladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="30%" stop-color="#ffb7eb"/>
                <stop offset="70%" stop-color="#b5179e"/>
                <stop offset="100%" stop-color="#7209b7"/>
            </linearGradient>
            <filter id="starGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2" result="blur"/>
                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
        </defs>

        <!-- Sparkles -->
        <circle cx="52" cy="12" r="3" fill="#ffe66d" filter="url(#starGlow)"/>
        <circle cx="16" cy="22" r="2" fill="#70d6ff" filter="url(#starGlow)"/>
        <circle cx="48" cy="38" r="2.5" fill="#f72585" filter="url(#starGlow)"/>

        <!-- Star Blade -->
        <polygon points="48,6 58,16 26,48 16,38" fill="url(#starBladeGrad)" stroke="#ffd166" stroke-width="2" filter="url(#starGlow)"/>
        <line x1="21" y1="43" x2="52" y2="12" stroke="#ffffff" stroke-width="2"/>

        <!-- Serrated Gold Wing Edge (like screenshot) -->
        <polygon points="44,20 49,15 47,23" fill="#ffe66d"/>
        <polygon points="36,28 41,23 39,31" fill="#ffe66d"/>

        <!-- Gold Star Guard with angel wings -->
        <polygon points="26,38 34,34 38,42 30,46" fill="#ffd166" stroke="#b78103" stroke-width="1.5"/>
        <polygon points="18,46 22,38 14,34 10,42" fill="#ffd166" stroke="#b78103" stroke-width="1.5"/>
        <polygon points="22,42 26,38 28,44 24,48" fill="#f72585"/>

        <!-- Hilt & Star Pommel -->
        <line x1="18" y1="46" x2="9" y2="55" stroke="#7209b7" stroke-width="5" stroke-linecap="round"/>
        <line x1="17" y1="47" x2="10" y2="54" stroke="#ffe66d" stroke-width="1"/>
        <polygon points="8,54 12,58 7,61 3,57" fill="#ffd166" stroke="#b78103" stroke-width="1"/>
        <circle cx="7" cy="57" r="2" fill="#f72585"/>
    </svg>
    `,

    ironAxe: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="item-icon-svg">
        <!-- Wooden Handle -->
        <line x1="12" y1="52" x2="48" y2="16" stroke="#8d5b2c" stroke-width="5" stroke-linecap="round"/>
        <line x1="14" y1="50" x2="46" y2="18" stroke="#a06e3d" stroke-width="2"/>
        <!-- Double Crescent Iron Axe Head -->
        <path d="M 40 12 C 54 8 58 26 48 30 C 44 28 40 24 38 20 Z" fill="#cfd8dc" stroke="#37474f" stroke-width="2"/>
        <path d="M 28 24 C 24 20 20 24 16 38 C 30 36 34 28 32 24 Z" fill="#90a4ae" stroke="#37474f" stroke-width="2"/>
        <!-- Axe Center Bracket -->
        <rect x="33" y="19" width="10" height="8" rx="2" fill="#d4af37" stroke="#735700" stroke-width="1.5" transform="rotate(-45 38 23)"/>
    </svg>
    `,

    magicStaff: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="item-icon-svg">
        <defs>
            <linearGradient id="orbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="40%" stop-color="#70d6ff"/>
                <stop offset="100%" stop-color="#0077b6"/>
            </linearGradient>
        </defs>
        <!-- Golden Wand Rod -->
        <line x1="14" y1="52" x2="42" y2="24" stroke="#d4af37" stroke-width="4.5" stroke-linecap="round"/>
        <line x1="15" y1="51" x2="41" y2="25" stroke="#fff3b0" stroke-width="1.5"/>
        <!-- Staff Head Wings/Cradle -->
        <path d="M 36 30 C 38 18 52 14 56 24 C 50 26 44 26 40 32 Z" fill="#e9c46a" stroke="#9a721a" stroke-width="1.5"/>
        <path d="M 46 20 C 34 22 30 36 40 40 C 42 34 42 28 46 20 Z" fill="#e9c46a" stroke="#9a721a" stroke-width="1.5"/>
        <!-- Glowing Astral Crystal Orb -->
        <circle cx="47" cy="19" r="8" fill="url(#orbGrad)" stroke="#caf0f8" stroke-width="1.5"/>
        <circle cx="44" cy="16" r="2.5" fill="#ffffff"/>
    </svg>
    `,

    shortbow: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="item-icon-svg">
        <!-- Bow Limbs (Wood Curve) -->
        <path d="M 16 14 C 44 10 54 26 50 48" fill="none" stroke="#9c6644" stroke-width="5" stroke-linecap="round"/>
        <path d="M 18 16 C 42 12 50 26 48 46" fill="none" stroke="#b08968" stroke-width="2"/>
        <!-- Bowstring -->
        <line x1="16" y1="14" x2="50" y2="48" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="60" stroke-opacity="0.9"/>
        <!-- Handgrip wrap -->
        <rect x="36" y="24" width="6" height="10" rx="2" fill="#7f4f24" transform="rotate(-30 39 29)"/>
    </svg>
    `,

    goldCoin: `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="coin-icon-svg">
        <circle cx="12" cy="12" r="10" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
        <circle cx="12" cy="12" r="7" fill="#fde047" stroke="#eab308" stroke-width="1"/>
        <text x="12" y="16" font-family="monospace" font-weight="bold" font-size="12" fill="#854d0e" text-anchor="middle">$</text>
    </svg>
    `,

    // =========================================================================
    // MOUNT / HEWAN TUNGGANGAN ICONS (Kuda, Burung, Pegasus, Serigala, Harimau, Babi)
    // =========================================================================
    mountHorse: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="item-icon-svg mount-icon-svg">
        <defs>
            <linearGradient id="horseManeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#451a03"/>
                <stop offset="100%" stop-color="#1c1917"/>
            </linearGradient>
        </defs>
        <!-- Horse Neck & Head Base -->
        <path d="M 12 56 C 14 36 22 20 36 12 C 40 10 48 8 52 14 C 54 18 50 26 54 32 C 56 36 50 42 42 40 C 38 46 36 56 36 56 Z" fill="#854d0e" stroke="#451a03" stroke-width="2"/>
        <!-- Mane along crest -->
        <path d="M 16 52 C 18 34 26 22 36 12 C 34 16 32 24 30 32 C 28 40 24 48 18 54 Z" fill="url(#horseManeGrad)"/>
        <polygon points="34,14 30,10 38,8" fill="#1c1917"/>
        <polygon points="28,24 22,20 32,18" fill="#1c1917"/>
        <polygon points="24,36 18,32 26,30" fill="#1c1917"/>
        <!-- Horse Ear -->
        <polygon points="36,12 38,4 42,10" fill="#a16207" stroke="#451a03" stroke-width="1.5"/>
        <polygon points="38,10 39,6 41,9" fill="#fbcfe8"/>
        <!-- White Forehead Blaze -->
        <path d="M 44 18 Q 47 24 46 30 Q 43 24 44 18 Z" fill="#f8fafc"/>
        <!-- Nostril & Muzzle Soft Shade -->
        <ellipse cx="50" cy="34" rx="2.5" ry="2" fill="#292524"/>
        <!-- Intelligent Eye -->
        <ellipse cx="42" cy="20" rx="3" ry="2" fill="#1c1917"/>
        <circle cx="43" cy="19.5" r="1" fill="#ffffff"/>
        <!-- Bridle & Reins (Gold / Leather) -->
        <path d="M 40 14 L 46 34" stroke="#d97706" stroke-width="2" fill="none"/>
        <path d="M 42 28 L 52 32" stroke="#d97706" stroke-width="2" fill="none"/>
        <circle cx="46" cy="34" r="3" fill="#facc15" stroke="#b45309" stroke-width="1"/>
        <circle cx="46" cy="34" r="1" fill="#ffffff"/>
    </svg>
    `,

    mountBird: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="item-icon-svg mount-icon-svg">
        <defs>
            <linearGradient id="birdFeatherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#f59e0b"/>
                <stop offset="50%" stop-color="#ea580c"/>
                <stop offset="100%" stop-color="#dc2626"/>
            </linearGradient>
        </defs>
        <!-- Feathered Crest Plumes (Back) -->
        <path d="M 28 16 C 14 10 8 16 6 24 C 12 22 20 20 28 22 Z" fill="#dc2626"/>
        <path d="M 32 12 C 20 4 12 10 10 16 C 18 14 26 14 34 16 Z" fill="#f59e0b"/>
        <!-- Raptor Head & Breast -->
        <path d="M 18 56 C 20 38 24 24 38 14 C 46 12 52 18 48 26 C 44 32 38 42 34 56 Z" fill="url(#birdFeatherGrad)" stroke="#7c2d12" stroke-width="2"/>
        <!-- Sharp Hooked Gold Beak -->
        <path d="M 44 22 C 54 22 60 26 58 34 C 54 36 48 30 42 30 Z" fill="#facc15" stroke="#b45309" stroke-width="2"/>
        <path d="M 44 30 C 50 30 52 36 50 38 C 46 36 44 32 42 30 Z" fill="#ca8a04"/>
        <!-- Piercing Eagle Eye -->
        <circle cx="40" cy="20" r="4.5" fill="#fef08a" stroke="#7c2d12" stroke-width="1.5"/>
        <circle cx="41" cy="20" r="2.2" fill="#0f172a"/>
        <circle cx="42" cy="19" r="0.8" fill="#ffffff"/>
        <!-- Golden Wing Feathers hint -->
        <path d="M 14 56 Q 24 44 30 50 Q 22 56 14 56 Z" fill="#fde047"/>
    </svg>
    `,

    mountPegasus: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="item-icon-svg mount-icon-svg legendary-mount-svg">
        <defs>
            <linearGradient id="pegasusWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="60%" stop-color="#bae6fd"/>
                <stop offset="100%" stop-color="#38bdf8"/>
            </linearGradient>
            <filter id="celestialSparkle" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="glow"/>
                <feComposite in="SourceGraphic" in2="glow" operator="over"/>
            </filter>
        </defs>
        <!-- Divine Wing Flapping Open -->
        <path d="M 18 36 C 6 22 10 6 28 4 C 28 14 24 22 20 34 Z" fill="url(#pegasusWingGrad)" stroke="#7dd3fc" stroke-width="1.5" filter="url(#celestialSparkle)"/>
        <path d="M 24 34 C 16 22 20 12 34 8 C 32 18 28 26 26 34 Z" fill="#ffffff" stroke="#38bdf8" stroke-width="1"/>
        <path d="M 30 36 C 24 26 28 18 40 14 C 36 24 32 30 30 36 Z" fill="#f0f9ff"/>
        <!-- Pegasus Body & Mane -->
        <path d="M 12 56 C 16 40 26 28 38 18 C 42 16 48 14 52 20 C 54 24 50 30 54 36 C 56 40 50 44 44 42 C 40 48 38 56 38 56 Z" fill="#ffffff" stroke="#bae6fd" stroke-width="2"/>
        <!-- Cyan Starlight Mane -->
        <path d="M 22 48 C 24 34 32 24 40 16 C 36 20 34 28 32 36 C 30 42 26 48 22 48 Z" fill="#38bdf8"/>
        <!-- Golden Celestial Horn -->
        <polygon points="44,14 56,2 47,11" fill="#facc15" stroke="#eab308" stroke-width="1.5" filter="url(#celestialSparkle)"/>
        <!-- Winged Pegasus Ear -->
        <polygon points="40,16 42,9 45,14" fill="#ffffff" stroke="#7dd3fc" stroke-width="1"/>
        <!-- Muzzle & Soft Starlight Nostril -->
        <ellipse cx="50" cy="38" rx="2" ry="1.5" fill="#38bdf8"/>
        <!-- Star Eye -->
        <ellipse cx="44" cy="22" rx="3" ry="2.2" fill="#0284c7"/>
        <circle cx="45" cy="21.5" r="1.2" fill="#ffffff"/>
        <!-- Sparkle Stars -->
        <polygon points="56,12 58,16 62,16 59,19 60,23 56,20 52,23 53,19 50,16 54,16" fill="#facc15" filter="url(#celestialSparkle)"/>
        <polygon points="12,18 13,20 15,20 13.5,21.5 14,23.5 12,22 10,23.5 10.5,21.5 9,20 11,20" fill="#38bdf8"/>
    </svg>
    `,

    mountWolf: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="item-icon-svg mount-icon-svg">
        <!-- Spiked Shoulder Fur -->
        <path d="M 10 56 C 14 36 20 26 34 16 C 32 22 28 32 24 42 C 20 48 16 54 10 56 Z" fill="#27272a"/>
        <polygon points="26,22 16,20 28,16" fill="#3f3f46"/>
        <polygon points="22,34 12,32 24,28" fill="#3f3f46"/>
        <!-- Wolf Head & Muzzle -->
        <path d="M 18 56 C 22 42 28 30 38 18 C 42 16 48 16 54 26 C 58 30 52 36 46 38 C 44 44 42 56 42 56 Z" fill="#3f3f46" stroke="#18181b" stroke-width="2"/>
        <!-- Fierce Wolf Ear -->
        <polygon points="34,18 36,6 42,14" fill="#27272a" stroke="#18181b" stroke-width="1.5"/>
        <polygon points="36,16 37,9 40,14" fill="#71717a"/>
        <!-- Snarling Jaw & White Fangs -->
        <path d="M 44 32 L 58 32 L 52 38 L 44 36 Z" fill="#18181b"/>
        <polygon points="46,32 48,37 50,32" fill="#ffffff"/>
        <polygon points="52,32 54,37 56,32" fill="#ffffff"/>
        <polygon points="48,38 50,34 52,38" fill="#ffffff"/>
        <!-- Black Snout Leather -->
        <ellipse cx="56" cy="31" rx="2.5" ry="2" fill="#09090b"/>
        <!-- Glowing Crimson Eyes -->
        <polygon points="42,22 46,20 45,24" fill="#ef4444"/>
        <circle cx="44" cy="22" r="0.8" fill="#fef08a"/>
        <!-- Spiked Dark Collar -->
        <path d="M 32 46 L 44 42" stroke="#18181b" stroke-width="3" fill="none"/>
        <polygon points="34,43 32,40 36,41" fill="#e2e8f0"/>
        <polygon points="40,41 38,38 42,39" fill="#e2e8f0"/>
    </svg>
    `,

    mountCat: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="item-icon-svg mount-icon-svg">
        <defs>
            <linearGradient id="tigerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ea580c"/>
                <stop offset="50%" stop-color="#f97316"/>
                <stop offset="100%" stop-color="#fbbf24"/>
            </linearGradient>
        </defs>
        <!-- Broad Muscular Feline Head -->
        <path d="M 14 56 C 18 38 24 24 36 14 C 44 12 52 14 54 24 C 56 30 54 36 46 40 C 42 46 38 56 38 56 Z" fill="url(#tigerGrad)" stroke="#7c2d12" stroke-width="2"/>
        <!-- Tiger Stripes -->
        <path d="M 30 16 L 36 22 L 32 26" stroke="#18181b" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M 24 28 L 32 32 L 28 36" stroke="#18181b" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M 22 42 L 30 44 L 26 48" stroke="#18181b" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <!-- Rounded Predator Ear -->
        <ellipse cx="36" cy="12" rx="4" ry="5" fill="#ea580c" stroke="#7c2d12" stroke-width="1.5"/>
        <ellipse cx="36" cy="12" rx="2" ry="2.5" fill="#18181b"/>
        <!-- Sabertooth Massive Ivory Fangs -->
        <path d="M 48 30 C 52 38 52 46 48 50 C 47 44 46 36 44 32 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
        <!-- Jade Emerald Cat Eye -->
        <ellipse cx="44" cy="20" rx="3.5" ry="2.5" fill="#10b981"/>
        <ellipse cx="44" cy="20" rx="1" ry="2.2" fill="#064e3b"/>
        <circle cx="45" cy="19" r="0.8" fill="#ffffff"/>
        <!-- Golden Forehead Crest Armor -->
        <polygon points="38,14 44,10 42,16" fill="#facc15" stroke="#b45309" stroke-width="1"/>
    </svg>
    `,

    mountBoar: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="item-icon-svg mount-icon-svg">
        <!-- Mohawk Bristles / Spine Ridge -->
        <polygon points="12,48 18,34 24,42" fill="#271a0c"/>
        <polygon points="20,36 28,24 34,34" fill="#271a0c"/>
        <polygon points="30,26 38,14 44,24" fill="#271a0c"/>
        <!-- Heavy Bulky Boar Head & Shoulder -->
        <path d="M 12 56 C 16 38 22 28 36 18 C 46 16 52 22 56 34 C 56 42 48 46 40 44 C 36 50 34 56 34 56 Z" fill="#573926" stroke="#271a0c" stroke-width="2.5"/>
        <!-- Heavy Boar Disc Snout -->
        <ellipse cx="54" cy="36" rx="5" ry="4" fill="#78350f" stroke="#271a0c" stroke-width="1.5"/>
        <ellipse cx="53" cy="35" rx="1.5" ry="1.2" fill="#1c1917"/>
        <ellipse cx="56" cy="36" rx="1.5" ry="1.2" fill="#1c1917"/>
        <!-- Massive Curved Ivory Boar Tusks -->
        <path d="M 46 42 C 54 44 60 38 60 26 C 58 34 52 38 46 38 Z" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>
        <path d="M 44 40 C 50 42 54 36 54 28 C 52 34 48 36 44 38 Z" fill="#ffffff"/>
        <!-- Fierce Red Beady Eye under armored brow -->
        <rect x="40" y="24" width="8" height="3" transform="rotate(-15 44 25)" fill="#78716c"/>
        <circle cx="43" cy="27" r="2" fill="#ef4444"/>
        <circle cx="43.5" cy="26.5" r="0.8" fill="#ffffff"/>
        <!-- Floppy Boar Ear -->
        <polygon points="34,22 30,14 38,16" fill="#451a03"/>
    </svg>
    `
};

const FANTASY_NAMES = [
    'Arthur Pendragon',
    'Ignis Flameheart',
    'Zephyr Windstride',
    'Aurelia Dawnstar',
    'Kage Kurogane',
    'Freya Frostbane',
    'Leon Silverblade',
    'Valkyrie Astrid',
    'Soren Shadowveil',
    'Rowan Oakshield',
    'Galahad Stormborn',
    'Elysia Starlight'
];

const HERO_PRESETS = [
    {
        id: 'knight',
        name: 'Arthur',
        title: 'Ksatria Pedang (Blade Knight)',
        badge: 'Seimbang & Tangguh',
        desc: 'Pahlawan pedang seimbang dengan tebasan kilat dan serangan kombo stabil.',
        icon: '⚔️',
        themeColor: '#3b82f6',
        stats: { atk: '⭐⭐⭐⭐', def: '⭐⭐⭐⭐', spd: '⭐⭐⭐', crit: '5%' },
        statNums: { atk: 35, hp: 120, crit: 5 },
        modelConfig: {
            hairColor: 0x2755e8,
            vestColor: 0xf39c12,
            capeColor: 0xd9142b,
            eyeColor: 0xe72b4b,
            pantsColor: 0x22222a,
            weapon: 'woodenSword',
            baseAtk: 20,
            maxHp: 120,
            critRate: 0.05
        }
    },
    {
        id: 'pyro',
        name: 'Ignis',
        title: 'Penyihir Api (Pyromancer)',
        badge: 'Serangan Api Dahsyat',
        desc: 'Pakar sihir api penghancur. Menghasilkan damage putaran badai yang luar biasa.',
        icon: '🔥',
        themeColor: '#ef4444',
        stats: { atk: '⭐⭐⭐⭐⭐', def: '⭐⭐', spd: '⭐⭐⭐', crit: '10%' },
        statNums: { atk: 45, hp: 100, crit: 10 },
        modelConfig: {
            hairColor: 0xd90429,
            vestColor: 0x7f1d1d,
            capeColor: 0xf59e0b,
            eyeColor: 0xfacc15,
            pantsColor: 0x1f1f23,
            weapon: 'magicStaff',
            baseAtk: 30,
            maxHp: 100,
            critRate: 0.10
        }
    },
    {
        id: 'ranger',
        name: 'Zephyr',
        title: 'Pemburu Angin (Wind Ranger)',
        badge: 'Lincah & Kritikal Cepat',
        desc: 'Pemanah hutan lincah berkecepatan tinggi dengan tingkat kritikal mematikan.',
        icon: '🏹',
        themeColor: '#10b981',
        stats: { atk: '⭐⭐⭐', def: '⭐⭐⭐', spd: '⭐⭐⭐⭐⭐', crit: '20%' },
        statNums: { atk: 32, hp: 110, crit: 20 },
        modelConfig: {
            hairColor: 0x15803d,
            vestColor: 0x78350f,
            capeColor: 0x166534,
            eyeColor: 0x86efac,
            pantsColor: 0x292524,
            weapon: 'shortbow',
            baseAtk: 22,
            maxHp: 110,
            critRate: 0.20
        }
    },
    {
        id: 'paladin',
        name: 'Aurelia',
        title: 'Ksatria Bintang (Star Paladin)',
        badge: 'Diberkahi Pedang Bintang',
        desc: 'Diberkahi senjata legendaris Star Sword dan daya tahan tubuh tak tertandingi.',
        icon: '🛡️',
        themeColor: '#f59e0b',
        stats: { atk: '⭐⭐⭐⭐', def: '⭐⭐⭐⭐⭐', spd: '⭐⭐', crit: '10%' },
        statNums: { atk: 40, hp: 160, crit: 10 },
        modelConfig: {
            hairColor: 0xfacc15,
            vestColor: 0xd97706,
            capeColor: 0xf8fafc,
            eyeColor: 0x38bdf8,
            pantsColor: 0x713f12,
            weapon: 'starSword',
            baseAtk: 35,
            maxHp: 160,
            critRate: 0.10
        }
    },
    {
        id: 'assassin',
        name: 'Kage',
        title: 'Ninja Bayangan (Shadow Shinobi)',
        badge: 'Kritikal Mematikan',
        desc: 'Pembunuh bayangan misterius. Memiliki burst damage dan serbuan tebasan cepat.',
        icon: '🥷',
        themeColor: '#8b5cf6',
        stats: { atk: '⭐⭐⭐⭐⭐', def: '⭐⭐', spd: '⭐⭐⭐⭐', crit: '25%' },
        statNums: { atk: 42, hp: 95, crit: 25 },
        modelConfig: {
            hairColor: 0x18181b,
            vestColor: 0x2e1065,
            capeColor: 0x6b21a8,
            eyeColor: 0xa855f7,
            pantsColor: 0x09090b,
            weapon: 'ironSword',
            baseAtk: 32,
            maxHp: 95,
            critRate: 0.25
        }
    },
    {
        id: 'valkyrie',
        name: 'Freya',
        title: 'Valkyrie Es (Frost Valkyrie)',
        badge: 'Hentakan Kapak Berat',
        desc: 'Pendekar wanita perkasa dengan kapak penghancur tanah dan hentakan gempa.',
        icon: '❄️',
        themeColor: '#06b6d4',
        stats: { atk: '⭐⭐⭐⭐⭐', def: '⭐⭐⭐⭐', spd: '⭐⭐', crit: '8%' },
        statNums: { atk: 48, hp: 140, crit: 8 },
        modelConfig: {
            hairColor: 0xe2e8f0,
            vestColor: 0x0369a1,
            capeColor: 0x38bdf8,
            eyeColor: 0x06b6d4,
            pantsColor: 0x1e293b,
            weapon: 'ironAxe',
            baseAtk: 38,
            maxHp: 140,
            critRate: 0.08
        }
    }
];

// =============================================================================
// HEWAN TUNGGANGAN (MOUNTS) DATABASE: Kuda, Burung, Pegasus, Serigala, Harimau, Babi
// =============================================================================
const MOUNTS_DATA = [
    {
        id: 'mount_horse',
        type: 'horse',
        name: 'Kuda Perang Ksatria',
        species: 'Kuda',
        price: 200,
        speedMultiplier: 1.7,
        stats: '⚡ Kecepatan +70%<br>🐎 Derap Kaki Cepat<br>🛡️ Daya Tahan +10',
        desc: 'Kuda tempur tangguh dengan pelana kulit Oakhaven dan derap langkah mantap.',
        icon: GameAssets.mountHorse,
        badge: 'Tangguh & Cepat',
        themeColor: '#854d0e',
        isLegendary: false,
        canGlide: false
    },
    {
        id: 'mount_boar',
        type: 'boar',
        name: 'Babi Hutan Purba',
        species: 'Babi Besar',
        price: 350,
        speedMultiplier: 1.6,
        stats: '⚡ Kecepatan +60%<br>🛡️ Pertahanan +20<br>❤️ Max HP +80',
        desc: 'Babi perang raksasa berbulu lebat dengan sepasang taring gading tajam dan armor pelindung baja.',
        icon: GameAssets.mountBoar,
        badge: 'Tanker Baja',
        themeColor: '#78350f',
        isLegendary: false,
        canGlide: false
    },
    {
        id: 'mount_wolf',
        type: 'wolf',
        name: 'Serigala Bayangan',
        species: 'Serigala',
        price: 500,
        speedMultiplier: 1.75,
        stats: '⚡ Kecepatan +75%<br>⚔️ Serangan +15<br>🎯 Crit Rate +5%',
        desc: 'Serigala predator berbulu perak-kelam dengan mata membara dan taring pemburu mematikan.',
        icon: GameAssets.mountWolf,
        badge: 'Predator Lincah',
        themeColor: '#3f3f46',
        isLegendary: false,
        canGlide: false
    },
    {
        id: 'mount_cat',
        type: 'cat',
        name: 'Harimau Baja',
        species: 'Kucing Besar',
        price: 700,
        speedMultiplier: 1.8,
        stats: '⚡ Kecepatan +80%<br>⚔️ Serangan +25<br>💨 Lompatan Harimau',
        desc: 'Harimau loreng perkasa bertaring sabertooth panjang dengan armor pelindung emas di dahi dan bahu.',
        icon: GameAssets.mountCat,
        badge: 'Serbuan Buas',
        themeColor: '#ea580c',
        isLegendary: false,
        canGlide: false
    },
    {
        id: 'mount_bird',
        type: 'bird',
        name: 'Burung Garuda Raksasa',
        species: 'Burung Besar',
        price: 950,
        speedMultiplier: 1.85,
        stats: '⚡ Kecepatan +85%<br>🪽 Sayap Meluncur (Glide)<br>🌊 Lintasi Air & Tebing',
        desc: 'Raptor langit raksasa berbulu emas-api yang dapat mengepakkan sayap dan meluncur di udara!',
        icon: GameAssets.mountBird,
        badge: 'Penerbang Angin',
        themeColor: '#d97706',
        isLegendary: false,
        canGlide: true
    },
    {
        id: 'mount_pegasus',
        type: 'pegasus',
        name: 'Pegasus Surgawi',
        species: 'Pegasus',
        price: 1400,
        speedMultiplier: 2.0,
        stats: '⚡ Kecepatan +100%<br>✨ Sayap Surgawi & Meluncur<br>🌟 Jejak Bintang Kosmik',
        desc: 'Kuda bersayap suci bertanduk emas dengan surai starlight yang meninggalkan jejak bintang!',
        icon: GameAssets.mountPegasus,
        badge: 'Legenda Langit',
        themeColor: '#38bdf8',
        isLegendary: true,
        canGlide: true
    }
];

if (typeof window !== 'undefined') {
    window.MOUNTS_DATA = MOUNTS_DATA;
}
