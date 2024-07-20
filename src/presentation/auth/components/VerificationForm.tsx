'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {checkVerificationToken} from "@/domain/auth/usecases/checkVerificationToken";
import LoadingSpinner from "@/presentation/shared/components/LoadingSpinner/LoadingSpinner";
import InfoMessage from "@/presentation/shared/components/InfoMessage/InfoMessage";

const VerificationForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const handleTokenValidation = async () => {
        if (!token) {
            setErrorMessage('Verification link is not valid');
            return;
        }

        const result = await new checkVerificationToken().execute(token);

        if (result.success) {
            setSuccessMessage(result.success);
        }
        if (result.error) {
            setErrorMessage(result.error);
        }
    };

    useEffect(() => {
        handleTokenValidation();
    }, []);

    return (
        <div className='sm:min-w-80 mt-6'>
            {!successMessage && !errorMessage ? (
                <LoadingSpinner size='lg' className='mt-4' />
            ) : null}

            <InfoMessage text={successMessage || ''} type='success' />
            <InfoMessage text={errorMessage || ''} type='error' />
        </div>
    );
};

export default VerificationForm;
