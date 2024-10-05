-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('INDIVIDUAL', 'BUSINESS') NOT NULL DEFAULT 'INDIVIDUAL',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FootprintRecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `totalEmissions` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnergyConsumption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `footprintRecordId` INTEGER NOT NULL,
    `electricityKwh` DOUBLE NOT NULL,
    `naturalGasKwh` DOUBLE NOT NULL,
    `emissionAmount` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transportation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `footprintRecordId` INTEGER NOT NULL,
    `vehicleType` ENUM('CAR', 'BUS', 'TRAIN', 'PLANE', 'BIKE') NOT NULL,
    `distanceKm` DOUBLE NOT NULL,
    `emissionAmount` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FoodConsumption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `footprintRecordId` INTEGER NOT NULL,
    `foodType` ENUM('MEAT', 'DAIRY', 'VEGETABLES', 'GRAINS', 'OTHER') NOT NULL,
    `amountKg` DOUBLE NOT NULL,
    `emissionAmount` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WasteProduction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `footprintRecordId` INTEGER NOT NULL,
    `wasteType` ENUM('PAPER', 'PLASTIC', 'ORGANIC', 'GLASS', 'METAL') NOT NULL,
    `amountKg` DOUBLE NOT NULL,
    `emissionAmount` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GoodsServices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `footprintRecordId` INTEGER NOT NULL,
    `category` ENUM('CLOTHING', 'ELECTRONICS', 'FURNITURE', 'OTHER') NOT NULL,
    `amountSpent` DOUBLE NOT NULL,
    `emissionAmount` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FootprintRecord` ADD CONSTRAINT `FootprintRecord_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnergyConsumption` ADD CONSTRAINT `EnergyConsumption_footprintRecordId_fkey` FOREIGN KEY (`footprintRecordId`) REFERENCES `FootprintRecord`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transportation` ADD CONSTRAINT `Transportation_footprintRecordId_fkey` FOREIGN KEY (`footprintRecordId`) REFERENCES `FootprintRecord`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FoodConsumption` ADD CONSTRAINT `FoodConsumption_footprintRecordId_fkey` FOREIGN KEY (`footprintRecordId`) REFERENCES `FootprintRecord`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WasteProduction` ADD CONSTRAINT `WasteProduction_footprintRecordId_fkey` FOREIGN KEY (`footprintRecordId`) REFERENCES `FootprintRecord`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GoodsServices` ADD CONSTRAINT `GoodsServices_footprintRecordId_fkey` FOREIGN KEY (`footprintRecordId`) REFERENCES `FootprintRecord`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
