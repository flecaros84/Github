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

-- Dumping structure for table masterbikes_sucursal_01v.empleado
CREATE TABLE IF NOT EXISTS `empleado` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `rol` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `usuario_id` bigint NOT NULL,
  `id_sucursal` bigint DEFAULT NULL,
  `id_supervisor` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5lshn105gw8o1gcw78wysko3u` (`id_sucursal`),
  KEY `FKtcuq2aas2pp0twfmomokpa88b` (`id_supervisor`),
  CONSTRAINT `FK5lshn105gw8o1gcw78wysko3u` FOREIGN KEY (`id_sucursal`) REFERENCES `sucursal` (`id`),
  CONSTRAINT `FKtcuq2aas2pp0twfmomokpa88b` FOREIGN KEY (`id_supervisor`) REFERENCES `empleado` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Dumping data for table masterbikes_sucursal_01v.empleado: ~4 rows (approximately)
INSERT INTO `empleado` (`id`, `nombre`, `rol`, `usuario_id`, `id_sucursal`, `id_supervisor`) VALUES
	(1, 'Marcelo Soto', 'supervisor', 101, 1, NULL),
	(2, 'Valeria Ruiz', 'supervisor', 102, 2, NULL),
	(3, 'Carlos Perez', 'vendedor', 103, 1, 1),
	(4, 'Laura Castillo', 'vendedor', 104, 2, 2),
	(5, 'Pedro Vidal', 'tecnico', 105, 1, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
