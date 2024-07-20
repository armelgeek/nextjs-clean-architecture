import { Suspense } from 'react';
import LoadingSpinner from "@/presentation/shared/components/LoadingSpinner/LoadingSpinner";
import AuthWrap from "@/presentation/auth/components/AuthWrap";
import LoginForm from "@/presentation/auth/components/LoginForm";

const LoginPage = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner size='lg' className='mt-10' />}>
        <AuthWrap
          title='Login'
          description='Login to your account'
          showSocialLogin
        >
          <LoginForm />
        </AuthWrap>
      </Suspense>
    </div>
  );
};

export default LoginPage;
