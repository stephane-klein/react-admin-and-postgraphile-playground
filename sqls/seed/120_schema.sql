\echo "Schema creating..."

SET client_min_messages TO WARNING;

CREATE TABLE public.users (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    email          TEXT NOT NULL UNIQUE CHECK (email ~* '^.+@.+\..+$'),
    password_hash  TEXT NOT NULL,
    firstname      VARCHAR(255),
    lastname       VARCHAR(255),
    created_at     TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX users_email_index ON public.users (email);

\echo "Schema created"
