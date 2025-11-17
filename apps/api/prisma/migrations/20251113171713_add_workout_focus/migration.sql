/*
  Warnings:

  - Added the required column `focus` to the `workouts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WorkoutFocus" AS ENUM ('MASS_GAIN', 'WEIGHT_LOSS', 'MAINTENANCE');

-- AlterTable
ALTER TABLE "workouts" ADD COLUMN     "focus" "WorkoutFocus" NOT NULL;
