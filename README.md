# Vite & Gourmand – Front-end Application

## Présentation

Cette application est l’interface utilisateur du projet Vite & Gourmand, réalisée avec le framework Quasar (Vue.js 3).

Elle permet actuellement aux clients de :

- Découvrir l’entreprise, son histoire et les équipes
- Filtrer et consulter les menus
- Accéder aux détails de chaque produit
- Visualiser les plats et allergènes associés
- Contacter l'entreprise
- Naviguer dans une interface responsive

---

## Liens du projet

- Version en local (Docker) :  
  http://localhost:9000
- Version en préproduction (Netlify) :  
  https://extraordinary-panda-64234f.netlify.app

---

## Installation en local (Docker)

### Prérequis

- Docker
- Docker Compose

Aucune installation locale de Node.js ou Quasar CLI n’est nécessaire.

---

### Clonage du projet

```bash
git clone https://github.com/medjbek/vite_gourmand_front.git
cd vite_gourmand_front
```

### Configuration des variables d’environnement

Créer un fichier `.env` à la racine du projet.

Pour développement local :

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Pour connexion directe à l’API AlwaysData (environnement de préproduction):

```env
VITE_API_URL=https://medj-vite-gourmand.alwaysdata.net/api
```

> Ce fichier est ignoré via `.gitignore` pour éviter toute fuite d’information.

---

### Lancement de l’application avec Docker

```bash
docker compose up -d --build
```

Le conteneur installe automatiquement les dépendances Node.js et Quasar

---

### Accès à l’application

L’application sera accessible sur :

```
http://localhost:9000
```

---

## Stratégie de Déploiement (CI/CD)

- La branche `deploy-test` est utilisée pour le déploiement continu sur Netlify.
- Chaque push sur cette branche déclenche automatiquement un nouveau build.

### Gestion du routage

- Un fichier `_redirects` est présent dans le dossier `public` pour rediriger toutes les routes vers `index.html`, évitant les erreurs 404 lors du rafraîchissement des pages sur l'environnement Netlify.

---

## Sécurité et bonnes pratiques

- Utilisation de variables d’environnement via `import.meta.env.VITE_API_URL`
- Le fichier `.env` est listé dans `.gitignore` pour protéger les variables sensibles
- Communication sécurisée avec l’API via HTTPS en production
- Nettoyage du DOM sécurisé (pas de `innerHTML`)
- `AbortController` pour annuler les requêtes non nécessaires

---

## Fonctionnalités développées

- Page d’accueil
- Vue globale et filtrage des menus
- Vue détaillée d’un menu
- Formulaire de contact
- Affichage des horaires provenant de la base de données
- Gestion responsive
- Gestion des erreurs API

### Fonctionnalités prévues (pas encore implémentées)

- Authentification utilisateur (en cours)
- Création de compte (en cours)
- Système de commande
- Gestion des rôles
- Gestion des avis
- Espace employé / administrateur
- Graphiques statistiques (NoSQL)
