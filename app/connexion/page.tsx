'use client';

import Navbar from './../../components/ui/NavbarConn';
import ConnexionForm from './../../components/ui/ConnexionForm';
import Footer from './../../components/ui/Footer';

export default function ConnexionPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ConnexionForm />
      </main>
      <Footer />
    </>
  );
}
