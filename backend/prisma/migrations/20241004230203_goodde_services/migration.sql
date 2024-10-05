/*
  Warnings:

  - You are about to drop the column `amountSpent` on the `GoodsServices` table. All the data in the column will be lost.
  - Added the required column `noOfUnit` to the `GoodsServices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GoodsServices` DROP COLUMN `amountSpent`,
    ADD COLUMN `noOfUnit` INTEGER NOT NULL;
