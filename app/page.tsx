import Head from 'next/head';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import styles from '../components/styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';
import ExpandableText from '../components/ui/ExpandableText';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Accueil - MonApp</title>
      </Head>

      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.welcome}>Bienvenue sur PédaBot</h1>
        <h1 className={styles.info}>Votre mentor au cours de votre formation a l'université.</h1>
        <div className={styles.actionLinks}>
          <Link href="/connexion" className={styles.button}>Se connecter</Link>
          <Link href="/essaie" className={styles.button}>Expérimentez PédaBot</Link>
        </div>
        <div className={styles.logos}>
          <Image src="/icone.png" alt="Logo" width={172} height={180} />
          <Image src="/UADB.png" alt="Logo" width={207} height={180} />
        </div>
        <section id="presentation" className={styles.presentationSection}>
          <h2 className={styles.sectionTitle}>En quoi PédaBot peut vous aidez?</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <h1 className={styles.ufr}>TIC (Technologie de l'Information et de la Communi...</h1>
              <ExpandableText text="PédaBot est un assistant intelligent conçu pour vous accompagner tout au long de vos études en licence et master informatique. Il couvre l’ensemble des unités d’enseignement étudiées en classe en vous offrant des explications claires et des ressources d’approfondissement sur des modules essentiels tels que l’architecture et les systèmes d’exploitation, les mathématiques appliquées (algèbre, analyse, probabilités et statistiques), les techniques d’expression et l’initiation à l’informatique, ainsi que l’algorithmique et la programmation avec plusieurs langages (C, Java, PHP, JavaScript) incluant la programmation orientée objet et le développement web dynamique. PédaBot vous aide également à maîtriser les réseaux informatiques, depuis les bases jusqu’aux réseaux mobiles, sans fil et étendus, les bases de données relationnelles, leur administration et les technologies XML, ainsi que l’électronique, le traitement du signal, la télécommunication, la maintenance des ordinateurs et périphériques, et l’administration des systèmes Linux et Windows. Il vous accompagne aussi dans les domaines de la sécurité des systèmes et logiciels, du management, de la gestion de projet, du droit des TIC et de la méthodologie de rédaction, sans oublier les humanités et les langues pour renforcer vos compétences en communication et en anglais professionnel. Enfin, PédaBot intègre un soutien pour vos stages professionnels afin de vous aider à mettre en pratique vos connaissances dans un contexte réel. Ainsi, PédaBot constitue un outil pédagogique complet et adapté à chaque étape de votre parcours universitaire pour faciliter votre réussite." />
            </div>
            <div className={styles.card}>
              <h1 className={styles.ufr}>SDD (Santé et Développement Dura...</h1>
              <ExpandableText text="PédaBot est un assistant pédagogique conçu pour accompagner les étudiants en Développement Durable, Médecine et Nutrition, depuis les premiers cycles jusqu’aux niveaux avancés. Il facilite un accès structuré aux connaissances fondamentales et spécialisées, favorisant une compréhension approfondie et une application pratique des savoirs.

En Développement Durable, PédaBot couvre les principes de l’écologie, la biodiversité, la gestion des risques naturels, la géographie physique, ainsi que les enjeux sociaux et économiques liés à la durabilité. Il accompagne les étudiants dans l’apprentissage des méthodes quantitatives et qualitatives, la communication, et la réalisation de stages terrain pour intégrer théorie et pratique.

Dans le domaine de la Médecine, PédaBot propose un suivi pédagogique complet portant sur l’anatomie, la biologie cellulaire, la physiologie, la biochimie, la sémiologie, la pharmacologie, les sciences humaines appliquées à la santé, ainsi que sur les soins infirmiers et la pratique hospitalière. Cette approche globale vise à développer les compétences cliniques, éthiques et déontologiques indispensables aux futurs professionnels de santé.

Pour la Nutrition, PédaBot offre un support autour de la planification de programmes nutritionnels, de l’utilisation des outils informatiques, de la gestion et de la communication dans le secteur, ainsi que des interventions communautaires et situations d’urgence. Les stages pratiques et l’analyse des politiques nutritionnelles viennent compléter cette formation pour préparer efficacement les étudiants à leurs futures responsabilités.

Grâce à PédaBot, les étudiants bénéficient d’un accompagnement pédagogique moderne et complet, leur permettant d’assimiler les concepts clés, de réussir leurs travaux pratiques et d’acquérir les savoir-faire essentiels pour contribuer efficacement aux secteurs de la santé, du développement durable et de la nutrition." />
            </div>
            <div className={styles.card}>
              <h1 className={styles.ufr}>MPCI (Mathématique, Physique, Chimie et Informati...</h1>
              <ExpandableText text="PédaBot est un assistant IA dédié à accompagner les étudiants des filières Mathématiques, Physique, Chimie et Informatique tout au long de leurs cycles licence et master. Il propose des ressources et explications claires pour approfondir les fondamentaux et applications pratiques de ces discipPédaBot
En Mathématiques, PédaBot couvre des domaines essentiels comme l’algèbre, l’analyse, les probabilités, les statistiques, la géométrie, la modélisation mathématique, ainsi que les mathématiques appliquées à l’ingénierie et la physique.

Pour la Physique, il offre un soutien sur les concepts de mécanique, thermodynamique, électromagnétisme, optique, physique quantique et expérimentale, avec un focus sur la compréhension théorique et les travaux pratiques.

En Chimie, PédaBot accompagne dans l’étude de la chimie générale, organique, inorganique, physique-chimie, analyse chimique et techniques de laboratoire, combinant théorie et expérimentation.

Enfin, en Informatique, il fournit des ressources sur l’algorithmique, la programmation (C, Java, Python…), les systèmes d’exploitation, les bases de données, le développement web, les réseaux, la sécurité informatique, ainsi que sur les méthodes modernes de calcul scientifique et intelligence artificielle." />
            </div>
            <div className={styles.card}>
              <h1 className={styles.ufr}>ECOMIJ (Économie, Management et Ingénierie Juridi...</h1>
              <ExpandableText text="PédaBot est un assistant IA destiné à accompagner les étudiants tout au long de leurs cycles licence et master dans diverses filières comme l’économie, le management, la comptabilité, le droit, et l’ingénierie juridique. Il couvre un large éventail d’unités d’enseignement essentielles pour la réussite académique, telles que l’organisation de l’entreprise, la comptabilité générale et de gestion, les mathématiques (algèbre, analyse, statistiques descriptives et inférentielles, mathématiques financières), la microéconomie et la macroéconomie à différents niveaux, les principes fondamentaux de l’économie, la gestion de projets, l’informatique appliquée (Word, Excel, Access, logiciels spécialisés comme R, Stata, MATLAB, MS Project), ainsi que l’anglais des affaires et les techniques de communication.

Pour la filière économique et gestion, PédaBot propose des ressources sur l’histoire des faits économiques, l’économie du développement, la finance internationale, la politique économique, l’économétrie (classique, qualitative, spatiale, non paramétrique), les techniques d’enquête, la modélisation économique, la théorie des jeux, la gestion des risques et la gestion de portefeuille.

Dans les parcours juridiques et administratifs, il accompagne l’étude du droit constitutionnel, administratif, pénal, des contrats, des biens, du droit des sociétés commerciales, du droit international public et privé, ainsi que les finances publiques, la fiscalité, le droit social et le droit du travail. Les étudiants trouveront aussi des aides sur la méthodologie de recherche, la rédaction administrative et les techniques contractuelles, sans oublier les nouvelles disciplines comme la cybersécurité, le droit numérique, et le management foncier et environnemental.

PédaBot intègre également des modules pour le management responsable des organisations, avec des cours en sociologie des organisations, management stratégique, marketing territorial, plaidoyer et lobbying, gestion des infrastructures publiques, et développement économique local.

Ainsi, PédaBot facilite la compréhension approfondie des matières clés, l’acquisition des compétences pratiques et méthodologiques, et la réussite des projets professionnels, couvrant un large spectre d’enseignements indispensables aux étudiants en licence et master, quel que soit leur domaine d’études." />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
