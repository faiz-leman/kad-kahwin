<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- SEO Meta Tags -->
    <title>Walimaturus | Faiz & Syukriah</title>
    <meta property="og:title" content="Walimaturus | Faiz & Syukriah">
    <meta property="og:image" content="https://invite.astrus.my/source/image/sf-banner.webp">

    <meta name="twitter:title" content="Walimaturus | Faiz & Syukriah">
    <meta name="twitter:image" content="httpshttps://invite.astrus.my/source/image/sf-banner.webp">
    <meta name="og:description" content="Anda dijemput hadir! Tekan link untuk lihat undangan">
    <meta name="twitter:description" content="Anda dijemput hadir! Tekan link untuk lihat undangan">

    <!-- Favicon -->
    <link rel="icon" type="image/png" sizes="32x32" href="https://astrus.my/asset/logo-1080.ico">
    <link rel="icon" type="image/png" sizes="16x16" href="https://astrus.my/asset/logo-1080.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="https://astrus.my/asset/logo-1080.ico">

    <!-- DNS Prefetch for faster connections -->
    <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
    <link rel="dns-prefetch" href="https://unpkg.com">
    <link rel="dns-prefetch" href="https://code.jquery.com">

    <!-- Preconnect to external resources -->
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
    <link rel="preconnect" href="https://unpkg.com" crossorigin>
    <link rel="preconnect" href="https://code.jquery.com" crossorigin>

    <!-- Preload critical fonts first -->
    <link rel="preload" href="../source/font/Ephesis/Ephesis-Regular.ttf" as="font" type="font/ttf" crossorigin>
    <link rel="preload" href="../source/image/bg29-1.webp" as="image" type="image/webp">

    <!-- Critical CSS - load immediately -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../source/css/opener.css">
    <link rel="stylesheet" href="../source/css/fonts.css">
    <link rel="stylesheet" href="../source/css/style.css">

    <!-- Non-critical CSS - load asynchronously -->
    <link rel="preload" href="../source/css/navbar.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <link rel="preload" href="../source/css/modal.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <link rel="preload" href="../source/css/player.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <link rel="preload" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" as="style"
        onload="this.onload=null;this.rel='stylesheet'">
    <link rel="preload" href="https://unpkg.com/aos@2.3.1/dist/aos.css" as="style"
        onload="this.onload=null;this.rel='stylesheet'">

    <!-- Fallback for browsers that don't support preload -->
    <noscript>
        <link rel="stylesheet" href="../source/css/navbar.css">
        <link rel="stylesheet" href="../source/css/modal.css">
        <link rel="stylesheet" href="../source/css/player.css">
        <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css">
        <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css">
    </noscript>


</head>

<body data-aos-easing="slide" data-aos-duration="400" data-aos-delay="0">

    <div class="opener-overlay" id="openerOverlay">
        <div class="opener-loader" id="openerLoader">
            <div class="spinner"></div>
        </div>
        <div class="opener-decoration"></div>
        <div class="opener-content" id="openerContent">
            <div class="opener-names">
                <div>Faiz</div>
                <div style="font-size: 1.5rem; margin: 0.5rem 0;">&amp;</div>
                <div>Syukriah</div>
            </div>
            <button class="opener-btn" onclick="openInvitation()">
                <i class="bx bx-heart" style="margin-right: 8px;"></i>
                Buka
            </button>
        </div>
    </div>

    <!-- Main Content -->
    <div id="mainContent" class="main-content bg-light-paint fade-in">

        <div id="particles-js" class="particles-container"></div>

        <nav class="bottom-nav fixed-bottom mt-5" role="navigation" aria-label="Main navigation">
            <div class="container d-flex justify-content-around py-3">
                <a href="javascript:void(0)" class="nav-item text-primary-dark" onclick="openModal('contact')"
                    aria-label="Contact information">
                    <i class="bx bx-xl bx-phone" aria-hidden="true"></i>
                    <span>Hubungi</span>
                </a>
                <a href="javascript:void(0)" class="nav-item text-primary-dark" onclick="openModal('rsvp')"
                    aria-label="RSVP form">
                    <i class="bx bx-xl bx-clipboard" aria-hidden="true"></i>
                    <span>RSVP</span>
                </a>
                <a href="javascript:void(0)" class="nav-item text-primary-dark" onclick="openModal('location')"
                    aria-label="Event location">
                    <i class="bx bx-xl bx-map" aria-hidden="true"></i>
                    <span>Lokasi</span>
                </a>
                <a href="javascript:void(0)" class="nav-item text-primary-dark" onclick="openModal('calendar')"
                    aria-label="Add to calendar">
                    <i class="bx bx-xl bx-calendar-event" aria-hidden="true"></i>
                    <span>Kalendar</span>
                </a>
            </div>
        </nav>

        <section class="hero-section hero-bg-29" id="introduction">
            <div class="title">
                <h3 class="hero-subtitle text-contra-brown uppercase">WALIMATULURUS</h3>
                <div class="couple-names">
                    <h1 class="name text-contra-brown">Faiz</h1>
                    <h2 class="name text-contra-brown">&amp;</h2>
                    <h1 class="name text-contra-brown">Syukriah</h1>
                </div>
                <div class="mt-3">
                    <span class="date-text text-contra-brown uppercase">SABTU • 29 NOVEMBER 2025</span>
                </div>
            </div>
        </section>

        <div class="text-center text-white my-4 py-4">

            <div class="music-bar minimal">
                <!-- Hidden YouTube player -->
                <audio id="audio" class="hidden" preload="none" loop>
                    <source src="../source/audio/bgm29.mp3" type="audio/mp3">
                </audio>
                <button id="musicBtn" class="music-btn" title="Sampai Jadi Debu (Saxophone Cover by Dori Wirawan)"
                    aria-label="Play">
                    <div id="musicVisualizer" class="music-visualizer">
                        <div class="visualizer-bar"></div>
                        <div class="visualizer-bar"></div>
                        <div class="visualizer-bar"></div>
                        <div class="visualizer-bar"></div>
                        <div class="visualizer-bar"></div>
                    </div>
                </button>
            </div>
            <section class="fade-in px-2 text-contra-brown">
                <p data-aos="fade-up" data-aos-delay="100">Assalamualaikum WBT & Salam Sejahtera</p>
                <p data-aos="fade-up" data-aos-delay="100">Dengan penuh kesyukuran, kami</p>
                <div class="mt-3 py-3" data-aos="fade-up" data-aos-delay="100">
                    <h3 class="mt-md name-subpage">Leman bin Sulihan</h3>
                    <h3 class="mx-1 name-subpage">&</h3>
                    <h3 class="mt-md name-subpage">Norizan binti Sarman</h3>
                </div>
                <div class="mt-2" data-aos="fade-up" data-aos-delay="200">
                    <p>menjemput</p>
                    <p>
                        Dato' | Datin | Tuan | Puan | Encik | Cik
                    </p>
                    <p>ke walimatulurus putera kami</p>
                </div>
                <div class="mt-3 py-3" data-aos="fade-up" data-aos-delay="300">
                    <h3 class="mt-md name-subpage">Muhammad Faiz bin Leman</h3>
                    <h3 class="mx-1 name-subpage">&</h3>
                    <h3 class="mt-md name-subpage">Syukriah binti Hj. Zahari</h3>
                </div>
            </section>

            <hr class="divider mt-lg mb-lg" data-aos="fade-up" data-aos-delay="100">

            <section class="fade-in px-2 text-contra-brown" data-aos="fade-up" data-aos-delay="0">
                <h5 class="section-title" data-aos="fade-up" data-aos-delay="50">TEMPAT</h5>
                <p data-aos="fade-up" data-aos-delay="100">
                    Dewan Fairy Fairy,<br>
                    Level UG, Utropolis Marketplace, Jalan
                    Kontraktor U1/14, Hicom-Glenmarie Industrial Park, 40150<br>
                    Shah Alam, Selangor
                </p>

                <h5 class="section-title" data-aos="fade-up" data-aos-delay="150">TARIKH</h5>
                <p data-aos="fade-up" data-aos-delay="200">Sabtu, 29 November 2025</p>
                <p class="fst-italic" data-aos="fade-up" data-aos-delay="250">8 Jamadilakhir 1447H</p>

                <h5 class="section-title" data-aos="fade-up" data-aos-delay="300">WAKTU</h5>
                <p data-aos="fade-up" data-aos-delay="350">11:00 pagi - 04:00 petang</p>

                <div class="mt-4" data-aos="fade-up" data-aos-delay="400">
                    <button class="btn btn-outline-dark my-2" onclick="openModal('calendar')">Simpan Tarikh</button>
                </div>

            </section>

            <section class="fade-in" data-aos="fade-up" data-aos-delay="0">
                <div class="tentative-section my-4 py-2 d-flex justify-content-center">
                    <div class="mt-lg mb-lg">
                        <div class="tentative-card glass-frosted" data-aos="zoom-in" data-aos-delay="100">
                            <h5 class="section-title text-contra-brown">ATUR CARA MAJLIS</h5>
                            <table class="tentative-table">
                                <tbody>
                                    <tr class="tentative-row" data-aos="fade-left" data-aos-delay="200">
                                        <td class="tentative-label text-contra-brown">Kehadiran Tetamu<br><span
                                                class="tentative-time text-primary">11:00
                                                Pagi</span></td>
                                    </tr>
                                    <tr class="tentative-row" data-aos="fade-left" data-aos-delay="300">
                                        <td class="tentative-label text-contra-brown">Ketibaan Pengantin<br><span
                                                class="tentative-time text-primary">12:30
                                                Tengah Hari</span></td>
                                    </tr>
                                    <tr class="tentative-row" data-aos="fade-left" data-aos-delay="400">
                                        <td class="tentative-label text-contra-brown">Majlis Berakhir<br><span
                                                class="tentative-time text-primary">4:00
                                                Petang</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <section class="fade-in px-2" data-aos="fade-up" data-aos-delay="0">
                <h5 class="section-title text-contra-brown" data-aos="fade-up" data-aos-delay="50">UCAPAN</h5>
                <div class="wish-viewer px-2 py-2" id="guestbook-container" data-aos="fade-up" data-aos-delay="100">
                    <ul class="list-unstyled mb-0">
                    </ul>
                </div>
                <div class="row g-2 mt-4 d-flex justify-content-center" data-aos="fade-up" data-aos-delay="150">
                    <div class="col-6">
                        <button class="btn btn-outline-dark w-100" onclick="openModal('rsvp')">
                            Sahkan Kehadiran</button>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-outline-dark w-100" onclick="openModal('wish')">Tulis
                            Ucapan</button>
                    </div>
                </div>
            </section>

            <section class="fade-in px-3 my-4" data-aos="fade-up" data-aos-delay="0">
                <h5 class="section-title text-contra-brown" data-aos="fade-up" data-aos-delay="50">MENGHITUNG HARI
                </h5>
                <div class="row justify-content-center g-3" data-aos="fade-up" data-aos-delay="100">
                    <div class="col-3 col-sm-3" data-aos="flip-up" data-aos-delay="150">
                        <div class="countdown-card p-md rounded-md text-center">
                            <div class="countdown-card__number text-primary-dark" id="days">0</div>
                            <p class="countdown-card__label text-primary">Hari</p>
                        </div>
                    </div>
                    <div class="col-3 col-sm-3" data-aos="flip-up" data-aos-delay="200">
                        <div class="countdown-card p-md rounded-md text-center">
                            <div class="countdown-card__number text-primary-dark" id="hours">0</div>
                            <p class="countdown-card__label text-primary">Jam</p>
                        </div>
                    </div>
                    <div class="col-3 col-sm-3" data-aos="flip-up" data-aos-delay="250">
                        <div class="countdown-card p-md rounded-md text-center">
                            <div class="countdown-card__number text-primary-dark" id="minutes">0</div>
                            <p class="countdown-card__label text-primary">Minit</p>
                        </div>
                    </div>
                    <div class="col-3 col-sm-3" data-aos="flip-up" data-aos-delay="300">
                        <div class="countdown-card p-md rounded-md text-center">
                            <div class="countdown-card__number text-primary-dark" id="seconds">0</div>
                            <p class="countdown-card__label text-primary">Saat</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="fade-in px-2" data-aos="fade-up" data-aos-delay="0">
                <div class="tentative-card glass-frosted" data-aos="zoom-in" data-aos-delay="100">
                    <span class="fst-italic text-contra-brown">Ya Allah, Ya Rahman, Ya Rahim
                        berkatilah majlis perkahwinan ini, limpahkan rahmat-Mu kepada kedua mempelai, kurniakanlah
                        mereka zuriat yang soleh dan solehah serta kebahagiaan yang berpanjangan, dan kekalkanlah jodoh
                        mereka hingga ke syurga 🤍</span>
                </div>
            </section>

            <section class="mt-xl mb-xl" data-aos="fade-up" data-aos-delay="0">
                <h2 class="hashtag text-primary-dark">Faiz x Syukriah</h2>
            </section>

            <section class="mt-xl mb-xl" data-aos="fade-up" data-aos-delay="100">
                <p class="text-contra-brown">Direka oleh</p>
                <a href="https://astrus.my/" target="_blank" rel="noopener">
                    <img style="height: auto; width: 30%;" src="https://astrus.my/asset/brand-1080.webp"
                        alt="Astrus Logo Text">
                </a>
            </section>
        </div>
    </div>

    <div class="modal fade" id="dynamicModal" tabindex="-1" aria-labelledby="dynamicModalLabel" data-bs-backdrop="true">
        <div class="modal-dialog modal-dialog-bottom">
            <div class="modal-content modal-content-bottom">
                <div class="modal-header border-0 pb-0">
                    <h5 class="modal-title text-center w-100" id="dynamicModalLabel">Modal Title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center" id="dynamicModalContent">
                </div>
            </div>
        </div>
    </div>

    <!-- jQuery (load with defer) -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous" defer></script>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" defer></script>

    <!-- Particles -->
    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js" defer></script>

    <!-- Your Scripts -->
    <script src="../source/js/main.js" defer></script>
    <script src="../source/js/modal.js" defer></script>
    <script src="../source/js/player.js" defer></script>
    <script src="../source/js/particle29.js" defer></script>
    <script src="../source/js/ajax.js?eventId=29" defer></script>

    <!-- AOS -->
    <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js" defer></script>

</body>

</html>