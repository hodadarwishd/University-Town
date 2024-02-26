-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 25, 2024 at 12:18 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `university-town`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `password`) VALUES
(1, 'خالد زكى', '12345678');

-- --------------------------------------------------------

--
-- Table structure for table `building`
--

CREATE TABLE `building` (
  `id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `gender` enum('Male','Female','','') NOT NULL,
  `number_of_rooms` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `buildings`
--

CREATE TABLE `buildings` (
  `id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `gender` enum('Male','Female','','') NOT NULL,
  `number_of_rooms` int(11) NOT NULL,
  `number_of_floors` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `buildings`
--

INSERT INTO `buildings` (`id`, `number`, `gender`, `number_of_rooms`, `number_of_floors`, `admin_id`) VALUES
(1, 1, 'Male', 150, 6, 1),
(2, 3, 'Male', 170, 6, 1),
(3, 5, 'Male', 170, 6, 1),
(4, 9, 'Male', 170, 6, 1),
(5, 2, 'Female', 170, 6, 1),
(6, 4, 'Female', 170, 6, 1),
(7, 12, 'Female', 160, 6, 1),
(8, 18, 'Female', 160, 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `buildingsemployee`
--

CREATE TABLE `buildingsemployee` (
  `building_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `buildingsemployee`
--

INSERT INTO `buildingsemployee` (`building_id`, `employee_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `governorate_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`id`, `name`, `governorate_id`) VALUES
(1, '15 مايو', 1),
(2, 'الازبكية', 1),
(3, 'البساتين', 1),
(4, 'التبين', 1),
(5, 'الخليفة', 1),
(6, 'الدراسة', 1),
(7, 'الدرب الاحمر', 1),
(8, 'الزاوية الحمراء', 1),
(9, 'الزيتون', 1),
(10, 'الساحل', 1),
(11, 'السلام', 1),
(12, 'السيدة زينب', 1),
(13, 'الشرابية', 1),
(14, 'مدينة الشروق', 1),
(15, 'الظاهر', 1),
(16, 'العتبة', 1),
(17, 'القاهرة الجديدة', 1),
(18, 'المرج', 1),
(19, 'عزبة النخل', 1),
(20, 'المطرية', 1),
(21, 'المعادى', 1),
(22, 'المعصرة', 1),
(23, 'المقطم', 1),
(24, 'المنيل', 1),
(25, 'الموسكى', 1),
(26, 'النزهة', 1),
(27, 'الوايلى', 1),
(28, 'باب الشعرية', 1),
(29, 'بولاق', 1),
(30, 'جاردن سيتى', 1),
(31, 'حدائق القبة', 1),
(32, 'حلوان', 1),
(33, 'دار السلام', 1),
(34, 'شبرا', 1),
(35, 'طره', 1),
(36, 'عابدين', 1),
(37, 'عباسية', 1),
(38, 'عين شمس', 1),
(39, 'مدينة نصر', 1),
(40, 'مصر الجديدة', 1),
(41, 'مصر القديمة', 1),
(42, 'منشية ناصر', 1),
(43, 'مدينة بدر', 1),
(44, 'مدينة العبور', 1),
(45, 'وسط البلد', 1),
(46, 'الزمالك', 1),
(47, 'قصر النيل', 1),
(48, 'الرحاب', 1),
(49, 'القطامية', 1),
(50, 'مدينتي', 1),
(51, 'روض الفرج', 1),
(52, 'شيراتون', 1),
(53, 'الجمالية', 1),
(54, 'العاشر من رمضان', 1),
(55, 'الحلمية', 1),
(56, 'النزهة الجديدة', 1),
(57, 'العاصمة الإدارية', 1),
(58, 'الجيزة', 2),
(59, 'السادس من أكتوبر', 2),
(60, 'الشيخ زايد', 2),
(61, 'الحوامدية', 2),
(62, 'البدرشين', 2),
(63, 'الصف', 2),
(64, 'أطفيح', 2),
(65, 'العياط', 2),
(66, 'الباويطي', 2),
(67, 'منشأة القناطر', 2),
(68, 'أوسيم', 2),
(69, 'كرداسة', 2),
(70, 'أبو النمرس', 2),
(71, 'كفر غطاطي', 2),
(72, 'منشأة البكاري', 2),
(73, 'الدقى', 2),
(74, 'العجوزة', 2),
(75, 'الهرم', 2),
(76, 'الوراق', 2),
(77, 'امبابة', 2),
(78, 'بولاق الدكرور', 2),
(79, 'الواحات البحرية', 2),
(80, 'العمرانية', 2),
(81, 'المنيب', 2),
(82, 'بين السرايات', 2),
(83, 'الكيت كات', 2),
(84, 'المهندسين', 2),
(85, 'فيصل', 2),
(86, 'أبو رواش', 2),
(87, 'حدائق الأهرام', 2),
(88, 'الحرانية', 2),
(89, 'حدائق اكتوبر', 2),
(90, 'صفط اللبن', 2),
(91, 'القرية الذكية', 2),
(92, 'ارض اللواء', 2),
(93, 'ابو قير', 3),
(94, 'الابراهيمية', 3),
(95, 'الأزاريطة', 3),
(96, 'الانفوشى', 3),
(97, 'الدخيلة', 3),
(98, 'السيوف', 3),
(99, 'العامرية', 3),
(100, 'اللبان', 3),
(101, 'المفروزة', 3),
(102, 'المنتزه', 3),
(103, 'المنشية', 3),
(104, 'الناصرية', 3),
(105, 'امبروزو', 3),
(106, 'باب شرق', 3),
(107, 'برج العرب', 3),
(108, 'ستانلى', 3),
(109, 'سموحة', 3),
(110, 'سيدى بشر', 3),
(111, 'شدس', 3),
(112, 'غيط العنب', 3),
(113, 'فلمينج', 3),
(114, 'فيكتوريا', 3),
(115, 'كامب شيزار', 3),
(116, 'كرموز', 3),
(117, 'محطة الرمل', 3),
(118, 'مينا البصل', 3),
(119, 'العصافرة', 3),
(120, 'العجمي', 3),
(121, 'بكوس', 3),
(122, 'بولكلي', 3),
(123, 'كليوباترا', 3),
(124, 'جليم', 3),
(125, 'المعمورة', 3),
(126, 'المندرة', 3),
(127, 'محرم بك', 3),
(128, 'الشاطبي', 3),
(129, 'سيدي جابر', 3),
(130, 'الساحل الشمالي', 3),
(131, 'الحضرة', 3),
(132, 'العطارين', 3),
(133, 'سيدي كرير', 3),
(134, 'الجمرك', 3),
(135, 'المكس', 3),
(136, 'مارينا', 3),
(137, 'المنصورة', 4),
(138, 'طلخا', 4),
(139, 'ميت غمر', 4),
(140, 'دكرنس', 4),
(141, 'أجا', 4),
(142, 'منية النصر', 4),
(143, 'السنبلاوين', 4),
(144, 'الكردي', 4),
(145, 'بني عبيد', 4),
(146, 'المنزلة', 4),
(147, 'تمي الأمديد', 4),
(148, 'الجمالية', 4),
(149, 'شربين', 4),
(150, 'المطرية', 4),
(151, 'بلقاس', 4),
(152, 'ميت سلسيل', 4),
(153, 'جمصة', 4),
(154, 'محلة دمنة', 4),
(155, 'نبروه', 4),
(156, 'الغردقة', 5),
(157, 'رأس غارب', 5),
(158, 'سفاجا', 5),
(159, 'القصير', 5),
(160, 'مرسى علم', 5),
(161, 'الشلاتين', 5),
(162, 'حلايب', 5),
(163, 'الدهار', 5),
(164, 'دمنهور', 6),
(165, 'كفر الدوار', 6),
(166, 'رشيد', 6),
(167, 'إدكو', 6),
(168, 'أبو المطامير', 6),
(169, 'أبو حمص', 6),
(170, 'الدلنجات', 6),
(171, 'المحمودية', 6),
(172, 'الرحمانية', 6),
(173, 'إيتاي البارود', 6),
(174, 'حوش عيسى', 6),
(175, 'شبراخيت', 6),
(176, 'كوم حمادة', 6),
(177, 'بدر', 6),
(178, 'وادي النطرون', 6),
(179, 'النوبارية الجديدة', 6),
(180, 'النوبارية', 6),
(181, 'الفيوم', 7),
(182, 'الفيوم الجديدة', 7),
(183, 'طامية', 7),
(184, 'سنورس', 7),
(185, 'إطسا', 7),
(186, 'إبشواي', 7),
(187, 'يوسف الصديق', 7),
(188, 'الحادقة', 7),
(189, 'اطسا', 7),
(190, 'الجامعة', 7),
(191, 'السيالة', 7),
(192, 'طنطا', 8),
(193, 'المحلة الكبرى', 8),
(194, 'كفر الزيات', 8),
(195, 'زفتى', 8),
(196, 'السنطة', 8),
(197, 'قطور', 8),
(198, 'بسيون', 8),
(199, 'سمنود', 8),
(200, 'الإسماعيلية', 9),
(201, 'فايد', 9),
(202, 'القنطرة شرق', 9),
(203, 'القنطرة غرب', 9),
(204, 'التل الكبير', 9),
(205, 'أبو صوير', 9),
(206, 'القصاصين الجديدة', 9),
(207, 'نفيشة', 9),
(208, 'الشيخ زايد', 9),
(209, 'شبين الكوم', 10),
(210, 'مدينة السادات', 10),
(211, 'منوف', 10),
(212, 'سرس الليان', 10),
(213, 'أشمون', 10),
(214, 'الباجور', 10),
(215, 'قويسنا', 10),
(216, 'بركة السبع', 10),
(217, 'تلا', 10),
(218, 'الشهداء', 10),
(219, 'المنيا', 11),
(220, 'المنيا الجديدة', 11),
(221, 'العدوة', 11),
(222, 'مغاغة', 11),
(223, 'بني مزار', 11),
(224, 'مطاي', 11),
(225, 'سمالوط', 11),
(226, 'المدينة الفكرية', 11),
(227, 'ملوي', 11),
(228, 'دير مواس', 11),
(229, 'ابو قرقاص', 11),
(230, 'ارض سلطان', 11),
(231, 'بنها', 12),
(232, 'قليوب', 12),
(233, 'شبرا الخيمة', 12),
(234, 'القناطر الخيرية', 12),
(235, 'الخانكة', 12),
(236, 'كفر شكر', 12),
(237, 'طوخ', 12),
(238, 'قها', 12),
(239, 'العبور', 12),
(240, 'الخصوص', 12),
(241, 'شبين القناطر', 12),
(242, 'مسطرد', 12),
(243, 'الخارجة', 13),
(244, 'باريس', 13),
(245, 'موط', 13),
(246, 'الفرافرة', 13),
(247, 'بلاط', 13),
(248, 'الداخلة', 13),
(249, 'السويس', 14),
(250, 'الجناين', 14),
(251, 'عتاقة', 14),
(252, 'العين السخنة', 14),
(253, 'فيصل', 14),
(254, 'أسوان', 15),
(255, 'أسوان الجديدة', 15),
(256, 'دراو', 15),
(257, 'كوم أمبو', 15),
(258, 'نصر النوبة', 15),
(259, 'كلابشة', 15),
(260, 'إدفو', 15),
(261, 'الرديسية', 15),
(262, 'البصيلية', 15),
(263, 'السباعية', 15),
(264, 'ابوسمبل السياحية', 15),
(265, 'مرسى علم', 15),
(266, 'أسيوط', 16),
(267, 'أسيوط الجديدة', 16),
(268, 'ديروط', 16),
(269, 'منفلوط', 16),
(270, 'القوصية', 16),
(271, 'أبنوب', 16),
(272, 'أبو تيج', 16),
(273, 'الغنايم', 16),
(274, 'ساحل سليم', 16),
(275, 'البداري', 16),
(276, 'صدفا', 16),
(277, 'بني سويف', 17),
(278, 'بني سويف الجديدة', 17),
(279, 'الواسطى', 17),
(280, 'ناصر', 17),
(281, 'إهناسيا', 17),
(282, 'ببا', 17),
(283, 'الفشن', 17),
(284, 'سمسطا', 17),
(285, 'الاباصيرى', 17),
(286, 'مقبل', 17),
(287, 'بورسعيد', 18),
(288, 'بورفؤاد', 18),
(289, 'العرب', 18),
(290, 'حى الزهور', 18),
(291, 'حى الشرق', 18),
(292, 'حى الضواحى', 18),
(293, 'حى المناخ', 18),
(294, 'حى مبارك', 18),
(295, 'دمياط', 19),
(296, 'دمياط الجديدة', 19),
(297, 'رأس البر', 19),
(298, 'فارسكور', 19),
(299, 'الزرقا', 19),
(300, 'السرو', 19),
(301, 'الروضة', 19),
(302, 'كفر البطيخ', 19),
(303, 'عزبة البرج', 19),
(304, 'ميت أبو غالب', 19),
(305, 'كفر سعد', 19),
(306, 'الزقازيق', 20),
(307, 'العاشر من رمضان', 20),
(308, 'منيا القمح', 20),
(309, 'بلبيس', 20),
(310, 'مشتول السوق', 20),
(311, 'القنايات', 20),
(312, 'أبو حماد', 20),
(313, 'القرين', 20),
(314, 'ههيا', 20),
(315, 'أبو كبير', 20),
(316, 'فاقوس', 20),
(317, 'الصالحية الجديدة', 20),
(318, 'الإبراهيمية', 20),
(319, 'ديرب نجم', 20),
(320, 'كفر صقر', 20),
(321, 'أولاد صقر', 20),
(322, 'الحسينية', 20),
(323, 'صان الحجر القبلية', 20),
(324, 'منشأة أبو عمر', 20),
(325, 'الطور', 21),
(326, 'شرم الشيخ', 21),
(327, 'دهب', 21),
(328, 'نويبع', 21),
(329, 'طابا', 21),
(330, 'سانت كاترين', 21),
(331, 'أبو رديس', 21),
(332, 'أبو زنيمة', 21),
(333, 'رأس سدر', 21),
(334, 'كفر الشيخ', 22),
(335, 'وسط البلد كفر الشيخ', 22),
(336, 'دسوق', 22),
(337, 'فوه', 22),
(338, 'مطوبس', 22),
(339, 'برج البرلس', 22),
(340, 'بلطيم', 22),
(341, 'مصيف بلطيم', 22),
(342, 'الحامول', 22),
(343, 'بيلا', 22),
(344, 'الرياض', 22),
(345, 'سيدي سالم', 22),
(346, 'قلين', 22),
(347, 'سيدي غازي', 22),
(348, 'مرسى مطروح', 23),
(349, 'الحمام', 23),
(350, 'العلمين', 23),
(351, 'الضبعة', 23),
(352, 'النجيلة', 23),
(353, 'سيدي براني', 23),
(354, 'السلوم', 23),
(355, 'سيوة', 23),
(356, 'مارينا', 23),
(357, 'الساحل الشمالى', 23),
(358, 'الأقصر', 24),
(359, 'الأقصر الجديدة', 24),
(360, 'إسنا', 24),
(361, 'طيبة الجديدة', 24),
(362, 'الزينية', 24),
(363, 'البياضية', 24),
(364, 'القرنة', 24),
(365, 'أرمنت', 24),
(366, 'الطود', 24),
(367, 'قنا', 25),
(368, 'قنا الجديدة', 25),
(369, 'ابو طشت', 25),
(370, 'نجع حمادي', 25),
(371, 'دشنا', 25),
(372, 'الوقف', 25),
(373, 'قفط', 25),
(374, 'نقادة', 25),
(375, 'فرشوط', 25),
(376, 'قوص', 25),
(377, 'العريش', 26),
(378, 'الشيخ زويد', 26),
(379, 'نخل', 26),
(380, 'رفح', 26),
(381, 'بئر العبد', 26),
(382, 'الحسنة', 26),
(383, 'سوهاج', 27),
(384, 'سوهاج الجديدة', 27),
(385, 'أخميم', 27),
(386, 'أخميم الجديدة', 27),
(387, 'البلينا', 27),
(388, 'المراغة', 27),
(389, 'المنشأة', 27),
(390, 'دار السلام', 27),
(391, 'جرجا', 27),
(392, 'جهينة الغربية', 27),
(393, 'ساقلته', 27),
(394, 'طما', 27),
(395, 'طهطا', 27),
(396, 'الكوثر', 27);

-- --------------------------------------------------------

--
-- Table structure for table `college`
--

CREATE TABLE `college` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `college`
--

INSERT INTO `college` (`id`, `name`) VALUES
(1, 'كلية الهندسة بحلوان '),
(2, 'كلية التجارة'),
(3, 'كلية الهندسة بالمطرية'),
(4, 'كلية الفنون الجميلة'),
(5, 'كلية الحاسبات و المعلومات '),
(6, 'كلية السياحة و الفنادق'),
(7, 'كلية الفنون التطبيقية'),
(8, 'كلية التكنولوجيا و التعليم الصناعى'),
(9, 'كلية الاقتصاد المنزلى'),
(10, 'كلية التربية الفنية'),
(11, 'كلية التربية الموسيقية'),
(12, 'كلية التربية الرياضية (بنين)'),
(13, 'كلية التربية الرياضية (بنات)'),
(14, 'كلية الحقوق'),
(15, 'كلية الاداب'),
(16, 'كلية التربية'),
(17, 'كلية الخدمة الاجتماعية'),
(18, 'كلية الصيدلة'),
(19, 'كلية العلوم '),
(20, 'كلية التمريض'),
(21, 'كلية الطب'),
(22, 'المعهد القومى للملكية الفكرية'),
(23, 'معهد التمريض '),
(25, 'كلية الحاسبات و المعلومات');

-- --------------------------------------------------------

--
-- Table structure for table `collegelevel`
--

CREATE TABLE `collegelevel` (
  `college_id` int(11) NOT NULL,
  `level_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `collegelevel`
--

INSERT INTO `collegelevel` (`college_id`, `level_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 8),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 8),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(3, 5),
(3, 6),
(3, 8),
(4, 2),
(4, 3),
(4, 4),
(4, 5),
(4, 8),
(5, 2),
(5, 3),
(5, 4),
(5, 5),
(5, 8),
(6, 2),
(6, 3),
(6, 4),
(6, 5),
(6, 8),
(7, 1),
(7, 2),
(7, 3),
(7, 4),
(7, 5),
(7, 6),
(7, 8),
(8, 2),
(8, 3),
(8, 4),
(8, 5),
(8, 8),
(9, 2),
(9, 3),
(9, 4),
(9, 5),
(9, 8),
(10, 2),
(10, 3),
(10, 4),
(10, 5),
(10, 8),
(11, 2),
(11, 3),
(11, 4),
(11, 5),
(11, 8),
(12, 2),
(12, 3),
(12, 4),
(12, 5),
(12, 8),
(13, 2),
(13, 3),
(13, 4),
(13, 5),
(13, 8),
(14, 2),
(14, 3),
(14, 4),
(14, 5),
(14, 8),
(15, 2),
(15, 3),
(15, 4),
(15, 5),
(15, 8),
(16, 2),
(16, 3),
(16, 4),
(16, 5),
(16, 8),
(17, 2),
(17, 3),
(17, 4),
(17, 5),
(17, 8),
(18, 2),
(18, 3),
(18, 4),
(18, 5),
(18, 8),
(19, 2),
(19, 3),
(19, 4),
(19, 5),
(19, 8),
(20, 2),
(20, 3),
(20, 4),
(20, 5),
(20, 8),
(21, 2),
(21, 3),
(21, 4),
(21, 5),
(21, 6),
(21, 7),
(21, 8),
(22, 2),
(22, 3),
(23, 2),
(23, 3),
(23, 8);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `password`, `admin_id`) VALUES
(1, 'رمضان', '123456789', 1),
(3, 'اسماء رجب', '123456733', 1),
(6, 'لمياء', '12345673', 1);

-- --------------------------------------------------------

--
-- Table structure for table `gba`
--

CREATE TABLE `gba` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gba`
--

INSERT INTO `gba` (`id`, `name`) VALUES
(1, 'مقبول'),
(2, 'محمل بمواد'),
(3, 'غياب بعذر'),
(4, 'منقول بمادة و مادة ثانوية'),
(5, 'ناجح'),
(6, 'جيد'),
(7, 'جيد جدا'),
(8, 'ممتاز'),
(9, 'طالب مستجد');

-- --------------------------------------------------------

--
-- Table structure for table `governorate`
--

CREATE TABLE `governorate` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `governorate`
--

INSERT INTO `governorate` (`id`, `name`) VALUES
(1, 'القاهرة'),
(2, 'الجيزة'),
(3, 'الاسكندرية'),
(4, 'الدقهلية'),
(5, 'البحر الاحمر'),
(6, 'البحيرة'),
(7, 'الفيوم'),
(8, 'الغربية'),
(9, 'الاسماعلية'),
(10, 'المنوفية'),
(11, 'المنيا'),
(12, 'القليوبية'),
(13, 'الوادى الجديد'),
(14, 'السويس'),
(15, 'اسوان'),
(16, 'اسيوط'),
(17, 'بنى سويف'),
(18, 'بورسعيد'),
(19, 'دمياط'),
(20, 'الشرقية'),
(21, 'جنوب سيناء'),
(22, 'كفرالشيخ'),
(23, 'مطروح'),
(24, 'الاقصر'),
(25, 'قنا'),
(26, 'شمال سيناء'),
(27, 'سوهاج'),
(30, 'القاهرة');

-- --------------------------------------------------------

--
-- Table structure for table `levels`
--

CREATE TABLE `levels` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `levels`
--

INSERT INTO `levels` (`id`, `name`) VALUES
(1, 'اعدادى'),
(2, 'الاولى'),
(3, 'الثانية'),
(4, 'الثالثة'),
(5, 'الرابعة'),
(6, 'الخامسة'),
(7, 'السادسة'),
(8, 'دراسات عليا');

-- --------------------------------------------------------

--
-- Table structure for table `newstudent`
--

CREATE TABLE `newstudent` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `Eygptian` tinyint(1) NOT NULL,
  `Arrival` tinyint(1) NOT NULL,
  `nationalID` varchar(14) NOT NULL,
  `studentCode` varchar(11) NOT NULL,
  `birthDate` date NOT NULL,
  `gender` enum('Male','Female','','') NOT NULL,
  `religion` enum('muslim','christian','','') NOT NULL,
  `phoneNumber` varchar(11) NOT NULL,
  `mobileNumber` varchar(11) NOT NULL,
  `fatherName` varchar(255) NOT NULL,
  `fatherNationalID` varchar(14) NOT NULL,
  `fatherOccupation` varchar(255) NOT NULL,
  `fatherPhone` varchar(11) NOT NULL,
  `GuardianName` varchar(255) NOT NULL,
  `GuardianNationalID` varchar(14) NOT NULL,
  `ParentsStatus` enum('Father Death','Parents Death','Parental Separation','Alive') DEFAULT NULL,
  `GuardianPhoneNumber` varchar(11) NOT NULL,
  `GuardianRelation` varchar(255) NOT NULL,
  `HousingType` enum('nonspecial','special','','') NOT NULL,
  `HousingWithoutCatering` tinyint(1) NOT NULL COMMENT 'without ==>1\r\nwith ==>0',
  `FamilyAbroad` tinyint(1) NOT NULL COMMENT 'familyabroad ==>1\r\nfamilynotabroad ==>0',
  `SpecialNeed` tinyint(1) NOT NULL COMMENT '0 ==>not special need \r\n1 ==> special need',
  `SecondaryEducationTotalScore` decimal(10,0) NOT NULL,
  `SecondaryEducationRate` decimal(10,0) NOT NULL,
  `SecondaryEducationAbroad` tinyint(1) DEFAULT NULL,
  `SecondaryEducationDivision` enum('علمى علوم','علمى رياضة','ادبى','ازهرى علمى','ازهرى ادبى','معاهد فنية ثلاث سنوات','معاهد فنية اربع سنوات','معاهد فنية خمس سنوات','دبلومات فنية','شهادات معادلة','مدارس  STEM  للعلوم و التكنولوجيا','مدارس النيل للعلوم و التكنولوجيا','تحويل رقمى') NOT NULL,
  `password` varchar(14) NOT NULL,
  `college_id` int(11) NOT NULL,
  `level_id` int(11) NOT NULL,
  `governorate_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `building_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `ConfirmPassword` varchar(14) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `newstudent`
--

INSERT INTO `newstudent` (`id`, `name`, `image_url`, `Eygptian`, `Arrival`, `nationalID`, `studentCode`, `birthDate`, `gender`, `religion`, `phoneNumber`, `mobileNumber`, `fatherName`, `fatherNationalID`, `fatherOccupation`, `fatherPhone`, `GuardianName`, `GuardianNationalID`, `ParentsStatus`, `GuardianPhoneNumber`, `GuardianRelation`, `HousingType`, `HousingWithoutCatering`, `FamilyAbroad`, `SpecialNeed`, `SecondaryEducationTotalScore`, `SecondaryEducationRate`, `SecondaryEducationAbroad`, `SecondaryEducationDivision`, `password`, `college_id`, `level_id`, `governorate_id`, `city_id`, `address`, `building_id`, `employee_id`, `admin_id`, `ConfirmPassword`) VALUES
(2, 'طارق', '', 1, 0, '12345678912345', '12345678912', '2005-02-05', 'Male', 'muslim', '01156478768', '01156478768', 'محمد', '12345678923456', 'مهندس', '01124536783', 'محمد', '12345678954372', '', '', 'الاب', 'nonspecial', 0, 0, 0, '400', '0', 0, 'علمى رياضة', '12345678912345', 1, 1, 17, 1, '', NULL, NULL, NULL, '12345678912345'),
(12, '   اسماء محمد على', '', 1, 0, '23456789532443', '12345673456', '2005-02-05', 'Female', 'muslim', '01134567288', '01134567288', 'محمد درويش', '01134567288342', '', '01134567288', 'محمد', '01134567288342', '', '', 'الاب', 'nonspecial', 0, 0, 0, '400', '0', 0, 'علمى علوم', '23456789532443', 25, 2, 3, 70, '', NULL, NULL, NULL, '23456789532443'),
(14, 'رحمة ', 'images (3).png', 1, 0, '23456789021345', '23452345236', '2005-02-05', 'Female', 'muslim', '01145678356', '01145678356', 'رجب', '11456783566567', '', '01145678356', 'رجب', '11456783566567', 'Alive', '01145678356', 'الاب', 'special', 0, 0, 0, '343', '77', 0, 'ادبى', '23456789021345', 1, 1, 8, 199, 'address', NULL, NULL, NULL, '23456789021345'),
(15, 'ايمان', 'images.jpg', 1, 0, '2345675347683', '45678934567', '2002-04-08', 'Female', 'muslim', '01115467848', '01115467848', 'سلامة', '2345675347685', '', '01115467848', 'سلامة', '2345675347685', 'Alive', '01115467848', 'الاب', 'special', 0, 0, 0, '345', '66', 0, 'علمى رياضة', '2345675347683', 6, 2, 8, 199, 'قثبىرلاابتننالايالاللالاساب', NULL, NULL, NULL, '2345675347683'),
(17, 'ايمان', 'images.jpg', 1, 0, '2345675347683', '45678934567', '2002-04-08', 'Female', 'muslim', '01115467848', '01115467848', 'سلامة', '2345675347685', '', '01115467848', 'سلامة', '2345675347685', 'Alive', '01115467848', 'الاب', 'special', 0, 0, 0, '345', '66', 0, 'علمى رياضة', '2345675347683', 6, 2, 8, 199, 'قثبىرلاابتننالايالاللالاساب', NULL, NULL, NULL, '2345675347683');

-- --------------------------------------------------------

--
-- Table structure for table `oldstudent`
--

CREATE TABLE `oldstudent` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `Eygptian` tinyint(1) NOT NULL,
  `Arrival` tinyint(1) NOT NULL,
  `nationalID` varchar(14) NOT NULL,
  `studentCode` varchar(11) NOT NULL,
  `birthDate` date NOT NULL,
  `gender` enum('Male','Female','','') NOT NULL,
  `religion` enum('muslim','christian','','') NOT NULL,
  `phoneNumber` varchar(11) NOT NULL,
  `mobileNumber` varchar(11) NOT NULL,
  `fatherName` varchar(255) NOT NULL,
  `fatherNationalID` varchar(14) NOT NULL,
  `fatherOccupation` varchar(255) NOT NULL,
  `fatherPhone` varchar(11) NOT NULL,
  `GuardianName` varchar(255) NOT NULL,
  `GuardianNationalID` varchar(14) NOT NULL,
  `ParentsStatus` enum('Father Death','Parents Death','Parental Separation','') DEFAULT NULL,
  `GuardianPhoneNumber` varchar(11) NOT NULL,
  `GuardianRelation` varchar(255) NOT NULL,
  `HousingType` enum('nonspecial','special','','') NOT NULL,
  `successRate` decimal(10,0) NOT NULL,
  `HousingWithoutCatering` tinyint(1) NOT NULL,
  `HousingInPreviousYear` enum('Old','New','Interrupted','') NOT NULL,
  `FamilyAbroad` tinyint(1) NOT NULL,
  `SpecialNeed` tinyint(1) NOT NULL,
  `password` varchar(14) NOT NULL,
  `ConfirmPassword` varchar(14) NOT NULL,
  `college_id` int(11) NOT NULL,
  `Department` varchar(11) NOT NULL,
  `level_id` int(11) NOT NULL,
  `gpa_id` int(11) NOT NULL,
  `governorate_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `building_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `oldstudent`
--

INSERT INTO `oldstudent` (`id`, `name`, `image_url`, `Eygptian`, `Arrival`, `nationalID`, `studentCode`, `birthDate`, `gender`, `religion`, `phoneNumber`, `mobileNumber`, `fatherName`, `fatherNationalID`, `fatherOccupation`, `fatherPhone`, `GuardianName`, `GuardianNationalID`, `ParentsStatus`, `GuardianPhoneNumber`, `GuardianRelation`, `HousingType`, `successRate`, `HousingWithoutCatering`, `HousingInPreviousYear`, `FamilyAbroad`, `SpecialNeed`, `password`, `ConfirmPassword`, `college_id`, `Department`, `level_id`, `gpa_id`, `governorate_id`, `city_id`, `address`, `admin_id`, `employee_id`, `building_id`) VALUES
(2, 'هدى محمد', '2bf2a787-58ef-4cc4-98b1-0e6570125da0.jpg', 1, 0, '23456789532452', '12345678912', '2005-02-05', 'Female', 'muslim', '01134567288', '01134567288', 'محمد درويش', '01134567288342', 'طبيب', '01134567288', 'محمد', '01134567288342', NULL, '01112346545', 'الاب', 'nonspecial', '66', 0, 'Old', 0, 0, '23456789532452', '23456789532452', 1, 'عام', 8, 3, 1, 1, '', NULL, NULL, NULL),
(3, 'على', 'download (1).jpg', 1, 0, '23453423443562', '34565478345', '2000-04-08', 'Male', 'muslim', '01123456783', '01123456783', 'علاء', '23453423443568', '', '01123456783', 'علاء', '23453423443568', NULL, '01123456783', 'الاب', 'special', '88', 0, 'Old', 0, 0, '23453423443562', '23453423443562', 4, 'رسم', 4, 5, 4, 155, 'المطرية', NULL, NULL, NULL),
(4, 'امير', '5a8f5ec4f6786ae9d5961eb6b59b0b53.jpg', 1, 0, '87654367452345', '87654367452', '2002-09-05', 'Male', 'christian', '01112345673', '01112345673', 'عمر', '87654367452345', '', '01234567843', 'عمر', '01234567843344', NULL, '01234567843', 'الاب', 'special', '99', 1, 'Old', 0, 0, '87654367452345', '87654367452345', 1, 'مدنى', 5, 6, 17, 281, 'اهناسيا', NULL, NULL, NULL),
(5, 'امير', '5a8f5ec4f6786ae9d5961eb6b59b0b53.jpg', 1, 0, '87654367452345', '87654367452', '2002-09-05', 'Male', 'christian', '01112345673', '01112345673', 'عمر', '87654367452345', '', '01234567843', 'عمر', '01234567843344', NULL, '01234567843', 'الاب', 'special', '99', 1, 'Old', 0, 0, '87654367452345', '87654367452345', 1, 'مدنى', 5, 6, 17, 281, 'اهناسيا', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `status1`
--

CREATE TABLE `status1` (
  `name` varchar(255) NOT NULL,
  `national_id` varchar(14) NOT NULL,
  `building_number` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `status1`
--

INSERT INTO `status1` (`name`, `national_id`, `building_number`, `student_id`, `id`) VALUES
('   اسماء محمد على', '23456789532443', 2, 12, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `buildings`
--
ALTER TABLE `buildings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id_constrain` (`admin_id`);

--
-- Indexes for table `buildingsemployee`
--
ALTER TABLE `buildingsemployee`
  ADD KEY `building_constrain_id` (`building_id`),
  ADD KEY `employee_constrain_id` (`employee_id`);

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id`),
  ADD KEY `governorate_constrain_id` (`governorate_id`);

--
-- Indexes for table `college`
--
ALTER TABLE `college`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `collegelevel`
--
ALTER TABLE `collegelevel`
  ADD KEY `college_constrain_id` (`college_id`),
  ADD KEY `level_constrain_id` (`level_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id_constrain_id` (`admin_id`);

--
-- Indexes for table `gba`
--
ALTER TABLE `gba`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `governorate`
--
ALTER TABLE `governorate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `newstudent`
--
ALTER TABLE `newstudent`
  ADD PRIMARY KEY (`id`),
  ADD KEY `level_id` (`level_id`),
  ADD KEY `college_id` (`college_id`),
  ADD KEY `governorate_id` (`governorate_id`),
  ADD KEY `city_id` (`city_id`),
  ADD KEY `building_id` (`building_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `oldstudent`
--
ALTER TABLE `oldstudent`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin2_id` (`admin_id`),
  ADD KEY `building2_id` (`building_id`),
  ADD KEY `city2_id` (`city_id`),
  ADD KEY `college2_id` (`college_id`),
  ADD KEY `employee2_id` (`employee_id`),
  ADD KEY `gpa2_id` (`gpa_id`),
  ADD KEY `governorate2_id` (`governorate_id`),
  ADD KEY `level2_id` (`level_id`);

--
-- Indexes for table `status1`
--
ALTER TABLE `status1`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `buildings`
--
ALTER TABLE `buildings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=397;

--
-- AUTO_INCREMENT for table `college`
--
ALTER TABLE `college`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `gba`
--
ALTER TABLE `gba`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `governorate`
--
ALTER TABLE `governorate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `levels`
--
ALTER TABLE `levels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `newstudent`
--
ALTER TABLE `newstudent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `oldstudent`
--
ALTER TABLE `oldstudent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `status1`
--
ALTER TABLE `status1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `buildings`
--
ALTER TABLE `buildings`
  ADD CONSTRAINT `admin_id_constrain` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `buildingsemployee`
--
ALTER TABLE `buildingsemployee`
  ADD CONSTRAINT `building_constrain_id` FOREIGN KEY (`building_id`) REFERENCES `buildings` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `employee_constrain_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `city`
--
ALTER TABLE `city`
  ADD CONSTRAINT `governorate_constrain_id` FOREIGN KEY (`governorate_id`) REFERENCES `governorate` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `collegelevel`
--
ALTER TABLE `collegelevel`
  ADD CONSTRAINT `college_constrain_id` FOREIGN KEY (`college_id`) REFERENCES `college` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `level_constrain_id` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `admin_id_constrain_id` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `newstudent`
--
ALTER TABLE `newstudent`
  ADD CONSTRAINT `admin_id` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `building_id` FOREIGN KEY (`building_id`) REFERENCES `buildings` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `city_id` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `college_id` FOREIGN KEY (`college_id`) REFERENCES `college` (`id`),
  ADD CONSTRAINT `employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `governorate_id` FOREIGN KEY (`governorate_id`) REFERENCES `governorate` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `level_id` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`);

--
-- Constraints for table `oldstudent`
--
ALTER TABLE `oldstudent`
  ADD CONSTRAINT `admin2_id` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `building2_id` FOREIGN KEY (`building_id`) REFERENCES `buildings` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `city2_id` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `college2_id` FOREIGN KEY (`college_id`) REFERENCES `college` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `employee2_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `governorate2_id` FOREIGN KEY (`governorate_id`) REFERENCES `governorate` (`id`),
  ADD CONSTRAINT `gpa2_id` FOREIGN KEY (`gpa_id`) REFERENCES `gba` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `level2_id` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
