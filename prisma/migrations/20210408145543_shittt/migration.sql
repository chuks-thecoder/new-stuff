/*
  Warnings:

  - You are about to drop the column `userId` on the `name` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_ibfk_2`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_ibfk_1`;

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
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_ibfk_2`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_ibfk_1`;

-- DropForeignKey
ALTER TABLE `sales` DROP FOREIGN KEY `sales_ibfk_2`;

-- DropForeignKey
ALTER TABLE `sales` DROP FOREIGN KEY `sales_ibfk_1`;

-- DropForeignKey
ALTER TABLE `subcategory` DROP FOREIGN KEY `subcategory_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_categoriestoproduct` DROP FOREIGN KEY `_categoriestoproduct_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_categoriestoproduct` DROP FOREIGN KEY `_categoriestoproduct_ibfk_2`;

-- DropForeignKey
ALTER TABLE `_follows` DROP FOREIGN KEY `_follows_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_follows` DROP FOREIGN KEY `_follows_ibfk_2`;

-- AlterTable
ALTER TABLE `name` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `profile` DROP COLUMN `userId`;

-- AddForeignKey
ALTER TABLE `Comments` ADD FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE `Reviews` ADD FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reviews` ADD FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sales` ADD FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sales` ADD FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subcategory` ADD FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriesToProduct` ADD FOREIGN KEY (`A`) REFERENCES `Categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriesToProduct` ADD FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_follows` ADD FOREIGN KEY (`A`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_follows` ADD FOREIGN KEY (`B`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
