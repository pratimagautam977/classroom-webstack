-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 10, 2020 at 06:20 AM
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

-- --------------------------------------------------------

--
-- Table structure for table `tbl_chat`
--

CREATE TABLE `tbl_chat` (
  `id` int(11) NOT NULL,
  `sender_uuid` varchar(50) NOT NULL,
  `channel_id` varchar(50) NOT NULL,
  `text` text NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_chat_relation`
--

CREATE TABLE `tbl_chat_relation` (
  `id` int(11) NOT NULL,
  `channel_id` varchar(50) NOT NULL,
  `sender1_uuid` varchar(50) NOT NULL,
  `sender2_uuid` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

-- --------------------------------------------------------

--
-- Table structure for table `tbl_class_staff`
--

CREATE TABLE `tbl_class_staff` (
  `id` int(11) NOT NULL,
  `class_uuid` varchar(50) NOT NULL,
  `staff_uuid` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_class_std`
--

CREATE TABLE `tbl_class_std` (
  `id` int(11) NOT NULL,
  `class_uuid` varchar(50) NOT NULL,
  `stud_uuid` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_filemanager`
--

CREATE TABLE `tbl_filemanager` (
  `id` int(11) NOT NULL,
  `filename` varchar(100) NOT NULL,
  `uuid_name` varchar(50) NOT NULL,
  `url` varchar(400) NOT NULL,
  `date_created` date NOT NULL DEFAULT current_timestamp(),
  `filetype` varchar(10) NOT NULL,
  `uploader_uuid` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_filemanager`
--

INSERT INTO `tbl_filemanager` (`id`, `filename`, `uuid_name`, `url`, `date_created`, `filetype`, `uploader_uuid`) VALUES
(83, 'person-black-and-white', '14821340-c667-423a-ba73-e2b59d4a4119', 'https://classroom-webstack.s3.amazonaws.com/upload/896e6935-c6a3-4a8f-b203-48f6a9842465/14821340-c667-423a-ba73-e2b59d4a4119.png', '2020-06-10', 'png', '896e6935-c6a3-4a8f-b203-48f6a9842465');

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
  `ins_phone` bigint(10) NOT NULL,
  `ins_password` varchar(100) NOT NULL,
  `ins_uname` varchar(15) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_institute`
--

INSERT INTO `tbl_institute` (`id`, `ins_uuid`, `ins_name`, `ins_logo`, `ins_email`, `ins_address`, `ins_type`, `ins_phone`, `ins_password`, `ins_uname`, `created_at`) VALUES
(18, '896e6935-c6a3-4a8f-b203-48f6a9842465', '', 'https://classroom-webstack.s3.amazonaws.com/institute/896e6935-c6a3-4a8f-b203-48f6a9842465/e4a3f6f5-7aae-4833-95c2-43789c81b3f8.png', 'test.institute@gmail.com', '', '', 9876543212, '$2a$10$6/yRAJNfI6Yc3geQpqG6YepL5Dz3NhTqxyQLFhsWj/SmDMlYoEpFG', 'ICP', '2020-06-10');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_notes`
--

CREATE TABLE `tbl_notes` (
  `id` int(11) NOT NULL,
  `uuid` varchar(100) NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `staff_phone` bigint(10) NOT NULL,
  `staff_img` text NOT NULL,
  `staff_type` varchar(30) NOT NULL,
  `staff_added_at` date NOT NULL DEFAULT current_timestamp(),
  `staff_password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `stud_phone` bigint(50) NOT NULL,
  `stud_img` text NOT NULL,
  `stud_added_at` date NOT NULL DEFAULT current_timestamp(),
  `stud_username` varchar(50) NOT NULL,
  `stud_password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Indexes for table `tbl_chat`
--
ALTER TABLE `tbl_chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_chat_relation`
--
ALTER TABLE `tbl_chat_relation`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `tbl_filemanager`
--
ALTER TABLE `tbl_filemanager`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_institute`
--
ALTER TABLE `tbl_institute`
  ADD PRIMARY KEY (`ins_uuid`) USING BTREE,
  ADD UNIQUE KEY `ins_uname` (`ins_uname`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `tbl_notes`
--
ALTER TABLE `tbl_notes`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `tbl_calendar`
--
ALTER TABLE `tbl_calendar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tbl_chat`
--
ALTER TABLE `tbl_chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_chat_relation`
--
ALTER TABLE `tbl_chat_relation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_classroom`
--
ALTER TABLE `tbl_classroom`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `tbl_class_staff`
--
ALTER TABLE `tbl_class_staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `tbl_class_std`
--
ALTER TABLE `tbl_class_std`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `tbl_filemanager`
--
ALTER TABLE `tbl_filemanager`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `tbl_institute`
--
ALTER TABLE `tbl_institute`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tbl_notes`
--
ALTER TABLE `tbl_notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_payment`
--
ALTER TABLE `tbl_payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tbl_staff`
--
ALTER TABLE `tbl_staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tbl_student`
--
ALTER TABLE `tbl_student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tbl_subject`
--
ALTER TABLE `tbl_subject`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
