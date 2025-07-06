-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.4.3 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for masterbikes_catalogo_01v
CREATE DATABASE IF NOT EXISTS `masterbikes_catalogo_01v` /*!40100 DEFAULT CHARACTER SET armscii8 COLLATE armscii8_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `masterbikes_catalogo_01v`;

-- Dumping structure for table masterbikes_catalogo_01v.accesorio
CREATE TABLE IF NOT EXISTS `accesorio` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `categoria` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `descripcion` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `marca` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `modelo` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `talla` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `tipo_uso` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `precio_unitario` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Dumping data for table masterbikes_catalogo_01v.accesorio: ~7 rows (approximately)
INSERT INTO `accesorio` (`id`, `categoria`, `descripcion`, `marca`, `modelo`, `talla`, `tipo_uso`, `precio_unitario`) VALUES
	(1, 'Casco', 'Casco ligero para ciclistas de montana', 'Bell', 'Bell Sanction', 'M', 'Montana', 69990),
	(2, 'Luz', 'Luz delantera recargable via USB', 'Giant', 'Giant Recon HL500', NULL, 'Urbano', 49990),
	(3, 'Bomba', 'Bomba portatil para alta presion', 'Lezyne', 'Lezyne Sport Drive HP', NULL, 'Ruta', 29990),
	(4, 'Alforja', 'Bolso trasero con rigidez y gran capacidad', 'Topeak', 'Topeak MTX TrunkBag', 'Unica', 'Urbano', 59990),
	(5, 'Casco', 'Casco de uso mixto con proteccion MIPS', 'Bontrager', 'Bontrager Quantum MIPS', 'L', 'Montana', 89990),
	(6, 'Herramienta', 'Medidor digital de presion para neumaticos', 'SKS', 'SKS Airchecker', NULL, 'General', 24990),
	(7, 'Alforja', 'Bolsa impermeable para sillin con cierre enrollable', 'RockBros', 'RockBros Waterproof Saddle Bag', 'Mediana', 'Montana', 39990);

-- Dumping structure for table masterbikes_catalogo_01v.bicicleta
CREATE TABLE IF NOT EXISTS `bicicleta` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `es_predefinida` bit(1) NOT NULL,
  `id_cliente` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `nombre_modelo` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `talla_usuario` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `id_freno` bigint DEFAULT NULL,
  `id_manubrio` bigint DEFAULT NULL,
  `id_marco` bigint DEFAULT NULL,
  `id_rueda` bigint DEFAULT NULL,
  `id_sillin` bigint DEFAULT NULL,
  `modelo` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `precio_unitario` double DEFAULT NULL,
  `descripcion` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `marca` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `valoracion` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnudqjqwc2v8wlsk0mqpsrs9kt` (`id_freno`),
  KEY `FK2jay66oivl8oo282ukkn3nvf5` (`id_manubrio`),
  KEY `FK63c39olqjocwjetrnp3m8yc95` (`id_marco`),
  KEY `FK4djhiig7tfqv873vyntnpxk5s` (`id_rueda`),
  KEY `FKh8e9akywlmcr141kvj0b81bei` (`id_sillin`),
  CONSTRAINT `FK2jay66oivl8oo282ukkn3nvf5` FOREIGN KEY (`id_manubrio`) REFERENCES `componente` (`id`),
  CONSTRAINT `FK4djhiig7tfqv873vyntnpxk5s` FOREIGN KEY (`id_rueda`) REFERENCES `componente` (`id`),
  CONSTRAINT `FK63c39olqjocwjetrnp3m8yc95` FOREIGN KEY (`id_marco`) REFERENCES `componente` (`id`),
  CONSTRAINT `FKh8e9akywlmcr141kvj0b81bei` FOREIGN KEY (`id_sillin`) REFERENCES `componente` (`id`),
  CONSTRAINT `FKnudqjqwc2v8wlsk0mqpsrs9kt` FOREIGN KEY (`id_freno`) REFERENCES `componente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Dumping data for table masterbikes_catalogo_01v.bicicleta: ~2 rows (approximately)
INSERT INTO `bicicleta` (`id`, `es_predefinida`, `id_cliente`, `nombre_modelo`, `talla_usuario`, `id_freno`, `id_manubrio`, `id_marco`, `id_rueda`, `id_sillin`, `modelo`, `precio_unitario`, `descripcion`, `marca`, `valoracion`) VALUES
	(1, b'0', 'CLI300', 'MTB X-Caliber', 'M', 13, 4, 11, 12, 5, 'Bici1', 749990, NULL, NULL, NULL),
	(2, b'1', NULL, 'Ruta Allez', 'L', 8, 9, 6, 17, 10, 'Bici2', 1299990, 'Bici para amantes de ruta', 'Trek', 4);

-- Dumping structure for table masterbikes_catalogo_01v.componente
CREATE TABLE IF NOT EXISTS `componente` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `diametro_rueda` int DEFAULT NULL,
  `marca` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `modelo` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `talla` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `tipo` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `tipo_freno` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `tipo_uso` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `precio_unitario` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Dumping data for table masterbikes_catalogo_01v.componente: ~20 rows (approximately)
INSERT INTO `componente` (`id`, `descripcion`, `diametro_rueda`, `marca`, `modelo`, `talla`, `tipo`, `tipo_freno`, `tipo_uso`, `precio_unitario`) VALUES
	(1, 'Marco de aluminio para MTB', 29, 'Giant', 'Talon ALUXX', 'M', 'Marco', 'Disco', 'Montana', 249990),
	(2, 'Ruedas de 29 pulgadas para terreno irregular', 29, 'Shimano', 'MTB29X', NULL, 'Rueda', 'Disco', 'Montana', 199990),
	(3, 'Frenos hidraulicos de disco', NULL, 'SRAM', 'Level T', NULL, 'Freno', 'Disco', 'Montana', 129990),
	(4, 'Manubrio ancho para mayor control', NULL, 'Truvativ', 'Descendant', NULL, 'Manubrio', NULL, 'Montana', 79990),
	(5, 'Asiento acolchado para recorridos largos', NULL, 'WTB', 'Volt', NULL, 'Sillin', NULL, 'Montana', 49990),
	(6, 'Marco ligero para ciclismo en carretera', 28, 'Specialized', 'Allez Sport', 'L', 'Marco', 'Caliper', 'Ruta', 299990),
	(7, 'Ruedas de alto rendimiento para ruta', 28, 'Mavic', 'Aksium', NULL, 'Rueda', 'Caliper', 'Ruta', 189990),
	(8, 'Frenos precisos para bicicleta de ruta', NULL, 'Shimano', '105 R7000', NULL, 'Freno', 'Caliper', 'Ruta', 119990),
	(9, 'Manubrio de carretera con curva compacta', NULL, 'Zipp', 'SL-70', NULL, 'Manubrio', NULL, 'Ruta', 89990),
	(10, 'Asiento comodo para velocidad', NULL, 'Fizik', 'Antares R3', NULL, 'Sillin', NULL, 'Ruta', 69990),
	(11, 'Marco MTB ligero y resistente', 29, 'Trek', 'X-Caliber 8', 'M', 'Marco', 'Disco', 'Montana', 269990),
	(12, 'Ruedas 29 compatibles con disco', 29, 'Bontrager', 'Kovee', NULL, 'Rueda', 'Disco', 'Montana', 179990),
	(13, 'Frenos de disco para MTB', NULL, 'Shimano', 'Deore M6100', NULL, 'Freno', 'Disco', 'Montana', 139990),
	(14, 'Manubrio resistente para montania', NULL, 'RaceFace', 'Chester', NULL, 'Manubrio', NULL, 'Montana', 84990),
	(15, 'Sillin ergonomico para largas rutas', NULL, 'Ergon', 'SM Sport', NULL, 'Sillin', NULL, 'Montana', 59990),
	(16, 'Marco aerodinamico de ruta', 28, 'Cannondale', 'CAAD13', 'L', 'Marco', 'Caliper', 'Ruta', 319990),
	(17, 'Ruedas ligeras para velocidad', 28, 'Zipp', '202 Firecrest', NULL, 'Rueda', 'Caliper', 'Ruta', 499990),
	(18, 'Frenos caliper de alta precision', NULL, 'Campagnolo', 'Chorus', NULL, 'Freno', 'Caliper', 'Ruta', 149990),
	(19, 'Manubrio de carretera compacto', NULL, 'FSA', 'Omega Compact', NULL, 'Manubrio', NULL, 'Ruta', 89990),
	(20, 'Sillin comodo para ciclistas de ruta', NULL, 'Prologo', 'Kappa RS', NULL, 'Sillin', NULL, 'Ruta', 64990);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
