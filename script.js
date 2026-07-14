/* -------------------------------------------------------------
   NIMIT RAJ JAISWAL LANDING PAGE INTERACTIVITY
   Clean, interactive, and playful script.
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------
    // 1. Mobile Navigation Menu Toggle
    // --------------------------------------------------
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navToggleIcon = navToggle.querySelector('i');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            
            // Toggle hamburger / close icon
            if (navLinks.classList.contains('active')) {
                navToggleIcon.classList.remove('fa-bars');
                navToggleIcon.classList.add('fa-xmark');
            } else {
                navToggleIcon.classList.remove('fa-xmark');
                navToggleIcon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking outside of it
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggleIcon.classList.remove('fa-xmark');
                navToggleIcon.classList.add('fa-bars');
            }
        });

        // Handle nav link clicks (with smooth scrolling offset to prevent sticky nav coverage)
        const scrollLinks = document.querySelectorAll('.nav-links a, .hero-actions a');
        scrollLinks.forEach(item => {
            item.addEventListener('click', (e) => {
                const targetId = item.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    
                    // Close mobile navigation menu if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        navToggleIcon.classList.remove('fa-xmark');
                        navToggleIcon.classList.add('fa-bars');
                    }

                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        const navbarHeight = 85; // Height of our sticky navbar
                        const targetOffset = targetSection.offsetTop - navbarHeight;
                        
                        window.scrollTo({
                            top: targetOffset,
                            behavior: 'smooth'
                        });

                        // Immediately update active class for nav links
                        if (item.classList.contains('nav-item')) {
                            navItems.forEach(nav => nav.classList.remove('active'));
                            item.classList.add('active');
                        }
                    }
                }
            });
        });
    }

    // --------------------------------------------------
    // 2. Sticky Navbar Styling on Scroll
    // --------------------------------------------------
    const navbar = document.querySelector('.navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call in case page starts scrolled
    handleScroll();

    // --------------------------------------------------
    // 3. Navigation Scroll Spy (Active link indicator)
    // --------------------------------------------------
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    const scrollSpy = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 130; // offset calculation baseline

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Fail-safe for top of the page
        if (window.scrollY < 50) {
            currentSectionId = 'about';
        }

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);

    // --------------------------------------------------
    // 4. Playful Form Submission Handler
    // --------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form inputs for a customized funny message
            const nameInput = document.getElementById('name').value;
            const messageInput = document.getElementById('message').value.toLowerCase();
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            const submitBtnText = submitBtn.querySelector('span');
            const submitBtnIcon = submitBtn.querySelector('i');

            // Playful launching animation on button
            submitBtn.style.pointerEvents = 'none';
            submitBtnText.innerText = 'Powering Engines...';
            submitBtnIcon.className = 'fa-solid fa-gears animate-spin';

            setTimeout(() => {
                submitBtnText.innerText = 'Clearing Atmosphere...';
                submitBtnIcon.className = 'fa-solid fa-cloud-sun';
                
                setTimeout(() => {
                    // Hide the form and show the success block
                    contactForm.classList.add('hidden');
                    formSuccess.classList.remove('hidden');

                    // Personalize the success message if they mentioned pizza or Minecraft!
                    const successHeading = formSuccess.querySelector('h3');
                    const successParagraph = formSuccess.querySelector('p');

                    if (messageInput.includes('pizza')) {
                        successHeading.innerHTML = `🍕 Transmission Received, ${nameInput}!`;
                        successParagraph.innerHTML = `Awesome! You mentioned pizza! I've automatically added this to my urgent radar. My dad is currently reviewing the message, and I'm looking for a slice. Speak soon!`;
                    } else if (messageInput.includes('minecraft') || messageInput.includes('game') || messageInput.includes('play')) {
                        successHeading.innerHTML = `🎮 Ready Player One, ${nameInput}!`;
                        successParagraph.innerHTML = `Awesome! A fellow gamer! Your message successfully avoided the creepers and landed in my inbox. I'll get back to you once my homework/gaming shift is over!`;
                    } else {
                        successHeading.innerHTML = `🚀 Message Transmitted, ${nameInput}!`;
                    }
                }, 1200);
            }, 1200);
        });
    }

    // --------------------------------------------------
    // 5. Scroll-To-Reveal Animations (Intersection Observer)
    // --------------------------------------------------
    const animateElements = document.querySelectorAll('.card, .hobby-item, .fact-card, .section-header');

    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Animate once
            }
        });
    };

    const observerOptions = {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(revealOnScroll, observerOptions);

    animateElements.forEach(el => {
        // Set initial transition styles via JS to support non-JS fallbacks
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.15)';
        observer.observe(el);
    });
});
