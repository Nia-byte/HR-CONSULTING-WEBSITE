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



        /*MENU SECTION*/
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