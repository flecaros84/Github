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


-- Dumping database structure for masterbikes_venta_01v
CREATE DATABASE IF NOT EXISTS `masterbikes_venta_01v` /*!40100 DEFAULT CHARACTER SET armscii8 COLLATE armscii8_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `masterbikes_venta_01v`;

-- Dumping structure for table masterbikes_venta_01v.detalle_venta
CREATE TABLE IF NOT EXISTS `detalle_venta` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `producto_id` bigint NOT NULL,
  `venta_id` bigint DEFAULT NULL,
  `tipo_producto` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `precio_unitario` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhj0bf0515yg7equ11ab4xgq3f` (`venta_id`),
  CONSTRAINT `FKhj0bf0515yg7equ11ab4xgq3f` FOREIGN KEY (`venta_id`) REFERENCES `venta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Dumping data for table masterbikes_venta_01v.detalle_venta: ~9 rows (approximately)
INSERT INTO `detalle_venta` (`id`, `cantidad`, `producto_id`, `venta_id`, `tipo_producto`, `precio_unitario`) VALUES
	(1, 1, 2, 1, 'bicicleta', 0),
	(2, 2, 2, 2, 'bicicleta', 0),
	(3, 1, 2, 3, 'BICICLETA', 0),
	(4, 1, 2, 3, 'BICICLETA', 0),
	(5, 5, 2, 4, 'BICICLETA', 0),
	(6, 8, 2, 5, 'BICICLETA', 0),
	(7, 1, 2, 6, 'BICICLETA', 1299990),
	(8, 2, 2, 7, 'BICICLETA', 1299990),
	(9, 2, 2, 7, 'BICICLETA', 1299990);

-- Dumping structure for table masterbikes_venta_01v.factura
CREATE TABLE IF NOT EXISTS `factura` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fecha_emision` datetime(6) DEFAULT NULL,
  `folio` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `iva` double NOT NULL,
  `neto` double NOT NULL,
  `tipo` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `total_con_iva` double NOT NULL,
  `venta_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKms9esisfmhyaqsy0bp3icepth` (`venta_id`),
  CONSTRAINT `FKge881o1cecrpgmk5cwsmc2kcu` FOREIGN KEY (`venta_id`) REFERENCES `venta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Dumping data for table masterbikes_venta_01v.factura: ~7 rows (approximately)
INSERT INTO `factura` (`id`, `fecha_emision`, `folio`, `iva`, `neto`, `tipo`, `total_con_iva`, `venta_id`) VALUES
	(1, '2025-06-20 22:26:45.563001', 'FOLIO-1750472805563', 0, 0, 'BOLETA', 0, 1),
	(2, '2025-06-20 22:29:49.492574', 'FOLIO-1750472989492', 0, 0, 'BOLETA', 0, 2),
	(3, '2025-06-20 23:42:43.784078', 'FOLIO-1750477363784', 493996.2, 2599980, 'BOLETA', 3093976.1999999997, 3),
	(4, '2025-06-20 23:43:58.525708', 'FOLIO-1750477438525', 1234990.5, 6499950, 'BOLETA', 7734940.5, 4),
	(5, '2025-06-20 23:44:49.565256', 'FOLIO-1750477489565', 1975984.8, 10399920, 'BOLETA', 12375904.799999999, 5),
	(6, '2025-06-20 23:56:24.072336', 'FOLIO-1750478184073', 246998.1, 1299990, 'BOLETA', 1546988.0999999999, 6),
	(7, '2025-06-20 23:58:13.569552', 'FOLIO-1750478293569', 987992.4, 5199960, 'BOLETA', 6187952.399999999, 7);

-- Dumping structure for table masterbikes_venta_01v.venta
CREATE TABLE IF NOT EXISTS `venta` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cliente_id` bigint NOT NULL,
  `fecha` datetime(6) DEFAULT NULL,
  `medio_pago` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `sucursal_id` bigint NOT NULL,
  `total` double NOT NULL,
  `vendedor_id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Dumping data for table masterbikes_venta_01v.venta: ~7 rows (approximately)
INSERT INTO `venta` (`id`, `cliente_id`, `fecha`, `medio_pago`, `sucursal_id`, `total`, `vendedor_id`) VALUES
	(1, 101, '2025-06-20 22:26:45.563001', 'Tarjeta', 1, 0, 501),
	(2, 101, '2025-06-20 22:29:49.492574', 'Tarjeta', 1, 0, 501),
	(3, 1001, '2025-06-20 23:42:43.784078', 'Efectivo', 1, 2599980, 2001),
	(4, 1001, '2025-06-20 23:43:58.525708', 'Efectivo', 1, 6499950, 2001),
	(5, 1001, '2025-06-20 23:44:49.565256', 'Efectivo', 2, 10399920, 2001),
	(6, 1001, '2025-06-20 23:56:24.072336', 'Efectivo', 1, 1299990, 2001),
	(7, 1001, '2025-06-20 23:58:13.569552', 'Efectivo', 1, 5199960, 2001);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
