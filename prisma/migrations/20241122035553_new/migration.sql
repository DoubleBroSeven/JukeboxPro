/*
  Warnings:

  - You are about to drop the column `userid` on the `Playlist` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Playlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_userid_fkey";

-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "userid",
ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
