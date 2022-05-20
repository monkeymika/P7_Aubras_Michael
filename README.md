# P7_Aubras_Michael
![icon-above-font](https://user-images.githubusercontent.com/91529322/168888488-e1119dd4-497e-4de1-a20b-e8a3a98d8159.png)

# Spécification fonctionnelle demandé

* La présentation des fonctionnalités doit être simple
* La création d'un compte doit être simple et possible depuis un téléphone mobile
* le profil doit contenir très peu d’informations pour que sa complétion soit rapide 
* la suppression du compte doit être possible
* l’accès à un forum où les salariés publient des contenus multimédias doit être présent
* l’accès à un forum où les salariés publient des textes doit être présent
* les utilisateurs doivent pouvoir facilement repérer les dernières participations des employés
* le ou la chargé-e de communication Groupomania doit pouvoir modérer les interactions entre salariés


## Installation du projet 
 Voici le fichier .env qui contient les informations pour se connecter à la base de données.
 
![2022-05-20_11h26_46](https://user-images.githubusercontent.com/91529322/169498554-e70b314e-c58b-4dda-bc94-2c24bbbb0a62.png)

J'ai utilisé phpMyAdmin comme interface pour la gestion de la base de données Groupomania.

---

### Backend

Les dépendances à installer pour le backend : 

![2022-05-17_21h20_39](https://user-images.githubusercontent.com/91529322/168893222-73f52647-b1d1-4449-bbda-baab474f333e.png)

Ensuite : 

Dans un premier terminal :

cd backend 

npm install

nodemon server

---

### Frontend

Les dépendances à installer pour le frontend : 

![2022-05-17_21h30_59](https://user-images.githubusercontent.com/91529322/168894882-5bf44cb0-285e-4405-a38e-e893e7085bb1.png)

Ensuite : 

Dans un second terminal :

cd frontend

npm install

npm run start

### Notes

Par défaut les utilisateurs ont le rôle de "visiteur".
J'ai créé un seul Admin pour l'instant. Pour se connecter en tant que tel, il faut se loggé avec le pseudo "admin" et le mot de passe "maitre".
L'admin peut supprimer tous les profiles, ainsi que les publications et les commentaires.
