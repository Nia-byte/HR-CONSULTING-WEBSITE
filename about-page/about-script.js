/*NAVBAR AND HERO*/

/*NAVBAR AND HERO SECTION*/
document.addEventListener('DOMContentLoaded', function() {
            // Stagger animation delays for text elements
            const animatedElements = document.querySelectorAll('.main-heading, .sub-heading, .description, .cta-button, .floating-cta');
            
            animatedElements.forEach((element, index) => {
                element.style.animationDelay = `${0.3 + (index * 0.3)}s`;
            });

            // Add hover effects for buttons
            const buttons = document.querySelectorAll('.book-call-btn, .cta-button, .floating-cta');
            
            buttons.forEach(button => {
                button.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px) scale(1.02)';
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });

            // Mobile menu functionality
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navLinks = document.querySelector('.nav-links');

            mobileMenuBtn.addEventListener('click', function() {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            });

       const lines = [
    { id: 'line1', text: 'Empower.' },
    { id: 'line2', text: 'Transform.' },
    { id: 'line3', text: 'Succeed.' }
  ];

  let currentLine = 0;
  let currentChar = 0;

  function typeLine() {
    const line = lines[currentLine];
    const element = document.getElementById(line.id);
    element.classList.add("visible");

    if (currentChar < line.text.length) {
      element.textContent += line.text.charAt(currentChar);
      currentChar++;
      setTimeout(typeLine, 100); // typing speed
    } else {
      currentLine++;
      currentChar = 0;
      if (currentLine < lines.length) {
        setTimeout(typeLine, 600); // pause before next line
      } else {
        setTimeout(resetAndStart, 5000); // wait 5 seconds then reset
      }
    }
  }

  function resetAndStart() {
    for (const line of lines) {
      const el = document.getElementById(line.id);
      el.textContent = '';
      el.classList.remove("visible");
    }
    currentLine = 0;
    currentChar = 0;
    setTimeout(typeLine, 500);
  }

  // Start the animation
  window.onload = () => setTimeout(typeLine, 500);
        });

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('nav');
    let lastScrollY = window.scrollY;
    
    // Function to handle scroll events
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Add 'scrolled' class when user scrolls down more than 50px
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update last scroll position
        lastScrollY = currentScrollY;
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }
    
    function finishTick() {
        ticking = false;
    }
    
    // Optimized scroll handler
    function onScroll() {
        requestTick();
        setTimeout(finishTick, 16); // ~60fps
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Optional: Handle initial state if page is already scrolled
    handleScroll();
});



  function bookCall() {
            // Add your booking functionality here
            alert('Booking system would be integrated here!');
        }

        // Add subtle hover effects to geometric shapes
        document.addEventListener('DOMContentLoaded', function() {
            const shapes = document.querySelectorAll('.geo-shape');
            
            shapes.forEach(shape => {
                shape.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.02) rotate(0.5deg)';
                });
                
                shape.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1) rotate(0deg)';
                });
            });

            // Add floating animation to dots with random movement
            const dots = document.querySelectorAll('[class*="floating-dot"]');
            dots.forEach((dot, index) => {
                setInterval(() => {
                    const randomX = Math.random() * 6 - 3;
                    const randomY = Math.random() * 6 - 3;
                    dot.style.transform = `translate(${randomX}px, ${randomY}px)`;
                }, 3000 + index * 500);
            });
        });



        /*SECTION UNDER HERO*/
         function bookCall() {
            // Add smooth animation to button
            const button = event.target;
            button.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                button.style.transform = 'scale(1.05)';
            }, 100);
            
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);
            
            // You can replace this with actual booking functionality
            alert('Thank you for your interest! Please contact us at:\n\nPhone: (+27) 73 843 9365\nEmail: info@velvetandedge.co.za\nAddress: 1126 Blue Hills, Cnr. Madrill & Drill Street, Midrand');
        }

        // Add hover effects to service cards
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add subtle floating animation
        function addFloatingAnimation() {
            const cards = document.querySelectorAll('.service-card');
            cards.forEach((card, index) => {
                card.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
            });
        }

        // CSS animation for floating effect
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);

        // Initialize floating animation after page load
        window.addEventListener('load', addFloatingAnimation);





        /*ABOUT US SECOND SECTION*/
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





/*ABOUT US THIRD SECTION*/
// Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe all content blocks
        document.addEventListener('DOMContentLoaded', () => {
            const contentBlocks = document.querySelectorAll('.content-block');
            contentBlocks.forEach(block => {
                observer.observe(block);
            });
        });

        // Add smooth hover effects for the CTA button
        const ctaButton = document.querySelector('.cta-button-3');
        ctaButton.addEventListener('mouseenter', () => {
            ctaButton.style.transform = 'translateY(-2px) scale(1.02)';
        });

        ctaButton.addEventListener('mouseleave', () => {
            ctaButton.style.transform = 'translateY(0) scale(1)';
        });

        // Optional: Add click handler for demonstration
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            // Add your actual click functionality here
            console.log('Get Support clicked');
        });


/*ABOUT US SIXTH SECTION*/
function exploreOpportunities() {
            // Add a subtle animation effect
            const button = document.querySelector('.cta-button-6');
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);

            // You can add actual navigation logic here
            alert('Exploring opportunities... This would typically navigate to a careers page.');
        }

        // Add some interactive hover effects
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.card-6');
            
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-8px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });

            // Add a subtle parallax effect to the background
            document.addEventListener('mousemove', function(e) {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
               
            });
        });



        /*ABOUT SECTION SEVENTH*/
    (function() {
            'use strict';
            
            // Namespace to avoid conflicts
            const HRConsultingAnimations = {
                
                // Check if element is in viewport
                isElementInViewport: function(el) {
                    const rect = el.getBoundingClientRect();
                    return (
                        rect.top >= 0 &&
                        rect.left >= 0 &&
                        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                    );
                },

                // Check if element is partially in viewport
                isElementPartiallyInViewport: function(el) {
                    const rect = el.getBoundingClientRect();
                    return (
                        rect.bottom >= 0 &&
                        rect.right >= 0 &&
                        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
                    );
                },

                // Animate cards function
                animateCards: function() {
                    const cards = document.querySelectorAll('.hr-card');
                    
                    cards.forEach(function(card) {
                        if (HRConsultingAnimations.isElementPartiallyInViewport(card) && !card.classList.contains('animate-in')) {
                            const delay = parseInt(card.getAttribute('data-hr-delay')) || 0;
                            
                            setTimeout(function() {
                                card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                                card.classList.add('animate-in');
                            }, delay);
                        }
                    });
                },

                // Throttle function to limit scroll event frequency
                throttle: function(func, wait) {
                    let timeout;
                    return function executedFunction(...args) {
                        const later = function() {
                            clearTimeout(timeout);
                            func(...args);
                        };
                        clearTimeout(timeout);
                        timeout = setTimeout(later, wait);
                    };
                },

                // Initialize animations
                init: function() {
                    // Initial check
                    this.animateCards();
                    
                    // Throttled scroll event
                    const throttledAnimate = this.throttle(this.animateCards.bind(this), 100);
                    
                    // Add scroll event listener
                    window.addEventListener('scroll', throttledAnimate, { passive: true });
                    
                    // Add resize event listener
                    window.addEventListener('resize', throttledAnimate, { passive: true });
                    
                    // Trigger animation on load
                    window.addEventListener('load', this.animateCards.bind(this));
                }
            };

            // Initialize when DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                    HRConsultingAnimations.init();
                });
            } else {
                HRConsultingAnimations.init();
            }

        })();





        
        /*MODAL ANIMATIONS*/
       // Calendar functionality
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        const dayHeaders = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();
        
        // Available dates and their time slots
        const availableDates = {
            11: ['11:00 am', '13:00 pm'],
            12: ['11:00 am', '13:00 pm'],
            13: ['11:00 am', '13:00 pm'],
            14: ['11:00 am', '13:00 pm'],
            15: ['11:00 am', '13:00 pm'],
            19: ['11:00 am', '13:00 pm'],
            20: ['11:00 am', '13:00 pm'],
            26: ['11:00 am', '13:00 pm'],
            27: ['11:00 am', '13:00 pm'],
            28: ['11:00 am', '13:00 pm'],
            29: ['11:00 am', '13:00 pm']
        };

        function generateCalendar(month, year) {
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            const calendarGrid = document.getElementById('calendarGrid');
            calendarGrid.innerHTML = '';

            // Reset layout to full width when generating new calendar
            const calendarContainer = document.getElementById('calendarContainer');
            calendarContainer.classList.add('full-width');
            calendarContainer.classList.remove('show-times');

            // Add day headers
            dayHeaders.forEach(day => {
                const dayHeader = document.createElement('div');
                dayHeader.classList.add('calendar-day-header');
                dayHeader.textContent = day;
                calendarGrid.appendChild(dayHeader);
            });

            // Add empty cells for days before the first day of the month
            for (let i = 0; i < firstDay; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.classList.add('calendar-day');
                calendarGrid.appendChild(emptyDay);
            }

            // Add days of the month
            for (let day = 1; day <= daysInMonth; day++) {
                const dayCell = document.createElement('div');
                dayCell.classList.add('calendar-day');
                dayCell.textContent = day;

                // Check if this date is available
                if (availableDates[day]) {
                    dayCell.classList.add('available');
                    dayCell.addEventListener('click', () => {
                        // Remove previous selection
                        document.querySelectorAll('.calendar-day.selected').forEach(cell => {
                            cell.classList.remove('selected');
                            cell.style.backgroundColor = '#e3f2fd';
                            cell.style.color = '#333';
                        });
                        
                        // Add selection to clicked date
                        dayCell.classList.add('selected');
                        dayCell.style.backgroundColor = '#dc4c94';
                        dayCell.style.color = 'white';
                        
                        // Show time slots for this date
                        showTimeSlots(day, month, year);
                    });
                }

                calendarGrid.appendChild(dayCell);
            }

            // Update month display
            document.getElementById('currentMonth').textContent = `${months[month]} ${year}`;
        }

        function showTimeSlots(day, month, year) {
            const date = new Date(year, month, day);
            const dayOfWeek = dayNames[date.getDay()];
            const monthName = months[month];
            
            // Show the time selection area and adjust layout
            const calendarContainer = document.getElementById('calendarContainer');
            calendarContainer.classList.remove('full-width');
            calendarContainer.classList.add('show-times');
            
            // Update selected date display
            const selectedDateEl = document.getElementById('selectedDate');
            selectedDateEl.textContent = `${dayOfWeek}, ${monthName} ${day}`;
            
            // Get time slots for this date
            const timeSlots = availableDates[day] || [];
            
            // Generate time slot elements
            const timeSlotsEl = document.getElementById('timeSlots');
            timeSlotsEl.innerHTML = '';
            
            timeSlots.forEach(time => {
                const timeSlot = document.createElement('div');
                timeSlot.classList.add('time-slot');
                 timeSlot.setAttribute('data-time', time);
                timeSlot.textContent = time;
                
                timeSlot.addEventListener('click', () => {
                    // Remove previous time selection
                    document.querySelectorAll('.time-slot.selected, .time-slot.with-next').forEach(slot => {
                        slot.classList.remove('selected', 'with-next');
                         slot.textContent = slot.getAttribute('data-time'); 
                    });
                    
                    // Add selection to clicked time
                    timeSlot.classList.add('with-next');
                    timeSlot.innerHTML = `${time} <button class="next-button">Next</button>`;
                    
                    // Add event listener to Next button
                    const nextBtn = timeSlot.querySelector('.next-button');
                    nextBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        handleNextClick(day, month, year, time);
                    });
                });
                
                timeSlotsEl.appendChild(timeSlot);
            });
        }

    function handleNextClick(day, month, year, time) {
    // Format the date and time
    const appointmentEl = document.getElementById('appointmentDateTime');
    const selectedDate = new Date(year, month, day);
    const weekday = selectedDate.toLocaleString('en-US', { weekday: 'long' });
    const monthName = selectedDate.toLocaleString('en-US', { month: 'long' });

    // Inject formatted string into the #appointmentDateTime element
    appointmentEl.textContent = `${time}, ${weekday}, ${monthName} ${day}, ${year}`;

    // Hide current modal
    document.querySelector('.modal-overlay.time-picker').classList.remove('show');

    // Show next modal (the form)
    document.querySelector('.modal-overlay.form-step').classList.add('show');
}

        // Modal functionality
        const bookCallBtn = document.getElementById('bookCallBtn');
        const loadingDots = document.getElementById('loadingDots');
        const modalOverlay = document.getElementById('modalOverlay');
        const closeBtn = document.getElementById('closeBtn');
        const prevMonth = document.getElementById('prevMonth');
        const nextMonth = document.getElementById('nextMonth');

        bookCallBtn.addEventListener('click', () => {
            // Show loading animation
            loadingDots.classList.add('show');
            bookCallBtn.style.pointerEvents = 'none';

            // Simulate loading delay
            setTimeout(() => {
                loadingDots.classList.remove('show');
                bookCallBtn.style.pointerEvents = 'auto';
                modalOverlay.classList.add('show');
                generateCalendar(currentMonth, currentYear);
            }, 2000);
        });

        closeBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('show');
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('show');
            }
        });

        prevMonth.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar(currentMonth, currentYear);
        });

        nextMonth.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar(currentMonth, currentYear);
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modalOverlay.classList.remove('show');
            }
        });

        // Initialize calendar
        generateCalendar(currentMonth, currentYear);




        //SECOND FORM STEP
        // Handle "Other" option for referral source
        document.querySelectorAll('input[name="referralSource"]').forEach(radio => {
            radio.addEventListener('change', function() {
                const customInput = document.getElementById('customInput');
                if (this.value === 'other') {
                    customInput.classList.add('show');
                    customInput.querySelector('input').focus();
                } else {
                    customInput.classList.remove('show');
                    customInput.querySelector('input').value = '';
                }
            });
        });

        // Handle form submission
        document.getElementById('bookingForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(this);
            const data = {};
            
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Log the collected data (in real implementation, send to server)
            console.log('Form Data:', data);
            
            // Show success message
            alert('Event scheduled successfully!\n\nYou should receive a confirmation email shortly.');
            
            // In real implementation, you would:
            // 1. Send data to your backend
            // 2. Create calendar event
            // 3. Send confirmation emails
            // 4. Redirect or close modal
        });

        // Demo: Set appointment time (in real app, this would come from calendar selection)
        function setAppointmentTime(time, date) {
            const appointmentEl = document.getElementById('appointmentDateTime');
            appointmentEl.textContent = `${time}, ${date}`;
        }

        // Example: Set a demo appointment time
        setAppointmentTime('01:00 - 01:30', 'Monday, August 11, 2025');

        // Handle platform selection to show relevant information
        document.querySelectorAll('input[name="platform"]').forEach(radio => {
            radio.addEventListener('change', function() {
                console.log('Selected platform:', this.value);
                // You could show/hide platform-specific fields here
            });
        });

        // Add guests functionality placeholder
        document.querySelector('.add-guests-btn').addEventListener('click', function() {
            // In real implementation, this would open a modal or add input fields
            const guestEmail = prompt('Enter guest email address:');
            if (guestEmail && guestEmail.includes('@')) {
                console.log('Guest added:', guestEmail);
                // You would add this to a list and display it
                this.textContent = 'Guests Added (1)';
                this.style.backgroundColor = '#2196f3';
                this.style.color = 'white';
            }
        });

        // Handle back button in form modal
function handleBackButton() {
    // Hide the form modal
    document.querySelector('.modal-overlay.form-step').classList.remove('show');
    
    // Show the time picker modal
    document.querySelector('.modal-overlay.time-picker').classList.add('show');
}

// Handle close button in form modal
function handleFormCloseButton() {
    // Hide the form modal
    document.querySelector('.modal-overlay.form-step').classList.remove('show');
    
    // Also hide the time picker modal if it's open
    document.querySelector('.modal-overlay.time-picker').classList.remove('show');
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hide all modals on page load
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('show');
    });
    
    // Add back button functionality
    const backBtn = document.querySelector('.modal-overlay.form-step .back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', handleBackButton);
    }
    
    // Add close button functionality for form modal
    const formCloseBtn = document.querySelector('.modal-overlay.form-step .close-btn');
    if (formCloseBtn) {
        formCloseBtn.addEventListener('click', handleFormCloseButton);
    }
    
    // Close form modal when clicking outside
    document.querySelector('.modal-overlay.form-step').addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            handleFormCloseButton();
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                modal.classList.remove('show');
            });
        }
    });
});






       
/*FOOTER SECTION */
 document.getElementById('current-year').textContent = new Date().getFullYear();
        
        // Handle newsletter form submission
        document.getElementById('newsletter-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simple validation
            if (email) {
                alert('Thank you for subscribing! We\'ll be in touch soon.');
                this.reset();
            }
        });
        
        // Pause logo carousel on hover
        const logoCarousel = document.querySelector('.logo-carousel');
        logoCarousel.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        logoCarousel.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });



         /*MENU FUNCTION*/
         function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            mobileMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }

        // Close menu when clicking outside
        document.getElementById('mobileMenu').addEventListener('click', function(e) {
            if (e.target === this) {
                toggleMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });



        /*FAQS SECTION*/
   // Simple, reliable approach using inline onclick
        var currentOpen = 0; // Track which FAQ is currently open

        // Open first FAQ by default when page loads
        setTimeout(function() {
            var firstAnswer = document.getElementById('answer-0');
            var firstChevron = document.getElementById('chevron-0');
            if (firstAnswer && firstChevron) {
                firstAnswer.classList.add('active');
                firstChevron.classList.add('active');
            }
        }, 100);

        function toggleFAQ(index) {
            var clickedAnswer = document.getElementById('answer-' + index);
            var clickedChevron = document.getElementById('chevron-' + index);
            
            // If the clicked item is already open, close it
            if (currentOpen === index && clickedAnswer.classList.contains('active')) {
                clickedAnswer.classList.remove('active');
                clickedChevron.classList.remove('active');
                currentOpen = -1;
                return;
            }
            
            // Close currently open item
            if (currentOpen >= 0) {
                var openAnswer = document.getElementById('answer-' + currentOpen);
                var openChevron = document.getElementById('chevron-' + currentOpen);
                if (openAnswer && openChevron) {
                    openAnswer.classList.remove('active');
                    openChevron.classList.remove('active');
                }
            }
            
            // Open clicked item
            if (clickedAnswer && clickedChevron) {
                clickedAnswer.classList.add('active');
                clickedChevron.classList.add('active');
                currentOpen = index;
            }
        }