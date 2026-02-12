 // 1. Initialize Lenis Smooth Scroll
        const lenis = new Lenis();
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // 2. Navbar Scroll Effect
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            if (window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        });

        // 3. GSAP Typewriter Animation
        gsap.registerPlugin(TextPlugin);

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

        // Clear content before start
        tl.set("#line1, #line2, #line3", { text: "" });

        tl.to("#line1", { duration: 1, text: "Empower.", ease: "none" })
          .to("#line2", { duration: 1, text: "Transform.", ease: "none" }, "+=0.3")
          .to("#line3", { duration: 1, text: "Succeed.", ease: "none" }, "+=0.3");

        // Blink cursor constantly
        gsap.to(".cursor", { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "power2.inOut" });

        // 4. Entrance Animations
        gsap.from(".description, .floating-cta", {
          y: 20,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.5,
          clearProps: "all" // This line ensures GSAP doesn't leave the button hidden
       });


       /*MENU FOR MOB*/
       const menuToggle = document.getElementById('mobile-menu');
const overlay = document.getElementById('overlay');
const body = document.body;

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Prevent scrolling when menu is open
    if (overlay.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
});

// Close menu when a link is clicked
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = 'auto';
    });
});




   
/*SIMPLIFY SECTION */
// Namespaced scroll reveal animation to avoid conflicts
    (function() {
      // Create unique observer for HR section reveal
      const hrSectionRevealObserver = new IntersectionObserver(
        function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting && entry.target.id === 'reveal-section') {
              entry.target.classList.add('reveal-active');
              hrSectionRevealObserver.unobserve(entry.target); // Trigger only once
            }
          });
        },
        {
          threshold: 0.5, // Trigger when 50% of the section is visible
          rootMargin: '0px'
        }
      );

      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
          const hrRevealSection = document.querySelector('#reveal-section');
          if (hrRevealSection) {
            hrSectionRevealObserver.observe(hrRevealSection);
          }
        });
      } else {
        // DOM is already ready
        const hrRevealSection = document.querySelector('#reveal-section');
        if (hrRevealSection) {
          hrSectionRevealObserver.observe(hrRevealSection);
        }
      }
    })();




    /*CARDS SECTION */
         function handleScroll() {
            const cardsWrapper = document.getElementById('cardsWrapper');
            const rect = cardsWrapper.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Trigger animation when element is 20% visible
            if (rect.top < windowHeight * 0.8) {
                cardsWrapper.classList.add('visible');
            }
        }

        // Initial check and scroll listener
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('load', handleScroll);

        // Enhanced hover effects
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Click handling with smooth transition
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Add click animation
                this.style.transform = 'translateY(-4px) scale(0.98)';
                
                setTimeout(() => {
                    this.style.transform = 'translateY(-8px) scale(1.02)';
                    
                    // Navigate after animation
                    setTimeout(() => {
                        window.location.href = this.href;
                    }, 200);
                }, 100);
            });
        });


/*SERVICES SECTION */
  
        document.addEventListener('DOMContentLoaded', function() {
            const ctaButton = document.getElementById('ctaButton');
            const serviceItems = document.querySelectorAll('.services-item');
            
            // Add click handler for CTA button
            ctaButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Add a subtle animation on click
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
                
                // You can add your actual navigation logic here
                console.log('Get Immigration Support clicked');
            });
            
            // Add hover effects for service items
            serviceItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    const iconWrapper = this.querySelector('.services-item-icon-wrapper');
                    iconWrapper.style.transform = 'scale(1.1)';
                    iconWrapper.style.filter = 'drop-shadow(0 6px 20px rgba(247, 233, 2, 0.4))';
                });
                
                item.addEventListener('mouseleave', function() {
                    const iconWrapper = this.querySelector('.services-item-icon-wrapper');
                    iconWrapper.style.transform = 'scale(1)';
                    iconWrapper.style.filter = 'drop-shadow(0 4px 15px rgba(247, 233, 2, 0.3))';
                });
            });
            
            // Intersection Observer for animation trigger on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, { threshold: 0.1 });
            
            serviceItems.forEach(item => {
                observer.observe(item);
            });
        });

        // Add parallax effect to background geometric pattern
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const section = document.querySelector('.immigration-section');
            const rate = scrolled * -0.5;
            
            if (section) {
                section.style.transform = `translateY(${rate}px)`;
            }
        });


         // Intersection Observer for scroll animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe all section content blocks
        const sectionContents = document.querySelectorAll('.section-content');
        sectionContents.forEach(content => {
            observer.observe(content);
        });

        // Observe all section subtexts and links
        const sectionSubtexts = document.querySelectorAll('.section-subtext');
        const sectionLinks = document.querySelectorAll('.section-link');
        
        sectionSubtexts.forEach(subtext => {
            observer.observe(subtext);
        });
        
        sectionLinks.forEach(link => {
            observer.observe(link);
        });

        // Observe service items with staggered animation
        const serviceItems = document.querySelectorAll('.services-item');
        serviceItems.forEach((item, index) => {
            // Reset index for each section to create proper staggering within each section
            const sectionIndex = Math.floor(index / 6); // Assuming max 6 items per section
            const itemIndex = index % 6;
            item.style.transitionDelay = `${0.2 + (itemIndex * 0.1)}s`;
            observer.observe(item);
        });

        // Start typewriter animation when each section header is visible
        const typewriterHeaders = document.querySelectorAll('.section-header');
        const typewriterStarted = new Set();
        
        const typewriterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !typewriterStarted.has(entry.target)) {
                    const header = entry.target;
                    header.classList.add('typewriter');
                    typewriterStarted.add(header);
                }
            });
        }, observerOptions);

        typewriterHeaders.forEach(header => {
            typewriterObserver.observe(header);
        });



        // Section 1: IT Specialization Animations
        const specTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.it-specialization-section',
                start: 'top 60%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        specTimeline
            .to('.spec-label', {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out'
            })
            .to('.spec-heading', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.3')
            .to('.spec-description', {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out'
            }, '-=0.4')
            .to('.spec-point', {
                opacity: 1,
                x: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: 'power2.out'
            }, '-=0.3')
            .to('.spec-visual', {
                opacity: 1,
                duration: 1,
                ease: 'power2.out'
            }, '-=0.8');

        // Visual cards parallax
        gsap.to('.visual-card-1', {
            y: -50,
            scrollTrigger: {
                trigger: '.it-specialization-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });

        gsap.to('.visual-card-2', {
            y: 30,
            scrollTrigger: {
                trigger: '.it-specialization-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });

        // Floating elements
        gsap.to('.float-1', {
            y: 40,
            x: -20,
            rotation: 15,
            scrollTrigger: {
                trigger: '.it-specialization-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2
            }
        });

        gsap.to('.float-2', {
            y: -30,
            x: 20,
            rotation: -10,
            scrollTrigger: {
                trigger: '.it-specialization-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2
            }
        });


/*ABOUT SECTION */
/*ABOUT SECTION */

// Intersection Observer for scroll animation
function initScrollAnimation() {
    const aboutContainer = document.getElementById('aboutContainer');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    observer.observe(aboutContainer);
}

// Initialize About animations
function initAboutAnimations() {
    const heading = document.getElementById('mainHeading');
    if (heading) {
        const text = heading.textContent;
        heading.innerHTML = text.split('').map(char => 
            char === ' ' ? ' ' : `<span class="char">${char}</span>`
        ).join('');

        // GSAP Animations for About Section
        gsap.fromTo('.char', 
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '#aboutContainer',
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    id: 'about-heading' // Add ID
                }
            }
        );

        // Smooth slide-up animation for right content
        gsap.fromTo('#aboutRight',
            {
                opacity: 0,
                y: 100
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '#aboutContainer',
                    start: 'top 70%',
                    end: 'top 30%',
                    scrub: 1,
                    toggleActions: 'play none none reverse',
                    id: 'about-right' // Add ID
                }
            }
        );
    }
}

// Smooth scroll behavior for book call button
function initBookCallButton() {
    const bookCallBtn = document.querySelector('.book-call-btn-wrapper');
    if (bookCallBtn) {
        bookCallBtn.addEventListener('click', () => {
            alert('Booking system would open here!');
        });
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimation();
    initAboutAnimations(); // Initialize About animations first
    initBookCallButton();
});

/*OUR VALUES SECTION*/

// Get responsive values
function getResponsiveValues() {
    const width = window.innerWidth;
    
    if (width <= 375) {
        return {
            dockPosition: '15vw',
            tabWidth: 35,
            cardWidth: '75vw'
        };
    } else if (width <= 480) {
        return {
            dockPosition: '18vw',
            tabWidth: 40,
            cardWidth: '72vw'
        };
    } else if (width <= 768) {
        return {
            dockPosition: '20vw',
            tabWidth: 50,
            cardWidth: '65vw'
        };
    } else if (width <= 1024) {
        return {
            dockPosition: '23vw',
            tabWidth: 70,
            cardWidth: '55vw'
        };
    } else {
        return {
            dockPosition: '25vw',
            tabWidth: 80,
            cardWidth: '50vw'
        };
    }
}

// Smooth stacked card transition - one card at a time
function initValuesAnimation() {
    const cards = gsap.utils.toArray('.value-card');
    if (cards.length === 0) return; // Exit if no cards found
    
    const totalCards = cards.length;
    const isMobile = window.innerWidth <= 768;
    
    // Kill ONLY values-related ScrollTriggers
    ScrollTrigger.getAll().forEach(st => {
        // Kill only if it's related to values section
        if (st.vars.trigger === ".values-section" || 
            st.vars.trigger === ".values-container" ||
            (st.vars.id && st.vars.id.includes('values'))) {
            st.kill();
        }
    });
    
    if (isMobile) {
        // Set all cards to center position initially
        cards.forEach((card) => {
            gsap.set(card, { 
                opacity: 0,
                scale: 0.95,
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%'
            });
        });
        
        // Create timeline for card transitions
        const mobileTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".values-section",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                pin: ".values-container",
                anticipatePin: 1,
                id: 'values-mobile'
            }
        });

        cards.forEach((card, index) => {
            const segmentDuration = 1 / totalCards;
            const fadeInStart = index * segmentDuration;
            const holdStart = fadeInStart + (segmentDuration * 0.2);
            const holdEnd = fadeInStart + (segmentDuration * 0.65);
            
            mobileTl.to(card, {
                opacity: 1,
                scale: 1,
                duration: segmentDuration * 0.2,
                ease: "power1.out"
            }, fadeInStart);
            
            mobileTl.to(card, {
                opacity: 1,
                scale: 1,
                duration: segmentDuration * 0.45
            }, holdStart);
            
            if (index < totalCards - 1) {
                mobileTl.to(card, {
                    opacity: 0,
                    scale: 0.95,
                    duration: segmentDuration * 0.35,
                    ease: "power1.in"
                }, holdEnd);
            }
        });
        
        return;
    }
    
    // Desktop animation
    const tabWidth = 80;
    const leftOffset = 300;

    const mainTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".values-section",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
            id: 'values-desktop'
        }
    });

    cards.forEach((card, i) => {
        const dockPosition = leftOffset + (i * tabWidth);
        gsap.set(card, { left: "100%" });

        mainTl.to(card, {
            left: dockPosition + "px",
            ease: "power2.out",
            duration: 1 / totalCards
        }, i / totalCards);
    });
}

// Initialize values animation after DOM is loaded
window.addEventListener('load', () => {
    initValuesAnimation();
});

window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
        initValuesAnimation(); // Just re-run, it has its own cleanup
    }, 250);
});



/*WHAT WE DELIVER - ENHANCED INTERACTIONS*/

// Intersection Observer with enhanced options
const observerOptionsDeliver = {
    threshold: 0.25,
    rootMargin: '-100px 0px'
};

const observerDeliver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptionsDeliver);

document.querySelectorAll('.content-block-deliver').forEach(block => {
    observerDeliver.observe(block);
});

// Parallax effect for image
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const parallaxContainer = document.querySelector('.parallax-container-deliver');
            const imageSection = document.querySelector('.image-section-deliver');
            
            if (parallaxContainer && imageSection) {
                const rect = parallaxContainer.getBoundingClientRect();
                const scrollPercent = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
                
                const img = imageSection.querySelector('img');
                if (img) {
                    img.style.transform = `scale(${1.1 - scrollPercent * 0.1}) translateY(${scrollPercent * 30}px)`;
                }
            }
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// Smooth reveal for section header
const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

const sectionHeader = document.querySelector('.section-header-deliver');
if (sectionHeader) {
    sectionHeader.style.opacity = '0';
    sectionHeader.style.transform = 'translateY(40px)';
    sectionHeader.style.transition = 'all 1s cubic-bezier(0.19, 1, 0.22, 1)';
    headerObserver.observe(sectionHeader);
}


/*PRE FOOTER*/
        // Intersection Observer for scroll animations
        const observerOptionsConvo = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observerConvo = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate elements
                    document.querySelector('.image-wrapper-convo').classList.add('animate');
                    document.querySelector('.content-convo').classList.add('animate');
                }
            });
        }, observerOptionsConvo);

        // Observe the section
        const section = document.getElementById('hrSection');
        observerConvo.observe(section);

        // Smooth scroll for CTA button
        document.querySelector('.cta-button-convo').addEventListener('click', (e) => {
            e.preventDefault();
            // You can add your navigation logic here
            console.log('Meet the team clicked!');
        });




        
/*FOOTER*/

const t2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".ve-anchor-footer",
        start: "top 90%",
    }
});

t2.from(".brand-anchor", {
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out"
})
.from(".footer-col", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
}, "-=0.8");