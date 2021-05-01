/*
  Warnings:

  - Added the required column `discount_price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `final_price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `account_ibfk_1`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `post_ibfk_1`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_ibfk_1`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `profile_ibfk_1`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN     `discount_price` DECIMAL(65,30) NOT NULL,
    ADD COLUMN     `final_price` DECIMAL(65,30) NOT NULL;

-- AddForeignKey
ALTER TABLE `Account` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;