'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/Connexion.module.css';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Veuillez entrer une adresse email valide.');
      return;
    }

    setError('');
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast.error("Erreur lors de l'envoi de l'email de réinitialisation.");
    } else {
      toast.success("Email envoyé ! Vérifiez votre boîte de réception.");
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <ToastContainer/>
      <div className={styles.header}>
        <h2>Mot de passe oublié</h2>
        <p>Entrez votre email pour réinitialiser votre mot de passe.</p>
      </div>
      <form onSubmit={handleReset} className={styles.form} noValidate>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Adresse email</label>
          <input
            type="email"
            id="email"
            placeholder="exemple@domaine.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            required
            className={`${styles.formInput} ${error ? styles.invalid : ''}`}
          />
          {error && <p className={styles.error}>{error}</p>}
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? (
              <span className={styles.loader} aria-label="Chargement..." />
            ) : (
              'Réinitialiser mon mot de passe'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
