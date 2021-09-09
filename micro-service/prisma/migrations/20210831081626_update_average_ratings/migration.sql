/*
  Warnings:

  - You are about to drop the column `ratings` on the `books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "ratings",
ADD COLUMN     "average_ratings" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
