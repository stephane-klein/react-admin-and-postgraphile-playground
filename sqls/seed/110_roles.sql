\echo "Roles creating..."
SET client_min_messages TO WARNING;

CREATE ROLE staff_user;
CREATE ROLE anonymous_user;

GRANT USAGE ON SCHEMA public TO staff_user, anonymous_user;

\echo "Roles created"
