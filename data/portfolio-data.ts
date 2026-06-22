export const portfolioData = {
  profile: {
    name: "Sosthène Mounsambote",
    title: "Développeur Full Stack & DevOps",
    email: "sosthenemounsambote14@gmail.com",
    website: "sosthenemounsambote.com",
    phone: "+221 77 310 11 60",
    github: "github.com/sosthene14",
    bio: "Titulaire d'une Licence en Génie Informatique et actuellement en Master Génie Logiciel à l'IPD, je me suis spécialisé en développement Full Stack depuis plusieurs années. Fort d'une expérience progressive allant du freelance au CDI, je conçois des applications web robustes et maîtrise les pratiques DevOps modernes.",
  },

  experiences: [
    {
      id: 1,
      period: "2024 – présent",
      title: "Développeur Full Stack & DevOps",
      company: "GatsMapping",
      type: "CDI",
      description:
        "Développement d'applications web Full Stack et gestion des pipelines DevOps (CI/CD, containerisation, déploiement cloud).",
      technologies: ["React", "Node.js", "Docker", "AWS", "CI/CD"],
    },
    {
      id: 2,
      period: "2023 – 2024",
      title: "Développeur Full Stack",
      company: "Rostel High Tech",
      type: "CDD",
      description:
        "Développement et maintenance d'applications web dans le cadre d'un contrat à durée déterminée.",
      technologies: ["React", "Express", "PostgreSQL"],
    },
    {
      id: 3,
      period: "2022 – 2023",
      title: "Développeur Full Stack",
      company: "Reaxion",
      type: "Prestataire",
      description:
        "Développement d'applications web en tant que prestataire au sein de l'agence Reaxion.",
      technologies: ["Next.js", "Django", "MongoDB"],
    },
    {
      id: 4,
      period: "2021 – 2022",
      title: "Infographiste",
      company: "Groupe TASNIM",
      type: "Freelance",
      description:
        "Conception d'affiches et de flyers en prestation graphique indépendante.",
      technologies: ["Photoshop", "Illustrator"],
    },
  ],

  education: [
    {
      id: 1,
      period: "2024 – présent",
      degree: "Master Génie Logiciel",
      school: "IPD — Institut Polytechnique de Dakar",
      status: "En cours",
    },
    {
      id: 2,
      period: "2021 – 2024",
      degree: "Licence Génie Informatique",
      school: "UNIPRO — Univers Professionnelle",
      status: "Obtenu",
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

  projects: [
    {
      id: 1,
      name: "ROCOLIS",
      description: "Logistique collaborative et suivi en temps réel",
      technologies: ["Spring Boot", "React", "Docker", "NodeJs"],
      category: "Web Development",
      link:"https://rocolis.com"
    },
    {
      id: 5,
      name: "Hackathon Musée v1",
      description: "Prototype interactif pour musée virtuel",
      technologies: ["Svelte", "Three.js"],
      category: "Web Development",
      link:"https://hackaton-mus-v1.vercel.app"
    },
    {
      id: 2,
      name: "UniDocs",
      description: "Gestion intelligente de documents universitaires",
      technologies: ["Next.js", "TypeScript", "NestJs"],
      category: "Web Development",
      link:"https://unidocs.vercel.app"
    },
    {
      id: 3,
      name: "EatSafe",
      description: "Plateforme complète de gestion de restauration",
      technologies: ["Django", "React", "PostgreSQL"],
      category: "Web Development",
      link:"http://eatsafe.pro"
    },
     {
      id: 4,
      name: "La Nuit des Étoiles",
      description: "Application de vote en temps réel pour un concours",
      technologies: ["React", "Node.js", "Socket.io"],
      category: "Web Development",
      link:"https://continentalaf.com"
    }
   ,
    {
      id: 6,
      name: "POS Restaurant",
      description: "Application POS pour un restaurant",
      technologies: ["NodeJS", "React", "PostgreSQL", "MongoDB"],
      category: "Productivity",
      link:""
    },
  ],
}
