\echo "Database cleaning..."
SET client_min_messages TO WARNING;

DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;

DROP ROLE IF EXISTS staff_user;
DROP ROLE IF EXISTS anonymous_user;


CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

\echo "Database cleaned"