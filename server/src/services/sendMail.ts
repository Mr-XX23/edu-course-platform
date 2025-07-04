import nodemailer from 'nodemailer';
import { envConfig } from '../../config/config';

interface MailOptions {
    to: string;
    subject: string;
    text: string;
}


const sendMail = async (mail: MailOptions) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: envConfig.email.user,
            pass: envConfig.email.pass
        }
    });

    const mailOptions = {
        from : envConfig.email.user,
        to: mail.to,
        subject: mail.subject,
        text: mail.text
    };

    try {
        const info = await transporter.sendMail(mail);
        console.log('Email sent: ' + info.response);
        return;
    }
    catch (error) {
        console.error('Error sending email:', error);
        return;
    }
}

export default sendMail;