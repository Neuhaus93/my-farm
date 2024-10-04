CREATE TYPE "associate_type" AS ENUM (
	'person',
	'company'
);

CREATE TYPE "category_type" AS ENUM (
	'income',
	'expense'
);
CREATE TABLE "farm" (
	"id" BIGINT NOT NULL UNIQUE,
	"name" VARCHAR NOT NULL,
	PRIMARY KEY("id")
);


CREATE TABLE "user" (
	"id" BIGINT NOT NULL UNIQUE,
	"farm_id" BIGINT NOT NULL,
	"email" VARCHAR NOT NULL UNIQUE,
	PRIMARY KEY("id")
);

CREATE INDEX "users_index_0"
ON "user" ("email");

CREATE INDEX "user_index_1"
ON "user" ("farm_id");

CREATE TABLE "region" (
	"id" BIGINT NOT NULL UNIQUE,
	"farm_id" BIGINT NOT NULL,
	"name" VARCHAR NOT NULL,
	PRIMARY KEY("id")
);

CREATE INDEX "region_index_0"
ON "region" ("farm_id");

CREATE TABLE "transaction" (
	"id" BIGINT NOT NULL UNIQUE,
	"account_id" BIGINT NOT NULL,
	"amount" INTEGER NOT NULL,
	"time" TIMESTAMPTZ NOT NULL,
	"category_id" BIGINT NOT NULL,
	"region_id" BIGINT,
	PRIMARY KEY("id")
);

CREATE INDEX "transactions_index_0"
ON "transaction" ("farm_id");

CREATE TABLE "person" (
	"id" BIGINT NOT NULL UNIQUE,
	"lastname" VARCHAR,
	"firstname" VARCHAR NOT NULL,
	PRIMARY KEY("id")
);


CREATE TABLE "company" (
	"id" BIGINT NOT NULL UNIQUE,
	"name" VARCHAR NOT NULL,
	PRIMARY KEY("id")
);


CREATE TABLE "contractor" (
	"id" BIGINT NOT NULL UNIQUE,
	"farm_id" BIGINT NOT NULL,
	"type" ASSOCIATE_TYPE NOT NULL,
	"person_id" BIGINT UNIQUE,
	"company_id" BIGINT UNIQUE,
	"employee_id" BIGINT UNIQUE,
	PRIMARY KEY("id")
);

COMMENT ON TABLE "contractor" IS 'Needs to have the following constraint:

ALTER TABLE your_table
ADD CONSTRAINT exactly_one_field_set
CHECK (
    (A IS NOT NULL AND B IS NULL) OR (A IS NULL AND B IS NOT NULL)
);';

CREATE INDEX "contractor_index_0"
ON "contractor" ("farm_id");

CREATE TABLE "employee" (
	"id" BIGINT NOT NULL UNIQUE,
	"salary" INTEGER NOT NULL DEFAULT 0,
	"active" BOOLEAN NOT NULL,
	"date_started" TIMESTAMPTZ,
	"date_ended" TIMESTAMPTZ,
	PRIMARY KEY("id")
);


CREATE TABLE "category" (
	"id" BIGINT NOT NULL UNIQUE,
	"farm_id" BIGINT NOT NULL,
	"name" VARCHAR NOT NULL,
	"type" CATEGORY_TYPE NOT NULL,
	"icon_name" VARCHAR NOT NULL,
	"parent_id" BIGINT,
	PRIMARY KEY("id")
);

CREATE INDEX "category_index_0"
ON "category" ("farm_id");

CREATE TABLE "account" (
	"id" BIGINT NOT NULL UNIQUE,
	"farm_id" BIGINT NOT NULL,
	"initial_balance" INTEGER NOT NULL DEFAULT 0,
	"name" VARCHAR NOT NULL,
	PRIMARY KEY("id")
);

CREATE INDEX "account_index_0"
ON "account" ("farm_id");

ALTER TABLE "region"
ADD FOREIGN KEY("farm_id") REFERENCES "farm"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "user"
ADD FOREIGN KEY("farm_id") REFERENCES "farm"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "contractor"
ADD FOREIGN KEY("person_id") REFERENCES "person"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "contractor"
ADD FOREIGN KEY("company_id") REFERENCES "company"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "farm"
ADD FOREIGN KEY("id") REFERENCES "contractor"("farm_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "contractor"
ADD FOREIGN KEY("employee_id") REFERENCES "employee"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "category"
ADD FOREIGN KEY("parent_id") REFERENCES "category"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "transaction"
ADD FOREIGN KEY("category_id") REFERENCES "category"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "transaction"
ADD FOREIGN KEY("region_id") REFERENCES "region"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "transaction"
ADD FOREIGN KEY("account_id") REFERENCES "account"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "account"
ADD FOREIGN KEY("farm_id") REFERENCES "farm"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;