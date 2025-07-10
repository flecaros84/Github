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

-- Dumping structure for table masterbikes_sucursal_01v.sucursal
CREATE TABLE IF NOT EXISTS `sucursal` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `comuna` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `direccion` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `email` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `es_local_venta` bit(1) DEFAULT NULL,
  `es_taller` bit(1) DEFAULT NULL,
  `horario_apertura` time(6) DEFAULT NULL,
  `horario_cierre` time(6) DEFAULT NULL,
  `nombre` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `telefono` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Dumping data for table masterbikes_sucursal_01v.sucursal: ~2 rows (approximately)
INSERT INTO `sucursal` (`id`, `comuna`, `direccion`, `email`, `es_local_venta`, `es_taller`, `horario_apertura`, `horario_cierre`, `nombre`, `telefono`) VALUES
	(1, 'Santiago Centro', 'Calle San Diego 123', 'matriz@masterbikes.cl', b'1', b'1', '09:00:00.000000', '19:00:00.000000', 'Casa Matriz', '+56 2 2345 6789'),
	(2, 'Las Condes', 'Av. Apoquindo 4567', 'ventas.lascondes@masterbikes.cl', b'1', b'0', '10:00:00.000000', '18:00:00.000000', 'Sucursal Las Condes', '+56 2 2765 4321');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
