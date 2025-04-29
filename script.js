document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu functionality
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    let isMenuOpen = false;
    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        mobileMenu.style.height = isMenuOpen ? '240px' : '0';
        menuBtn.querySelector('i').className = isMenuOpen ? 'ri-close-line text-xl' : 'ri-menu-line text-xl';
    });
    // Close menu when clicking a link
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.style.height = '0';
            menuBtn.querySelector('i').className = 'ri-menu-line text-xl';
        });
    });
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Before-After Slider functionality
    const sliders = document.querySelectorAll('.before-after-slider');
    sliders.forEach(slider => {
        const handle = slider.querySelector('.slider-handle');
        const beforeDiv = slider.querySelector('.slider-before');

        beforeDiv.style.width = '50%'; // default
        handle.style.left = '50%'; // default
        
        let isDragging = false;
        let currentSlider = null;
        const moveHandle = (e) => {
            if (!isDragging || !currentSlider) return;
            e.preventDefault();
            const sliderRect = currentSlider.getBoundingClientRect();
            const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            let position = (clientX - sliderRect.left) / sliderRect.width;
            position = Math.max(0, Math.min(1, position));
            const handleElement = currentSlider.querySelector('.slider-handle');
            const beforeElement = currentSlider.querySelector('.slider-before');
            handleElement.style.left = `${position * 100}%`;
            beforeElement.style.width = `${position * 100}%`;
        };
        const startDragging = (e, element) => {
            isDragging = true;
            currentSlider = element;
            moveHandle(e);
        };
        const stopDragging = () => {
            isDragging = false;
            currentSlider = null;
        };
        handle.addEventListener('mousedown', (e) => startDragging(e, slider));
        handle.addEventListener('touchstart', (e) => startDragging(e, slider));
        document.addEventListener('mousemove', moveHandle, { passive: false });
        document.addEventListener('touchmove', moveHandle, { passive: false });
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('touchend', stopDragging);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Consultation Modal Functionality
    const bookConsultationBtn = document.getElementById('bookConsultationBtn');
    const navBookConsultationBtn = document.querySelector('.nav-book-consultation');
    const consultationModal = document.getElementById('consultationModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const consultationForm = document.getElementById('consultationForm');
    const successModal = document.getElementById('successModal');
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');
    const openModal = () => {
        consultationModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
        consultationModal.classList.add('hidden');
        document.body.style.overflow = '';
    };
    const showSuccessModal = () => {
        consultationModal.classList.add('hidden');
        successModal.classList.remove('hidden');
    };
    const closeSuccessModal = () => {
        successModal.classList.add('hidden');
        document.body.style.overflow = '';
        consultationForm.reset();
    };
    bookConsultationBtn.addEventListener('click', openModal);
    navBookConsultationBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    closeSuccessBtn.addEventListener('click', closeSuccessModal);
    consultationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(consultationForm);
        const data = Object.fromEntries(formData);
        // Here you would typically send the data to your backend
        // For now, we'll just show the success message
        showSuccessModal();
    });
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === consultationModal) {
            closeModal();
        }
        if (e.target === successModal) {
            closeSuccessModal();
        }
    });
    // Active tab highlighting
    const tabLinks = document.querySelectorAll('.fixed.bottom-0 a');
    const setActiveTab = () => {
        const scrollPosition = window.scrollY;
        // Get all sections
        const sections = document.querySelectorAll('section[id]');
        // Find the current section
        let currentSection = '';
        if (scrollPosition < 100) {
            currentSection = '#top';
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = `#${section.id}`;
                }
            });
        }
        // Update active tab
        tabLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Reset all tabs
            link.querySelector('div').classList.remove('text-primary');
            link.querySelector('div').classList.add('text-gray-500');
            // Set active tab
            if (href === currentSection || (href === '#' && currentSection === '')) {
                link.querySelector('div').classList.remove('text-gray-500');
                link.querySelector('div').classList.add('text-primary');
            }
        });
    };
    // Initial call
    setActiveTab();
    // Update on scroll
    window.addEventListener('scroll', setActiveTab);
});