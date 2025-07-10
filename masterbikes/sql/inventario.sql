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


-- Dumping database structure for masterbikes_inventario_01v
CREATE DATABASE IF NOT EXISTS `masterbikes_inventario_01v` /*!40100 DEFAULT CHARACTER SET armscii8 COLLATE armscii8_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `masterbikes_inventario_01v`;

-- Dumping structure for table masterbikes_inventario_01v.inventario
CREATE TABLE IF NOT EXISTS `inventario` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `fecha_actualizacion` datetime(6) DEFAULT NULL,
  `id_producto` bigint NOT NULL,
  `id_sucursal` bigint NOT NULL,
  `tipo_producto` varchar(255) COLLATE armscii8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Dumping data for table masterbikes_inventario_01v.inventario: ~2 rows (approximately)
INSERT INTO `inventario` (`id`, `cantidad`, `fecha_actualizacion`, `id_producto`, `id_sucursal`, `tipo_producto`) VALUES
	(1, 6, '2025-06-20 23:58:13.566473', 2, 1, 'bicicleta'),
	(2, 10, '2025-06-20 23:44:49.552199', 2, 2, 'bicicleta');

-- Dumping structure for table masterbikes_inventario_01v.movimiento_inventario
CREATE TABLE IF NOT EXISTS `movimiento_inventario` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `fecha` datetime(6) DEFAULT NULL,
  `motivo` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `tipo_movimiento` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `inventario_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKl0jvfm9mvanfpvrscqv9n34rk` (`inventario_id`),
  CONSTRAINT `FKl0jvfm9mvanfpvrscqv9n34rk` FOREIGN KEY (`inventario_id`) REFERENCES `inventario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Dumping data for table masterbikes_inventario_01v.movimiento_inventario: ~11 rows (approximately)
INSERT INTO `movimiento_inventario` (`id`, `cantidad`, `fecha`, `motivo`, `tipo_movimiento`, `inventario_id`) VALUES
	(1, 10, '2025-06-15 22:25:57.356752', 'Reposicion de stock inicial', 'ENTRADA', 1),
	(2, 5, '2025-06-15 22:26:41.111104', 'Venta minorista', 'SALIDA', 1),
	(3, -2, '2025-06-15 22:27:38.318732', 'Correccion por inventario fisico', 'AJUSTE', 2),
	(4, 1, '2025-06-20 22:26:45.541287', 'Venta automatica', 'SALIDA', 1),
	(5, 2, '2025-06-20 22:29:49.480208', 'Venta automatica', 'SALIDA', 1),
	(6, 4, '2025-06-20 23:02:13.474866', 'Venta automatica', 'SALIDA', 1),
	(7, 1, '2025-06-20 23:42:43.710588', 'Venta automatica', 'SALIDA', 1),
	(8, 1, '2025-06-20 23:42:43.773563', 'Venta automatica', 'SALIDA', 1),
	(9, 5, '2025-06-20 23:43:58.506200', 'Venta automatica', 'SALIDA', 1),
	(10, 8, '2025-06-20 23:44:49.551194', 'Venta automatica', 'SALIDA', 2),
	(11, 1, '2025-06-20 23:56:24.059696', 'Venta automatica', 'SALIDA', 1),
	(12, 2, '2025-06-20 23:58:13.518049', 'Venta automatica', 'SALIDA', 1),
	(13, 2, '2025-06-20 23:58:13.565467', 'Venta automatica', 'SALIDA', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
