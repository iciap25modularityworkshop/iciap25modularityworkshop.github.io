document.addEventListener('DOMContentLoaded', function() {
    // Load header component
    loadComponent('header', 'components/header.html', function() {
        // Set active class on the current page's nav item
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navId = 'nav-' + currentPage.replace('.html', '');
        const activeNavItem = document.getElementById(navId);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        } else {
            // Default to home if no matching nav item
            document.getElementById('nav-home').classList.add('active');
        }
    });

    // Load footer component
    loadComponent('footer', 'components/footer.html', function() {
        // Set active class on the current page's nav item
        const currentPage = window.location.pathname.split('/').pop() || 'footer.html';
        const navId = 'nav-' + currentPage.replace('.html', '');
        const activeNavItem = document.getElementById(navId);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        } else {
            // Default to home if no matching nav item
            document.getElementById('nav-home').classList.add('active');
        }
    });

    // Function to load component
    function loadComponent(targetId, url, callback) {
        const target = document.getElementById(targetId);
        if (target) {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to load component: ${response.status}`);
                    }
                    return response.text();
                })
                .then(html => {
                    target.innerHTML = html;
                    if (typeof callback === 'function') {
                        callback();
                    }
                })
                .catch(error => {
                    console.error('Error loading component:', error);
                });
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile menu toggle functionality
    const navItems = document.querySelector('nav ul');
    const hamburgerMenu = document.createElement('div');
    hamburgerMenu.className = 'hamburger-menu';
    hamburgerMenu.innerHTML = '<span></span><span></span><span></span>';
    
    document.querySelector('nav').prepend(hamburgerMenu);
    
    hamburgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navItems.classList.toggle('show');
    });
    
    // Current year for copyright
    const year = new Date().getFullYear();
    document.querySelectorAll('.copyright p').forEach(el => {
        el.innerHTML = el.innerHTML.replace('2025', year);
    });
    
    // Add page header background styling
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        pageHeader.style.background = 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("../images/rome.jpg") no-repeat center center';
        pageHeader.style.backgroundSize = 'cover';
        pageHeader.style.color = 'white';
        pageHeader.style.textAlign = 'center';
        pageHeader.style.padding = '80px 0';
        pageHeader.style.marginBottom = '40px';
    }
});