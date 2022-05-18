-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 17 mai 2022 à 20:33
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 8.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `commentBody` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) NOT NULL,
  `PostId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `commentBody`, `username`, `createdAt`, `updatedAt`, `UserId`, `PostId`) VALUES
(9, 'Je prépare mon coup de pied frontal', 'JCVD', '2022-05-16 07:31:24', '2022-05-16 07:31:24', 19, 4),
(10, 'mdr', 'gus', '2022-05-16 07:50:10', '2022-05-16 07:50:10', 20, 3),
(12, 'C\'est ma tête quand je perd mes anneaux', 'sonic', '2022-05-16 10:49:20', '2022-05-16 10:49:20', 18, 3),
(17, 'magnifïque', 'livai', '2022-05-16 16:13:59', '2022-05-16 16:13:59', 13, 2);

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PostId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id`, `createdAt`, `updatedAt`, `PostId`, `UserId`) VALUES
(3, '2022-05-16 07:06:04', '2022-05-16 07:06:04', 2, 19),
(4, '2022-05-16 07:08:51', '2022-05-16 07:08:51', 3, 19),
(5, '2022-05-16 07:11:01', '2022-05-16 07:11:01', 3, 13),
(7, '2022-05-16 07:21:50', '2022-05-16 07:21:50', 4, 13),
(8, '2022-05-16 07:38:56', '2022-05-16 07:38:56', 4, 19),
(9, '2022-05-16 07:50:15', '2022-05-16 07:50:15', 2, 20),
(10, '2022-05-16 09:16:34', '2022-05-16 09:16:34', 2, 14),
(11, '2022-05-16 10:49:26', '2022-05-16 10:49:26', 5, 18),
(13, '2022-05-16 12:56:07', '2022-05-16 12:56:07', 5, 19),
(15, '2022-05-16 16:14:22', '2022-05-16 16:14:22', 2, 13),
(16, '2022-05-17 15:37:59', '2022-05-17 15:37:59', 7, 13),
(17, '2022-05-17 16:13:50', '2022-05-17 16:13:50', 10, 24),
(18, '2022-05-17 16:13:51', '2022-05-17 16:13:51', 9, 24),
(19, '2022-05-17 16:24:49', '2022-05-17 16:24:49', 4, 24);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `postText` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `title`, `postText`, `username`, `image`, `createdAt`, `updatedAt`, `UserId`) VALUES
(2, 'Green Hill Zone', 'Nostalgie ...', 'sonic', 'images\\EvZauEBXMAIq6e-.jpg_1652621751473.jpg', '2022-05-15 13:35:51', '2022-05-15 13:35:51', 18),
(3, 'Quand tu marches sur un légo...', 'aaaaaahhhhh!!!!', 'JCVD', 'images\\bloodsport-sur-amazon-prime-video-comment-le-film-a-inspire-le-jeu-video-mortal-kombat.jpg_1652684924657.jpg', '2022-05-16 07:08:44', '2022-05-16 07:08:44', 19),
(4, 'Ils arrivent !!', 'Sortez vos lames !', 'livai', 'images\\thumbnail.jpg_1652685058407.jpg', '2022-05-16 07:10:58', '2022-05-16 07:10:58', 13),
(5, 'Mood du jour', 'Je suis de bonne humeur', 'gus', 'images\\0128325.jpg-r_1920_1080-f_jpg-q_x-xxyxx.jpg_1652687340676.jpg', '2022-05-16 07:49:00', '2022-05-16 07:49:00', 20),
(7, 'Opération grand nettoyage', 'Ca va dépoussiérer sec !!', 'livai', 'images\\f825be813abcc56c81cd176a787d5518.jpg_1652708881453.jpg', '2022-05-16 13:48:01', '2022-05-16 13:48:01', 13),
(9, 'Avertissement !', 'Plusieurs signalement nous ont été signalé concernant le langage sur le réseau social. Ceci est un simple avertissement, mais la prochaine fois il y aura des sanctions.', 'admin', 'images\\arbitre-colina.jpg_1652803896832.jpg', '2022-05-17 16:11:36', '2022-05-17 16:11:36', 14),
(10, 'Posé !', 'Sous un soleil de plomb', 'luffy', 'images\\one-piece-luffy.gif_1652804010842.gif', '2022-05-17 16:13:30', '2022-05-17 16:13:30', 24);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'visitor',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(13, 'livai', 'ackerman@gmail.com', '$2b$10$sXhz5uq8qplFqUWJfR4Rv.uszF6ntlQnI5Muzsh5nKGygZm28C.jS', 'visitor', '2022-05-11 11:05:36', '2022-05-11 11:05:36'),
(14, 'admin', 'admin@gmail.com', '$2b$10$PtDhXRIb57e1pbTetD/vNez6SZU1D0EUbaCEptPtS.KSKDlBbi5.a', 'admin', '2022-05-11 12:19:02', '2022-05-11 12:19:02'),
(15, 'dark vador', 'vador@gmail.com', '$2b$10$1buG65qw6bR79nrOj.RGgeIuqYaMo2dnPzYgBE.tvVsRFiM5t6yoK', 'visitor', '2022-05-11 14:21:11', '2022-05-11 14:21:11'),
(16, 'donkey kong', 'kong@gmail.com', '$2b$10$ax3bjpN7GKQ6GYMacgA45Ol/wB4Toj.8EIH9hPRV6JPBl8YobpQby', 'visitor', '2022-05-12 08:10:55', '2022-05-12 08:10:55'),
(18, 'sonic', 'sonic@gmail.com', '$2b$10$voLh/Rp2e3hJalC5zBGy0.obTpks4MIhOSZIbVC2UT3Nj7kd3zvBS', 'visitor', '2022-05-15 09:26:54', '2022-05-15 09:26:54'),
(19, 'JCVD', 'bloodsport@gmail.com', '$2b$10$1b2cNoRdTPloByq.rOLQ4.fprGyjMpjK/q.PE3lSigMe2.YUiFHSK', 'visitor', '2022-05-16 07:05:47', '2022-05-16 07:05:47'),
(20, 'gus', 'lospolos@gmail.com', '$2b$10$hqvPDdzSbBQg7yqW5HGyY.2gGbw8oGGxbw18BHQvKYJCDNdxhYcxC', 'visitor', '2022-05-16 07:47:11', '2022-05-16 07:47:11'),
(24, 'luffy', 'sunny@gmail.com', '$2b$10$4gGuMchSXjKUSpdChZeo2uTtrqTTo8DRHuzVJAGGUG4P9DKxqNCCe', 'visitor', '2022-05-16 16:06:29', '2022-05-16 16:06:29');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `PostId` (`PostId`);

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PostId` (`PostId`),
  ADD KEY `UserId` (`UserId`);

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT pour la table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
