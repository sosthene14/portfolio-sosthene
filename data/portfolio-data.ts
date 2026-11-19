export const portfolioData = {
  profile: {
    name: "Sosthène Mounsambote",
    title: "Ingénieur logiciel | IoT, Cloud, DevOps & QA",
    email: "sosthenemounsambote14@gmail.com",
    website: "sosthenemounsambote.com",
    phone: "+221 77 310 11 60",
    github: "github.com/sosthene14",
    bio: "Titulaire d'une Licence en Génie Informatique et actuellement en Master Génie Logiciel à l'IPD, je me suis spécialisé en développement Full Stack depuis plusieurs années. Fort d'une expérience progressive allant du freelance au CDI, je conçois des applications web robustes et maîtrise les pratiques DevOps modernes.",
  },

  experiences: [
    {
      id: 1,
      period: "Depuis 2024",
      title: "Développeur Full Stack & DevOps",
      company: "GATS",
      type: "CDI",
      description:
        "Conception et déploiement d’une plateforme de gestion et de suivi de stations-service : web, mobile, IoT et infrastructure.",
      technologies: [
        "React",
        "Ant Design",
        "React Native",
        "Expo",
        "MQTT",
        "MongoDB",
        "K3s",
        "Nginx",
        "GitLab CI/CD",
      ],
      responsibilities: [
        "Développement de tableaux de bord web (React, Ant Design) pour superviser les stations, cuves, budgets, partenaires et tickets de ravitaillement.",
        "Création d’une application mobile React Native / Expo pour gérer les allocations carburant avec QR code et profils client et pompiste.",
        "Intégration IoT : collecte en temps réel des niveaux, volumes, températures et niveaux d’eau des jauges via MQTT, stockage des séries temporelles sur MongoDB et configuration des jauges par cuve.",
        "Mise en place de l’infrastructure : cluster Kubernetes (K3s), reverse proxy Nginx, certificats SSL, conteneurisation et pipelines GitLab CI/CD avec runners dédiés.",
        "Évaluation de la sécurité des intégrations fournisseurs et recommandations de renforcement.",
      ],
      link: "",
    },
    {
      id: 2,
      period: "2023 – 2024",
      title: "Développeur Full Stack",
      company: "Rostel High Tech",
      type: "CDD",
      description:
        "Développement et maintenance d’applications web et mobiles, de la conception à la mise en production.",
      technologies: ["React", "Express", "PostgreSQL"],
      responsibilities: [
        "Développement et maintenance d'applications web",
        "Conception d'API REST sécurisées",
        "Intégration et modélisation de bases PostgreSQL",
        "Correction de bugs et amélioration continue",
      ],
      link: "",
    },
    {
      id: 3,
      period: "2022 – 2023",
      title: "Développeur Full Stack",
      company: "Reaxion",
      type: "Prestataire",
      description:
        "Développement d’applications web sur mesure pour les clients de l’agence.",
      technologies: ["Next.js", "Django", "MongoDB"],
      responsibilities: [
        "Développement d'applications web sur mesure",
        "Intégration front-end avec Next.js",
        "Mise en place de back-ends Django",
        "Modélisation de bases de données MongoDB",
      ],
      link: "",
    },
    {
      id: 4,
      period: "2021 – 2022",
      title: "Infographiste",
      company: "Groupe TASNIM",
      type: "Freelance",
      description:
        "Conception d’affiches et de flyers pour des clients locaux en tant qu’indépendant.",
      technologies: ["Photoshop", "Illustrator"],
      responsibilities: [
        "Conception d'affiches et de flyers",
        "Création d'identités visuelles",
        "Retouche photo et montage graphique",
      ],
      link: "",
    },
  ],

  education: [
    {
      id: 1,
      period: "2024 – présent",
      degree: "Master Génie Logiciel",
      school: "IPD — Institut Polytechnique de Dakar",
      status: "En cours",
      description:
        "Formation avancée axée sur l'architecture logicielle, les méthodologies Agile/DevOps et la conception de solutions web scalables et performantes.",
      objectives: [
        "Maîtrise approfondie des architectures logicielles modernes",
        "Expertise en méthodologies Agile et DevOps",
        "Développement de solutions scalables et performantes",
        "Gestion de projets logiciels complexes",
      ],
    },
    {
      id: 2,
      period: "2021 – 2024",
      degree: "Licence Génie Informatique",
      school: "UNIPRO — Univers Professionnelle",
      status: "Obtenu",
      description:
        "Formation fondamentale en informatique couvrant la programmation, les bases de données, les réseaux et le développement d'applications web.",
      objectives: [
        "Fondamentaux de la programmation et des algorithmes",
        "Conception et gestion de bases de données",
        "Développement d'applications web",
        "Notions de réseaux et de systèmes d'exploitation",
      ],
    },
  ],

  skills: {
    frontend: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "HTML / CSS", level: 95 },
    ],
    backend: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 85 },
      { name: "Django", level: 75 },
      { name: "Spring Boot", level: 70 },
    ],
    databases: [
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 80 },
    ],
    devops: [
      { name: "Docker", level: 85 },
      { name: "Git / GitHub", level: 90 },
      { name: "Nginx", level: 75 },
      { name: "AWS / GCP / Azure", level: 75 },
    ],
  },

  // Catégories de compétences (niveau sur une échelle de 5)
  skillCategories: [
    {
      id: "langages",
      label: "Langages",
      icon: "code",
      items: [
        { name: "TypeScript", mono: "TS", color: "#3178C6", level: 4, icon: "si:SiTypescript" },
        { name: "JavaScript", mono: "JS", color: "#F7DF1E", level: 4, icon: "si:SiJavascript" },
        { name: "Python", mono: "Py", color: "#3776AB", level: 4, icon: "si:SiPython" },
        { name: "SQL", mono: "SQL", color: "#5b9bf3", level: 4, icon: "" },
        { name: "Java", mono: "Jv", color: "#E76F00", level: 3, icon: "fa:FaJava" },
        { name: "PHP", mono: "php", color: "#777BB4", level: 3, icon: "si:SiPhp" },
        { name: "Bash", mono: ">_", color: "#4EAA25", level: 4, icon: "si:SiGnubash" },
      ],
    },
    {
      id: "frontend",
      label: "Frontend",
      icon: "monitor",
      items: [
        { name: "React", mono: "Re", color: "#61DAFB", level: 4, icon: "si:SiReact" },
        { name: "Next.js", mono: "N", color: "#e8e8ec", level: 4, icon: "si:SiNextdotjs" },
        { name: "Tailwind CSS", mono: "TW", color: "#38BDF8", level: 4, icon: "si:SiTailwindcss" },
        { name: "HTML5", mono: "H5", color: "#E34F26", level: 4, icon: "si:SiHtml5" },
        { name: "CSS3", mono: "C3", color: "#1572B6", level: 4, icon: "si:SiCss3" },
        { name: "Svelte", mono: "Sv", color: "#FF3E00", level: 3, icon: "si:SiSvelte" },
      ],
    },
    {
      id: "backend",
      label: "Backend",
      icon: "server",
      items: [
        { name: "Node.js", mono: "Nd", color: "#5FA04E", level: 4, icon: "si:SiNodedotjs" },
        { name: "NestJS", mono: "Ne", color: "#E0234E", level: 5, icon: "si:SiNestjs" },
        { name: "Express", mono: "ex", color: "#e8e8ec", level: 4, icon: "si:SiExpress" },
        { name: "Prisma", mono: "Pr", color: "#5b9bf3", level: 3, icon: "si:SiPrisma" },
        { name: "Drizzle", mono: "Dz", color: "#C5F74F", level: 3, icon: "si:SiDrizzle" },
        { name: "REST API", mono: "{}", color: "#5b9bf3", level: 4, icon: "" },
      ],
    },
    {
      id: "databases",
      label: "Bases de données",
      icon: "database",
      items: [
        { name: "PostgreSQL", mono: "Pg", color: "#4169E1", level: 4, icon: "si:SiPostgresql" },
        { name: "MongoDB", mono: "Mo", color: "#47A248", level: 3, icon: "si:SiMongodb" },
        { name: "MySQL", mono: "My", color: "#4479A1", level: 3, icon: "si:SiMysql" },
      ],
    },
    {
      id: "devops",
      label: "Outils & DevOps",
      icon: "wrench",
      items: [
        { name: "Docker", mono: "Dk", color: "#2496ED", level: 4, icon: "si:SiDocker" },
        { name: "Git", mono: "Git", color: "#F05032", level: 4, icon: "si:SiGit" },
        { name: "AWS", mono: "aws", color: "#FF9900", level: 4, icon: "fa:FaAws" },
        { name: "CI/CD", mono: "CI", color: "#5b9bf3", level: 4, icon: "si:SiGithubactions" },
      ],
    },
    {
      id: "methodologies",
      label: "Méthodologies",
      icon: "network",
      items: [
        { name: "Agile", mono: "Ag", color: "#5b9bf3", level: 4, icon: "si:SiJira" },
        { name: "Scrum", mono: "Sc", color: "#5b9bf3", level: 4, icon: "" },
        { name: "TDD", mono: "TDD", color: "#22c55e", level: 4, icon: "si:SiTestinglibrary" },
      ],
    },
  ],

  projects: [
    {
      id: 8,
      name: "Vidzo",
      description:
        "Une vidéo. Trois réseaux. Publiez vos vidéos et photos sur TikTok, Instagram et Facebook depuis une seule plateforme web.",
      technologies: ["Vidéo", "TikTok", "Instagram", "Facebook"],
      category: "Web Development",
      link: "https://vidzo.app/",
      image: "/vidzo.png"
    },
    {
      id: 9,
      name: "GATS Energy",
      description:
        "Plateforme de gestion de flotte et d’allocation sécurisée de carburant. L’IoT aide les organisations à suivre et contrôler les consommations.",
      technologies: ["IoT", "Gestion de flotte", "Suivi carburant", "Sécurité"],
      category: "Web Development",
      link: "",
      image: ""
    },
    {
      id: 10,
      name: "AutoDiag",
      description:
        "Solution de diagnostic automobile connectée : des dispositifs IoT transmettent les pannes détectées sur les véhicules pour faciliter leur identification.",
      technologies: ["IoT", "Diagnostic automobile", "Véhicules connectés"],
      category: "Web Development",
      link: "",
      image: ""
    },
    {
      id: 7,
      name: "RoxShield",
      description:
        "Plateforme de sensibilisation et de formation à la cybersécurité : simulations de phishing, formations, quiz, suivi de progression et certifications.",
      technologies: ["TypeScript", "Next.js", "NestJS", "PostgreSQL", "Docker"],
      category: "Web Development",
      link: "https://roxshield.com/",
      image: "/roxshield.PNG"
    },
    {
      id: 1,
      name: "ROCOLIS",
      description: "Logistique collaborative et suivi en temps réel",
      technologies: ["Spring Boot", "React", "Docker", "NodeJs"],
      category: "Web Development",
      link:"https://rocolis.com",
      image: "/rocolis.PNG"
    },
    {
      id: 3,
      name: "EatSafe",
      description: "Plateforme complète de gestion de restauration",
      technologies: ["Django", "React", "PostgreSQL"],
      category: "Web Development",
      link:"http://eatsafe.pro",
      image: "/eatsafe.PNG"
    },
  ],
}
