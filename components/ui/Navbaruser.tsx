'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';
import styles from './../styles/Navbaruser.module.css';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/connexion');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/icone.png" alt="Logo" width={100} height={100} />
        </Link>
      </div>

      <div className={styles.links}>
         <Link
          href="/"
          className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
        >
          Acceuil
        </Link>
        <Link
          href="/interface"
          className={`${styles.link} ${pathname === '/interface' ? styles.active : ''}`}
        >
          Prompt
        </Link>

        {user && (
          <>
            <button onClick={handleLogout} className={styles.link}>
              Déconnexion
            </button>
            <div className={styles.avatar}>
              <Image
                src="/avatar.png"
                alt="Avatar"
                width={40}
                height={40}
              />
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
