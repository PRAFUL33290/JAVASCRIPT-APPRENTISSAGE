1. Le "Super-Prompt" de Création
Copie-colle ce prompt dans ton IA de génération de code pour obtenir le squelette technique :
> "Agis en tant qu'expert Développeur Fullstack. Génère la structure de base d'un site d'apprentissage interactif avec Next.js (App Router) et Tailwind CSS.
> Fonctionnalités :
>  * Une navigation latérale (Sidebar) listant les chapitres (JS, Node, Next).
>  * Un système de rendu dynamique basé sur un fichier data/lessons.json.
>  * Un composant 'Exercice' qui permet d'afficher une consigne et de simuler une validation.
> Contraintes :
>  * Code propre et modulaire.
>  * Utilise des icônes de la bibliothèque lucide-react.
>  * Fournis-moi le code du layout.js, du page.js principal et d'un exemple de page de leçon."
> 
2. Le Plan Pédagogique (Leçons & Exercices)
| Section | Concept Clé | Exercice Pratique |
|---|---|---|
| JavaScript | Les Promesses et async/await. | Créer une fonction qui attend 2 secondes avant d'afficher "Terminé". |
| Node.js | Le module fs (File System). | Créer un script qui lit un fichier .txt et écrit son contenu dans un nouveau fichier. |
| Next.js | Le Routage et les Composants. | Créer une page /exercice qui affiche un compteur interactif. |
3. Architecture et Hiérarchie des Fichiers
Voici comment organiser ton projet pour que Next.js fonctionne correctement :
📂 Structure des Dossiers
 * /app : C'est le centre de contrôle.
   * layout.js : Le design global (ce qui ne change pas, comme ton menu).
   * page.js : Ta page d'accueil.
   * /(chapitres) : Chaque dossier ici (ex: /node-js) devient une URL sur ton site.
 * /components : Tes éléments de design réutilisables (Boutons, Cartes d'exercices, Blocs de code).
 * /public : Tes images, ton logo et tes fichiers statiques.
 * package.json : Le fichier qui liste tes outils (dépendances).
🔗 Les Liens entre Fichiers
 * L'Importation : Pour utiliser un bouton créé dans /components à l'intérieur d'une page dans /app, on utilise la commande import MonBouton from '@/components/MonBouton'.
 * Le Flux de Données : Ton fichier page.js va lire les données dans ton JSON, puis envoyer ces informations aux Composants pour qu'ils les affichent joliment.
 * Le Client vs Serveur :
   * Par défaut, Next.js prépare les pages sur le serveur (Node.js).
   * Si tu ajoutes de l'interactivité (un clic, un formulaire), tu dois ajouter 'use client' en haut de ton fichier.
4. Flux de Travail (Workflow)
 * Design : Utilise Figma pour créer la maquette (tu connais déjà bien l'outil).
 * Setup : Lance npx create-next-app@latest dans ton terminal.
 * Développement : Crée tes composants un par un en commençant par la Sidebar.
 * Contenu : Remplis ton fichier lessons.json au fur et à mesure de tes exercices.
> Astuce de conversion : Pour un rendu professionnel, colle ce texte dans un document Google Docs, applique des styles de titres (Titre 1, Titre 2) et exporte-le via Fichier > Télécharger > Document PDF.
> 
