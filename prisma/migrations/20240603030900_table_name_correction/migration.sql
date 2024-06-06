/*
  Warnings:

  - You are about to drop the `maintanence` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `maintanence` DROP FOREIGN KEY `Maintanence_vehicleId_fkey`;

-- DropTable
DROP TABLE `maintanence`;

-- CreateTable
CREATE TABLE `Maintanance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `vehicleId` INTEGER NOT NULL,
    `status` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Maintanance_vehicleId_key`(`vehicleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Maintanance` ADD CONSTRAINT `Maintanance_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
