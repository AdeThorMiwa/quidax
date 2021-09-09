-- AlterEnum
ALTER TYPE "USER_TYPE" ADD VALUE 'ADMIN';

-- AlterTable
ALTER TABLE "publications" ADD COLUMN     "writer_ids" TEXT[];
