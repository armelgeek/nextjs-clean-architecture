import { Suspense } from 'react';
import LoadingSpinner from "@/presentation/shared/components/LoadingSpinner/LoadingSpinner";
import AuthWrap from "@/presentation/auth/components/AuthWrap";
import VerificationForm from "@/presentation/auth/components/VerificationForm";

const VerificationPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner size='lg' className='mt-10' />}>
      <AuthWrap title='Email Confirmation' description=''>
        <VerificationForm />
      </AuthWrap>
    </Suspense>
  );
};

export default VerificationPage;
