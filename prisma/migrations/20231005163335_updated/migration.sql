/*
  Warnings:

  - You are about to drop the column `userId` on the `Authentication` table. All the data in the column will be lost.
  - Added the required column `authenticationId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Authentication" DROP CONSTRAINT "Authentication_userId_fkey";

-- AlterTable
ALTER TABLE "Authentication" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authenticationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_authenticationId_fkey" FOREIGN KEY ("authenticationId") REFERENCES "Authentication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
