'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './../styles/Inscription.module.css';
import { supabase } from './../../lib/supabaseClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function InscriptionForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    ufr: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    passwordMatch: '',
    passwordLength: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOnce, setSubmittedOnce] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (submittedOnce) {
      if (name === 'email') {
        setErrors((prev) => ({
          ...prev,
          email: validateEmail(value) ? '' : 'Adresse email invalide.',
        }));
      }

      if (name === 'password' || name === 'confirmPassword') {
        const newPassword = name === 'password' ? value : formData.password;
        const newConfirm =
          name === 'confirmPassword' ? value : formData.confirmPassword;

        setErrors((prev) => ({
          ...prev,
          passwordMatch:
            newPassword && newConfirm && newPassword !== newConfirm
              ? 'Les mots de passe ne correspondent pas.'
              : '',
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedOnce(true);

    const newErrors = {
      email: validateEmail(formData.email) ? '' : 'Adresse email invalide.',
      passwordMatch:
        formData.password !== formData.confirmPassword
          ? 'Les mots de passe ne correspondent pas.'
          : '',
      passwordLength:
        formData.password.length < 8
          ? 'Le mot de passe doit contenir au moins 8 caractères.'
          : '',
    };

    setErrors(newErrors);

    if (newErrors.email || newErrors.passwordMatch || newErrors.passwordLength)
      return;

    setIsSubmitting(true);

    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
            ufr: formData.ufr,
          },
        },
      });

      if (signUpError) {
        if (
          signUpError.message?.toLowerCase().includes('already registered') ||
          signUpError.message?.toLowerCase().includes('duplicate') ||
          signUpError.status === 409
        ) {
          toast.error("Cet utilisateur existe déjà.");
        } else {
          toast.error(`Erreur : ${signUpError.message || 'Erreur inconnue'}`);
        }
        setIsSubmitting(false);
        return;
      }

      const userId = authData?.user?.id;
      if (userId) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            username: formData.username,
            ufr: formData.ufr,
          });

        if (profileError) {
          toast.warn(
            "Inscription réussie mais échec de l'enregistrement du profil."
          );
        }
      }

      toast.success('Inscription réussie veuillez verifier votre boite e-mail pour confirmer votre inscription !');
      setTimeout(() => {
        router.push('/connexion');
      }, 5500);
    } catch (err) {
      toast.error('Erreur réseau, veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClass = (errorField: string) =>
    submittedOnce && errorField
      ? `${styles.formInput} ${styles.invalid}`
      : styles.formInput;

  return (
    <>
      <ToastContainer/>
      <div className={styles.container}>
        <h1 className={styles.title}>S'inscrire</h1>
        <p className={styles.info}>
          Merci de remplir le formulaire ci-dessous pour créer votre compte.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <img src="/icone.png" alt="Logo" className={styles.logo} />

          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>
              Nom d'utilisateur
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Entrez votre nom d'utilisateur"
              value={formData.username}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Adresse email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="exemple@domaine.com"
              value={formData.email}
              onChange={handleChange}
              required
              className={getInputClass(errors.email)}
            />
            {submittedOnce && errors.email && (
              <p className={styles.error}>{errors.email}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="ufr" className={styles.label}>
              UFR
            </label>
            <select
              id="ufr"
              name="ufr"
              value={formData.ufr}
              onChange={handleChange}
              required
              className={styles.formInput}
            >
              <option value="" disabled hidden>
                Sélectionnez votre UFR
              </option>
              <option value="math-info">TIC</option>
              <option value="lettres">SDD</option>
              <option value="droit">MPCI</option>
              <option value="eco-gestion">ECOMIJ</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Choisissez un mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
              className={getInputClass(errors.passwordLength)}
            />
            {submittedOnce && errors.passwordLength && (
              <p className={styles.error}>{errors.passwordLength}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Répétez le mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={getInputClass(errors.passwordMatch)}
            />
            {submittedOnce && errors.passwordMatch && (
              <p className={styles.error}>{errors.passwordMatch}</p>
            )}
          </div>

          <button type="submit" className={styles.button} disabled={isSubmitting}>
            {isSubmitting ? (
              <span className={styles.loader} aria-label="Chargement en cours" />
            ) : (
              'S’inscrire'
            )}
          </button>
        </form>
      </div>
    </>
  );
}
