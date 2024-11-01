-- CreateTable
CREATE TABLE "sellers" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),
    "phone" VARCHAR(15),
    "email" VARCHAR(255),

    CONSTRAINT "sellers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sellers_email_key" ON "sellers"("email");
