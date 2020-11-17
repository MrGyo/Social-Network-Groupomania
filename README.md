# OC - Parcours Développeur Web - Projet 7

## Créez un réseau social d'entreprise

Vous êtes développeur depuis plus d'un an chez CONNECT-E, une petite agence web regroupant une douzaine d'employés.
Votre directrice, Stéphanie, invite toute l'agence à prendre un verre pour célébrer une bonne nouvelle ! Elle vient de signer un contrat pour un nouveau projet ambitieux ! 🥂
Le client en question est Groupomania, un groupe spécialisé dans la grande distribution et l'un des plus fidèles clients de l'agence.

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.

## Technologies utilisées

Backend : 
* NodeJS
* Express
* MySql

Frontend :
* VueJS
* Bootstrap
* BootstrapVue

## Documentation

[Spécifications Groupomania](https://github.com/MrGyo/p7/blob/master/documentation/Groupomania_Specs_FR_DWJ_VF.pdf)

## Compétences évaluées

* Gérer un stockage de données à l'aide de SQL
* Personnaliser le contenu envoyé à un client web
* Implémenter un stockage de données sécurisé en utilisant SQL
* Authentifier un utilisateur et maintenir sa session

## Résultats

* Backend

Créer un fichier "auth.config.js" dans le dossier 'config' et saisir une clé secrète : 

```javascript
module.exports = {
  secret: "(key)"
}
```

Installer toutes les dépendances nécessaires qui se trouvent dans le fichier package.json en utilisant la commande suivante : 

```
npm install
```

Une fois les dépendances installées, lancer le serveur : 

```
nodemon server
```

* Base de données

Importer la BDD sur la base du fichier mysql_tables disponible [ICI](https://github.com/MrGyo/p7/blob/master/mysql_tables/db_test_groupomania.sql)

Créer un fichier .env sur la base du fichier .env-exemple disponible dans le dossier backend

```
DB_HOST=
DB_NAME=
DB_USER=
DB_PASS=
```
* Frontend

Lancer la commande : 

```
npm install
npm run serve
```
Puis ouvrez votre navigateur sur [localhost:4200](http://localhost:4200/)

* Synthèse

Le document de présentation est disponible [ICI](https://github.com/MrGyo/p7/blob/master/soutenance/SOUTENANCE_P7_WEBDEV_20200910_1.pptx)
