-- CreateTable
CREATE TABLE "division" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "numberOfStudents" INTEGER NOT NULL,

    CONSTRAINT "division_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "roll" SERIAL NOT NULL,
    "divisionId" INTEGER NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("roll")
);

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
