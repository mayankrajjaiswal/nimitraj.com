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

            // Playful blocky/gaming animation on button
            submitBtn.style.pointerEvents = 'none';
            submitBtnText.innerText = 'Queueing Match...';
            submitBtnIcon.className = 'fa-solid fa-spinner animate-spin';

            setTimeout(() => {
                submitBtnText.innerText = 'Connecting to Lobby...';
                submitBtnIcon.className = 'fa-solid fa-server';
                
                setTimeout(() => {
                    // Hide the form and show the success block
                    contactForm.classList.add('hidden');
                    formSuccess.classList.remove('hidden');

                    // Personalize the success message based on Nimit's interests!
                    const successHeading = formSuccess.querySelector('h3');
                    const successParagraph = formSuccess.querySelector('p');

                    if (messageInput.includes('cricket') || messageInput.includes('bat') || messageInput.includes('ball') || messageInput.includes('bowling') || messageInput.includes('dhoni') || messageInput.includes('virat')) {
                        successHeading.innerHTML = `🏏 Howzat! Caught Clean, ${nameInput}!`;
                        successParagraph.innerHTML = `Incredible! A fellow cricketer! Your message has been caught cleanly at first slip and passed directly to my parent-moderator. I'll get back to you as soon as I finish my practice session on the nets!`;
                    } else if (messageInput.includes('roblox') || messageInput.includes('game') || messageInput.includes('obby') || messageInput.includes('builder') || messageInput.includes('blox')) {
                        successHeading.innerHTML = `🟥 Spawned in Lobby, ${nameInput}!`;
                        successParagraph.innerHTML = `Awesome! A Roblox enthusiast! Your message successfully bypassed the blocky creepers, spawned in my server lobby, and is now pending admin review. See you in the server soon!`;
                    } else if (messageInput.includes('vlog') || messageInput.includes('vlogging') || messageInput.includes('video') || messageInput.includes('youtube') || messageInput.includes('record')) {
                        successHeading.innerHTML = `📹 Stream Live, ${nameInput}!`;
                        successParagraph.innerHTML = `Amazing! You're into content creation too! I've hit the record button on your message and it is currently rendering in my inbox. Speak soon!`;
                    } else if (messageInput.includes('cycle') || messageInput.includes('cycling') || messageInput.includes('bike') || messageInput.includes('bicycle')) {
                        successHeading.innerHTML = `🚲 Speed Boost Activated, ${nameInput}!`;
                        successParagraph.innerHTML = `Awesome! You love cycling too! Your message just pedaled in at top speed, overtaking the competition. Keep riding and stay safe!`;
                    } else if (messageInput.includes('vedik') || messageInput.includes('brother')) {
                        successHeading.innerHTML = `😂 Sibling Alert, ${nameInput}!`;
                        successParagraph.innerHTML = `Haha! You mentioned my younger brother Vedik! He is probably busy being a superhero right now, but I will make sure he knows you said hello (right after I win our next bicycle race!).`;
                    } else if (messageInput.includes('pizza')) {
                        successHeading.innerHTML = `🍕 Sizzling Hot Transmission, ${nameInput}!`;
                        successParagraph.innerHTML = `Woohoo! You mentioned pizza! That immediately alerts my emergency radar. My dad is reviewing your message while I dream of a cheesy slice. Speak soon!`;
                    } else {
                        successHeading.innerHTML = `🚀 Spawned Successfully, ${nameInput}!`;
                        successParagraph.innerHTML = `Awesome! Your message successfully spawned in my inbox. My dad is currently reviewing the logs, and I'll get back to you as soon as my gaming shift or cricket practice is over!`;
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
