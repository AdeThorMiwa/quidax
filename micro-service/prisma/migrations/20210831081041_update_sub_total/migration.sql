/*
  Warnings:

  - You are about to drop the column `total_price` on the `carts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "carts" DROP COLUMN "total_price",
ADD COLUMN     "sub_total" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
