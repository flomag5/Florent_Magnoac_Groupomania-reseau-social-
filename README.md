
# Groupomania : Réseau social d'entreprise  

-------------------------- 
**Réseau social interne** pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues.  
Il offre la possibilité aux employés de créer facilement de manière intuitive un profil utilisateur afin de pouvoir poster du contenu. Ils pourront également commenter les publications des autres utilisateurs, les liker. Ils pourront modifier les informations de leur profil.  
L'application sera totalement responsive et répondra aux critères de la WCAG en matière d'accessibilité.  
L'application est également sécurisée pour répondre aux critères RGPD et OWASP.

## Project setup
```
- Front-end : Vuejs
- Back-end : NodeJs (avec Express)  
- ORM : Sequelize
- Database : MySQL
```

### Run the project
```
Voici comment procéder pour lancer le projet.  
Effectuer un GIT CLONE de ce repository
```
Créer une base de données MySQL : groupomania. Le serveur MySQL fonctionne sur le port 3306.  
Importer le fichier groupomania.sql  
Identifiants du compte Administrateur présents dans le fichier adminLogin.txt  
 
#### Back-end
```
Nécesite MySQl Workbench (ou un manager mySql) et nodeJS installés sur votre ordinateur.

Editer config.json file dans le dossier backend/config depuis les variables d'environnement .env (fichier de configuration à ajouter)

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

Tester l'application sur http://localhost:8080/.
```
