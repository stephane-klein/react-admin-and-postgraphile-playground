\echo "User functions creating..."

CREATE OR REPLACE FUNCTION public.register_user(
  firstname TEXT,
  lastname TEXT,
  email TEXT,
  password TEXT
) RETURNS public.users AS $$
DECLARE
  user public.users;
BEGIN
    INSERT INTO public.users (
        email,
        password_hash,
        firstname,
        lastname
    )
    VALUES (
        email,
        crypt(password, gen_salt('bf')),
        firstname,
        lastname
    )
    RETURNING * INTO user;
    RETURN user;
END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

CREATE TYPE public.jwt_token AS (
  role      TEXT,
  person_id UUID
);

CREATE FUNCTION public.authenticate(
  _email TEXT,
  _password TEXT
) RETURNS public.jwt_token AS $$
BEGIN
  RETURN (
    SELECT 
      ('staff_user', id)::public.jwt_token
    FROM
      public.users
    WHERE 
      users.email = _email AND
      password_hash = crypt(_password, users.password_hash)
  );
END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;


\echo "User functions created"
