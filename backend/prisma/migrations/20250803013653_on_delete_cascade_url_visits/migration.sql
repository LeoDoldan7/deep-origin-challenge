-- DropForeignKey
ALTER TABLE "visit" DROP CONSTRAINT "visit_urlId_fkey";

-- AddForeignKey
ALTER TABLE "visit" ADD CONSTRAINT "visit_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "url"("id") ON DELETE CASCADE ON UPDATE CASCADE;
