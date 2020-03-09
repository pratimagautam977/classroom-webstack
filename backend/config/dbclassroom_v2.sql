-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 09, 2020 at 11:46 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbclassroom`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_assignment`
--

CREATE TABLE `tbl_assignment` (
  `id` int(11) NOT NULL,
  `assign_name` varchar(100) NOT NULL,
  `assign_details` text NOT NULL,
  `staff_uuid` varchar(100) NOT NULL,
  `class_uuid` varchar(100) NOT NULL,
  `assign_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_assignment`
--

INSERT INTO `tbl_assignment` (`id`, `assign_name`, `assign_details`, `staff_uuid`, `class_uuid`, `assign_date`) VALUES
(1, 'Prabhu', 'Lol not available', '104f9a33-d351-4630-9dcc-0b55fb61b72a', 'a31a740a-14ca-4997-8bf9-954400b446d7', '2019-12-13'),
(2, 'Assignemtn 2 ', 'This is the description for assignment 2', '104f9a33-d351-4630-9dcc-0b55fb61b72a', 'c182178d-186a-4542-a848-0afb4e4f8a58', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_calendar`
--

CREATE TABLE `tbl_calendar` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `start` timestamp NOT NULL DEFAULT current_timestamp(),
  `end` timestamp NOT NULL DEFAULT current_timestamp(),
  `uuid` varchar(100) NOT NULL,
  `type` int(1) NOT NULL,
  `view` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_calendar`
--

INSERT INTO `tbl_calendar` (`id`, `title`, `start`, `end`, `uuid`, `type`, `view`) VALUES
(7, 'Test Event', '2020-01-24 02:05:00', '2021-01-25 17:15:00', '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 0, 0),
(8, 'JAN-04 Event', '2020-01-03 18:15:00', '2020-01-04 17:15:00', '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 0, 0),
(9, 'JAN-06 Event', '2020-01-06 04:15:00', '2020-01-06 17:37:00', '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_classroom`
--

CREATE TABLE `tbl_classroom` (
  `id` int(11) NOT NULL,
  `class_uuid` varchar(100) NOT NULL,
  `ins_uuid` varchar(100) NOT NULL,
  `class_name` varchar(30) NOT NULL,
  `class_created_at` date NOT NULL DEFAULT current_timestamp(),
  `class_img` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_classroom`
--

INSERT INTO `tbl_classroom` (`id`, `class_uuid`, `ins_uuid`, `class_name`, `class_created_at`, `class_img`) VALUES
(3, 'a31a740a-14ca-4997-8bf9-954400b446d7', '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 'Machine Learning', '2019-10-15', 'https://www.acq-intl.com/wp-content/uploads/2019/11/AI.jpg'),
(2, 'c182178d-186a-4542-a848-0afb4e4f8a58', '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 'Artificial Intelligence', '2019-10-15', 'https://community.arm.com/cfs-filesystemfile/__key/communityserver-components-secureimagefileviewer/communityserver-blogs-components-weblogfiles-00-00-00-38-23/BFloat-Image-re_2D00_sized.jpg_2D00_900x506x2.jpg?_=637026725151143575'),
(4, 'c182178d-186a-4542-a848-0afb4e4f8a78', '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 'Big Data Analysis', '2019-10-15', 'https://wallpaperaccess.com/full/672249.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_class_staff`
--

CREATE TABLE `tbl_class_staff` (
  `id` int(11) NOT NULL,
  `class_uuid` varchar(50) NOT NULL,
  `staff_uuid` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_class_staff`
--

INSERT INTO `tbl_class_staff` (`id`, `class_uuid`, `staff_uuid`) VALUES
(2, 'c182178d-186a-4542-a848-0afb4e4f8a58', '3247b3a7-df95-4360-b87a-50c185601252'),
(18, 'c182178d-186a-4542-a848-0afb4e4f8a58', '3247b3a7-df95-4360-b87a-50c185601252'),
(19, 'c182178d-186a-4542-a848-0afb4e4f8a58', '3247b3a7-df95-4360-b87a-50c185601252');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_class_std`
--

CREATE TABLE `tbl_class_std` (
  `id` int(11) NOT NULL,
  `class_uuid` varchar(50) NOT NULL,
  `stud_uuid` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_class_std`
--

INSERT INTO `tbl_class_std` (`id`, `class_uuid`, `stud_uuid`) VALUES
(2, 'c182178d-186a-4542-a848-0afb4e4f8a58', 'fe73d1db-98ac-43a0-9421-110e54e5d168'),
(10, 'a31a740a-14ca-4997-8bf9-954400b446d7', '480dccf4-8efa-4599-9819-8f4de8226080'),
(11, 'a31a740a-14ca-4997-8bf9-954400b446d7', '5b8bf9fe-6186-4702-a6cd-8984eb11b7c1'),
(12, 'a31a740a-14ca-4997-8bf9-954400b446d7', '319c0f55-3141-434c-b2c1-2840aaf7e3c0'),
(14, 'a31a740a-14ca-4997-8bf9-954400b446d7', '62a92956-0bc5-46df-bc62-fc853ad20050'),
(47, 'c182178d-186a-4542-a848-0afb4e4f8a78', '1b1f2549-972b-453e-9d07-45987225cede'),
(48, 'c182178d-186a-4542-a848-0afb4e4f8a78', '319c0f55-3141-434c-b2c1-2840aaf7e3c0'),
(49, 'c182178d-186a-4542-a848-0afb4e4f8a78', '5b8bf9fe-6186-4702-a6cd-8984eb11b7c1'),
(50, 'c182178d-186a-4542-a848-0afb4e4f8a78', '480dccf4-8efa-4599-9819-8f4de8226080'),
(51, 'c182178d-186a-4542-a848-0afb4e4f8a78', '62a92956-0bc5-46df-bc62-fc853ad20050'),
(68, 'a31a740a-14ca-4997-8bf9-954400b446d7', '480dccf4-8efa-4599-9819-8f4de8226080'),
(69, 'a31a740a-14ca-4997-8bf9-954400b446d7', '480dccf4-8efa-4599-9819-8f4de8226080'),
(70, 'a31a740a-14ca-4997-8bf9-954400b446d7', '480dccf4-8efa-4599-9819-8f4de8226080');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_institute`
--

CREATE TABLE `tbl_institute` (
  `id` int(11) NOT NULL,
  `ins_uuid` varchar(100) NOT NULL,
  `ins_name` varchar(50) NOT NULL,
  `ins_logo` text NOT NULL,
  `ins_email` varchar(50) NOT NULL,
  `ins_address` varchar(50) NOT NULL,
  `ins_type` varchar(30) NOT NULL,
  `ins_phone` int(10) NOT NULL,
  `ins_password` varchar(100) NOT NULL,
  `ins_uname` varchar(15) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_institute`
--

INSERT INTO `tbl_institute` (`id`, `ins_uuid`, `ins_name`, `ins_logo`, `ins_email`, `ins_address`, `ins_type`, `ins_phone`, `ins_password`, `ins_uname`, `created_at`) VALUES
(4, '035f93a5-2f92-4cc1-9668-3103da7ce5e8', '', '', 'astuteyard1@gmail.com', '', '', 2147483647, '$2a$10$gvxmEv8CSCVtWaZPzZNjd.MwGgwR2d6kckQdFiVvFw6xbwpFpteZy', 'icpi', '2019-10-10'),
(1, '0b2bf949-08f6-4b6b-9644-546054f0b478', '', '', 'astute.yard@gmail.com', '', '', 2147483647, '$2a$10$JSx.0gzuZ9e6C91BjOKsx.ur/jtIjoSKJtw7Ug/BnZEhg65WudZiq', 'icp', '2019-10-10'),
(5, '76289d15-bf1e-44fb-9be1-dd7ca15bf9ea', '', '', 's@s.com', '', '', 9191, '$2a$10$gvxmEv8CSCVtWaZPzZNjd.MwGgwR2d6kckQdFiVvFw6xbwpFpteZy', 'test', '2019-10-15'),
(3, '90081b9f-c1c8-4a10-b935-e20487c48fc1', '', '', 'astuteyard@gmail.com', '', '', 2147483647, '$2a$10$tLVx2hv.B8AO049X6rqizOfybI2FJt2yrla8yBOf2IFyEEe4FN3eS', 'icp1i', '2019-10-10'),
(6, 'be2e47d2-1427-4869-a446-add0b0a71015', '', '', 's@ss.com', '', '', 9191, '$2a$10$NMMJ2i9K3LvtyK6coaIQnu3bylW0DWDZqvqfVbxvAldEuQLTxTuki', 'testi', '2019-10-15');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payment`
--

CREATE TABLE `tbl_payment` (
  `payment_id` int(11) NOT NULL,
  `stud_uuid` varchar(100) NOT NULL,
  `request_id` varchar(100) NOT NULL,
  `request_date` date NOT NULL DEFAULT current_timestamp(),
  `amount` double NOT NULL,
  `ins_uuid` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_payment`
--

INSERT INTO `tbl_payment` (`payment_id`, `stud_uuid`, `request_id`, `request_date`, `amount`, `ins_uuid`, `status`) VALUES
(1, '319c0f55-3141-434c-b2c1-2840aaf7e3c0', '9cd14210-cd0f-4ac0-a9cf-2ac5f740f1cc', '2020-03-07', 2000, '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 1),
(2, '771d7def-a638-48a1-a739-e911fb6c5ccd', 'd690ae99-c6bf-4568-ad2b-980bfb4696e8', '2020-03-07', 2000, '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 0),
(3, 'fe73d1db-98ac-43a0-9421-110e54e5d168', '46ce0af6-032c-4a31-bad0-48d74868358f', '2020-03-07', 2000, '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 0),
(4, '1b1f2549-972b-453e-9d07-45987225cede', 'a184c703-a75b-49b6-97d7-9c2aabb543c9', '2020-03-07', 2000, '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 1),
(5, '5b8bf9fe-6186-4702-a6cd-8984eb11b7c1', '45a82892-5f5a-4423-ad3b-6e93045a251e', '2020-03-07', 2000, '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 0),
(6, '62a92956-0bc5-46df-bc62-fc853ad20050', '8395f8b6-0aae-4c80-a6d4-66f474a8087a', '2020-03-07', 2000, '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 0),
(7, '480dccf4-8efa-4599-9819-8f4de8226080', '7da1aff9-0332-4f8d-9146-92578323ff7e', '2020-03-08', 2000, '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_staff`
--

CREATE TABLE `tbl_staff` (
  `id` int(11) NOT NULL,
  `staff_uuid` varchar(100) NOT NULL,
  `ins_uuid` varchar(100) NOT NULL,
  `staff_fname` varchar(25) NOT NULL,
  `staff_lname` varchar(25) NOT NULL,
  `staff_email` varchar(30) NOT NULL,
  `staff_address` text NOT NULL,
  `staff_phone` int(10) NOT NULL,
  `staff_img` text NOT NULL,
  `staff_type` varchar(30) NOT NULL,
  `staff_added_at` date NOT NULL DEFAULT current_timestamp(),
  `staff_password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_staff`
--

INSERT INTO `tbl_staff` (`id`, `staff_uuid`, `ins_uuid`, `staff_fname`, `staff_lname`, `staff_email`, `staff_address`, `staff_phone`, `staff_img`, `staff_type`, `staff_added_at`, `staff_password`) VALUES
(12, '0a712a1f-f346-4525-ae01-5d8374e28cf2', '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 'Saumyadeep', 'Sarkar', 'saumyadeepsarkar@gmail.com', 'India', 98989898, 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg', '', '2019-12-30', '$2a$10$pMxWp8nYVNKJV6HcCu7VcOiaglxi4ri9X3q9bqbN0y4fqlkvT2BCC'),
(9, '104f9a33-d351-4630-9dcc-0b55fb61b72a', '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 'Baba', 'Saheb', 'baba@gmail.com', 'Nepal', 2147483647, 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg', '', '2019-10-15', '$2a$10$FGkqVqgaXnDAPg16oFPXNO6.mtWovm54ouTFcV2b.XXddhjVMSnhm'),
(8, '27b1da0e-d93e-4c13-acff-334f23da48c2', '76289d15-bf1e-44fb-9be1-dd7ca15bf9ea', 'Sam', 'Patel', 's@g.com', 'Hasan', 123, 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg', '', '2019-10-15', '$2a$10$UI4OxH04HdoWkge7skYJ/eYfcU00CV4QXByzfOo5.qs0qLT4bfiVO'),
(7, '3247b3a7-df95-4360-b87a-50c185601252', '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 'Simran', 'Sarkar', 'simran.sarkar@gmail.com', 'Nepal', 2147483647, 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg', '', '2019-10-12', '$2a$10$wqCAcP77DVd1PQ/cz0/NDeD/HRFfBob2VjOpGT1W97npmYpa2yuZ6'),
(13, '48d4ebc6-3ce2-4811-8ad1-c72d30839ac5', '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 'Dummy', 'User', 'dummy@gmail.com', 'nepal', 2147483647, 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg', '', '2019-12-30', '$2a$10$K0TDv1GtD5bzcVKH2ve0P.HukdX5iBh7JhA3sZmwnsr.1JSPm0Bcu'),
(10, '8d968512-a38f-41d6-991e-872c0973925f', '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 'Pratima ', 'Gautam', 'pratima.gautam@gmail.com', 'phedikhola', 2147483647, 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg', '', '2019-12-30', '$2a$10$0.RGMbUh3Y39UOGCUPrL.uu044OYGUJ9I9A5rTmHBYi18OeLOt2Ze'),
(6, '9ab9c3c4-567f-4c60-be04-b64effd8feaa', '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 'Sony', 'Sarkar', 'sony.sarkar@gmail.com', 'Nepal', 2147483647, 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg', '', '2019-10-12', ''),
(11, 'e77de4a3-216e-4594-add5-50de16927e5a', '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 'TEST', 'USER', 'test@gmail.com', 'nepal', 2147483647, 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg', '', '2019-12-30', '$2a$10$xT3dlugCuuTZ70T2nyvJt.zJfzhjfvFc5/6KZDAq2BbPBBhBNHMeG');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_student`
--

CREATE TABLE `tbl_student` (
  `id` int(11) NOT NULL,
  `stud_uuid` varchar(100) NOT NULL,
  `ins_uuid` varchar(100) NOT NULL,
  `stud_fname` varchar(25) NOT NULL,
  `stud_lname` varchar(25) NOT NULL,
  `stud_email` varchar(50) NOT NULL,
  `stud_address` text NOT NULL,
  `stud_phone` int(50) NOT NULL,
  `stud_img` text NOT NULL,
  `stud_added_at` date NOT NULL DEFAULT current_timestamp(),
  `stud_username` varchar(50) NOT NULL,
  `stud_password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_student`
--

INSERT INTO `tbl_student` (`id`, `stud_uuid`, `ins_uuid`, `stud_fname`, `stud_lname`, `stud_email`, `stud_address`, `stud_phone`, `stud_img`, `stud_added_at`, `stud_username`, `stud_password`) VALUES
(2, '1b1f2549-972b-453e-9d07-45987225cede', '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 'Gayatri', 'Gautam', 'gayatri.gautam@gmail.com', 'Birauta', 2147483647, 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg', '2019-10-19', 'gayatri', '$2a$10$75xxWbiQMjj65gq8wE.GfeLk6EmVUyLAmsB8mVAc/RwpVH8qxT2CC'),
(4, '319c0f55-3141-434c-b2c1-2840aaf7e3c0', '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 'Shashidhar', 'Gautam', 'shashi.gautam@gmail.com', 'Birauta', 2147483647, 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg', '2019-10-19', 'shashi', '$2a$10$0zsjMO6ALNpk6hljsjsPmuJnWSUoQ2ZxU.uJgxUbxAIbFmgWPLX.e'),
(5, '480dccf4-8efa-4599-9819-8f4de8226080', '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 'Saumyadeeeeeeeep', 'Gautam', 'saumyadeeeeeep.gautam@gmail.com', 'Birauta', 2147483647, 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg', '2019-10-19', 'saumyadeep', '$2a$10$mCAgdoqQceM96CklGC.W6e9McWPvyUzbeH6Uc0NTjWqQvObb7PVzS'),
(6, '5b8bf9fe-6186-4702-a6cd-8984eb11b7c1', '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 'Ribhu', 'Gautam', 'ribhu.gautam@gmail.com', 'Birauta', 2147483647, 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg', '2019-10-19', 'ribhu', '$2a$10$ASw6ut2dvFPF0J6vcb4DkOv1jfgqRGL0dmetDByrb.7iAITeOHSeS'),
(3, '62a92956-0bc5-46df-bc62-fc853ad20050', '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 'Bishnu Prasad', 'Gautam', 'bishnu.gautam@gmail.com', 'Birauta', 2147483647, 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg', '2019-10-19', 'bishnu', '$2a$10$aDZ1/fq2Ltm93Q63AE6JuOWjRmBaXVw16WupkFgm2rXMqgE8t8lQq'),
(7, '771d7def-a638-48a1-a739-e911fb6c5ccd', '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 'mina', 'Gautam', 'mina.gautam@gmail.com', 'Birauta', 2147483647, 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg', '2019-10-19', 'mina', '$2a$10$Ok8GtzJRL4dwMJnfQ4I7s.ycvIyNuie/nNeG1fk8BKlyuas2Sz2ZG'),
(1, 'fe73d1db-98ac-43a0-9421-110e54e5d168', '035f93a5-2f92-4cc1-9668-3103da7ce5e8', 'Pratu', 'Gautam', 'astute.yard@gmail.com', 'Birauta', 2147483647, 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg', '2019-10-12', 'pratu1', '$2a$10$PeJ0CVVT3FjNqH/o.fgIhOX4ktLkZEWcRMqoqgRkyw16JAGrRTuCO');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_subject`
--

CREATE TABLE `tbl_subject` (
  `id` int(11) NOT NULL,
  `sub_id` varchar(100) NOT NULL,
  `sub_name` varchar(40) NOT NULL,
  `sub_desc` varchar(100) NOT NULL,
  `sub_img` text NOT NULL,
  `class_uuid` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_assignment`
--
ALTER TABLE `tbl_assignment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_calendar`
--
ALTER TABLE `tbl_calendar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `tbl_classroom`
--
ALTER TABLE `tbl_classroom`
  ADD PRIMARY KEY (`class_uuid`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `tbl_class_staff`
--
ALTER TABLE `tbl_class_staff`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `tbl_class_std`
--
ALTER TABLE `tbl_class_std`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `tbl_institute`
--
ALTER TABLE `tbl_institute`
  ADD PRIMARY KEY (`ins_uuid`) USING BTREE,
  ADD UNIQUE KEY `ins_uname` (`ins_uname`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `tbl_payment`
--
ALTER TABLE `tbl_payment`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `tbl_staff`
--
ALTER TABLE `tbl_staff`
  ADD PRIMARY KEY (`staff_uuid`),
  ADD UNIQUE KEY `id` (`id`) USING BTREE;

--
-- Indexes for table `tbl_student`
--
ALTER TABLE `tbl_student`
  ADD PRIMARY KEY (`stud_uuid`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `stud_username` (`stud_username`);

--
-- Indexes for table `tbl_subject`
--
ALTER TABLE `tbl_subject`
  ADD PRIMARY KEY (`sub_id`) USING BTREE,
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_assignment`
--
ALTER TABLE `tbl_assignment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_calendar`
--
ALTER TABLE `tbl_calendar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_classroom`
--
ALTER TABLE `tbl_classroom`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_class_staff`
--
ALTER TABLE `tbl_class_staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tbl_class_std`
--
ALTER TABLE `tbl_class_std`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `tbl_institute`
--
ALTER TABLE `tbl_institute`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_payment`
--
ALTER TABLE `tbl_payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_staff`
--
ALTER TABLE `tbl_staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tbl_student`
--
ALTER TABLE `tbl_student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_subject`
--
ALTER TABLE `tbl_subject`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
