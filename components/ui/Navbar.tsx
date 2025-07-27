import Link from 'next/link';
import styles from './../styles/Navbar.module.css';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/icone.png" alt="Logo" width={100} height={100} />
        </Link>
      </div>
      <div className={styles.links}>
        <Link href="/inscription" className={styles.link}>Créer un compte</Link>
        <Link href="/connexion" className={styles.link}>Se connecter</Link>
        <a href="#presentation" className={styles.link}>À propos</a>
      </div>
    </nav>
  );
};

export default Navbar;
