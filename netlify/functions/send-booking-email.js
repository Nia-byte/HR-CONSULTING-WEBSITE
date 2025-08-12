const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context) => {
  // Add CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Validate environment variables
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY is not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Email service not configured' })
      };
    }

    if (!process.env.ADMIN_EMAIL) {
      console.error('ADMIN_EMAIL is not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Admin email not configured' })
      };
    }

    // Set SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Parse the request body with error handling
    let parsedBody;
    try {
      parsedBody = JSON.parse(event.body);
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid request body' })
      };
    }

    const { 
      name, 
      email, 
      phone, 
      date, 
      time, 
      location, 
      businessName, 
      message, 
      additionalInfo, 
      referralSource 
    } = parsedBody;

    // Enhanced validation
    if (!name || !email || !date || !time) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required fields',
          required: ['name', 'email', 'date', 'time']
        })
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }

    console.log('Processing booking for:', { name, email, date, time });

    // Format the booking details
    const bookingDetails = `
      Name: ${name}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      Date: ${date}
      Time: ${time}
      Location: ${location || 'Not specified'}
      Business Name: ${businessName || 'Not provided'}
      Overview Message: ${message || 'No additional message'}
      Additional Information: ${additionalInfo || 'No additional information'}
      Referral Source: ${referralSource || 'Not specified'}
    `;

    // Email to the user (booking confirmation)
    const userEmail = {
      to: email,
      from: {
        email: process.env.ADMIN_EMAIL,
        name: 'Velvet & Edge Solutions'
      },
      subject: 'Velvet & Edge Solutions - Consultation Booking Confirmation',
      text: `Dear ${name},

Thank you for booking a consultation with Velvet & Edge Solutions!

Your booking details:
${bookingDetails}

We will contact you shortly to confirm your appointment.

Best regards,
Velvet & Edge Solutions Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #dc4c94;">Consultation Booking Confirmation</h2>
          <p>Dear ${name},</p>
          <p>Thank you for booking a consultation with <strong>Velvet & Edge Solutions</strong>!</p>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your booking details:</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 8px 0;"><strong>Name:</strong> ${name}</li>
              <li style="margin: 8px 0;"><strong>Email:</strong> ${email}</li>
              <li style="margin: 8px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</li>
              <li style="margin: 8px 0;"><strong>Date:</strong> ${date}</li>
              <li style="margin: 8px 0;"><strong>Time:</strong> ${time}</li>
              <li style="margin: 8px 0;"><strong>Location:</strong> ${location || 'Not specified'}</li>
              <li style="margin: 8px 0;"><strong>Business Name:</strong> ${businessName || 'Not provided'}</li>
              <li style="margin: 8px 0;"><strong>Overview Message:</strong> ${message || 'No additional message'}</li>
              <li style="margin: 8px 0;"><strong>Additional Information:</strong> ${additionalInfo || 'No additional information'}</li>
              <li style="margin: 8px 0;"><strong>Referral Source:</strong> ${referralSource || 'Not specified'}</li>
            </ul>
          </div>
          
          <p>We will contact you shortly to confirm your appointment.</p>
          <p style="margin-top: 30px;">Best regards,<br><strong>Velvet & Edge Solutions Team</strong></p>
        </div>
      `
    };

    // Email to the admin (new booking notification)
    const adminEmail = {
      to: process.env.ADMIN_EMAIL,
      from: {
        email: process.env.ADMIN_EMAIL,
        name: 'Velvet & Edge Booking System'
      },
      subject: 'New Consultation Booking - Action Required',
      text: `New consultation booking received!

Client details:
${bookingDetails}

Please follow up with the client to confirm the appointment.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #dc4c94;">New Consultation Booking</h2>
          <p><strong>A new consultation booking has been received!</strong></p>
          
          <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc4c94;">
            <h3 style="color: #333; margin-top: 0;">Client details:</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 8px 0;"><strong>Name:</strong> ${name}</li>
              <li style="margin: 8px 0;"><strong>Email:</strong> ${email}</li>
              <li style="margin: 8px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</li>
              <li style="margin: 8px 0;"><strong>Date:</strong> ${date}</li>
              <li style="margin: 8px 0;"><strong>Time:</strong> ${time}</li>
              <li style="margin: 8px 0;"><strong>Location:</strong> ${location || 'Not specified'}</li>
              <li style="margin: 8px 0;"><strong>Business Name:</strong> ${businessName || 'Not provided'}</li>
            </ul>
            
            <div style="margin: 15px 0;">
              <strong>Support Overview:</strong><br>
              <div style="background-color: white; padding: 10px; border-radius: 4px; margin-top: 5px;">
                ${message || 'No additional message provided'}
              </div>
            </div>
            
            <div style="margin: 15px 0;">
              <strong>Additional Information:</strong><br>
              <div style="background-color: white; padding: 10px; border-radius: 4px; margin-top: 5px;">
                ${additionalInfo || 'No additional information provided'}
              </div>
            </div>
            
            <div style="margin: 15px 0;">
              <strong>Referral Source:</strong> ${referralSource || 'Not specified'}
            </div>
          </div>
          
          <p style="color: #d32f2f; font-weight: bold;">⚠️ Please follow up with the client to confirm the appointment.</p>
        </div>
      `
    };

    // Send emails with detailed error handling
    console.log('Sending emails...');
    
    try {
      // Send user confirmation email
      console.log('Sending user confirmation to:', email);
      const userResponse = await sgMail.send(userEmail);
      console.log('User email sent successfully:', userResponse[0].statusCode);
      
      // Send admin notification email
      console.log('Sending admin notification to:', process.env.ADMIN_EMAIL);
      const adminResponse = await sgMail.send(adminEmail);
      console.log('Admin email sent successfully:', adminResponse[0].statusCode);
      
    } catch (sendError) {
      console.error('SendGrid API Error:', sendError);
      
      // Log detailed error information
      if (sendError.response) {
        console.error('SendGrid Response Status:', sendError.response.status);
        console.error('SendGrid Response Body:', sendError.response.body);
      }
      
      // Return more specific error
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Failed to send booking confirmation emails',
          details: sendError.message,
          code: sendError.code || 'SEND_ERROR'
        })
      };
    }

    console.log('All emails sent successfully');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Booking confirmation emails sent successfully!',
        details: {
          userEmail: email,
          adminEmail: process.env.ADMIN_EMAIL,
          timestamp: new Date().toISOString()
        }
      })
    };

  } catch (error) {
    console.error('Unexpected error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};