document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       COUNTDOWN
    ========================================== */

    const eventDate = new Date("July 11, 2026 18:30:00").getTime();

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    function updateCountdown() {

        if (!days) return;

        const now = new Date().getTime();

        const distance = eventDate - now;

        if (distance <= 0) {

            days.textContent = "00";
            hours.textContent = "00";
            minutes.textContent = "00";
            seconds.textContent = "00";

            return;
        }

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));

        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        const s = Math.floor((distance % (1000 * 60)) / 1000);

        days.textContent = String(d).padStart(2, "0");
        hours.textContent = String(h).padStart(2, "0");
        minutes.textContent = String(m).padStart(2, "0");
        seconds.textContent = String(s).padStart(2, "0");

    }

    updateCountdown();

    setInterval(updateCountdown, 1000);


    /* ==========================================
       HERO BUTTON SMOOTH SCROLL
    ========================================== */

    const heroBtn = document.querySelector(".hero-btn");

    if (heroBtn) {

        heroBtn.addEventListener("click", (e) => {

            e.preventDefault();

            const invite = document.querySelector("#invite");

            if (invite) {

                invite.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    }


    /* ==========================================
       SCROLL REVEAL
    ========================================== */

    const revealItems = document.querySelectorAll(

        ".memory, .gallery, .invite, .details, .address, .countdown, .thanks"

    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";

                entry.target.style.transition =

                    "all .9s ease";

            }

        });

    }, {

        threshold: 0.18

    });

    revealItems.forEach(item => {

        item.style.opacity = "0";

        item.style.transform = "translateY(70px)";

        observer.observe(item);

    });
    
    /* ==========================================
       GALLERY LIGHTBOX
    ========================================== */

    const galleryImages = document.querySelectorAll(".gallery-grid img");

    if (galleryImages.length > 0) {

        const overlay = document.createElement("div");

        overlay.id = "lightbox";

        overlay.style.cssText = `
            position:fixed;
            inset:0;
            background:rgba(0,0,0,.9);
            display:none;
            justify-content:center;
            align-items:center;
            z-index:999999;
            cursor:zoom-out;
        `;

        const preview = document.createElement("img");

        preview.style.cssText = `
            max-width:90%;
            max-height:90%;
            border-radius:20px;
            box-shadow:0 0 40px rgba(255,255,255,.25);
        `;

        overlay.appendChild(preview);

        document.body.appendChild(overlay);

        galleryImages.forEach((img) => {

            img.addEventListener("click", () => {

                preview.src = img.src;

                overlay.style.display = "flex";

            });

        });

        overlay.addEventListener("click", () => {

            overlay.style.display = "none";

        });

    }


    /* ==========================================
       HERO FADE ANIMATION
    ========================================== */

    const hero = document.querySelector(".hero-content");

    if (hero) {

        hero.style.opacity = "0";
        hero.style.transform = "translateY(40px)";

        setTimeout(() => {

            hero.style.transition = "all 1.2s ease";

            hero.style.opacity = "1";

            hero.style.transform = "translateY(0)";

        }, 500);

    }


    /* ==========================================
       HERO PARALLAX
    ========================================== */

    const heroImage = document.querySelector(".hero-image");

    window.addEventListener("scroll", () => {

        if (!heroImage) return;

        const y = window.pageYOffset;

        heroImage.style.transform =
            `translateY(${y * 0.25}px) scale(1.08)`;

    });


    /* ==========================================
       BALLOONS
    ========================================== */

    const balloons = document.querySelectorAll(".balloons span");

    balloons.forEach((balloon) => {

        balloon.style.animationDuration =
            (15 + Math.random() * 8) + "s";

        balloon.style.animationDelay =
            (Math.random() * 6) + "s";

    });


    /* ==========================================
       PRELOAD HERO IMAGE
    ========================================== */

    if (heroImage) {

        const preload = new Image();

        preload.src = heroImage.src;

    }
        /* ==========================================
       PREMIUM CURTAIN INTRO
    ========================================== */

    const intro = document.getElementById("intro");
    const openBtn = document.getElementById("openInvitation");
    const music = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicToggle");

    let isPlaying = false;

    if (musicBtn) {
        musicBtn.style.display = "none";
    }

    if (intro && openBtn && music && musicBtn) {

        openBtn.addEventListener("click", () => {

            /* Disable button */
            openBtn.disabled = true;

            /* Show music button */
            musicBtn.style.display = "flex";
            musicBtn.style.justifyContent = "center";
            musicBtn.style.alignItems = "center";

            /* Start Music */
            music.volume = 0;

            music.play().then(() => {

                isPlaying = true;

                let volume = 0;

                const fade = setInterval(() => {

                    volume += 0.03;

                    if (volume >= 1) {

                        volume = 1;
                        clearInterval(fade);

                    }

                    music.volume = volume;

                }, 100);

            }).catch(err => {

                console.log(err);

            });

            /* Open Curtains */

            intro.classList.add("open");

            /* Remove Intro */

            setTimeout(() => {

                intro.style.transition = "opacity .8s ease";

                intro.style.opacity = "0";

            }, 2800);

            setTimeout(() => {

                intro.remove();

            }, 3600);

        });

        /* Music Toggle */

        musicBtn.addEventListener("click", () => {

            if (isPlaying) {

                music.pause();

                musicBtn.innerHTML =
                    '<i class="fa-solid fa-volume-xmark"></i>';

                isPlaying = false;

            }

            else {

                music.play();

                musicBtn.innerHTML =
                    '<i class="fa-solid fa-volume-high"></i>';

                isPlaying = true;

            }

        });

    }

});