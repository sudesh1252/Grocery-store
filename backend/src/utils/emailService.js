// Email Service
// Handles sending emails using Nodemailer

const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  // For development: Use Ethereal (fake SMTP)
  // For production: Use real SMTP (Gmail, SendGrid, etc.)
  
  if (process.env.EMAIL_ENABLED === 'true') {
    return nodemailer.createTransporter({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  
  return null;
};

// Send password reset email
const sendPasswordResetEmail = async (to, name, resetUrl) => {
  const transporter = createTransporter();
  
  if (!transporter) {
    console.log('📧 Email service not configured. Reset URL:', resetUrl);
    return;
  }

  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME || 'Shree Grocery Store'}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
    to,
    subject: 'Password Reset Request - Shree Grocery Store',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .header {
            background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: white;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .button {
            display: inline-block;
            padding: 15px 30px;
            background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            color: #666;
            font-size: 12px;
          }
          .warning {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Password Reset Request</h1>
          </div>
          <div class="content">
            <p>Hello <strong>${name}</strong>,</p>
            
            <p>We received a request to reset your password for your Shree Grocery Store account.</p>
            
            <p>Click the button below to reset your password:</p>
            
            <center>
              <a href="${resetUrl}" class="button">Reset Password</a>
            </center>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #3b82f6;">${resetUrl}</p>
            
            <div class="warning">
              <strong>⚠️ Important:</strong>
              <ul>
                <li>This link will expire in <strong>1 hour</strong></li>
                <li>If you didn't request this, please ignore this email</li>
                <li>Your password will remain unchanged</li>
              </ul>
            </div>
            
            <p>For security reasons, we recommend:</p>
            <ul>
              <li>Using a strong, unique password</li>
              <li>Not sharing your password with anyone</li>
              <li>Changing your password regularly</li>
            </ul>
            
            <p>If you have any questions or concerns, please contact our support team.</p>
            
            <p>Best regards,<br><strong>Shree Grocery Store Team</strong></p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Shree Grocery Store. All rights reserved.</p>
            <p>This is an automated email. Please do not reply to this message.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Hello ${name},
      
      We received a request to reset your password for your Shree Grocery Store account.
      
      Click the link below to reset your password:
      ${resetUrl}
      
      This link will expire in 1 hour.
      
      If you didn't request this, please ignore this email. Your password will remain unchanged.
      
      Best regards,
      Shree Grocery Store Team
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Password reset email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};

// Send welcome email (optional - for future use)
const sendWelcomeEmail = async (to, name) => {
  const transporter = createTransporter();
  
  if (!transporter) {
    return;
  }

  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME || 'Shree Grocery Store'}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
    to,
    subject: 'Welcome to Shree Grocery Store!',
    html: `
      <h1>Welcome ${name}!</h1>
      <p>Thank you for joining Shree Grocery Store.</p>
      <p>You can now start managing your inventory and creating invoices.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent');
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
  }
};

module.exports = {
  sendPasswordResetEmail,
  sendWelcomeEmail,
};
