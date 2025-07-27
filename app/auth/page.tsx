import { Suspense } from 'react';
import AuthCallbackPage from './AuthCallbackPage';

export default function AuthPage() {
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <AuthCallbackPage />
    </Suspense>
  );
}