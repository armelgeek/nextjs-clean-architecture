export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmationLink = `${process.env.APP_URL}/auth/verification?token=${token}`;
    const message = `<p>Click <a href="${confirmationLink}">here</a> to confirm email.</p>`;

    await fetch('/api/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: email,
            subject: 'Confirm your email',
            html: message,
        }),
    });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${process.env.APP_URL}/auth/new-password?token=${token}`;
    const message = `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`;

    await fetch('/api/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: email,
            subject: 'Reset your password',
            html: message,
        }),
    });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
    const message = `<p>Your 2FA token is ${token}</p>`;

    await fetch('/api/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: email,
            subject: '2FA Token',
            html: message,
        }),
    });
};
