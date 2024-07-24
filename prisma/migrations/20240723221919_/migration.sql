/*
  Warnings:

  - You are about to drop the column `school` on the `Education` table. All the data in the column will be lost.
  - Added the required column `institution` to the `Education` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Education" DROP COLUMN "school",
ADD COLUMN     "institution" TEXT NOT NULL,
ALTER COLUMN "fieldOfStudy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "skills" TEXT[];
