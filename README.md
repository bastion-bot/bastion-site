# Bastion — Site vitrine

Site vitrine de Bastion, bot Discord de sécurité.
Stack : **Next.js 14 + Tailwind CSS + TypeScript**

## Structure

```
src/
├── app/
│   ├── globals.css       # Styles globaux + animations CSS
│   ├── layout.tsx        # Layout racine + metadata SEO
│   └── page.tsx          # Page principale
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx    # Navigation fixe avec scroll effect
│   │   └── Footer.tsx    # Footer
│   ├── sections/
│   │   ├── Hero.tsx      # Hero avec étoiles, vague, texte rotatif
│   │   ├── Ticker.tsx    # Bandeau défilant des modules
│   │   ├── Features.tsx  # Grille des features avec auto-rotation
│   │   ├── Pricing.tsx   # Cards tarifaires
│   │   └── CTA.tsx       # Call-to-action final
│   └── ui/
│       ├── Background.tsx # Canvas étoiles avec parallax souris
│       ├── Cursor.tsx     # Curseur custom rouge
│       └── Particles.tsx  # Particules rouges flottantes
└── hooks/
    ├── useReveal.ts      # Animations reveal au scroll
    └── useCountUp.ts     # Compteur animé
```

## Installation

```bash
# Cloner ou copier le dossier
cd bastion-site

# Installer les dépendances
npm install

# Mode développement
npm run dev
# → http://localhost:3000

# Build production
npm run build
npm run start
# → http://localhost:3001
```

## Déploiement sur ta VM

### 1. Copier le logo

Mets `logo.png` dans le dossier `public/` à la racine du projet.

### 2. Build et lancement

```bash
npm run build
npm run start
# Tourne sur le port 3001
```

### 3. Nginx Proxy Manager

Crée une nouvelle proxy host dans NPM :
- **Domain** : `dashboard-bastion.yaiito.fr` (ou `bastion.yaiito.fr` quand tu bascules)
- **Forward Hostname** : `localhost` (ou IP de la VM)
- **Forward Port** : `3001`
- **Scheme** : `http`

Active SSL avec Let's Encrypt.

### 4. PM2 (optionnel, pour garder le site actif)

```bash
npm install -g pm2
pm2 start npm --name "bastion-site" -- start
pm2 save
pm2 startup
```

## Personnalisation

### Changer les couleurs
Modifie `--red` dans `src/app/globals.css` et `tailwind.config.js`

### Changer le lien d'invitation Discord
Cherche `href="#"` dans `Hero.tsx` et `CTA.tsx` et remplace par ton lien d'invitation Discord.

### Changer les stats
Dans `Hero.tsx`, modifie `useCountUp(847, 1000)` pour changer le compteur de serveurs.

### Ajouter une section
Crée un nouveau fichier dans `src/components/sections/`, importe-le dans `src/app/page.tsx`.

## Cohabitation avec le dashboard Go

Le site vitrine tourne sur le **port 3001**.
Le dashboard Go reste sur le **port 8081**.

Dans Nginx Proxy Manager, tu peux router :
- `/` → port 3001 (Next.js)
- `/app`, `/auth`, `/admin`, `/billing` → port 8081 (Go)

Ou plus simple : deux sous-domaines séparés.
