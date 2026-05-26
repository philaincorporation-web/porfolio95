/*
   COMPRESSION — TM-620
   https://templatemo.com/tm-620-compression
   Design: TemplateMo
   
   Scroll reveal with IntersectionObserver
   + 3-second setTimeout fallback for iframe preview contexts
*/

(function () {
    'use strict';

    // Scroll reveal for mobile stacked layout
    const panels = document.querySelectorAll('article.panel');

    function revealPanel(el) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    }

    // Only apply scroll reveal in mobile (stacked) layout
    function initScrollReveal() {
        if (window.innerWidth > 900) return;

        panels.forEach(function (panel) {
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(20px)';
            panel.style.transition = 'opacity 0.6s cubic-bezier(0.77, 0, 0.175, 1), transform 0.6s cubic-bezier(0.77, 0, 0.175, 1)';
        });

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        revealPanel(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            panels.forEach(function (panel) {
                observer.observe(panel);
            });
        }

        // 3-second fallback for iframe preview contexts
        setTimeout(function () {
            panels.forEach(function (panel) {
                revealPanel(panel);
            });
        }, 3000);
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && window.location.hash) {
            window.location.hash = '';
        }
    });

    // Close modal when clicking overlay background
    document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                window.location.hash = '';
            }
        });
    });

    // Init
    document.addEventListener('DOMContentLoaded', initScrollReveal);
})();



/* JavaScript Document
Tooplate 2150 Living Parallax
https://www.tooplate.com/view/2150-living-parallax
*/
const slider=document.getElementById("slider"),slides=document.querySelectorAll(".slide"),dots=document.querySelectorAll(".dot"),prevBtn=document.querySelector(".nav-arrow.prev"),nextBtn=document.querySelector(".nav-arrow.next"),menuToggle=document.getElementById("menuToggle"),mainNav=document.getElementById("mainNav");let autoPlayInterval,progressInterval,progressStart,currentSlide=0,isAnimating=!1,mouseX=0,mouseY=0,isPausedByUser=!1,slideDuration=5e3;function updateParallax(){const e=slides[currentSlide].querySelector(".background-layer"),t=document.querySelectorAll(".parallax-shape");e&&(e.style.transform=`translate(${20*mouseX}px, ${20*mouseY}px)`),t.forEach((e,t)=>{if(e.style.transform&&e.style.transform.includes("rotate"))return;const n=15*(t+1);e.style.transform=`translate(${mouseX*n}px, ${mouseY*n}px)`})}function getTransitionDuration(){return currentDuration<=3?300:700}function showSlide(e){if(isAnimating)return;isAnimating=!0;const t=getTransitionDuration();document.documentElement.style.setProperty("--slide-transition-duration",t+"ms"),slides.forEach(e=>{e.classList.remove("active","prev")}),dots.forEach(e=>e.classList.remove("active")),currentSlide!==e&&slides[currentSlide].classList.add("prev"),slides[currentSlide=e].classList.add("active"),dots[currentSlide].classList.add("active"),updateParallax(),setTimeout(()=>{isAnimating=!1},t)}function nextSlide(){showSlide((currentSlide+1)%slides.length)}function prevSlide(){showSlide((currentSlide-1+slides.length)%slides.length)}function startAutoPlay(){clearInterval(autoPlayInterval),stopProgressBar(),isPausedByUser||(startProgressBar(),autoPlayInterval=setInterval(()=>{nextSlide(),stopProgressBar(),startProgressBar()},slideDuration))}function startProgressBar(){const e=document.getElementById("progressBar");function t(){const t=Date.now()-progressStart,n=Math.min(t/slideDuration,1),s=100*n;e.style.width=s+"%",n>=1&&(e.style.width="100%")}e&&(e.style.width="0%",progressStart=Date.now(),clearInterval(progressInterval),progressInterval=setInterval(t,50),t())}function stopProgressBar(){clearInterval(progressInterval);const e=document.getElementById("progressBar");e&&(e.style.width="0%")}function openOverlay(e){const t=document.getElementById(e+"Overlay");t.classList.add("active"),clearInterval(autoPlayInterval);const n=t.querySelector(".overlay-content");n&&setTimeout(()=>{const e=n.querySelector(".scroll-indicator");if(e){n.scrollHeight>n.clientHeight&&(e.classList.add("show"),n.classList.add("has-scroll"))}},100)}function closeOverlay(e){document.getElementById(e+"Overlay").classList.remove("active"),isPausedByUser||startAutoPlay()}function handleSubmit(e){e.preventDefault(),alert("Thank you for your message! We will get back to you soon."),e.target.reset(),closeOverlay("contact")}function moveShapeToRandomPosition(e){const t=60*Math.random()+10,n=80*Math.random()+5;e.style.top=t+"%",e.style.left=n+"%",e.style.bottom="auto",e.style.right="auto";const s=360*Math.random();e.style.transform=`rotate(${s}deg)`,setTimeout(()=>{e.style.transform=""},800)}function autoMoveShapes(){document.querySelectorAll(".parallax-shape").forEach((e,t)=>{setTimeout(()=>{moveShapeToRandomPosition(e)},2e3*t)})}function handleScrollIndicator(e){const t=e.querySelector(".scroll-indicator");function n(){const n=e.scrollHeight>e.clientHeight,s=e.scrollTop+e.clientHeight>=e.scrollHeight-10;n&&!s?t.classList.add("show"):t.classList.remove("show"),n&&!s?e.classList.add("has-scroll"):e.classList.remove("has-scroll")}t&&(setTimeout(n,100),e.addEventListener("scroll",n))}menuToggle.addEventListener("click",()=>{menuToggle.classList.toggle("active"),mainNav.classList.toggle("active")}),document.querySelectorAll("nav a").forEach(e=>{e.addEventListener("click",()=>{window.innerWidth<=768&&(menuToggle.classList.remove("active"),mainNav.classList.remove("active"))})}),slider.addEventListener("mousemove",e=>{const t=slider.getBoundingClientRect();mouseX=(e.clientX-t.left)/t.width-.5,mouseY=(e.clientY-t.top)/t.height-.5,updateParallax()}),nextBtn.addEventListener("click",()=>{clearInterval(autoPlayInterval),nextSlide(),isPausedByUser||startAutoPlay()}),prevBtn.addEventListener("click",()=>{clearInterval(autoPlayInterval),prevSlide(),isPausedByUser||startAutoPlay()}),dots.forEach(e=>{e.addEventListener("click",()=>{clearInterval(autoPlayInterval),showSlide(parseInt(e.getAttribute("data-slide"))),isPausedByUser||startAutoPlay()})}),document.addEventListener("keydown",e=>{"ArrowLeft"===e.key?(clearInterval(autoPlayInterval),prevSlide(),isPausedByUser||startAutoPlay()):"ArrowRight"===e.key?(clearInterval(autoPlayInterval),nextSlide(),isPausedByUser||startAutoPlay()):"h"===e.key.toLowerCase()&&uiToggleBtn.click()}),document.querySelectorAll(".overlay").forEach(e=>{e.addEventListener("click",t=>{t.target===e&&(e.classList.remove("active"),isPausedByUser||startAutoPlay())})}),document.addEventListener("keydown",e=>{"Escape"===e.key&&(document.querySelectorAll(".overlay").forEach(e=>{e.classList.remove("active")}),isPausedByUser||startAutoPlay())}),startAutoPlay(),updateParallax(),window.innerWidth<=768&&slider.removeEventListener("mousemove",updateParallax),document.querySelectorAll(".parallax-shape").forEach(e=>{e.addEventListener("click",function(e){e.stopPropagation(),moveShapeToRandomPosition(this)})}),setInterval(autoMoveShapes,15e3),setTimeout(autoMoveShapes,5e3),document.querySelectorAll(".overlay-content").forEach(e=>{handleScrollIndicator(e)});const fullscreenBtn=document.getElementById("fullscreenBtn"),expandIcon='<svg viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>',collapseIcon='<svg viewBox="0 0 24 24"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>';fullscreenBtn.addEventListener("click",()=>{window.innerWidth<=768&&(menuToggle.classList.remove("active"),mainNav.classList.remove("active")),document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement?(document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen(),fullscreenBtn.classList.remove("active"),fullscreenBtn.innerHTML=expandIcon):(document.documentElement.requestFullscreen?document.documentElement.requestFullscreen():document.documentElement.webkitRequestFullscreen?document.documentElement.webkitRequestFullscreen():document.documentElement.mozRequestFullScreen?document.documentElement.mozRequestFullScreen():document.documentElement.msRequestFullscreen&&document.documentElement.msRequestFullscreen(),fullscreenBtn.classList.add("active"),fullscreenBtn.innerHTML=collapseIcon)}),document.addEventListener("fullscreenchange",()=>{document.fullscreenElement||(fullscreenBtn.classList.remove("active"),fullscreenBtn.innerHTML=expandIcon)}),document.addEventListener("webkitfullscreenchange",()=>{document.webkitFullscreenElement||(fullscreenBtn.classList.remove("active"),fullscreenBtn.innerHTML=expandIcon)}),document.addEventListener("mozfullscreenchange",()=>{document.mozFullScreenElement||(fullscreenBtn.classList.remove("active"),fullscreenBtn.innerHTML=expandIcon)});const playPauseBtn=document.getElementById("playPauseBtn"),playIcon='<svg viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>',pauseIcon='<svg viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>';playPauseBtn.innerHTML=pauseIcon,playPauseBtn.addEventListener("click",e=>{e.stopPropagation(),isPausedByUser?(isPausedByUser=!1,startAutoPlay(),playPauseBtn.innerHTML=pauseIcon,playPauseBtn.classList.remove("paused")):(isPausedByUser=!0,clearInterval(autoPlayInterval),stopProgressBar(),playPauseBtn.innerHTML=playIcon,playPauseBtn.classList.add("paused"))});const decreaseBtn=document.getElementById("decreaseDuration"),increaseBtn=document.getElementById("increaseDuration"),durationDisplay=document.getElementById("durationDisplay"),progressBarContainer=document.querySelector(".progress-bar-container"),durationControls=document.querySelector(".duration-controls");let currentDuration=5;function updateDuration(e){currentDuration=Math.max(1,Math.min(9,e)),slideDuration=1e3*currentDuration,durationDisplay.innerHTML=currentDuration+"<span>s</span>";const t=getTransitionDuration();document.documentElement.style.setProperty("--slide-transition-duration",t+"ms"),isPausedByUser||startAutoPlay()}document.documentElement.style.setProperty("--slide-transition-duration","700ms"),decreaseBtn.addEventListener("click",e=>{e.stopPropagation(),updateDuration(currentDuration-1)}),increaseBtn.addEventListener("click",e=>{e.stopPropagation(),updateDuration(currentDuration+1)});let uiVisible=!0;const uiToggleBtn=document.getElementById("uiToggleBtn"),eyeIcon=document.getElementById("eyeIcon");uiToggleBtn.title="Hide UI Elements (Press H)";const eyeOpenPath='<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',eyeClosedPath='<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';uiToggleBtn.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation();const t=document.querySelectorAll(".ui-element");uiVisible?(t.forEach(e=>e.classList.add("hidden")),uiVisible=!1,uiToggleBtn.classList.add("ui-hidden"),eyeIcon.innerHTML=eyeClosedPath,uiToggleBtn.title="Show UI Elements (Press H)"):(t.forEach(e=>e.classList.remove("hidden")),uiVisible=!0,uiToggleBtn.classList.remove("ui-hidden"),eyeIcon.innerHTML=eyeOpenPath,uiToggleBtn.title="Hide UI Elements (Press H)")});

