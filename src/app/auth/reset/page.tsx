import { Suspense } from 'react';
import AuthWrap from "@/presentation/auth/components/AuthWrap";
import LoadingSpinner from "@/presentation/shared/components/LoadingSpinner/LoadingSpinner";
import ResetPasswordForm from "@/presentation/auth/components/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner size='lg' className='mt-10' />}>
        <AuthWrap
          title='Reset'
          description='Enter your email to receive a link to reset your password'
        >
          <ResetPasswordForm />
        </AuthWrap>
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;
