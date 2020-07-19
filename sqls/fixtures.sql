TRUNCATE public.users CASCADE;

SELECT public.register_user(
    'Stéphane',
    'Klein',
    'contact@stephane-klein.info',
    'secret'
);

SELECT public.authenticate(
    'contact@stephane-klein.info',
    'secret'
);