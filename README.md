
# Groupomania : Réseau social d'entreprise  

-------------------------- 
**Réseau social interne** pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues.  
Il offre la possibilité aux employés de créer facilement de manière intuitive un profil utilisateur afin de pouvoir poster du contenu. Ils pourront également commenter les publications des autres utilisateurs, les liker. Ils pourront modifier les informations de leur profil.  
L'application sera totalement responsive et répondra aux critères de la WCAG en matière d'accessibilité.  

## Project setup
```
Vuejs
NodeJs
Express
MySQL
```

### Run the project
```
Voici comment procéder pour lancer le projet.  
Effectuer un GIT CLONE de ce repository
```

#### Back-end
```
Nécesite MySQl Workbench (ou un manager mySql) et nodeJS installés sur votre ordinateur.

Editer config.json file dans le dossier backend/config depuis les variables d'environnement .env

Changer les champs selon le setup de votre database avec l'exemple de .env.example (username, password,etc..)

Dossier images :

créer un dossier 'images' à la racine du dossier backend 


Ensuite depuis le terminal :

```
cd back-end  
npm install  
nodemon serve
```
```

#### Front-end
```
Nécessite VueJS installé de manière globale sur votre ordinateur.

Depuis le terminal:

```
cd groupo-front-end  
npm i  
npm run serve
```

The app will run on http://localhost:8080/.
```
