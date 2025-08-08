# Générateur de cocktail

## Choix technologiques

### Framework backend

J'ai choisi Django plutôt que Flask pour les raisons suivantes :

- Django inclut par défaut une ORM qui facilite grandement les interactions avec une base de données;
- Django met automatiquement en place un espace administrateur qui permet de manipuler aisément les entités de l'application;
- je trouve la structure de base d'un projet Django élégante et très extensible.

### Base de données

Je me suis tourné vers PostgreSQL à cause de son type *array* natif qui m'a permis de stocker les ingrédients des recettes sans passer par des relations multi-tables.

### Modèle de langage

Ollama est le seul SLM avec lequel je suis plus ou moins à l'aise donc il a été mon choix naturel. Avec plus de temps, j'aurais voulu expérimenter avec d'autres modèles.

### Bibliothèque JS frontend

J'ai eu recours à une bibliothèque type anti-React de ma propre invention. Le fonctionnement est similaire : des composants sous forme de fonctions génèrent des éléments HTML à partir de code JSX. La différence est que ma bibliothèque ne repose pas sur une logique d'état à base de hooks. De plus, elle ne comprend pas d'étape intermédiaire comme `React.createElement` entre les éléments du DOM et le code JSX : ce dernier n'est qu'un sucre syntactique par-dessus `document.createElement`.

### CSS

J'ai utilisé le préprocesseur SCSS plutôt que CSS pur en raison des fonctionnalités dynamiques du premier et du fait qu'il soit très facile à intégrer avec Vite. Je n'ai pas eu recours à une bibliothèque CSS externe, préférant confier cette besogne à mon assistant Github Copilot, grand passionné de feuilles de style en cascade.

## Comment lancer avec Docker

Il faut d'abord créer un fichier `.env` à la racine du projet. Le fichier exemple `.env.example` peut être renommé et utilisé tel quel. Les variables d'environnement commençant par `DB_` sont toutes personnalisables.

Il suffit ensuite d'avoir Docker installé sur sa machine. Facultativement, avoir accès à la commande `make` permet d'exécuter les scripts définis dans le Makefile.

```bash
make compose-up
# OU :
docker compose up --build
```
