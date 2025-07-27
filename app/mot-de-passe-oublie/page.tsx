'use client';

import Navbar from '../../components/ui/NavbarEss';
import ForgotPasswordForm from './../../components/ui/ForgotPasswordForm';
import Footer from './../../components/ui/Footer';

export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ForgotPasswordForm />
      </main>
      <Footer />
    </>
  );
}
