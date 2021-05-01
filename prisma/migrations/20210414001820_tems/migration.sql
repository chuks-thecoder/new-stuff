/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `Likes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Likes_profileId_unique` ON `Likes`(`profileId`);
