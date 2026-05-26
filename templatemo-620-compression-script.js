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
