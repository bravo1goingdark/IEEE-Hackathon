/*
  Warnings:

  - The values [CAR,BUS,TRAIN,PLANE,BIKE] on the enum `Transportation_vehicleType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `type` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Transportation` MODIFY `vehicleType` ENUM('PUBLIC', 'PRIVATE') NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `type`;
