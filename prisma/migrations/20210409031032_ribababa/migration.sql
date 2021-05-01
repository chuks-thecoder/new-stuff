/*
  Warnings:

  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `discount_price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to drop the `follower` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `following` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_follows` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `follower` DROP FOREIGN KEY `follower_ibfk_1`;

-- DropForeignKey
ALTER TABLE `following` DROP FOREIGN KEY `following_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_follows` DROP FOREIGN KEY `_follows_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_follows` DROP FOREIGN KEY `_follows_ibfk_2`;

-- AlterTable
ALTER TABLE `product` MODIFY `price` DOUBLE NOT NULL,
    MODIFY `discount_price` DOUBLE NOT NULL;

-- DropTable
DROP TABLE `follower`;

-- DropTable
DROP TABLE `following`;

-- DropTable
DROP TABLE `_follows`;

-- CreateTable
CREATE TABLE `_UserFollows` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,
UNIQUE INDEX `_UserFollows_AB_unique`(`A`, `B`),
INDEX `_UserFollows_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_UserFollows` ADD FOREIGN KEY (`A`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserFollows` ADD FOREIGN KEY (`B`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
