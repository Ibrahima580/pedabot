// pages/inscription.tsx
'use client';

import Navbar from '../../components/ui/NavbarInsc';
import InscriptionForm from './../../components/ui/InscriptionForm';
import Footer from './../../components/ui/Footer';

export default function InscriptionPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <InscriptionForm />
      </main>
      <Footer />
    </>
  );
}
