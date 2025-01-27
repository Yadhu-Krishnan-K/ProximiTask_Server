import { createTransport } from "nodemailer";   

// Success email
const sendConfirmationEmail = async (to, name) => {
    
    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject: 'Confirmation Email',
        text: `Hello ${name},\n\nYour access has been confirmed successfully.`,
        html: `<p>Hello ${name},</p><p>Your access request has been confirmed successfully.</p>`,
    };
    await sendEmail(mailOptions);
};

// Failure email
const sendFailureEmail = async (to, name) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject: 'Access Request Failed',
        text: `Hello ${name},\n\nUnfortunately, your access request could not be processed.`,
        html: `<p>Hello ${name},</p><p>Unfortunately, your access request could not be processed.</p>`,
    };
    await sendEmail(mailOptions);
};

// General email sending function
const sendEmail = async (mailOptions) => {
    const transporter = createTransport({
        service : 'gmail',
        secure:true,
        port:465,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS,
        },
    });
    
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${mailOptions.to}`);
    } catch (error) {
        console.error(`Error sending email to ${mailOptions.to}: `, error);
        throw new Error('Email sending failed');
    }
};

export {
    sendConfirmationEmail,
    sendFailureEmail
};
