/*
  Warnings:

  - You are about to drop the column `folprofileId` on the `followers` table. All the data in the column will be lost.
  - You are about to drop the column `folprofileId` on the `following` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `account_ibfk_1`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_ibfk_2`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_ibfk_3`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_ibfk_1`;

-- DropForeignKey
ALTER TABLE `followers` DROP FOREIGN KEY `followers_ibfk_1`;

-- DropForeignKey
ALTER TABLE `following` DROP FOREIGN KEY `following_ibfk_1`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_ibfk_3`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_ibfk_2`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_ibfk_1`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `post_ibfk_1`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_ibfk_2`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_ibfk_1`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `profile_ibfk_1`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_ibfk_2`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_ibfk_1`;

-- DropForeignKey
ALTER TABLE `subcategory` DROP FOREIGN KEY `subcategory_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_categoriestoproduct` DROP FOREIGN KEY `_categoriestoproduct_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_categoriestoproduct` DROP FOREIGN KEY `_categoriestoproduct_ibfk_2`;

-- AlterTable
ALTER TABLE `followers` DROP COLUMN `folprofileId`;

-- AlterTable
ALTER TABLE `following` DROP COLUMN `folprofileId`;

-- CreateTable
CREATE TABLE `_follows` (
    `A` INT NOT NULL,
    `B` INT NOT NULL,
UNIQUE INDEX `_follows_AB_unique`(`A`, `B`),
INDEX `_follows_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_follows` ADD FOREIGN KEY (`A`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_follows` ADD FOREIGN KEY (`B`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reviews` ADD FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reviews` ADD FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subcategory` ADD FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriesToProduct` ADD FOREIGN KEY (`A`) REFERENCES `Categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriesToProduct` ADD FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
