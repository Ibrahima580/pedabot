'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/ResetPassword.module.css';

export default function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (password.length < 8) {
      setFormError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error("Erreur lors de la réinitialisation du mot de passe.");
    } else {
      toast.success("Mot de passe mis à jour avec succès !");
      setTimeout(() => router.push('/connexion'), 2000);
    }

    setLoading(false);
  };

  return (
    <div className={styles.container} role="main" aria-live="polite">
      <ToastContainer aria-label="Notification"/>
      <div className={styles.header}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        <h2 className={styles.title}>Réinitialisation du mot de passe</h2>
        <p className={styles.subtitle}>
          Choisissez un nouveau mot de passe pour continuer.
        </p>
      </div>

      <form onSubmit={handleResetPassword} className={styles.form} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Nouveau mot de passe
          </label>
          <input
            id="password"
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (formError) setFormError('');
            }}
            required
            className={styles.formInput}
            autoComplete="new-password"
            aria-describedby="passwordHelp"
          />
        </div>

        <div className={styles.inputWithError}>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (formError) setFormError('');
              }}
              required
              className={styles.formInput}
              autoComplete="new-password"
              aria-describedby="confirmPasswordHelp"
            />
          </div>

          {formError && (
            <p className={styles.error} role="alert">{formError}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <button
            type="submit"
            className={styles.button}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <span className={styles.loader} aria-label="Chargement..." />
            ) : (
              'Réinitialiser le mot de passe'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
