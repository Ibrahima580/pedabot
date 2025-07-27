'use client';

import Navbar from '../../components/ui/NavbarConn';
import ResetPasswordForm from '../../components/ui/ResetPasswordForm';
import Footer from '../../components/ui/Footer';

export default function ResetPasswordPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ResetPasswordForm />
      </main>
      <Footer />
    </>
  );
}
