const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Set SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Parse the request body
    const { name, email, phone, date, time, message } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !date || !time) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Format the booking details
    const bookingDetails = `
      Name: ${name}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      Date: ${date}
      Time: ${time}
      Message: ${message || 'No additional message'}
    `;

    // Email to the user (booking confirmation)
    const userEmail = {
      to: email,
      from: process.env.ADMIN_EMAIL, // This should be your verified sender email
      subject: 'Consultation Booking Confirmation',
      text: `Dear ${name},

Thank you for booking a consultation with us!

Your booking details:
${bookingDetails}

We will contact you shortly to confirm your appointment.

Best regards,
HR Consulting Team`,
      html: `
        <h2>Consultation Booking Confirmation</h2>
        <p>Dear ${name},</p>
        <p>Thank you for booking a consultation with us!</p>
        
        <h3>Your booking details:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>Message:</strong> ${message || 'No additional message'}</li>
        </ul>
        
        <p>We will contact you shortly to confirm your appointment.</p>
        <p>Best regards,<br>HR Consulting Team</p>
      `
    };

    // Email to the admin (new booking notification)
    const adminEmail = {
      to: process.env.ADMIN_EMAIL,
      from: process.env.ADMIN_EMAIL,
      subject: 'New Consultation Booking',
      text: `New consultation booking received!

Client details:
${bookingDetails}

Please follow up with the client to confirm the appointment.`,
      html: `
        <h2>New Consultation Booking</h2>
        <p>A new consultation booking has been received!</p>
        
        <h3>Client details:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>Message:</strong> ${message || 'No additional message'}</li>
        </ul>
        
        <p>Please follow up with the client to confirm the appointment.</p>
      `
    };

    // Send both emails
    await sgMail.send([userEmail, adminEmail]);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Booking confirmation sent successfully!' 
      })
    };

  } catch (error) {
    console.error('Error sending email:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send booking confirmation',
        details: error.message 
      })
    };
  }
};