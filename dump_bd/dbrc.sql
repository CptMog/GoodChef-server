-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 12 oct. 2023 à 14:07
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dbrc`
--

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `showed` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `name`, `image`, `showed`) VALUES
(1, 'Entrées', 'entree.jpg', '1'),
(2, 'Plats principaux', 'plats.jpg', '1'),
(3, 'Desserts', 'desserts.jpg', '1'),
(4, 'Soupes', 'soupes.jpg', '1'),
(5, 'Salades', 'salades.jpg', '0'),
(6, 'Pâtes', 'pates.jpg', '1'),
(7, 'Pizzas', 'pizzas.jpg', '1'),
(8, 'Sushis', 'sushis.jpg', '0'),
(9, 'Burgers', 'burgers.jpg', '1'),
(10, 'Sandwichs', 'sandwichs.jpg', '0'),
(11, 'Petit-déjeuner', 'petit_dejeuner.jpg', '1'),
(12, 'Cocktails', 'cocktails.jpg', '0'),
(13, 'Boissons chaudes', 'boissons_chaudes.jpg', '0'),
(14, 'Cuisine asiatique', 'cuisine_asiatique.jpg', '0'),
(15, 'Cuisine italienne', 'cuisine_italienne.jpg', '0'),
(16, 'Cuisine française', 'cuisine_francaise.jpg', '0'),
(17, 'Cuisine mexicaine', 'cuisine_mexicaine.jpg', '0'),
(18, 'Cuisine indienne', 'cuisine_indienne.jpg', '0'),
(19, 'Cuisine méditerranéenne', 'cuisine_mediterraneenne.jpg', '0'),
(20, 'Cuisine végétalienne', 'cuisine_vegetalienne.jpg', '0'),
(21, 'Étudiant', 'etudiant.jpg', '0');

-- --------------------------------------------------------

--
-- Structure de la table `classification`
--

DROP TABLE IF EXISTS `classification`;
CREATE TABLE IF NOT EXISTS `classification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_recepie` int NOT NULL,
  `id_category` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_category` (`id_category`),
  KEY `id_recepie` (`id_recepie`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `classification`
--

INSERT INTO `classification` (`id`, `id_recepie`, `id_category`) VALUES
(17, 10, 9),
(16, 10, 2);

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_recepie` int NOT NULL,
  `description` text NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_recepie` (`id_recepie`)
) ENGINE=MyISAM AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`id`, `id_user`, `id_recepie`, `description`, `date`) VALUES
(87, 1, 9, 'teste10', '2023-10-10'),
(82, 1, 9, 'teste', '2023-10-10'),
(83, 1, 9, 'sdfsdffd', '2023-10-10'),
(85, 2, 9, 'sdfsdfsfs', '2023-10-10'),
(86, 2, 9, 'dfbgdxcvsfdvs', '2023-10-10'),
(78, 2, 11, 'teste', '2023-10-10'),
(75, 2, 9, 'wfwfqds', '2023-10-10'),
(76, 2, 9, 'qdsqfswdcfxw', '2023-10-10'),
(77, 2, 11, 'sdfdsfdsvs', '2023-10-10'),
(74, 2, 9, 'zqzdqsdxqdcqdxwdxcq', '2023-10-10'),
(70, 2, 14, 'second update text', '2023-10-10'),
(71, 2, 14, 'sdfsdfsdfs', '2023-10-10'),
(69, 2, 14, 'text modifier', '2023-10-10'),
(88, 1, 9, 'test11', '2023-10-10'),
(89, 1, 10, 'chouette recette !', '2023-10-10'),
(94, 1, 14, 'super !', '2023-10-10');

-- --------------------------------------------------------

--
-- Structure de la table `composition`
--

DROP TABLE IF EXISTS `composition`;
CREATE TABLE IF NOT EXISTS `composition` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_recepie` int NOT NULL,
  `id_ingredient` int NOT NULL,
  `qte` smallint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_ingredient` (`id_ingredient`),
  KEY `id_recepie` (`id_recepie`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `follow`
--

DROP TABLE IF EXISTS `follow`;
CREATE TABLE IF NOT EXISTS `follow` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_follower` int NOT NULL,
  `id_followed` int NOT NULL,
  `date_follow` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_follower` (`id_follower`),
  KEY `id_followed` (`id_followed`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `ingredient`
--

DROP TABLE IF EXISTS `ingredient`;
CREATE TABLE IF NOT EXISTS `ingredient` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_category` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `weight` decimal(10,0) NOT NULL,
  `volume` decimal(10,0) NOT NULL,
  `protein` decimal(10,0) DEFAULT NULL,
  `fats` decimal(10,0) DEFAULT NULL,
  `calories` decimal(10,0) DEFAULT NULL,
  `fiber` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_category` (`id_category`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `rating`
--

DROP TABLE IF EXISTS `rating`;
CREATE TABLE IF NOT EXISTS `rating` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_recepie` int NOT NULL,
  `date` date NOT NULL,
  `rate` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_recepie` (`id_recepie`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `recepie`
--

DROP TABLE IF EXISTS `recepie`;
CREATE TABLE IF NOT EXISTS `recepie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_author` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `ingredients` text NOT NULL,
  `steps` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `video` varchar(255) DEFAULT NULL,
  `protein` decimal(10,0) DEFAULT NULL,
  `fats` decimal(10,0) DEFAULT NULL,
  `calories` decimal(10,0) DEFAULT NULL,
  `fiber` decimal(10,0) DEFAULT NULL,
  `time_prepare` varchar(20) NOT NULL,
  `time_rest` varchar(20) DEFAULT NULL,
  `time_cooking` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `une` enum('0','1') DEFAULT '0',
  `trend` enum('0','1') DEFAULT '0',
  `url` varchar(255) NOT NULL,
  `moderation_state` enum('-1','0','1') DEFAULT '-1',
  PRIMARY KEY (`id`),
  KEY `id_author` (`id_author`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `recepie`
--

INSERT INTO `recepie` (`id`, `id_author`, `title`, `description`, `ingredients`, `steps`, `image`, `video`, `protein`, `fats`, `calories`, `fiber`, `time_prepare`, `time_rest`, `time_cooking`, `date`, `une`, `trend`, `url`, `moderation_state`) VALUES
(1, 1, 'Crêpe rapide', 'uycgfbyigbbusdmuibsmiu', '[\"sdfsdf\",\"sdfsdfs\"]', '[\"sdfjlbnsmdiobnsdfnds\",\"sdfsdsdfsdfsdfsd\\nsdfsdfsdf\",\"sdfsdfsdfsdmfl,sdf\",\"sdfgsdsgsdgdsg\"]', 'monika-grabkowska-jsgJtBOR6jY-unsplash.jpg', NULL, NULL, NULL, NULL, NULL, '0h15min', '0h5min', '0h10min', '2023-10-03', '0', '1', 'crpe-rapide', '1'),
(2, 1, 'frite maison', 'De bonne frites maisons, à essayer', '[\"sdfdsfsfsd\",\"sdfsdfsdf\",\"sdfdsfsffsf\",\"dsqfsdfsdfsdfsdf\",\"sdfsdfsfsfsfsd\"]', '[\"sdfsdfsfs\",\"sdfsdfsfsdsdfsfsf\",\"sdsdfsfsfs\",\"sfdgsgsgsg\",\"sdfsdfsdfsfs\",\"sdfsdfsdfsfs\",\"sfgsfgsgsgsgsgs\"]', 'fernanda-martinez-H2RzlOijhlQ-unsplash.jpg', NULL, NULL, NULL, NULL, NULL, '0h10min', '0h0min', '1h0min', '2023-10-03', '0', '0', 'frite-maison', '1'),
(5, 2, 'Brise nuage', 'sqdfsdpjspdiofjspodjf', '[\"fsdfsdf\",\"sdfsdf\",\"sdfsf\",\"gfhgh\",\"sdfsgshs\"]', '[\"hdfghfghdhfdhjdyhdhdh\",\"gfxhxhxghgxfhxfghfxh\",\"gxhfxjhfgfghgxhxh\",\"ghjxxghxhxhxghxhxfhrfhfg\",\"fgxhxghxhxhxfghxf\",\"gxhxfhxfghgfxhxjy\"]', 'farhad-ibrahimzade-q8YUbWfCRcA-unsplash.jpg', NULL, NULL, NULL, NULL, NULL, '0h20min', '0h15min', '2h11min', '2023-10-03', '0', '1', 'brise-nuage', '1'),
(6, 2, 'cocktail \"Rouge\"', 'dsf<sdf<sdf', '[\"sd<fsdf\",\"s<dffd<\",\"sqdqsdqsdqd\",\"fgsgsgsgsgs\",\"sdfsfsfsfs\"]', '[\"sdf<sdfgsfgrsfsxfvsfsf\",\"sdfsdfsdf\",\"sdfsdfsdfsdf\"]', 'edward-howell-VXIpXxpZ5ms-unsplash.jpg', NULL, NULL, NULL, NULL, NULL, '0h0min', '0h0min', '0h0min', '2023-10-03', '0', '1', 'cocktail-rouge', '1'),
(8, 1, 'glace maison', 'qsdsqdqdqdqdqsdq', '[\"qsdqsqdsqd\",\"qsdsqdsqd\",\"ssdfdsfsdfs\"]', '[\"sdsgfggfhghxfghxghxghgh\",\"dfgdgdfdfhdhdhdhdfgdgdfgdfgfdgdfgdg\",\"dfgdghgfxhfgxfxhgfhhxghxchcghx\"]', 'ella-olsson-3_qr5tJOIbs-unsplash.jpg', NULL, NULL, NULL, NULL, NULL, '2h0min', '0h0min', '4h0min', '2023-10-04', '0', '0', 'glace-maison', '1'),
(9, 1, 'Salade d\'oeuf', 'Un régale pour les yeux comme les papilles', '[\"qsdsqdsq\",\"qsdqdqsd\"]', '[\"sdf<gs<dgs<dg<sgf\",\"s<df<sdf<f<f\",\"dfsgfdwgdfgwfwf<wsfsdf<\"]', 'bakd-raw-by-karolin-baitinger-mzDl2mW6ItI-unsplash.jpg', NULL, NULL, NULL, NULL, NULL, '0h25min', '0h0min', '0h45min', '2023-10-04', '0', '0', 'salade-doeuf', '1'),
(10, 2, 'Poulet curry', 'Ceci est une recette de poulet basquaise', '[\"1 poulet\",\"3 tomate\",\"25cL d\'huile végétale\"]', '[\"laver le poulet et le découpez\",\"assaisonez le poulet et laisser reposer 1h \"]', 'charlesdeluvio-PqsImnjuElM-unsplash (1).jpg', NULL, NULL, NULL, NULL, NULL, '0h25min', '1h0min', '2h45min', '2023-10-05', '0', '1', 'poulet-curry', '1'),
(11, 2, 'salade diet', 'ma super recette ', '[\"1 salade\",\"25 cl huile\",\"3 tomates\",\"1 pincée de sel\",\"1 pincée de poivre\"]', '[\"laver la salade et les tomates\",\"mettre dans un recepient la salade et les tomate découper\",\"asperger d\'un peu d\'huile et de sel et poivre\"]', 'salade.jpg', NULL, NULL, NULL, NULL, NULL, '0h10min', '0h0min', '0h2min', '2023-10-06', '0', '0', 'salade-diet', '1'),
(12, 2, 'saumon crème ', 'gfdswgwgsdwger', '[\"sdfsdfsfsf\",\"sdfsdf\",\"sdfsdfsfs\",\"sdfsdfsfs\",\"fsdfsdsfsf\"]', '[\"sdfsdfgsgsdfgsgs\",\"dfgghbfghfdh\",\"dfwghwfgswgwfg\",\"dwfhwfhwdgwdgwdfgf\"]', 'saumon.jpg', NULL, NULL, NULL, NULL, NULL, '0h024min', '0h0min', '0h25min', '2023-10-06', '0', '0', 'saumon-crme', '1'),
(13, 2, 'Muffin Chocolat', 'ma recette', '[\"zerzer\",\"zerzrer\",\"zrtzrtzrt\",\"srtzr\",\"zrtrztzt\"]', '[\"zrrzzryzryzzztzrz\",\"zrrztrztztzrtr\",\"zrtztzrtrzt\",\"rztzrtzr\"]', 'muffin.jpg', NULL, NULL, NULL, NULL, NULL, '0h30min', '1h0min', '0h30min', '2023-10-06', '0', '0', 'muffin-chocolat', '1'),
(14, 1, 'Tarte au pomme', 'Jolie tarte au pomme', '[\"qdqdqdqdqd\",\"dsf<sfdsf\",\"dfdsf<SFSF\",\"SQDQSDQDSQD\"]', '[\"SDF<DF<F<SDFS<DF\",\"SDFS<FSDFSDGS\",\"DFWGDWFGW<GWSDFG\",\"SDFSDFGQRGSF\",\"SDFSF<SDFSFE\"]', 'priscilla-du-preez-W8F9kM7F-5U-unsplash.jpg', NULL, NULL, NULL, NULL, NULL, '0h45min', '1h0min', '1h40min', '2023-10-07', '1', '1', 'tarte-au-pomme', '1');

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_admin` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `password`, `description`, `image`, `is_admin`) VALUES
(1, 'Admin', 'GoodChef', 'admin@goodchef.com', '$2b$10$bLZGtWH6W4Jwrma4zzyxhO86nkF4W3Hlq7DuvwcjFkTk2hOCkJGxG', 'Je suis l\'admin du site goodchef, comment allez vous ? Si vous avec un problème, contacter moi ! ', 'hacker-dark-web-round-4.jpeg', '1'),
(2, 'Mohamed', 'Djawad', 'djawad.mohamed@gmail.com', '$2b$10$4ETRsywXXkqtWWhKnDmBlOcmMwszr.8z/hHZ7EoCPT8yZWvH48fwa', 'Je suis nouveau ici ! Je cherche avant tout à trouver ma prochaine recette pour ce soir. Heureux de vous connaître :)', '10733528_770489156353702_8944399500969057557_o.jpg', '0'),
(3, 'user', 'Test1', 'user1@gmail.com', '$2b$10$4w1udUZS0ePpXbRYX4.XquusZxPR/KYDPJEMlu5BTp5U7zQnZEE5S', 'Je suis un compte teste', NULL, '0');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
