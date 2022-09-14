/*
 Navicat Premium Data Transfer

 Source Server         : demo1
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : stack

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 14/09/2022 21:50:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for stackqueue
-- ----------------------------
DROP TABLE IF EXISTS `stackqueue`;
CREATE TABLE `stackqueue`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stackqueue
-- ----------------------------
INSERT INTO `stackqueue` VALUES (23, '1234', 1);
INSERT INTO `stackqueue` VALUES (24, '3455353', 1);
INSERT INTO `stackqueue` VALUES (25, 'llll', 1);
INSERT INTO `stackqueue` VALUES (26, 'Luod', 1);
INSERT INTO `stackqueue` VALUES (27, '12323', 0);

SET FOREIGN_KEY_CHECKS = 1;
