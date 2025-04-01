/*
  Warnings:

  - A unique constraint covering the columns `[lemonSqueezyCustomerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "lemonSqueezyCustomerId" TEXT;

-- CreateTable
CREATE TABLE "CronJobRun" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jobName" TEXT NOT NULL,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" DATETIME,
    "duration" INTEGER,
    "status" TEXT NOT NULL,
    "error" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Price" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "stripePriceId" TEXT,
    "lemonSqueezyVariantId" TEXT,
    "currency" TEXT NOT NULL,
    "interval" TEXT,
    "unitAmount" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "paymentProvider" TEXT NOT NULL DEFAULT 'stripe',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Price_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Price" ("active", "createdAt", "currency", "id", "interval", "productId", "stripePriceId", "unitAmount", "updatedAt") SELECT "active", "createdAt", "currency", "id", "interval", "productId", "stripePriceId", "unitAmount", "updatedAt" FROM "Price";
DROP TABLE "Price";
ALTER TABLE "new_Price" RENAME TO "Price";
CREATE UNIQUE INDEX "Price_stripePriceId_key" ON "Price"("stripePriceId");
CREATE UNIQUE INDEX "Price_lemonSqueezyVariantId_key" ON "Price"("lemonSqueezyVariantId");
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stripeProductId" TEXT,
    "lemonSqueezyProductId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "paymentProvider" TEXT NOT NULL DEFAULT 'stripe',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("active", "createdAt", "description", "id", "name", "stripeProductId", "updatedAt") SELECT "active", "createdAt", "description", "id", "name", "stripeProductId", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_stripeProductId_key" ON "Product"("stripeProductId");
CREATE UNIQUE INDEX "Product_lemonSqueezyProductId_key" ON "Product"("lemonSqueezyProductId");
CREATE TABLE "new_Subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "stripePriceId" TEXT,
    "stripeCurrentPeriodEnd" DATETIME,
    "lemonSqueezyCustomerId" TEXT,
    "lemonSqueezySubscriptionId" TEXT,
    "lemonSqueezyVariantId" TEXT,
    "lemonSqueezyCurrentPeriodEnd" DATETIME,
    "paymentProvider" TEXT NOT NULL DEFAULT 'stripe',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Subscription" ("createdAt", "id", "stripeCurrentPeriodEnd", "stripeCustomerId", "stripePriceId", "stripeSubscriptionId", "updatedAt", "userId") SELECT "createdAt", "id", "stripeCurrentPeriodEnd", "stripeCustomerId", "stripePriceId", "stripeSubscriptionId", "updatedAt", "userId" FROM "Subscription";
DROP TABLE "Subscription";
ALTER TABLE "new_Subscription" RENAME TO "Subscription";
CREATE UNIQUE INDEX "Subscription_stripeSubscriptionId_key" ON "Subscription"("stripeSubscriptionId");
CREATE UNIQUE INDEX "Subscription_lemonSqueezySubscriptionId_key" ON "Subscription"("lemonSqueezySubscriptionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "CronJobRun_jobName_idx" ON "CronJobRun"("jobName");

-- CreateIndex
CREATE INDEX "CronJobRun_status_idx" ON "CronJobRun"("status");

-- CreateIndex
CREATE INDEX "CronJobRun_startedAt_idx" ON "CronJobRun"("startedAt");

-- CreateIndex
CREATE UNIQUE INDEX "User_lemonSqueezyCustomerId_key" ON "User"("lemonSqueezyCustomerId");
