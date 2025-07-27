'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from './../../lib/supabaseClient';
import styles from './../styles/Connexion.module.css';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 🛠 Log uniquement en développement
const logError = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(...args);
  }
};

export default function ConnexionForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', passwordLength: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? '' : 'Adresse email invalide.',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: 'Veuillez entrer un email valide.',
      }));
      return;
    }

    if (formData.password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        passwordLength: 'Le mot de passe doit contenir au moins 8 caractères.',
      }));
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        logError('Erreur signIn:', error);
        if (error.message?.toLowerCase().includes('invalid login credentials')) {
          toast.error('Email ou mot de passe incorrect.');
        } else if (error.message?.toLowerCase().includes('not confirmed')) {
          toast.error('Votre compte n’est pas confirmé. Veuillez vérifier votre email.');
        } else {
          toast.error(`Erreur : ${error.message || 'Connexion impossible'}`);
        }
      } else {
        toast.success('Connexion réussie !');
        setTimeout(() => router.push('/interface'), 1000);
      }
    } catch (err) {
      logError('Erreur réseau:', err);
      toast.error('Erreur réseau, veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer/>
      <div className={styles.header}>
        <h2>Se connecter</h2>
        <p>Veuillez vous connecter pour accéder à votre espace personnel.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <img src="/icone.png" alt="Logo" className={styles.logo} />

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Adresse email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="exemple@domaine.com"
            required
            className={styles.formInput}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Entrez votre mot de passe"
            required
            className={styles.formInput}
          />
          {errors.passwordLength && (
            <p className={styles.error}>{errors.passwordLength}</p>
          )}
        </div>

        {/* ✅ Lien mot de passe oublié */}
        <div className={styles.forgotPassword}>
          <a href="/mot-de-passe-oublie">Mot de passe oublié ?</a>
        </div>

        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? (
            <span className={styles.loader} aria-label="Chargement en cours" />
          ) : (
            'Se connecter'
          )}
        </button>
      </form>
    </div>
  );
}
