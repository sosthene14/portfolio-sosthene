# macOS UI Recreation

Recréation de l'interface macOS Sonoma avec React et Tailwind CSS.

## Stack Technique

- **React 19** - Bibliothèque UI
- **Vite** - Build tool et dev server
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Radix UI** - Composants UI accessibles
- **Lucide React** - Icônes

## Installation

```bash
pnpm install
```

## Scripts Disponibles

```bash
# Démarrer le serveur de développement
pnpm dev

# Compiler pour la production
pnpm build

# Prévisualiser la version de production
pnpm preview

# Lint du code
pnpm lint
```

## Structure du Projet

```
├── src/
│   ├── main.tsx          # Point d'entrée de l'application
│   ├── App.tsx           # Composant principal
│   └── index.css         # Styles globaux et Tailwind
├── components/
│   ├── macos/            # Composants spécifiques à macOS
│   │   ├── MenuBar.tsx
│   │   ├── Dock.tsx
│   │   ├── Window.tsx
│   │   ├── FinderWindow.tsx
│   │   ├── TerminalWindow.tsx
│   │   ├── NotesWindow.tsx
│   │   └── DesktopIcons.tsx
│   └── ui/               # Composants UI réutilisables (shadcn)
├── hooks/                # Custom React hooks
├── lib/                  # Utilitaires
└── public/               # Assets statiques

```

## Migration de Next.js vers Vite

Ce projet a été migré de Next.js vers Vite pour plus de simplicité et de performance en développement.

### Changements principaux :

1. **Suppression de Next.js** et de ses dépendances
2. **Ajout de Vite** comme build tool
3. **Structure modifiée** : `app/` → `src/`
4. **Configuration Tailwind** adaptée pour Vite
5. **Suppression** de `next-themes` et `@vercel/analytics`

## Développement

Le serveur de développement démarre sur `http://localhost:3000` (ou le prochain port disponible).

Les changements sont appliqués automatiquement grâce au Hot Module Replacement (HMR) de Vite.

## Build

La commande `pnpm build` génère une version optimisée dans le dossier `dist/`.

## License

Projet personnel - Utilisation libre
