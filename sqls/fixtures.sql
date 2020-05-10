TRUNCATE public.contacts CASCADE;

INSERT INTO public.contacts
    (
        id,
        email,
        firstname,
        lastname
    )
    SELECT
        ('1de9c987-08ab-32fe-e218-89c124cd' || to_char(seqnum, 'FM0000'))::uuid,
        'firstname' || to_char(seqnum, 'FM0000') || '@example.com',
        'firstname' || to_char(seqnum, 'FM0000'),
        'lastname' || to_char(seqnum, 'FM0000')
    FROM 
        GENERATE_SERIES(1, 50) seqnum;