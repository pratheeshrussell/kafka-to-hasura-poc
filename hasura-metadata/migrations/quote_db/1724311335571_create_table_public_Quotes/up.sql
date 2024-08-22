CREATE TABLE "public"."Quotes" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "quote" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));COMMENT ON TABLE "public"."Quotes" IS E'A table to receive quotes sent from kafka';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
