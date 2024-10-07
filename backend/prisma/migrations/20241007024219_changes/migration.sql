/*
  Warnings:

  - You are about to drop the column `amountKg` on the `FoodConsumption` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `FoodConsumption` table. All the data in the column will be lost.
  - You are about to drop the column `emissionAmount` on the `FoodConsumption` table. All the data in the column will be lost.
  - You are about to drop the column `foodType` on the `FoodConsumption` table. All the data in the column will be lost.
  - You are about to drop the column `footprintRecordId` on the `FoodConsumption` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `FoodConsumption` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `GoodsServices` table. All the data in the column will be lost.
  - You are about to drop the column `emissionAmount` on the `GoodsServices` table. All the data in the column will be lost.
  - You are about to drop the column `footprintRecordId` on the `GoodsServices` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `GoodsServices` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `amountKg` on the `WasteProduction` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `WasteProduction` table. All the data in the column will be lost.
  - You are about to drop the column `emissionAmount` on the `WasteProduction` table. All the data in the column will be lost.
  - You are about to drop the column `footprintRecordId` on the `WasteProduction` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `WasteProduction` table. All the data in the column will be lost.
  - You are about to drop the column `wasteType` on the `WasteProduction` table. All the data in the column will be lost.
  - You are about to drop the `EnergyConsumption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FootprintRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transportation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `FoodConsumption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `FoodConsumption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `FoodConsumption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `GoodsServices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `WasteProduction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `WasteProduction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `WasteProduction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `EnergyConsumption` DROP FOREIGN KEY `EnergyConsumption_footprintRecordId_fkey`;

-- DropForeignKey
ALTER TABLE `FoodConsumption` DROP FOREIGN KEY `FoodConsumption_footprintRecordId_fkey`;

-- DropForeignKey
ALTER TABLE `FootprintRecord` DROP FOREIGN KEY `FootprintRecord_userId_fkey`;

-- DropForeignKey
ALTER TABLE `GoodsServices` DROP FOREIGN KEY `GoodsServices_footprintRecordId_fkey`;

-- DropForeignKey
ALTER TABLE `Transportation` DROP FOREIGN KEY `Transportation_footprintRecordId_fkey`;

-- DropForeignKey
ALTER TABLE `WasteProduction` DROP FOREIGN KEY `WasteProduction_footprintRecordId_fkey`;

-- AlterTable
ALTER TABLE `FoodConsumption` DROP COLUMN `amountKg`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `emissionAmount`,
    DROP COLUMN `foodType`,
    DROP COLUMN `footprintRecordId`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `amount` DOUBLE NOT NULL,
    ADD COLUMN `type` ENUM('MEAT', 'DAIRY', 'VEGETABLES', 'GRAINS', 'OTHER') NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `GoodsServices` DROP COLUMN `createdAt`,
    DROP COLUMN `emissionAmount`,
    DROP COLUMN `footprintRecordId`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `createdAt`,
    DROP COLUMN `name`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `electricityConsumption` DOUBLE NULL,
    ADD COLUMN `gasConsumption` DOUBLE NULL,
    ADD COLUMN `totalEmissions` DOUBLE NULL;

-- AlterTable
ALTER TABLE `WasteProduction` DROP COLUMN `amountKg`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `emissionAmount`,
    DROP COLUMN `footprintRecordId`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `wasteType`,
    ADD COLUMN `amount` DOUBLE NOT NULL,
    ADD COLUMN `type` ENUM('PAPER', 'PLASTIC', 'ORGANIC', 'GLASS', 'METAL') NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `EnergyConsumption`;

-- DropTable
DROP TABLE `FootprintRecord`;

-- DropTable
DROP TABLE `Transportation`;

-- CreateTable
CREATE TABLE `PublicTransport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('PUBLIC', 'PRIVATE') NOT NULL,
    `distance` DOUBLE NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrivateTransport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('PETROL', 'DIESEL', 'CNG') NOT NULL,
    `distance` DOUBLE NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PublicTransport` ADD CONSTRAINT `PublicTransport_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrivateTransport` ADD CONSTRAINT `PrivateTransport_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FoodConsumption` ADD CONSTRAINT `FoodConsumption_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WasteProduction` ADD CONSTRAINT `WasteProduction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GoodsServices` ADD CONSTRAINT `GoodsServices_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
