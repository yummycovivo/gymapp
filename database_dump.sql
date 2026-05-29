-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for osx10.10 (x86_64)
--
-- Host: localhost    Database: personal_gym_sql
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pg_history`
--

DROP TABLE IF EXISTS `pg_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pg_history` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `start_time` bigint(20) NOT NULL,
  `end_time` bigint(20) DEFAULT NULL,
  `workout_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`workout_data`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pg_history`
--

LOCK TABLES `pg_history` WRITE;
/*!40000 ALTER TABLE `pg_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `pg_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pg_templates`
--

DROP TABLE IF EXISTS `pg_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pg_templates` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `exercises` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`exercises`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pg_templates`
--

LOCK TABLES `pg_templates` WRITE;
/*!40000 ALTER TABLE `pg_templates` DISABLE KEYS */;
/*!40000 ALTER TABLE `pg_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pg_wger_exercises`
--

DROP TABLE IF EXISTS `pg_wger_exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pg_wger_exercises` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=501 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pg_wger_exercises`
--

LOCK TABLES `pg_wger_exercises` WRITE;
/*!40000 ALTER TABLE `pg_wger_exercises` DISABLE KEYS */;
INSERT INTO `pg_wger_exercises` VALUES (386,'1-Arm Half-Kneeling Lat Pulldown'),(5,'1/2 Kneeling Thoracic Rotation'),(159,'2 Handed Kettlebell Swing'),(176,'3D lunge warmup'),(39,'4-Hitung burpe'),(466,'Ab wheel'),(348,'Abdominales con mancuerna'),(346,'Abdominales en bicicleta'),(22,'Abdominales en V con Balón Medicinal'),(293,'Abdominales HD'),(139,'Abdominales rusas'),(163,'Abduction while standing'),(50,'Abwechselnde Bizepscurls'),(48,'Achternek rekken'),(24,'Addominali alla sbarra'),(37,'Addominali alla sbarra a gambe distese'),(8,'Adım atma'),(168,'Affondi indietro alternati'),(490,'Affondo laterale con pattina'),(237,'Allenamento al sacco'),(158,'Alongamento frontal do pescoço'),(38,'Alpinista'),(194,'Alternating Biceps Curls With Dumbbell'),(402,'Alternating High Cable Row'),(414,'Alternative DB Gorilla rows'),(12,'Alzate posteriori'),(56,'Angličáky'),(40,'Angličáky bez kliku'),(66,'Aperturas en Máquina para Pecho'),(88,'Aperturas en polea'),(189,'Arabesque'),(455,'Archer Pull Up'),(276,'Arco femorale una gamba'),(492,'Arm Raises (T/Y/I)'),(214,'Australian pull-ups'),(6,'Axe Hold'),(256,'Back bridge'),(190,'Back extensión'),(437,'Ball Slams'),(317,'Band pull-aparts'),(26,'Barbell Ab Rollout'),(80,'Barbell Clean and press'),(70,'Barbell Hip Thrust'),(449,'Barbell Romanian Deadlift (RDL)'),(445,'Barbell Row (Overhand)'),(446,'Barbell Row (Underhand)'),(77,'Barchetta'),(42,'Barnets position'),(436,'Battle Ropes'),(314,'Bauch-Twist Gerät'),(409,'Bayesian Curl'),(327,'Bear crawl pull through'),(20,'Bear Walk'),(104,'Beinheben am Roman Chair'),(248,'Beinstrecker'),(294,'Bench Dips On Floor HD'),(45,'Bent High Pulls'),(385,'Bent over Cable Flye'),(134,'Bent over row to external rotation'),(162,'Bent Over Rowing Reverse'),(264,'Biceps Close Grip Pull Down'),(17,'Biceps con TRX'),(171,'Biceps concentrado'),(349,'Biceps Curl Machine'),(62,'Bicho Muerto'),(60,'Bicicletta'),(465,'Bird Dog'),(399,'Bizeps Curls Trifecta'),(391,'Black Widow Knee Slides'),(310,'Blackroll'),(49,'Blaze'),(41,'Bodensenken'),(44,'Body-Ups'),(494,'Bodyweight Biceps Curl'),(296,'Bodyweight lunge HD'),(319,'Bodyweight Squat HD'),(23,'Box squat'),(313,'Boxsprünge'),(470,'Bretzel stretch'),(472,'Bronco'),(57,'Brustpresse'),(457,'Bulgarian Squat with Dumbbells'),(71,'BUS DRIVERS'),(460,'Butchers Block Stretch'),(392,'Butterfly Sit Up'),(215,'Cable Chest Press - Decline'),(281,'Cable Chest Press - Incline'),(443,'Cable Curls'),(253,'Cable External Rotation'),(34,'Cable Fly'),(429,'Cable Fly Lower Chest'),(418,'Cable Fly Middle Chest'),(419,'Cable Fly Upper Chest'),(329,'Cable Lateral Raises (Single Arm)'),(375,'Cable Press Around'),(388,'Cable Shrug-In'),(286,'Cable Tri Extension - Internal Rotation'),(421,'Cable Tricep Kickback'),(285,'Cable Triceps Press'),(61,'Cable Woodchoppers'),(382,'Calf Raise using Hack Squat Machine'),(203,'Calf raises, left leg'),(500,'Cardio en cinta'),(14,'Carrera en Zona 2'),(487,'Cat-Cow'),(46,'Chin tuck'),(63,'Chin Up'),(55,'Chin-ups'),(299,'Círculos de perna (frente-trás)'),(461,'Clap Push-UP'),(218,'Claps over the head'),(359,'Clean'),(367,'Clean and Jerk OL'),(370,'ClimbMill'),(136,'Close-grip Press-ups'),(371,'Cobra Stretch'),(223,'Codo unilateral polea alta'),(31,'Coice'),(117,'Contragolpe de tríceps con mancuernas'),(491,'Copenhagen Adduction Exercise'),(35,'Corda de Salto: saltos básicos'),(28,'Corsa sul posto con ginocchia alte'),(341,'Cossack squat'),(16,'Croci in sospensione'),(58,'Croci su panca piana'),(376,'Cross-Body Cable Y-Raise'),(338,'Crossbody Hamstring Stretch'),(334,'Crossbody Leg Swings'),(351,'Crunch lateral de pie'),(147,'Crunch lesté'),(288,'Curl  - With Shoulder Elevated'),(381,'Curl Araña'),(123,'Curl con kettlebell a due mani'),(21,'Curl con kettlebell una sola mano'),(67,'Curl con Mancuernas en Banco Scott'),(272,'Curl con mancuernas sentado'),(220,'Curl cuadriceps'),(193,'Curl de biceps con agarre prono'),(53,'Curl de Predicador Inverso'),(33,'Curl en Polea con Barra Recta'),(369,'Curl inclinado con mancuernas'),(101,'Curl inversi con bilanciere'),(65,'Curl Inverso con Barra EZ en Polea'),(52,'Curl Nórdico'),(32,'Curl Nórdico Inverso'),(204,'Cycling cardio session'),(415,'DB Cross Body Hammer Curls'),(413,'DB UCV'),(411,'DB Underhand bench press'),(410,'DB Upper Chest Variation'),(59,'Deadhang'),(43,'Deadlift Kettlebell'),(447,'Delt Stretch'),(464,'Devil’s Press'),(110,'Distensione su Panca Piana Imp Stretta'),(9,'Dominadas comando'),(29,'Dominadas en Tabla de Multipresas'),(108,'Doorway Pectoral Stretch'),(308,'Double Kettlebell Clean and Press'),(309,'Double Kettlebell Front Squat'),(242,'Double Leg Calf Raise'),(30,'Draaiend opdrukken'),(397,'Drag Pushdown'),(343,'Dragon Flag'),(201,'Dragon squat'),(424,'Drop Curl'),(107,'Dumbbell Bent Over Face Pull'),(224,'Dumbbell bicep curl to press'),(417,'Dumbbell Bradford press'),(398,'Dumbbell Cheat Curl'),(226,'Dumbbell close grip bench press'),(312,'Dumbbell Deadlift'),(219,'Dumbbell drag curls'),(177,'Dumbbell farmer\'s carry'),(416,'Dumbbell Frog Press'),(143,'Dumbbell Front Squat'),(137,'Dumbbell Hang Power Cleans'),(307,'Dumbbell Hex Press'),(145,'Dumbbell Hip Thrust'),(404,'Dumbbell Pullover'),(225,'Dumbbell rear delt row'),(149,'Dumbbell Rear Lunge'),(155,'Dumbbell Romanian Deadlift'),(488,'Dumbbell Scaption'),(352,'Dumbbell Shoulder Rotations'),(146,'Dumbbell Shrug'),(148,'Dumbbell Side Bend'),(150,'Dumbbell Side Squat'),(233,'Dumbbell Single-leg Hip Thrust'),(311,'Dumbbell Split Squat'),(138,'Dumbbell sumo deadlift'),(325,'Dumbbell Thruster'),(379,'Dumbbell Underhand Dead Row'),(222,'Dumbbell wide bicep curls'),(269,'Dynamic Planche'),(165,'Dynamic side hold'),(412,'Elbows Tucked DB Bench Press'),(330,'Elephant Walks'),(151,'Elevação lateral na mãquina'),(157,'Elevación Deltoides Posterior'),(91,'Elevación frontal con cable'),(459,'Elevacion lateral polea'),(200,'Elevación tibial anterior'),(130,'Elevated prayer stretch'),(27,'Elliptical'),(7,'Empuje de tríceps en cable'),(243,'Esercizio di yoga: Mucca-gatto'),(340,'Estensione Plank-Gomito'),(479,'Estiramiento de brazos y cuello'),(478,'Estiramiento de piernas y cadera'),(373,'Estiramiento de rodilla al pecho'),(372,'Estiramiento de rotación del torso'),(239,'Exercise Band Dorsiflexion'),(241,'Exercise Band Plantarflexion'),(185,'Extensión de gluteo en  máquina'),(184,'Extensión de gluteos en polea'),(191,'Extensión de tríceps en polea con cuerda'),(298,'Extension Triceps Poulie Basse à Un Bras'),(86,'Eκτάσεις-ανατάσεις με αναπήδηση'),(64,'Face Pulls'),(208,'Fallschirmspringer in T-Position'),(212,'Finger Pushup'),(11,'Fingerboard 20 mm edge'),(434,'Flat Machine Press'),(98,'Flessioni del luccio'),(154,'Flexión lateral'),(13,'Flexiones de Pino'),(384,'Floor Skull Crusher'),(258,'Fondos en TRX'),(301,'Forearm Curls (underhand grip)'),(72,'Fortalecedor de Agarre'),(235,'Frog stand'),(244,'Front Lever'),(249,'Front lever pull-up'),(250,'Front lever tuck'),(287,'Front Plank'),(83,'Front Plate Raise'),(103,'Front Wood Chop'),(209,'Full Sit Outs'),(326,'Glute Bridge Single-Arm Press'),(440,'Glute Drive'),(495,'Glute Kickback (Machine)'),(331,'Good Morning'),(82,'Good Mornings'),(347,'Hack Squats'),(290,'Hampelmann HD'),(336,'Hamstring Chokes'),(323,'Hamstring Kicks'),(428,'Handstand'),(109,'Hardlopen'),(51,'Head tilts'),(47,'Head turns'),(345,'Heel Touches'),(283,'Helms Row'),(74,'Hercules Pillars'),(69,'High Knee Jumps'),(292,'High Knee Skips HD'),(76,'High Pull'),(408,'High Row'),(278,'High-Cable Cross Tricep Extention - NB'),(420,'High-Incline Smith Machine Press'),(132,'Hindu Pushups'),(471,'Hip hinge'),(73,'Hip Raise, Lying'),(485,'Horizontal Shoulder Flexion Stretch'),(167,'Horizontal traction isometry'),(403,'Hyper Y W Combo'),(68,'Hyperextensions'),(247,'Ice Scream maker'),(365,'Incline Chest Press DB'),(266,'Incline Chest-Supported Dumbbell Row'),(383,'Incline Close Grip Barbell Bench Press'),(263,'Incline Dumbbell Press'),(81,'Incline Dumbbell Row'),(362,'Incline OHP DB'),(221,'Incline Shoulder Press Up'),(156,'Incline Skull Crush'),(430,'Incline Smith Press'),(432,'Incline Static Hold'),(199,'Inverted Rows'),(265,'Isometria trazioni impugnatura inversa'),(85,'Isometric Wipers'),(180,'Jalón abierto'),(181,'Jalón abierto supino'),(451,'Jalón al pecho con agarre ancho'),(486,'Jalon caballero unialteral'),(182,'Jalón cerrado'),(183,'Jalón cerrado supino'),(188,'JALON EN BANCO INCLINADO'),(186,'JALONES PECHO NEUTRO'),(366,'Jerk OL'),(282,'JM Press'),(89,'Joggen'),(144,'Kettlebell One Legged Deadlift'),(18,'Kettlebell Swing'),(10,'Kettlebell swing a una mano'),(423,'Kong Curl'),(295,'Kopfüber Gewichtaufheben'),(363,'Kreis Press DB'),(387,'Kroc Row'),(96,'L Hold'),(87,'Landmine press'),(456,'Larsen Press'),(355,'Lat Pull DB'),(280,'Lat Pulldown - Cross Body Single Arm'),(297,'Lateral Push Off'),(426,'Lateral Walk'),(489,'Leg curl con elastico'),(427,'Leg Press Toe Press'),(394,'Levitation Crunch'),(93,'Long-Pulley'),(90,'Long-Pulley (eng)'),(259,'Low Pulley Cable Fly'),(277,'Low-Cable Cross-Over - NB'),(306,'Lower Back Extensions'),(442,'Lying Dumbbell Curls'),(15,'LYING DUMBBELL ROW SS SEATED SHRUG'),(289,'Lying Leg Raise'),(94,'Lying Rotator Cuff Exercise'),(396,'Lying Triceps Extensions'),(406,'Lying Triceps Kickback'),(152,'Machine Chest Press Exercise'),(477,'March or jog in place'),(4,'Marching High Knees'),(284,'Meadows Row'),(481,'Meditación guiada o libre'),(105,'Modified pulldown'),(95,'Muscle up'),(422,'Neutral Grip Lat Pulldown'),(377,'No Leg Drive Dumbbell Chest Press'),(251,'Oblicuos en TRX'),(400,'Omni Cable Cross-over'),(192,'One Arm Bent Row'),(275,'One armed push-ups'),(450,'One-Arm Heavy Row'),(100,'Overhand Cable Curl'),(425,'Overhead Cable Tricep Extension'),(129,'Overhead Press'),(431,'Overhead Triceps Extension'),(196,'PALLOF PRESS'),(499,'Patada de glúteo con banda elástica'),(452,'Patadas traseras'),(380,'Pause Hack Squats'),(439,'Pendelkniebeube'),(433,'Pendular hack'),(473,'Perpendicular Unilateral Landmine Row'),(112,'Piegamenti laterali con manubri'),(357,'Pin Bench Press BB'),(360,'Pin OHP'),(358,'Pin Squat'),(19,'Piques de 50m en Natación'),(141,'Plancha a una mano alterna'),(344,'Plancha con elevación de pierna'),(271,'Planche de cote dynamique'),(405,'Plank Jacks'),(262,'Plantarflexion Stretch with Band'),(353,'Plate Pinch Hold'),(173,'Pompes déclinées'),(213,'Pompes sur les genoux'),(169,'Ponte in camminata'),(124,'Power Clean'),(339,'Preacher Curl - Externally Rotated'),(279,'Preacher Curl - Internally Rotated'),(84,'Prensa Smith'),(161,'Press Banca Sentado'),(54,'Press Inclinado Ligero en Máquina Smith'),(207,'Prisoner Squat'),(97,'Prone Scapular Retraction - Arms at Side'),(267,'Pseudo Planche Push-up'),(187,'PULL OVER POLEA ALTA'),(448,'Pull-up Isometric Hold'),(483,'Pull-Ups (Neutral Grip)'),(444,'Pull-Ups (Wide Grip)'),(260,'Pullover'),(320,'Pullover Machine'),(378,'punches'),(361,'Push OHP'),(463,'Push-Up'),(172,'Push-Ups | Incline'),(174,'Push-Ups | Parallettes'),(92,'Quadriped Arm and Leg Raise'),(131,'Quadruped thoracic rotation left'),(106,'Quadruped thoracic rotation right'),(270,'Reach ups'),(211,'Recruitment Pulls'),(315,'Recumbent Bike'),(407,'Remada unilateral no cabo'),(240,'Rematore seduto al cavo'),(234,'Remo alto desde polea'),(36,'Remo en TRX'),(178,'Remo maquina agarre estrecho'),(179,'Remo maquina agarre estrecho supino'),(480,'Respiración profunda (de pie o sentado)'),(175,'Rest (for timed workouts)'),(389,'Reverse Cable Flye'),(484,'Reverse Fly Standing'),(273,'Reverse Grip Barbell Curls'),(111,'Reverse Plank'),(210,'Reverse Snow Angel'),(354,'Reverse Wood Chops'),(401,'Rocking Triceps Pushdown'),(337,'Roll Down'),(78,'Rope Pullover/row'),(160,'Rowing Machine'),(356,'Scapula Pulls'),(303,'Schoulder Raise (Dumbbell)'),(245,'Schulterbreite Dreipunkt-Liegestütze'),(467,'Schwimmen'),(128,'Scivoli a muro'),(206,'Scorpion Kick'),(122,'SEATED CABLE MID TRAP SHRUG'),(229,'Seated Cable Rows'),(393,'Seated Corkscrew'),(99,'Seated Dumbbell Side Lateral'),(305,'seated figure four'),(300,'Seated Hip Abduction'),(170,'Seated Knee Tuck'),(164,'Seated rear delt rise'),(497,'Seated Row (Machine)'),(114,'Seilspringen'),(115,'Seitliches Oberkörperbeugen am Gerät'),(498,'Sentadilla con pesa rusa'),(133,'Shoulder dislocates'),(216,'Shoulder Dumbbell Pendular Exercise'),(217,'Shoulder External Rotation with Dumbbell'),(364,'Shoulder Raise Side and Front DB'),(202,'Side Lying Hip Abduction'),(197,'Side Slides + Squats'),(475,'Side-laying interior rotation'),(113,'Side-lying External Rotation'),(79,'Single arm row'),(332,'Single Leg Hamstring Stretch'),(291,'Single Leg RDL'),(333,'Sit & Reach'),(395,'Sit Up Elbow Thrust'),(261,'Sitting Calf Stretch (Dorsiflexion)'),(438,'Ski Machine'),(435,'Sled Push'),(462,'Sleeper Stretch'),(25,'Sloper hanging'),(2,'Slow Squat'),(482,'Smith Machine Split Squat'),(227,'Snach'),(469,'Snap Down'),(368,'Snatch OL'),(458,'Stair Master'),(496,'Standing Adduction (Cable)'),(231,'Standing biceps stretch left'),(232,'Standing biceps stretch right'),(236,'Standing Calf Stretch'),(468,'Standing Dowel Shoulder press'),(335,'Standing Pancake'),(120,'Standing Rope Forearm'),(238,'Standing Soleus Stretch'),(116,'Stationary Bike'),(1,'Step Jack'),(118,'Superman'),(476,'Supine press'),(102,'T-Bar row'),(268,'Talons fesses'),(322,'Thruster'),(350,'Toe Taps'),(324,'Toe Touch'),(441,'Toes to bar'),(316,'TORSO TWIST'),(374,'Towel Superman'),(474,'Trap press'),(274,'Trazioni impugnatura inversa'),(328,'Triceps Dips (Assisted)'),(119,'Triceps on Machine'),(302,'Triceps Overhead (Dumbbell)'),(228,'Triceps stretch left'),(230,'Triceps stretch right'),(127,'Trunk Rotation With Cable'),(255,'TRX - curl de bíceps a un brazo'),(254,'TRX gorilla biceps curl'),(252,'TRX hammer curl'),(246,'TRX roll out'),(257,'TRX Tricep Extension'),(454,'Tuck L-sit'),(121,'Turkish Get-Up'),(493,'Typewriter Pull-ups'),(142,'Unilateral Cable row'),(318,'Upper Back'),(126,'Upper External Oblique'),(140,'Vpushup'),(390,'W-Raise'),(153,'Walking'),(304,'Wall Angels'),(166,'Wall balls'),(198,'Wall Drills'),(342,'Wall-sit'),(125,'Weighted Step-ups'),(453,'Wide Pull Up'),(3,'Wide Push-Up'),(205,'Wrist curl, dumbbells'),(135,'YWTs'),(321,'Zottman curl');
/*!40000 ALTER TABLE `pg_wger_exercises` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-27 14:21:22
