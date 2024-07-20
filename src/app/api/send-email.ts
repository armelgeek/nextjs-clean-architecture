import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_AUTH_PASSWORD,
    }
});
export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    const { to, subject, html } = req.body;

    if (!to || !subject || !html) {
        return new Response('Missing required fields', { status: 400 });
    }

    const mailOptions = {
        from: process.env.SMTP_AUTH_USER,
        to,
        subject,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        return new Response('Email sent successfully', { status: 200 });
    } catch (error) {
        console.log('error',error);
        return new Response('Error sending email', { status: 500 });
    }
};
