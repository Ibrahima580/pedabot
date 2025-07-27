'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasHandled = useRef(false);

  useEffect(() => {
    if (hasHandled.current) return;
    hasHandled.current = true;

    async function handleAuth() {
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      if (error) {
        // Enregistrer le résultat d'erreur dans localStorage
        localStorage.setItem(
          'verificationStatus',
          JSON.stringify({ status: 'error', message: errorDescription || 'Erreur inconnue' })
        );
        router.replace('/connexion');
        return;
      }

      if (accessToken && refreshToken) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (sessionError) {
          localStorage.setItem(
            'verificationStatus',
            JSON.stringify({ status: 'error', message: sessionError.message })
          );
          router.replace('/connexion');
          return;
        }

        // Sauvegarder le statut "pending" puis "success" après un petit délai simulé (optionnel)
        localStorage.setItem(
          'verificationStatus',
          JSON.stringify({ status: 'pending' })
        );

        // Pour simuler le délai, on peut directement passer au succès (ou gérer côté connexion)
        localStorage.setItem(
          'verificationStatus',
          JSON.stringify({ status: 'success' })
        );

        router.replace('/connexion');
      } else {
        // Pas de token ni erreur = erreur
        localStorage.setItem(
          'verificationStatus',
          JSON.stringify({ status: 'error', message: 'Aucun token de confirmation reçu.' })
        );
        router.replace('/connexion');
      }
    }

    handleAuth();
  }, [router, searchParams]);

  return <p>Connexion en cours, veuillez patienter...</p>;
}     