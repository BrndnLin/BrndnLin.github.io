// shared-components.js - Universal site components
// Edit this ONE file to update navigation, footer, and behaviors across entire site

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // CONFIGURATION - Detect path depth for links
    // ============================================
    const pathDepth = window.location.pathname.split('/').filter(x => x).length;
    const isSubdirectory = pathDepth > 1 || window.location.pathname.includes('/projects/');
    const prefix = isSubdirectory ? '../' : '';

    // ============================================
    // NAVIGATION BAR
    // Edit lines 17-27 to change nav across all pages
    // ============================================
    const navHTML = `
        <div class="nav-container">
            <a href="${prefix}index.html" class="nav-brand">Brandon Lin</a>
            <ul class="nav-links">
                <li><a href="${prefix}index.html">Home</a></li>
                <li><a href="${prefix}projects.html">Projects</a></li>
                <li><a href="${prefix}experience.html">Experience</a></li>
                <li><a href="${prefix}resume.html">Resume</a></li>
            </ul>
            <div class="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;

    const navElement = document.querySelector('nav');
    if (navElement) {
        // Check if nav is empty or only has noscript
        const hasContent = navElement.querySelector('.nav-container');
        if (!hasContent) {
            navElement.innerHTML = navHTML;
        }
        // Always remove aria-hidden once script loads
        navElement.removeAttribute('aria-hidden');
    }

    // ============================================
    // FOOTER
    // Edit lines 47-49 to change footer across all pages
    // ============================================
    const footerHTML = `
        <p>&copy; 2025 Brandon Lin. Built from scratch with HTML & CSS.</p>
        <p>Full interactive portfolio launching November 2025</p>
    `;

    const footerElement = document.querySelector('footer');
    if (footerElement) {
        // Check if footer is empty or only has noscript
        const hasContent = footerElement.querySelector('p:not(noscript p)');
        if (!hasContent) {
            footerElement.innerHTML = footerHTML;
        }
        // Always remove aria-hidden once script loads
        footerElement.removeAttribute('aria-hidden');
    }

    // ============================================
    // MOBILE MENU FUNCTIONALITY
    // ============================================
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // ============================================
    // SCROLL ANIMATIONS (for timeline items)
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Apply to timeline and compact items
    document.querySelectorAll('.timeline-item, .compact-item').forEach(item => {
        observer.observe(item);
    });

    // ============================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // CONSOLE LOG (confirms script loaded)
    // ============================================
    console.log('✓ Shared components loaded successfully');
});
