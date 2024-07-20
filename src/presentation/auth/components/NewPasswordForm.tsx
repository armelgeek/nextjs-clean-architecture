'use client';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {NewPasswordSchema} from "@/domain/auth/schema/new.password.schema";
import {updatePassword} from "@/domain/auth/usecases/updatePassword";
import PasswordInput from "@/presentation/shared/components/Inputs/PasswordInput/PasswordInput";
import Button from "@/presentation/shared/components/Button/Button";
import InfoMessage from "@/presentation/shared/components/InfoMessage/InfoMessage";

const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: '',
        },
    });

    const {
        formState: { errors },
    } = form;

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            new updatePassword().execute(values, token).then((data:any) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <PasswordInput
                id='password'
                label='New password'
                placeholder='******'
                isDisabled={isPending}
                form={form.register('password')}
                errorMessage={errors.password?.message}
                showPasswordStrengthBox
            />
            <InfoMessage text={error || ''} type='error' />
            <InfoMessage text={success || ''} type='success' />
            <Button
                type='primary'
                text='Update password'
                isDisabled={isPending}
                additionalStyles='w-full'
            />
        </form>
    );
};

export default NewPasswordForm;
