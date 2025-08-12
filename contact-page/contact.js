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


/*CONTACT FORM EMAIL SYSTEM*/
const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context) => {
    // Add detailed logging at the start
    console.log('=== CONTACT EMAIL FUNCTION CALLED ===');
    console.log('Method:', event.httpMethod);
    console.log('Headers:', JSON.stringify(event.headers, null, 2));
    console.log('Query params:', event.queryStringParameters);
    console.log('Body:', event.body);
    console.log('Body type:', typeof event.body);

    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Test API key functionality
    if (event.httpMethod === 'GET' && event.queryStringParameters?.test === 'apikey') {
        try {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            
            const testMsg = {
                to: process.env.ADMIN_EMAIL,
                from: process.env.ADMIN_EMAIL,
                subject: 'SendGrid API Test - Contact Form',
                text: 'This is a test to verify API key permissions for contact form.'
            };
            
            await sgMail.send(testMsg);
            
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ success: true, message: 'Contact form API key works!' })
            };
        } catch (error) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ 
                    success: false, 
                    error: error.message,
                    code: error.code 
                })
            };
        }
    }

    // Test POST handling
    if (event.httpMethod === 'GET' && event.queryStringParameters?.test === 'post') {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                message: 'Contact form function is receiving requests correctly',
                method: event.httpMethod,
                hasBody: !!event.body,
                contentType: event.headers['content-type'] || 'not set'
            })
        };
    }

    // Handle preflight OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'CORS preflight' })
        };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ 
                success: false,
                error: 'Method not allowed' 
            })
        };
    }

    try {
        // Validate environment variables
        if (!process.env.SENDGRID_API_KEY) {
            console.error('SENDGRID_API_KEY is not set');
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                    success: false,
                    error: 'Server configuration error: SENDGRID_API_KEY missing'
                })
            };
        }

        if (!process.env.ADMIN_EMAIL) {
            console.error('ADMIN_EMAIL is not set');
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                    success: false,
                    error: 'Server configuration error: ADMIN_EMAIL missing'
                })
            };
        }

        // Set SendGrid API key
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        // Parse the request body
        let requestBody;
        try {
            requestBody = JSON.parse(event.body);
        } catch (parseError) {
            console.error('JSON parse error:', parseError);
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ 
                    success: false,
                    error: 'Invalid JSON in request body'
                })
            };
        }

        const { 
            fullName, 
            email, 
            contactType, 
            message
        } = requestBody;

        // Validate required fields
        if (!fullName || !email || !contactType || !message) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ 
                    success: false,
                    error: 'Missing required fields: fullName, email, contactType, and message are required'
                })
            };
        }

        // Basic email validation
        if (!email.includes('@')) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ 
                    success: false,
                    error: 'Invalid email address'
                })
            };
        }

        // Format the contact details for plain text
        const contactDetails = `
      Name: ${fullName}
      Email: ${email}
      Contact Type: ${contactType}
      Message: ${message}
    `;

        console.log('Processing contact form for:', email);

        // Email to the user (contact form confirmation)
        const userEmail = {
            to: email,
            from: {
                email: process.env.ADMIN_EMAIL,
                name: 'Velvet & Edge Solutions'
            },
            subject: 'Velvet & Edge Solutions - Message Received',
            text: `Dear ${fullName},

Thank you for reaching out to Velvet & Edge Solutions!

We have received your message and will get back to you as soon as possible.

Your message details:
${contactDetails}

If you have any urgent questions, please don't hesitate to call us directly.

Best regards,
Velvet & Edge Solutions Team`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #dc4c94; margin-bottom: 10px;">Velvet & Edge Solutions</h1>
            <h2 style="color: #333; font-weight: normal;">Message Received</h2>
          </div>
          
          <p style="font-size: 16px; color: #333;">Dear ${fullName},</p>
          <p style="font-size: 16px; color: #333;">Thank you for reaching out to Velvet & Edge Solutions!</p>
          <p style="font-size: 16px; color: #333;">We have received your message and will get back to you as soon as possible.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #dc4c94; margin-top: 0;">Your message details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td><td style="padding: 8px 0; color: #333;">${fullName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0; color: #333;">${email}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Contact Type:</td><td style="padding: 8px 0; color: #333;">${contactType}</td></tr>
            </table>
            <div style="margin-top: 15px;">
              <p style="font-weight: bold; color: #555; margin-bottom: 8px;">Message:</p>
              <div style="background: white; padding: 15px; border-radius: 4px; color: #333;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          
          <p style="font-size: 16px; color: #333;">If you have any urgent questions, please don't hesitate to call us directly.</p>
          
          <div style="margin-top: 30px; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
            <p style="color: #666; font-size: 14px;">Best regards,<br><strong>Velvet & Edge Solutions Team</strong></p>
          </div>
        </div>
      `
        };

        // Email to the admin (new contact form submission)
        const adminEmail = {
            to: process.env.ADMIN_EMAIL,
            from: {
                email: process.env.ADMIN_EMAIL,
                name: 'Velvet & Edge Website'
            },
            subject: `New Client Query Submission - ${fullName}`,
            text: `New client query received!

Contact details:
${contactDetails}

Please follow up with the client as appropriate.`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #dc4c94; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">New Contact Form Submission</h2>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; color: #333; margin-top: 0;"><strong>A new contact form submission has been received!</strong></p>
            
            <h3 style="color: #dc4c94;">Contact Details:</h3>
            <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 4px;">
              <tr><td style="padding: 12px; font-weight: bold; color: #555; border-bottom: 1px solid #eee;">Name:</td><td style="padding: 12px; color: #333; border-bottom: 1px solid #eee;">${fullName}</td></tr>
              <tr><td style="padding: 12px; font-weight: bold; color: #555; border-bottom: 1px solid #eee;">Email:</td><td style="padding: 12px; color: #333; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #dc4c94;">${email}</a></td></tr>
              <tr><td style="padding: 12px; font-weight: bold; color: #555; border-bottom: 1px solid #eee;">Contact Type:</td><td style="padding: 12px; color: #333; border-bottom: 1px solid #eee;">${contactType}</td></tr>
            </table>
            
            <h3 style="color: #dc4c94; margin-top: 25px;">Message:</h3>
            <div style="background: white; padding: 15px; border-radius: 4px; color: #333;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            
            <div style="margin-top: 25px; padding: 15px; background: #fff3cd; border-radius: 4px; border-left: 4px solid #ffc107;">
              <p style="margin: 0; color: #856404;"><strong>Action Required:</strong> Please follow up with the client as appropriate.</p>
            </div>
          </div>
        </div>
      `
        };

        console.log('Attempting to send contact form emails...');

        try {
            // Send emails individually with proper error handling
            await sgMail.send(userEmail);
            console.log('User confirmation email sent successfully');

            await sgMail.send(adminEmail);
            console.log('Admin notification email sent successfully');

            console.log('About to return success response');
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ 
                    success: true, 
                    message: 'Message sent successfully! We will get back to you soon.' 
                })
            };

        } catch (emailError) {
            console.error('SendGrid email error:', emailError);
            
            // Log more detailed error information
            if (emailError.response) {
                console.error('SendGrid response:', emailError.response.body);
            }

            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                    success: false,
                    error: 'Failed to send message',
                    details: emailError.message
                })
            };
        }

    } catch (error) {
        console.error('Function execution error:', error);
        
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                success: false,
                error: 'Internal server error',
                details: error.message
            })
        };
    }
};





   
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
    18: ['11:00 am', '13:00 pm'],
    19: ['11:00 am', '13:00 pm'],
    20: ['11:00 am', '13:00 pm'],
    21: ['11:00 am', '13:00 pm'],
    22: ['11:00 am', '13:00 pm'],
    25: ['11:00 am', '13:00 pm'],
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
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.remove('show');
        });
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

// Handle form submission with SendGrid integration
// Handle form submission with improved error handling
// Handle form submission with improved error handling
async function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
        // Collect form data
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Get the selected appointment date/time from the calendar
        const appointmentDateTime = document.getElementById('appointmentDateTime').textContent;
        
        // Validate that appointment time is selected
        if (!appointmentDateTime || appointmentDateTime.trim() === '' || appointmentDateTime.includes('00:00')) {
            throw new Error('Please select an appointment date and time');
        }
        
        // Parse the appointment date/time to extract date and time separately
        const appointmentParts = appointmentDateTime.split(', ');
        const time = appointmentParts[0]; // e.g., "11:00 am"
        const date = appointmentParts.slice(1).join(', '); // e.g., "Monday, August 11, 2025"
        
        // Handle custom referral source
        let referralSource = data.referralSource;
        if (data.referralSource === 'other') {
            referralSource = data.otherSource || 'Other (not specified)';
        }
        
        // Prepare the payload for the Netlify function
        const payload = {
            name: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
            email: data.email,
            phone: data.phoneNumber || 'Not provided',
            date: date,
            time: time,
            location: data.platform,
            businessName: data.businessName || 'Not provided',
            message: data.supportOverview || 'No additional message',
            additionalInfo: data.additionalInfo || 'No additional information',
            referralSource: referralSource,
            referralPerson: data.referralPerson || 'Not specified'
        };
        
        console.log('Sending booking data:', payload);
        
        // Send to Netlify function
        const response = await fetch('/.netlify/functions/send-booking-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers));
        
        // Always try to get response text first
        const responseText = await response.text();
        console.log('Response text:', responseText);
        
        // Try to parse as JSON
        let result;
        try {
            result = JSON.parse(responseText);
        } catch (jsonError) {
            console.error('Failed to parse response as JSON:', jsonError);
            console.error('Response was:', responseText);
            
            // If we got a successful status but non-JSON response, 
            // it might still be successful
            if (response.ok) {
                // First reset form and modals, then show success
                resetFormAndModals(form);
                setTimeout(() => {
                    showSuccessMessage();
                }, 100);
                return;
            } else {
                throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}\nResponse: ${responseText}`);
            }
        }
        
        // Check the result
        if (response.ok) {
            if (result.success !== false) {
                // Success case - first reset, then show success
                console.log('Booking submitted successfully');
                resetFormAndModals(form);
                setTimeout(() => {
                    showSuccessMessage();
                }, 100);
            } else {
                // Explicit failure even with 200 status
                throw new Error(result.error || result.message || 'Booking submission failed');
            }
        } else {
            // Non-200 status
            const errorMessage = result?.error || result?.message || `Server error: ${response.status} ${response.statusText}`;
            throw new Error(errorMessage);
        }
        
    } catch (error) {
        console.error('Booking submission error:', error);
        
        // Show error message to user
        showErrorMessage(error.message);
        
    } finally {
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
}

function showErrorMessage(message) {
    // Create a custom error modal
    const errorModal = document.createElement('div');
    errorModal.className = 'modal-overlay error-modal';
    errorModal.innerHTML = `
        <div class="modal error-content">
            <div class="error-header">
                <div style="color: #f44336; font-size: 48px; margin-bottom: 20px;">⚠</div>
                <h2>Booking Error</h2>
            </div>
            <div class="error-body">
                <p>Sorry, there was an error processing your booking:</p>
                <p style="color: #d32f2f; font-weight: 500;">${message}</p>
                <p>Please try again or contact us directly if the problem persists.</p>
            </div>
            <div class="error-footer">
                <button class="error-close-btn" onclick="closeErrorModal()">Try Again</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(errorModal);
    // Use setTimeout to ensure DOM is updated
    setTimeout(() => {
        errorModal.classList.add('show');
    }, 10);
}

function closeErrorModal() {
    const errorModal = document.querySelector('.error-modal');
    if (errorModal) {
        errorModal.classList.remove('show');
        // Remove from DOM after animation
        setTimeout(() => {
            errorModal.remove();
        }, 300);
    }
}

function showSuccessMessage() {
    // Create a custom success modal
    const successModal = document.createElement('div');
    successModal.className = 'modal-overlay success-modal';
    successModal.innerHTML = `
        <div class="modal success-content">
            <div class="success-header">
                <div style="color: #4CAF50; font-size: 48px; margin-bottom: 20px;">✓</div>
                <h2>Booking Confirmed!</h2>
            </div>
            <div class="success-body">
                <p>Thank you for booking a consultation with Velvet & Edge Solutions.</p>
                <p>You should receive a confirmation email shortly with all the details.</p>
            </div>
            <div class="success-footer">
                <button class="success-close-btn" onclick="closeSuccessModal()">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(successModal);
    // Use setTimeout to ensure DOM is updated before adding show class
    setTimeout(() => {
        successModal.classList.add('show');
    }, 10);
}

function closeSuccessModal() {
    const successModal = document.querySelector('.success-modal');
    if (successModal) {
        successModal.classList.remove('show');
        // Remove from DOM after animation completes
        setTimeout(() => {
            successModal.remove();
        }, 300);
    }
}

function resetFormAndModals(form) {
    // Close existing booking modals (but NOT success/error modals)
    document.querySelectorAll('.modal-overlay:not(.success-modal):not(.error-modal)').forEach(modal => {
        modal.classList.remove('show');
    });
    
    // Reset form
    form.reset();
    
    // Reset any custom input visibility
    const customInput = document.getElementById('customInput');
    if (customInput) {
        customInput.classList.remove('show');
    }
    
    // Reset calendar selection
    document.querySelectorAll('.calendar-day.selected').forEach(cell => {
        cell.classList.remove('selected');
        cell.style.backgroundColor = '';
        cell.style.color = '';
    });
    
    // Reset time slots
    document.querySelectorAll('.time-slot.selected, .time-slot.with-next').forEach(slot => {
        slot.classList.remove('selected', 'with-next');
        if (slot.hasAttribute('data-time')) {
            slot.textContent = slot.getAttribute('data-time');
        }
    });
    
    // Reset appointment display
    const appointmentEl = document.getElementById('appointmentDateTime');
    if (appointmentEl) {
        appointmentEl.textContent = '00:00 - 00:30, Friday, August 15, 2025';
    }
    
    // Reset calendar layout
    const calendarContainer = document.getElementById('calendarContainer');
    if (calendarContainer) {
        calendarContainer.classList.add('full-width');
        calendarContainer.classList.remove('show-times');
    }
}

// Updated CSS for both success and error modals
const modalCSS = `
.success-modal, .error-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.success-modal.show, .error-modal.show {
    opacity: 1;
    visibility: visible;
}

.success-content, .error-content {
    background: white;
    padding: 40px;
    border-radius: 12px;
    text-align: center;
    max-width: 500px;
    margin: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    transform: translateY(-20px);
    transition: transform 0.3s ease;
}

.success-modal.show .success-content,
.error-modal.show .error-content {
    transform: translateY(0);
}

.success-header h2, .error-header h2 {
    color: #333;
    margin: 0 0 20px 0;
    font-size: 28px;
    font-weight: 600;
}

.success-body p, .error-body p {
    color: #666;
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 15px;
}

.success-close-btn {
    background: #dc4c94;
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 20px;
    transition: background 0.3s ease;
}

.success-close-btn:hover {
    background: #dc4c94;
}

.error-close-btn {
    background: #f44336;
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 20px;
    transition: background 0.3s ease;
}

.error-close-btn:hover {
    background: #d32f2f;
}
`;

// Inject the CSS (remove any existing modal styles first)
const existingModalStyle = document.querySelector('style[data-modal-styles]');
if (existingModalStyle) {
    existingModalStyle.remove();
}

const modalStyleSheet = document.createElement('style');
modalStyleSheet.setAttribute('data-modal-styles', 'true');
modalStyleSheet.textContent = modalCSS;
document.head.appendChild(modalStyleSheet);

// Add form validation helper
function validateBookingForm(formData) {
    const required = ['firstName', 'lastName', 'email', 'supportOverview'];
    const missing = [];
    
    required.forEach(field => {
        if (!formData[field] || formData[field].trim() === '') {
            missing.push(field.replace(/([A-Z])/g, ' $1').toLowerCase());
        }
    });
    
    // Email validation
    if (formData.email && !formData.email.includes('@')) {
        missing.push('valid email');
    }
    
    // Check if appointment time is selected
    const appointmentDateTime = document.getElementById('appointmentDateTime').textContent;
    if (!appointmentDateTime || appointmentDateTime.trim() === '' || appointmentDateTime.includes('00:00')) {
        missing.push('appointment time');
    }
    
    return missing;
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hide all modals on page load
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('show');
    });
    
    // Add form submission handler
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleFormSubmission);
    }
    
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
    const formModal = document.querySelector('.modal-overlay.form-step');
    if (formModal) {
        formModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                handleFormCloseButton();
            }
        });
    }
    
    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                modal.classList.remove('show');
            });
        }
    });
});

// Add CSS for success modal
const successModalCSS = `
.success-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.success-modal.show {
    opacity: 1;
}

.success-content {
    background: white;
    padding: 40px;
    border-radius: 12px;
    text-align: center;
    max-width: 500px;
    margin: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.success-header h2 {
    color: #333;
    margin: 0 0 20px 0;
    font-size: 28px;
    font-weight: 600;
}

.success-body p {
    color: #666;
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 15px;
}

.success-close-btn {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 20px;
    transition: background 0.3s ease;
}

.success-close-btn:hover {
    background: #45a049;
}
`;

// Inject success modal CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = successModalCSS;
document.head.appendChild(styleSheet);








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