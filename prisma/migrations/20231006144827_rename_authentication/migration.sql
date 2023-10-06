/*
  Warnings:

  - You are about to drop the column `authentication` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "authentication",
ADD COLUMN     "authenticationObject" JSONB;
