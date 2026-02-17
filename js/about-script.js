/*HERO SECTION AND NAVIGATION*/

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

// HERO ANIMATIONS - Wrap in DOMContentLoaded to ensure elements exist
document.addEventListener('DOMContentLoaded', function() {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 10 });

    tl.set("#line1", { text: "" });

    tl.to("#line1", { 
        duration: 2.9, 
        text: "Transform Your Workforce.", 
        ease: "power1.inOut" 
    });

    // Entrance for the new elements
    gsap.from(".eyebrow, .description, .floating-cta", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power4.out",
        delay: 0.8
    });
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

/*JOURNEY SECTION*/
document.addEventListener('DOMContentLoaded', function () {
    // Animate numbers when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target.querySelector('.milestone-number');
                if (numberElement && !numberElement.classList.contains('animated')) {
                    numberElement.classList.add('animated');
                    animateNumber(numberElement);
                }
            }
        });
    }, observerOptions);

    // Observe all milestone cards
    document.querySelectorAll('.milestone-card').forEach(card => {
        observer.observe(card);
    });

    function animateNumber(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const number = parseInt(text.replace(/[^0-9]/g, ''));

        if (isNaN(number)) return;

        let current = 0;
        const increment = number / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }

            let displayText = Math.floor(current).toString();
            if (hasPlus) displayText += '+';
            if (hasPercent) displayText += '%';

            element.textContent = displayText;
        }, 30);
    }
});

/*MISSION & VALUES*/

// 1. Smooth Parallax for the Background Watermark
gsap.to(".bg-watermark", {
    y: -100,
    scrollTrigger: {
        trigger: ".brilliant-about-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

// 2. The Reveal Animation for Pillars
const pillars = document.querySelectorAll('.pillar-item');

pillars.forEach((pillar, i) => {
    const img = pillar.querySelector('img');
    const card = pillar.querySelector('.info-card');

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: pillar,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });

    tl.from(pillar, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out"
    })
    .from(card, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=1");
});

/*ABOUT SECTION*/
function setupAboutAnimations() {
    // Animate heading characters
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
                    toggleActions: 'play none none none'
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
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
}

// CALL THE FUNCTION!
document.addEventListener('DOMContentLoaded', setupAboutAnimations);


        // HOW WE WORK SECTION

        const methodTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.methodology-section',
                start: 'top 60%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        methodTimeline
            .to('.method-label', {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out'
            })
            .to('.method-heading', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.3')
            .to('.method-subheading', {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out'
            }, '-=0.4');

        // Animate each step
        document.querySelectorAll('.method-step').forEach((step, index) => {
            gsap.to(step, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: step,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            });

            // Animate connecting line
            const line = step.querySelector('::after');
            gsap.to(step, {
                '--line-height': '100%',
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: step,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Closing section animation
        gsap.to('.method-closing', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.method-closing',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });

        // Decorative elements parallax
        gsap.to('.decorator-1', {
            y: 60,
            x: -30,
            scrollTrigger: {
                trigger: '.methodology-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5
            }
        });

        gsap.to('.decorator-2', {
            y: -50,
            x: 40,
            scrollTrigger: {
                trigger: '.methodology-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5
            }
        });

        gsap.to('.decorator-3', {
            y: 40,
            x: -20,
            scrollTrigger: {
                trigger: '.methodology-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5
            }
        });

        // Background gradient animation
        gsap.to('.methodology-bg::before', {
            rotation: 360,
            duration: 40,
            repeat: -1,
            ease: 'none'
        });

        gsap.to('.methodology-bg::after', {
            rotation: -360,
            duration: 50,
            repeat: -1,
            ease: 'none'
        });



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
gsap.registerPlugin(ScrollTrigger);

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

        