# Atelier Hanna — Site statique

Site vitrine haut de gamme pour Atelier Hanna (joaillerie private label).
HTML / CSS / JavaScript vanilla — **aucune étape de build**, aucun framework.
Conçu pour un déploiement direct sur **Cloudflare Pages**.

---

## Structure

```
site/
├── index.html              Accueil
├── maison/                 La Maison (à propos)
├── savoir-faire/           Services (3 actes)
├── processus/              Le Processus + FAQ
├── private-label/          Page de vente principale
├── expertise/              Expertise & Capacités
├── creations/              Portfolio anonymisé
├── journal/                Journal (blog) + newsletter
├── contact/                Formulaire « Débuter un projet »
├── mentions-legales/       (modèle à compléter)
├── confidentialite/        (modèle à compléter)
├── 404.html                Page d'erreur
├── assets/
│   ├── css/style.css       Design system complet
│   ├── js/main.js          Interactions (scroll, menu, formulaire…)
│   └── img/favicon.svg
├── functions/api/contact.js  (optionnel) traitement serveur du formulaire
├── _headers                En-têtes HTTP & cache
├── _redirects              Redirections d'alias
├── robots.txt
└── sitemap.xml
```

---

## Déploiement sur Cloudflare Pages

### Option A — glisser-déposer (le plus simple)
1. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
2. Glisser le contenu du dossier `site/` (pas le dossier lui-même).
3. Publier. C'est en ligne.

### Option B — via Git (recommandé pour les mises à jour)
1. Pousser ce dépôt sur GitHub/GitLab.
2. Cloudflare Pages → **Connect to Git** → sélectionner le dépôt.
3. Réglages de build :
   - **Build command** : *(laisser vide)*
   - **Build output directory** : `site`
4. Déployer. Chaque `push` redéploie automatiquement.

### Domaine
Pages → **Custom domains** → ajouter `atelierhanna.com`.
Puis remplacer `atelierhanna.com` par le domaine réel dans `sitemap.xml` et `robots.txt`.

---

## Formulaire de contact

Par défaut, le formulaire affiche une **confirmation de démonstration** côté client
(aucun e-mail n'est envoyé). Trois façons de l'activer réellement :

**1. Formspree / Basin (zéro code)**
Dans `contact/index.html`, remplacer :
```html
<form id="contactForm" action="#" method="POST" novalidate>
```
par votre endpoint, ex. :
```html
<form id="contactForm" action="https://formspree.io/f/VOTRE_ID" method="POST" novalidate>
```

**2. Cloudflare Pages Function (inclus, `functions/api/contact.js`)**
- Mettre `action="/api/contact"` dans le formulaire.
- Ajouter les variables d'environnement `RESEND_API_KEY` et `CONTACT_TO`
  (Pages → Settings → Environment variables). Compte gratuit sur resend.com.

**3. Aucun backend** — laisser tel quel pour une mise en ligne rapide ;
les demandes s'afficheront en confirmation mais ne seront pas transmises.

---

## À personnaliser avant mise en production

- [ ] **Photos & vidéos** : tous les blocs `.ph` sont des placeholders légendés
      indiquant le visuel attendu (cf. blueprint ch. IV). Remplacer par les vrais
      médias. Pour le film héro, décommenter le bloc `<video>` dans `index.html`.
- [ ] **Année de fondation** (1961) et jalons de la chronologie (`/maison/`).
- [ ] **Coordonnées** : adresse, e-mail, téléphone (footer + `/contact/` + pages légales).
- [ ] **Témoignages** : remplacer les verbatims par des citations réelles.
- [ ] **Domaine** dans `sitemap.xml`, `robots.txt` et les données structurées JSON-LD.
- [ ] **Mentions légales & confidentialité** : compléter et faire valider (RGPD).
- [ ] **Typographies** : le site utilise Cormorant Garamond + Inter (Google Fonts).
      Pour la version premium, remplacer par Canela + Suisse Int'l (licences payantes).
- [ ] **Analytics** : ajouter Plausible/Fathom (RGPD-friendly) si souhaité.

---

## Notes techniques

- Accessibilité : navigation clavier, `aria-*`, focus visibles, `prefers-reduced-motion` respecté.
- Performance : aucune dépendance externe hormis les polices ; images à fournir en WebP/AVIF.
- SEO : title/meta par page, JSON-LD (Organization, FAQPage), sitemap, hreflang à ajouter
  lors de la création de la version anglaise (`/en/…`).
- Compatibilité : navigateurs modernes (IntersectionObserver, CSS clamp/grid).
