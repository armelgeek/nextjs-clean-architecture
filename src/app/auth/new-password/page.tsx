import { Suspense } from 'react';
import LoadingSpinner from "@/presentation/shared/components/LoadingSpinner/LoadingSpinner";
import AuthWrap from "@/presentation/auth/components/AuthWrap";
import NewPasswordForm from "@/presentation/auth/components/NewPasswordForm";

const NewPasswordPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner size='lg' className='mt-10' />}>
      <AuthWrap
        title='Update Your Password'
        description='Enter your new password to securely update your account credentials.'
      >
        <NewPasswordForm />
      </AuthWrap>
    </Suspense>
  );
};

export default NewPasswordPage;
