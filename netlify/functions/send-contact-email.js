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
            subject: 'Velvet & Edge Solutions - Query Received',
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
            subject: `New Query Form Submission - ${fullName}`,
            text: `New Query submission received!

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