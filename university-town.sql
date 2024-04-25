-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2024 at 05:26 PM
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
  `admin_id` int(11) NOT NULL DEFAULT 1
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
(8, 18, 'Female', 160, 6, 1),
(12, 14, 'Female', 200, 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `buildingsemployee`
--

CREATE TABLE `buildingsemployee` (
  `building_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(23, 'معهد التمريض ');

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
  `national_ID` varchar(14) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin_id` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `national_ID`, `password`, `admin_id`) VALUES
(3, 'اسماء رجب', '12245678923456', '123456733', 1);

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
(10, 'راسب'),
(11, 'دور ثان'),
(12, 'منقول بمادة '),
(13, 'منقول بمادتين'),
(14, 'منقول بمادتين و مادة فرعية ');

-- --------------------------------------------------------

--
-- Table structure for table `governorate`
--

CREATE TABLE `governorate` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `governorate`
--

INSERT INTO `governorate` (`id`, `name`, `status`) VALUES
(1, 'القاهرة', 0),
(2, 'الجيزة', 0),
(3, 'الاسكندرية', 3),
(4, 'الدقهلية', 4),
(5, 'البحر الاحمر', 2),
(6, 'البحيرة', 3),
(7, 'الفيوم', 4),
(8, 'الغربية', 4),
(9, 'الاسماعلية', 2),
(10, 'المنوفية', 4),
(11, 'المنيا', 4),
(12, 'القليوبية', 0),
(13, 'الوادى الجديد', 1),
(14, 'السويس', 2),
(15, 'اسوان', 1),
(16, 'اسيوط', 1),
(17, 'بنى سويف', 4),
(18, 'بورسعيد', 3),
(19, 'دمياط', 3),
(20, 'الشرقية', 4),
(21, 'جنوب سيناء', 2),
(22, 'كفرالشيخ', 3),
(23, 'مطروح', 4),
(24, 'الاقصر', 1),
(25, 'قنا', 1),
(26, 'شمال سيناء', 2),
(27, 'سوهاج', 1);

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
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `Eygptian` tinyint(1) DEFAULT NULL,
  `nationalID` varchar(14) DEFAULT NULL,
  `studentCode` varchar(11) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `gender` enum('Male','Female','','') DEFAULT NULL,
  `religion` enum('muslim','christian','','') DEFAULT NULL,
  `phoneNumber` varchar(11) DEFAULT NULL,
  `mobileNumber` varchar(11) DEFAULT NULL,
  `fatherName` varchar(255) DEFAULT NULL,
  `fatherNationalID` varchar(14) DEFAULT NULL,
  `fatherOccupation` varchar(255) DEFAULT NULL,
  `fatherPhone` varchar(11) DEFAULT NULL,
  `GuardianName` varchar(255) DEFAULT NULL,
  `GuardianNationalID` varchar(14) DEFAULT NULL,
  `ParentsStatus` enum('Father Death','Parents Death','Parental Separation','Alive') DEFAULT NULL,
  `GuardianPhoneNumber` varchar(11) DEFAULT NULL,
  `GuardianRelation` varchar(255) DEFAULT NULL,
  `HousingType` enum('nonspecial','special','','') DEFAULT NULL,
  `HousingWithoutCatering` tinyint(1) DEFAULT NULL COMMENT 'without ==>1\r\nwith ==>0',
  `FamilyAbroad` tinyint(1) DEFAULT NULL COMMENT 'familyabroad ==>1\r\nfamilynotabroad ==>0',
  `SpecialNeed` tinyint(1) DEFAULT NULL COMMENT '0 ==>not special need \r\n1 ==> special need',
  `SecondaryEducationTotalScore` decimal(10,0) DEFAULT NULL,
  `SecondaryEducationRate` decimal(10,0) DEFAULT NULL,
  `SecondaryEducationAbroad` tinyint(1) DEFAULT NULL,
  `SecondaryEducationDivision` enum('علمى علوم','علمى رياضة','ادبى','ازهرى علمى','ازهرى ادبى','معاهد فنية ثلاث سنوات','معاهد فنية اربع سنوات','معاهد فنية خمس سنوات','دبلومات فنية','شهادات معادلة','مدارس  STEM  للعلوم و التكنولوجيا','مدارس النيل للعلوم و التكنولوجيا','تحويل رقمى') DEFAULT NULL,
  `password` varchar(14) DEFAULT NULL,
  `college_id` int(11) DEFAULT NULL,
  `level_id` int(11) DEFAULT NULL,
  `governorate_id` int(11) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `building_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `ConfirmPassword` varchar(14) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `newstudent`
--

INSERT INTO `newstudent` (`id`, `name`, `email`, `Eygptian`, `nationalID`, `studentCode`, `birthDate`, `gender`, `religion`, `phoneNumber`, `mobileNumber`, `fatherName`, `fatherNationalID`, `fatherOccupation`, `fatherPhone`, `GuardianName`, `GuardianNationalID`, `ParentsStatus`, `GuardianPhoneNumber`, `GuardianRelation`, `HousingType`, `HousingWithoutCatering`, `FamilyAbroad`, `SpecialNeed`, `SecondaryEducationTotalScore`, `SecondaryEducationRate`, `SecondaryEducationAbroad`, `SecondaryEducationDivision`, `password`, `college_id`, `level_id`, `governorate_id`, `city_id`, `address`, `building_id`, `employee_id`, `admin_id`, `ConfirmPassword`) VALUES
(2, 'طارق', NULL, 1, '12345678912345', '12345678912', '2005-02-05', 'Male', 'muslim', '01156478768', '01156478768', 'محمد', '12345678923456', 'مهندس', '01124536783', 'محمد', '12345678954372', '', '', 'الاب', 'nonspecial', 0, 0, 0, '400', '0', 0, 'علمى رياضة', '12345678912345', 1, 1, 17, 1, '', NULL, NULL, NULL, '12345678912345'),
(12, '   اسماء محمد على', NULL, 1, '23456789532443', '12345673456', '2005-02-05', 'Female', 'muslim', '01134567288', '01134567288', 'محمد درويش', '01134567288342', '', '01134567288', 'محمد', '01134567288342', '', '', 'الاب', 'nonspecial', 0, 0, 1, '400', '0', 0, 'علمى علوم', '23456789532443', 5, 2, 3, 70, '', NULL, NULL, NULL, '23456789532443'),
(14, 'rrrr', 'wwwww@gmail.com', 1, '54673825467829', '12345678345', '2005-02-05', 'Female', 'muslim', '01112456375', '01112456375', 'ggggg', '01112456375456', '', '01112456375', 'gggg', '2223444566345', 'Alive', '01112456375', 'father', 'special', 1, 0, 0, '342', '77', 0, 'ادبى', '54673825467829', 2, 4, 5, 122, 'dddddd', NULL, NULL, NULL, '54673825467829'),
(21, 'ولاء', NULL, 1, '234567534 4', '45678934567', '2002-04-08', 'Female', 'muslim', '01115467848', '01115467848', 'سلامة', '2345675347685', '', '01115467848', 'سلامة', '2345675347685', 'Alive', '01115467848', 'الاب', 'nonspecial', 0, 0, 0, '345', '66', 0, 'علمى رياضة', '234567534 4', 6, 2, 2, 79, 'قثبىرلاابتننالايالاللالاساب', NULL, NULL, NULL, '234567534 4'),
(22, 'علياء', NULL, 1, '23456753457', '45678934567', '2002-04-08', 'Female', 'muslim', '01115467848', '01115467848', 'سلامة', '2345675347685', '', '01115467848', 'سلامة', '2345675347685', 'Alive', '01115467848', 'الاب', 'special', 0, 0, 0, '345', '66', 0, 'علمى رياضة', '23456753457', 6, 2, 1, 1, 'قثبىرلاابتننالايالاللالاساب', NULL, NULL, NULL, '23456753457'),
(23, 'عادل', 'hoda@gmail.com', 1, '23456753452', '45678934567', '2002-04-08', 'Male', 'muslim', '01115467848', '01115467848', 'سلامة', '2345675347685', NULL, '01115467848', 'سلامة', '2345675347685', 'Alive', '01115467848', 'الاب', 'special', 0, 0, 0, '345', '66', 0, 'علمى رياضة', '23456753452', 6, 2, 1, 1, 'قثبىرلاابتننالايالاللالاساب', NULL, NULL, NULL, '23456753452'),
(26, 'lila', 'lila@gmail.com', 0, '54673825467866', '12345678345', '2002-02-04', 'Female', 'muslim', '01112456375', '01112456375', 'ggggg', '01112456375456', NULL, '01112456375', 'gggg', '2223444566345', NULL, '01112456375', 'father', 'special', 0, 0, 0, '342', '77', 0, 'علمى رياضة', '54673825467866', 2, 4, 5, 122, 'dddddd', NULL, NULL, NULL, '54673825467866'),
(28, 'saly', 'lila@gmail.com', 1, '54673825467899', '12345678345', '2005-02-05', 'Female', 'muslim', '01112456375', '01112456375', 'ggggg', '01112456375456', NULL, '01112456375', 'gggg', '2223444566345', 'Alive', '01112456375', 'father', 'special', 1, 0, 1, '342', '77', 0, 'ادبى', '54673825467899', 2, 4, 5, 122, 'dddddd', NULL, NULL, NULL, '54673825467899');

-- --------------------------------------------------------

--
-- Table structure for table `oldstudent`
--

CREATE TABLE `oldstudent` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `Eygptian` tinyint(1) DEFAULT NULL,
  `nationalID` varchar(14) DEFAULT NULL,
  `studentCode` varchar(11) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `gender` enum('Male','Female','','') DEFAULT NULL,
  `religion` enum('muslim','christian','','') DEFAULT NULL,
  `phoneNumber` varchar(11) DEFAULT NULL,
  `mobileNumber` varchar(11) DEFAULT NULL,
  `fatherName` varchar(255) DEFAULT NULL,
  `fatherNationalID` varchar(14) DEFAULT NULL,
  `fatherOccupation` varchar(255) DEFAULT NULL,
  `fatherPhone` varchar(11) DEFAULT NULL,
  `GuardianName` varchar(255) DEFAULT NULL,
  `GuardianNationalID` varchar(14) DEFAULT NULL,
  `ParentsStatus` enum('Father Death','Parents Death','Parental Separation','') DEFAULT NULL,
  `GuardianPhoneNumber` varchar(11) DEFAULT NULL,
  `GuardianRelation` varchar(255) DEFAULT NULL,
  `HousingType` enum('nonspecial','special','','') DEFAULT NULL,
  `successRate` decimal(10,0) DEFAULT NULL,
  `HousingWithoutCatering` tinyint(1) DEFAULT NULL,
  `HousingInPreviousYear` enum('Old','New','Interrupted','') DEFAULT NULL,
  `FamilyAbroad` tinyint(1) DEFAULT NULL,
  `SpecialNeed` tinyint(1) DEFAULT NULL,
  `password` varchar(14) DEFAULT NULL,
  `ConfirmPassword` varchar(14) DEFAULT NULL,
  `college_id` int(11) DEFAULT NULL,
  `Department` varchar(11) DEFAULT NULL,
  `level_id` int(11) DEFAULT NULL,
  `gpa_id` int(11) DEFAULT NULL,
  `governorate_id` int(11) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `building_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `oldstudent`
--

INSERT INTO `oldstudent` (`id`, `name`, `email`, `Eygptian`, `nationalID`, `studentCode`, `birthDate`, `gender`, `religion`, `phoneNumber`, `mobileNumber`, `fatherName`, `fatherNationalID`, `fatherOccupation`, `fatherPhone`, `GuardianName`, `GuardianNationalID`, `ParentsStatus`, `GuardianPhoneNumber`, `GuardianRelation`, `HousingType`, `successRate`, `HousingWithoutCatering`, `HousingInPreviousYear`, `FamilyAbroad`, `SpecialNeed`, `password`, `ConfirmPassword`, `college_id`, `Department`, `level_id`, `gpa_id`, `governorate_id`, `city_id`, `address`, `admin_id`, `employee_id`, `building_id`) VALUES
(2, 'هدى محمد', NULL, 0, '23456789532452', '12345678912', '2005-02-05', 'Female', 'muslim', '01134567288', '01134567288', 'محمد درويش', '01134567288342', 'طبيب', '01134567288', 'محمد', '01134567288342', NULL, '01112346545', 'الاب', 'nonspecial', '66', 0, 'Old', 0, 1, '23456789532452', '23456789532452', 1, 'عام', 8, 6, 1, 1, '', NULL, NULL, NULL),
(3, 'على', 'ali@gmail.com', 1, '23453423443562', '34565478346', '2000-04-08', 'Male', 'muslim', '01123456783', '01123456783', 'علاء', '23453423443568', '', '01123456783', 'علاء', '23453423443568', NULL, '01123456783', 'الاب', 'nonspecial', '88', 0, 'Old', 0, 0, '23453423443562', '23453423443562', 4, 'رسم', 4, 5, 4, 155, 'المطرية', NULL, NULL, NULL),
(4, 'امير', NULL, 1, '87654367452345', '87654367452', '2002-09-05', 'Male', 'christian', '01112345673', '01112345673', 'عمر', '87654367452345', '', '01234567843', 'عمر', '01234567843344', NULL, '01234567843', 'الاب', 'special', '99', 1, 'Old', 0, 0, '87654367452345', '87654367452345', 1, 'مدنى', 5, 10, 16, 281, 'اهناسيا', NULL, NULL, NULL),
(5, 'حسن', NULL, 1, '87654367452366', '87654367452', '2002-09-05', 'Male', 'christian', '01112345673', '01112345673', 'عمر', '87654367452345', '', '01234567843', 'عمر', '01234567843344', NULL, '01234567843', 'الاب', 'nonspecial', '99', 1, 'Old', 0, 0, '87654367452366', '87654367452366', 18, 'مدنى', 5, 6, 21, 281, 'اهناسيا', NULL, NULL, NULL),
(7, 'نبيل', NULL, 1, '8765436747754', '87654367452', '2002-09-05', 'Male', 'christian', '01112345673', '01112345673', 'عمر', '87654367452345', '', '01234567843', 'عمر', '01234567843344', NULL, '01234567843', 'الاب', 'nonspecial', '99', 1, 'Old', 0, 1, '8765436747754', '8765436747754', 4, 'مدنى', 4, 1, 3, 281, 'اهناسيا', NULL, NULL, NULL),
(9, 'رحيم', NULL, 1, '87654367488', '87654367452', '2002-09-05', 'Male', 'christian', '01112345673', '01112345673', 'عمر', '87654367452345', '', '01234567843', 'عمر', '01234567843344', NULL, '01234567843', 'الاب', 'nonspecial', '99', 1, 'Old', 0, 0, '87654367488', '87654367488', 1, 'مدنى', 5, 6, 17, 79, 'اهناسيا', NULL, NULL, NULL),
(11, 'سمير', NULL, 1, '87654367489', '87654367452', '2002-09-05', 'Male', 'christian', '01112345673', '01112345673', 'عمر', '87654367452345', '', '01234567843', 'عمر', '01234567843344', NULL, '01234567843', 'الاب', 'special', '99', 1, 'Old', 0, 0, '87654367489', '87654367489', 1, 'مدنى', 5, 10, 12, 236, 'اهناسيا', NULL, NULL, NULL),
(12, 'ابراهيم ', NULL, 1, '87654367483', '87654367452', '2002-09-05', 'Male', 'christian', '01112345673', '01112345673', 'عمر', '87654367452345', '', '01234567843', 'عمر', '01234567843344', NULL, '01234567843', 'الاب', 'special', '99', 1, 'Old', 0, 0, '87654367483', '87654367483', 1, 'مدنى', 5, 10, 1, 1, 'اهناسيا', NULL, NULL, NULL),
(13, 'حسين', NULL, 1, '87654367455', '87654367452', '2002-09-05', 'Male', 'christian', '01112345673', '01112345673', 'عمر', '87654367452345', '', '01234567843', 'عمر', '01234567843344', NULL, '01234567843', 'الاب', 'special', '99', 1, 'Old', 0, 0, '87654367455', '87654367455', 5, 'مدنى', 3, 5, 1, 1, 'اهناسيا', NULL, NULL, NULL),
(14, 'علا', 'ola@gmail.com', 1, '87654367499', '87654367452', '2002-09-05', 'Female', 'christian', '01112345673', '01112345673', 'عمر', '87654367452345', NULL, '01234567843', 'عمر', '01234567843344', NULL, '01234567843', 'الاب', 'special', '99', 1, 'Old', 0, 0, '87654367499', '87654367499', 5, 'مدنى', 3, 5, 1, 1, 'اهناسيا', NULL, NULL, NULL),
(15, 'lilta', 'lila@gmail.com', 1, '54673825467866', '12345678345', '2005-02-05', 'Female', 'muslim', '01112456375', '01112456375', 'ggggg', '01112456375456', NULL, '01112456375', 'gggg', '2223444566345', '', '01112456375', 'father', 'special', '88', 0, 'Old', 0, 0, '54673825467866', '54673825467866', 2, 'ggg', 4, 5, 5, 122, 'dddddd', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `status1`
--

CREATE TABLE `status1` (
  `name` varchar(255) NOT NULL,
  `national_id` varchar(14) NOT NULL,
  `id` int(11) NOT NULL,
  `building_number` int(11) NOT NULL,
  `college_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `status1`
--

INSERT INTO `status1` (`name`, `national_id`, `id`, `building_number`, `college_name`) VALUES
('   اسماء محمد على', '23456789532443', 67, 2, 'كلية الحاسبات و المعلومات '),
('lila', '54673825467866', 108, 4, 'كلية التجارة'),
('rrrr', '54673825467829', 109, 4, 'كلية التجارة'),
('علياء', '23456753457', 110, 4, 'كلية السياحة و الفنادق'),
('عادل', '23456753452', 111, 3, 'كلية السياحة و الفنادق'),
('saly', '54673825467899', 112, 4, 'كلية التجارة'),
('ولاء', '234567534 4', 113, 12, 'كلية السياحة و الفنادق');

-- --------------------------------------------------------

--
-- Table structure for table `status2`
--

CREATE TABLE `status2` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `national_id` varchar(255) NOT NULL,
  `building_number` int(11) NOT NULL,
  `college_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `status2`
--

INSERT INTO `status2` (`id`, `name`, `national_id`, `building_number`, `college_name`) VALUES
(34, 'على', '23453423443562', 3, 'كلية الفنون الجميلة'),
(36, 'نبيل', '8765436747754', 3, 'كلية الفنون الجميلة'),
(38, 'هدى محمد', '23456789532452', 4, 'كلية الهندسة بحلوان '),
(39, 'رحيم', '87654367488', 1, 'كلية الهندسة بحلوان ');

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
-- Indexes for table `status2`
--
ALTER TABLE `status2`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=397;

--
-- AUTO_INCREMENT for table `college`
--
ALTER TABLE `college`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `gba`
--
ALTER TABLE `gba`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `oldstudent`
--
ALTER TABLE `oldstudent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `status1`
--
ALTER TABLE `status1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `status2`
--
ALTER TABLE `status2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

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
  ADD CONSTRAINT `employee_constrain_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
