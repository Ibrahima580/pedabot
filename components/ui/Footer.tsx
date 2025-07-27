import styles from './../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      © {new Date().getFullYear()} PédaBot UADB - Tous droits réservés
    </footer>
  );
};

export default Footer;
