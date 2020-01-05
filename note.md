Nous allons désormais orchestrer notre API REST dans un projet concret : une web app !

- Premièrement, mettons tous en place
il faudra installer les modules nécessaires :
-- Express (pour gérer notre site)
-- bodyParser (car nous avons des requetes de type POST)
-- morgan en dev dependancies (pour controler nos requetes et nos resultats)
Ensuite instancier notre application avec Express, appeler nos middlewares (morgan et bodyParser), 
et enfin lancer ancer notre application dans un port, et créer notre première route en tant que Index

- Ensuite, créons de quoi afficher le site !
Créons un dossier views pour y ranger nos pages HTML (histoire d'afficher le site...)
pour l'appeler, il va falloir faire appel à res.senfFile(notre fichier EN CHEMIN ABSOLUT)... 
... NodeJS a une liste de constante utile, et la plus utiliser est __dirname (pour générer le chemin absolut vers le projet)
Allons plus loin : nous allons installe un langage de template, qui est le Twig (Ce qui nous permettra de mettre des variables, des boucles, etc... bon pour JS et aussi PHP)
Et pour l'interpreter, ce n'est plus res.sendFile() mais res.render(fichier en TWIG) dans lequel on va ajouter nos variables

- Biensur, mettons en page notre site web. À l'aide de Bootstrap, pour faire plaisir

- Nous allons ensuite afficher nos membres !
Nous avons besoin d'un module appelé axios (pour récupérer des données depuis une API à part, et ici nous démarrons à coté le projet de la section 12)
Axios permet d'appeler ces données sous une promesse
-- un .then() pour afficher le resultat réussi de la requete axios (et afficher une page de Twig en fonction du status)
-- un .catch() qui nous renverrait vers une page d'erreur avec son message 
On pourrait aussi créer une fonction en cas d'erreur, et même créer un fetch pour définir l'URL de base de l'API
Et enfin, appeler le resultat sur la page Twig grace à une boucle du langage de template
NB : on a initialiser une boucle de sorte à intégrer la structure automatiquement, si elle se redéfinit plus tard

- Affichons maintenant un seul membre !
Même chose, on crée une page member.twig, on crée un get pour un seul membre avec un parametre ID, et pour nettoyer le tous, on crée une fonction pour une rendu de page

- Mettons en place la page de modification !
Pour le coup c'est particulier, car dans notre fonction apiCall() nous avons précisé GET comme seul methode
Donc faudra apporter une modification à notre fonction, pour qu'il entre la methode, l'url et le data (cette fonction sera donc utile pour tout le CRUD)
ensuite, grace à bootstrap, nous mettons en page celle de la modification d'un membre, et donc nous créons un app.get pour récupérer les données du membre en question dans un formulaire
ce formulaire, il est important de préciser la méthode POST, pour que l'on puisse effectuer un app.post() qui permettra de faire appel à la fonction apiCall() dont la methode serait PUT et les data contiendront les données du formulaire
Suite à quoi, une fois réussit, nous faisons une redirection grace à res.redirect() vers la page de membre ou autre

- Mettons en place la suppression d'un membre !
On crée un bouton dans la page d'un membre pour le supprimer, on le redirige vers un lien /delete/:id (qui nous indique la methode GET), et on crée un app.get() du lien qui permet d'appeler la fonction apiCall(), qui elle même précise la methode delete du lien de ce membre et nous redirige vers la page d'accueil

- Nous avons affiché, modifié et supprimé... désormais, ajoutons !
... à ma même manière que pour la modification

- N'oublions pas d'ajouter des liens pour navigation entre les pages et les routes !