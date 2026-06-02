/* =========================================
ULTRA PREMIUM FOODIO - MAIN SCRIPT
========================================= */

/* Feather Icons */
try {
  if (typeof feather !== 'undefined') {
    feather.replace();
  }
} catch(e) {
  console.log("Feather icons not available");
}

/* =========================================
HAMBURGER MENU TOGGLE
========================================= */

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if(hamburger && mobileMenu){
    hamburger.addEventListener('click', (e)=>{
        e.stopPropagation();
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a, button');
    mobileLinks.forEach(link => {
        link.addEventListener('click', ()=>{
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e)=>{
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
}

/* =========================================
NAVBAR SCROLL EFFECT
========================================= */

const navbar = document.querySelector(".ultra-navbar");

window.addEventListener("scroll",()=>{
    if(window.scrollY > 40){
        navbar.style.background = `linear-gradient(135deg, rgba(10,12,28,0.92), rgba(20,18,40,0.82))`;
        navbar.style.backdropFilter = "blur(35px)";
        navbar.style.boxShadow = `0 20px 60px rgba(0,0,0,0.55)`;
        navbar.style.transform = `translateX(-50%) scale(0.98)`;
    }else{
        navbar.style.background = `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))`;
        navbar.style.transform = `translateX(-50%) scale(1)`;
    }
});

/* =========================================
MAGNETIC BUTTON EFFECT
========================================= */

const magneticButtons = document.querySelectorAll(".gradient-btn, .icon-btn, .premium-btn, .primary-btn");

magneticButtons.forEach((btn)=>{
    btn.addEventListener("mousemove",(e)=>{
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width/2;
        const y = e.clientY - rect.top - rect.height/2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener("mouseleave",()=>{
        btn.style.transform = `translate(0px, 0px)`;
    });
});

/* =========================================
HERO PARALLAX EFFECT
========================================= */

const heroElement = document.querySelector(".hero");

if(heroElement){
    heroElement.addEventListener("mousemove", (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const floating1 = document.querySelector(".floating1");
        const floating2 = document.querySelector(".floating2");
        const floating3 = document.querySelector(".floating3");

        if(floating1) floating1.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
        if(floating2) floating2.style.transform = `translate(${x * -50}px, ${y * -50}px)`;
        if(floating3) floating3.style.transform = `translate(${x * 30}px, ${y * -30}px)`;
    });
}

/* =========================================
SCROLL ANIMATIONS - Cards & Sections
========================================= */

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = "slideUp 0.8s ease forwards";
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll(
        ".collection-card, .restaurant-card, .section-title-wrap, .hero-content"
    );
    
    elementsToObserve.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        observer.observe(el);
    });
});

/* =========================================
PREMIUM CARD HOVER 3D EFFECT
========================================= */

const cards = document.querySelectorAll(".restaurant-card, .collection-card");

cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * 10;
        const rotateY = ((x / rect.width) - 0.5) * -10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
});

/* =========================================
REVEAL ON SCROLL - Cards with delay
========================================= */

const revealElements = document.querySelectorAll(".collection-card, .restaurant-card, .app-left, .app-right");

const revealOnScroll = () => {
    revealElements.forEach((el, index) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;

        if(elementTop < windowHeight - 100){
            setTimeout(() => {
                el.classList.add("active");
            }, index * 120);
        }
    });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* =========================================
ULTRA LOGO INTERACTIVE EFFECT
========================================= */

const ultraLogo = document.querySelector(".ultra-logo-wrap");

if(ultraLogo){
    ultraLogo.addEventListener("mousemove",(e)=>{
        const box = document.querySelector(".ultra-logo-box");
        const rect = ultraLogo.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 25;
        const rotateX = ((y / rect.height) - 0.5) * -25;

        box.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
    });

    ultraLogo.addEventListener("mouseleave",()=>{
        const box = document.querySelector(".ultra-logo-box");
        box.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)`;
    });
}

/* =========================================
SMOOTH COUNTER ANIMATION
========================================= */

const ratings = document.querySelectorAll(".rating");

ratings.forEach((rating) => {
    const finalValue = parseFloat(rating.innerText);
    let start = 0;
    const increment = finalValue / 30;

    const interval = setInterval(() => {
        start += increment;

        if (start >= finalValue) {
            rating.innerText = finalValue.toFixed(1);
            clearInterval(interval);
        } else {
            rating.innerText = start.toFixed(1);
        }
    }, 30);
});

/* =========================================
LOADER - Hide after load
========================================= */

const hideLoader = () => {
    const loader = document.querySelector(".ultra-loader");

    if(loader){
        setTimeout(()=>{
            loader.style.transition = "all 1.2s cubic-bezier(.19,1,.22,1)";
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
            loader.style.transform = "scale(1.08)";
        }, 1500);
    }
};

// Click to dismiss loader
document.addEventListener("click", () => {
    const loader = document.querySelector(".ultra-loader");
    if(loader && loader.style.visibility !== "hidden"){
        hideLoader();
    }
});

// Auto hide on load
if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", hideLoader);
} else {
    hideLoader();
}

/* =========================================
SEARCH INPUT GLOW
========================================= */

const searchInputs = document.querySelectorAll(".search-box input");

searchInputs.forEach((input) => {
    input.addEventListener("focus", () => {
        const searchBox = input.closest(".search-box");
        if(searchBox) searchBox.style.boxShadow = "0 0 40px rgba(255,122,24,0.35)";
    });

    input.addEventListener("blur", () => {
        const searchBox = input.closest(".search-box");
        if(searchBox) searchBox.style.boxShadow = "0 15px 50px rgba(0,0,0,0.35)";
    });
});

/* =========================================
LOGO PAGE TRANSITION
========================================= */

const logoLink = document.querySelector(".logo-home-link");

if(logoLink){
    logoLink.addEventListener("click",(e)=>{
        e.preventDefault();

        document.body.style.transition = "all 0.8s cubic-bezier(.19,1,.22,1)";
        document.body.style.opacity = "0";
        document.body.style.transform = "scale(1.04)";

        setTimeout(()=>{
            window.location.href = "index.html";
        },700);
    });
}

