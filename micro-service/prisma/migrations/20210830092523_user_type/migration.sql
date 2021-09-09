-- CreateEnum
CREATE TYPE "USER_TYPE" AS ENUM ('DEFAULT', 'WRITER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "publication_id" TEXT,
ADD COLUMN     "type" "USER_TYPE" NOT NULL DEFAULT E'DEFAULT',
ALTER COLUMN "isVerified" SET DEFAULT true;

-- CreateTable
CREATE TABLE "publications" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "cover_image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "availability_id" TEXT NOT NULL,
    "writer_id" TEXT NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "genre" TEXT[],
    "tags" TEXT[],
    "ratings" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "like_count" INTEGER NOT NULL DEFAULT 0,
    "publication_id" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "availability" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "total" INTEGER NOT NULL DEFAULT 0,
    "sold" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ratings" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genres" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carts" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "items_count" INTEGER NOT NULL DEFAULT 0,
    "total_price" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_item" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "cart_id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "item_count" INTEGER NOT NULL DEFAULT 1,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0.1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "publications.uid_unique" ON "publications"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "publications.name_unique" ON "publications"("name");

-- CreateIndex
CREATE UNIQUE INDEX "books.uid_unique" ON "books"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "books_availability_id_unique" ON "books"("availability_id");

-- CreateIndex
CREATE UNIQUE INDEX "availability.uid_unique" ON "availability"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "ratings.uid_unique" ON "ratings"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "genres.uid_unique" ON "genres"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "carts.uid_unique" ON "carts"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "cart_item.uid_unique" ON "cart_item"("uid");

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY ("publication_id") REFERENCES "publications"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD FOREIGN KEY ("availability_id") REFERENCES "availability"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD FOREIGN KEY ("publication_id") REFERENCES "publications"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD FOREIGN KEY ("writer_id") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD FOREIGN KEY ("user_id") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD FOREIGN KEY ("user_id") REFERENCES "books"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD FOREIGN KEY ("user_id") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD FOREIGN KEY ("item_id") REFERENCES "books"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD FOREIGN KEY ("cart_id") REFERENCES "carts"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
