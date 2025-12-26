insert into categories (name) values
    ('Elektrikář'),
    ('Hlídání dětí'),
    ('Sekání trávy'),
    ('Hodinový manžel'),
    ('IT')
on conflict (name) do nothing;

