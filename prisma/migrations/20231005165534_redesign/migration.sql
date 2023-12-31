/*
  Warnings:

  - You are about to drop the column `authenticationId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Authentication` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `forgotPassword` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_authenticationId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "authenticationId",
ADD COLUMN     "forgotPassword" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "salt" TEXT NOT NULL;

-- DropTable
DROP TABLE "Authentication";
