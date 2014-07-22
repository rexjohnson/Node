-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 22, 2014 at 10:40 AM
-- Server version: 5.5.16
-- PHP Version: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `orc`
--

-- --------------------------------------------------------

--
-- Table structure for table `orc_files`
--

CREATE TABLE IF NOT EXISTS `orc_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(200) DEFAULT NULL,
  `createon` varchar(100) DEFAULT NULL,
  `extension` varchar(500) DEFAULT NULL,
  `filetype` varchar(500) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `fileId` varchar(500) NOT NULL,
  `isprocessed` bit(1) NOT NULL DEFAULT b'0',
  `text` text,
  `userid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_files` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `orc_users`
--

CREATE TABLE IF NOT EXISTS `orc_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(200) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `phone` varchar(500) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  `create_on` datetime DEFAULT NULL,
  `isblocked` bit(1) DEFAULT b'0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `orc_users`
--

INSERT INTO `orc_users` (`id`, `first_name`, `last_name`, `phone`, `email`, `password`, `create_on`, `isblocked`) VALUES
(11, 'Mohit', 'Arora', '24234', 'mohit@rudrainnovatives.com', '$2a$10$f7m3lBgK8EUkhAJ6O/hbDeIXpCID7tX3kMTj6kN1RdGnPi2J5yoWO', '2014-07-21 06:17:30', b'0');

-- --------------------------------------------------------

--
-- Table structure for table `orc_user_in_role`
--

CREATE TABLE IF NOT EXISTS `orc_user_in_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_in_rols` (`user_id`),
  KEY `fk_role_in_userrole_in_rols` (`role_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=42 ;

--
-- Dumping data for table `orc_user_in_role`
--

INSERT INTO `orc_user_in_role` (`id`, `role_id`, `user_id`) VALUES
(40, 1, 11),
(41, 2, 11);

-- --------------------------------------------------------

--
-- Table structure for table `orc_user_roles`
--

CREATE TABLE IF NOT EXISTS `orc_user_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `orc_user_roles`
--

INSERT INTO `orc_user_roles` (`id`, `role`) VALUES
(1, 'Admin'),
(2, 'User'),
(3, 'Developers1');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orc_files`
--
ALTER TABLE `orc_files`
  ADD CONSTRAINT `fk_user_files` FOREIGN KEY (`userid`) REFERENCES `orc_users` (`id`);

--
-- Constraints for table `orc_user_in_role`
--
ALTER TABLE `orc_user_in_role`
  ADD CONSTRAINT `fk_role_in_userrole_in_rols` FOREIGN KEY (`role_id`) REFERENCES `orc_user_roles` (`id`),
  ADD CONSTRAINT `fk_user_in_rols` FOREIGN KEY (`user_id`) REFERENCES `orc_users` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
