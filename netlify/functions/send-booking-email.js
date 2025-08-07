const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  const data = JSON.parse(event.body);

  const msg = {
    to: [data.email, 'admin@example.com'], // replace with your admin email
    from: 'noreply@example.com', // replace with your verified sender
    subject: 'Booking Confirmation',
    html: `
      <p>Hi ${data.name},</p>
      <p>Thanks for your booking for <strong>${data.date}</strong>.</p>
      <p>Message: ${data.message || 'No message provided'}</p>
      <p>We will be in touch shortly!</p>
    `,
  };

  try {
    await sgMail.sendMultiple(msg);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Booking confirmation sent!' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Email failed to send.' }),
    };
  }
};