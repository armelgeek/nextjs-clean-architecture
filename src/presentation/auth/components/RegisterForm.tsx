'use client';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {RegisterSchema} from "@/domain/auth/schema/register.schema";
import {register} from "@/domain/auth/usecases/register";
import TextInput from "@/presentation/shared/components/Inputs/TextInput/TextInput";
import InfoMessage from "@/presentation/shared/components/InfoMessage/InfoMessage";
import PasswordInput from "@/presentation/shared/components/Inputs/PasswordInput/PasswordInput";
import Button from "@/presentation/shared/components/Button/Button";

const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, startTransition] = useTransition();
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
        },
    });
    const {
        formState: { errors },
    } = form;

    const handleSubmitForm = (values: z.infer<typeof RegisterSchema>) => {
        startTransition(() => {
            new register().execute(values).then((data:any) => {
                setErrorMessage(data?.error || '');
                setSuccessMessage(data?.success || '');
            });
        });
    };

    return (
        <div>
            <form onSubmit={form.handleSubmit(handleSubmitForm)}>
                <div className='space-y-4'>
                    <TextInput
                        id='name'
                        type='name'
                        placeholder='John Doe'
                        isDisabled={isLoading}
                        label='Name'
                        form={form.register('name')}
                        errorMessage={errors.name?.message}
                    />
                    <TextInput
                        id='email'
                        type='email'
                        placeholder='example@mail.com'
                        isDisabled={isLoading}
                        label='Email'
                        form={form.register('email')}
                        errorMessage={errors.email?.message}
                    />
                    <PasswordInput
                        id='password'
                        placeholder='********'
                        isDisabled={isLoading}
                        label='Password'
                        form={form.register('password')}
                        errorMessage={errors.password?.message}
                        showPasswordStrengthBox
                    />
                    <InfoMessage text={successMessage} type='success' />
                    <InfoMessage text={errorMessage} type='error' />
                    <Button type='primary' text='Register' isDisabled={isLoading} additionalStyles='w-full' />
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
