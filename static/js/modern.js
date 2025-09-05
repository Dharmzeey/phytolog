// Modern JavaScript for Tree Database

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        });
    }

    // Auto-hide messages
    const messageElement = document.getElementById('pop-up');
    if (messageElement) {
        setTimeout(() => {
            messageElement.style.opacity = '0';
            messageElement.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 300);
        }, 3000);
    }

    // Geolocation for coordinate fields
    const coordinatesField = document.getElementById('id_coordinates');
    const latitudeField = document.getElementById('id_latitude');
    const longitudeField = document.getElementById('id_longitude');

    if (coordinatesField && latitudeField && longitudeField) {
        // Make fields readonly
        coordinatesField.readOnly = true;
        latitudeField.readOnly = true;
        longitudeField.readOnly = true;

        // Get current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                coordinatesField.value = lat + ',' + lng;
                latitudeField.value = lat;
                longitudeField.value = lng;
            }, function(error) {
                console.log('Geolocation error:', error);
            });
        }
    }

    // Dynamic search placeholder for specific search
    const dynamicInput = document.getElementById('dynamic');
    if (dynamicInput && typeof result !== 'undefined') {
        dynamicInput.placeholder = result;
        
        if (result === 'Search by Coordinates') {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    dynamicInput.value = position.coords.latitude + ',' + position.coords.longitude;
                });
            }
            dynamicInput.readOnly = true;
            
            const searchButton = document.getElementById('inp_cord');
            if (searchButton) {
                searchButton.style.display = 'inline-block';
            }
        }
    }

    // Smooth scrolling for anchor links
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

    // Add loading states to forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitButton = form.querySelector('input[type="submit"], button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="loading"></span> Loading...';
            }
        });
    });

    // Enhanced search functionality
    const searchInput = document.querySelector('input[name="q"]');
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length >= 2) {
                searchTimeout = setTimeout(() => {
                    // Add visual feedback for search
                    this.style.borderColor = 'var(--gray-400)';
                }, 300);
            }
        });
    }

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.result-item, .location-item, .album-item, .contributor-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Console branding
    console.log(`
    🌳 Tree Database - Modern Interface
    Built with modern web technologies
    `);
});