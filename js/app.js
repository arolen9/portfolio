import * as framerMotion from 'https://esm.run/framer-motion';
import { animateContentIn, animateContentOut } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const contentArea = document.getElementById('content-area');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('main-header');

    const routes = {
        'home': 'pages/home.html',
        'skills': 'pages/skills.html',
        'projects': 'pages/projects.html',
        'certifications': 'pages/certifications.html',
    };

    const loadContent = async (path, firstLoad = false) => {
        try {
            if (!firstLoad) {
                await animateContentOut(contentArea);
            }
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            contentArea.innerHTML = await response.text();
            lucide.createIcons();
            animateContentIn(contentArea);
        } catch (error) {
            console.error('Failed to load page:', error);
            contentArea.innerHTML = `<div class="text-center text-red-400"><h2>Error</h2><p>Could not load content.</p></div>`;
            animateContentIn(contentArea);
        }
    };

    const updateActiveLink = (hash) => {
        const cleanHash = hash.replace('#', '');
        
        [...navLinks, ...mobileNavLinks].forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${cleanHash}`) {
                link.classList.add('active');
            }
        });
    };

    const router = async () => {
        const hash = window.location.hash || '#home';
        const pageKey = hash.substring(1);
        const path = routes[pageKey] || routes['home'];
        
        await loadContent(path, contentArea.innerHTML === '');
        updateActiveLink(hash);
    };

    window.addEventListener('hashchange', router);

    document.body.addEventListener('click', (e) => {
        if (e.target.closest('a[href^="#"]')) {
            mobileMenu.classList.add('hidden');
        }
    });
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    router();
});
