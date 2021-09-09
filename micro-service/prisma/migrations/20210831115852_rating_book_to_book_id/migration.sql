-- DropForeignKey
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_user_id_fkey1";

-- AddForeignKey
ALTER TABLE "ratings" ADD FOREIGN KEY ("user_id") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD FOREIGN KEY ("book_id") REFERENCES "books"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
