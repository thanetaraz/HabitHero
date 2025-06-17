-- CreateTable
CREATE TABLE "Habit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'OTHER',
    "selectedDays" JSONB NOT NULL,
    "color" TEXT NOT NULL DEFAULT 'BLUE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
