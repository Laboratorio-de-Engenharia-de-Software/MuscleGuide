-- CreateTable
CREATE TABLE "exercise_alternatives" (
    "mainExerciseId" TEXT NOT NULL,
    "alternativeId" TEXT NOT NULL,

    CONSTRAINT "exercise_alternatives_pkey" PRIMARY KEY ("mainExerciseId","alternativeId")
);

-- AddForeignKey
ALTER TABLE "exercise_alternatives" ADD CONSTRAINT "exercise_alternatives_mainExerciseId_fkey" FOREIGN KEY ("mainExerciseId") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_alternatives" ADD CONSTRAINT "exercise_alternatives_alternativeId_fkey" FOREIGN KEY ("alternativeId") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
