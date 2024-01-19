/*
  Warnings:

  - The primary key for the `teachers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_pkey",
ADD CONSTRAINT "teachers_pkey" PRIMARY KEY ("email");
