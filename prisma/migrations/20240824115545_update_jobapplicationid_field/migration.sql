/*
  Warnings:

  - The primary key for the `jobapplications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `jobapplicationsid` on the `jobapplications` table. All the data in the column will be lost.
  - You are about to alter the column `joburl` on the `jobapplications` table. The data in that column could be lost. The data in that column will be cast from `VarChar(2048)` to `VarChar(255)`.
  - You are about to alter the column `notes` on the `jobapplications` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `resume` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "jobapplications" DROP CONSTRAINT "jobapplications_resumeid_fkey";

-- AlterTable
ALTER TABLE "jobapplications" DROP CONSTRAINT "jobapplications_pkey",
DROP COLUMN "jobapplicationsid",
ADD COLUMN     "jobapplicationid" SERIAL NOT NULL,
ALTER COLUMN "joburl" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "progress" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "notes" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "whencreated" DROP DEFAULT,
ADD CONSTRAINT "jobapplications_pkey" PRIMARY KEY ("jobapplicationid");

-- DropTable
DROP TABLE "resume";

-- CreateTable
CREATE TABLE "resumes" (
    "resumeid" SERIAL NOT NULL,
    "userid" INTEGER,
    "resumename" VARCHAR(255),
    "resumedescription" VARCHAR(1024),
    "resumeurl" VARCHAR(255),
    "whencreated" TIMESTAMP(6),
    "whendeleted" TIMESTAMP(6),

    CONSTRAINT "resumes_pkey" PRIMARY KEY ("resumeid")
);

-- AddForeignKey
ALTER TABLE "jobapplications" ADD CONSTRAINT "jobapplications_resumeid_fkey" FOREIGN KEY ("resumeid") REFERENCES "resumes"("resumeid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;
