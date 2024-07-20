import { Suspense } from 'react';
import LoadingSpinner from "@/presentation/shared/components/LoadingSpinner/LoadingSpinner";
import AuthWrap from "@/presentation/auth/components/AuthWrap";
import RegisterForm from "@/presentation/auth/components/RegisterForm";

const RegisterPage = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner size='lg' className='mt-10' />}>
        <AuthWrap
          title='Register'
          description='Join us today and unlock exclusive features'
          showSocialLogin
        >
          <RegisterForm />
        </AuthWrap>
      </Suspense>
    </div>
  );
};

export default RegisterPage;
