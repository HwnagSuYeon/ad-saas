-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "eventType" TEXT NOT NULL,
    "userId" TEXT,
    "pageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
