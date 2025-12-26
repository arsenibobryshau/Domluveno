-- enable pgcrypto for UUID generation
create extension if not exists "pgcrypto";

create table users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  role text not null default 'user',
  created_at timestamptz not null default now()
);

create table profiles (
  user_id uuid primary key references users(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  phone text,
  verified boolean not null default false,
  bio text,
  skills text,
  city text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table categories (
  id serial primary key,
  name text not null unique
);

create table services (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references users(id) on delete cascade,
  category_id int not null references categories(id),
  title text not null,
  description text,
  price_per_hour numeric(10,2),
  currency text not null default 'CZK',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table requests (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references users(id) on delete cascade,
  category_id int not null references categories(id),
  title text not null,
  description text,
  location text,
  budget numeric(10,2),
  currency text not null default 'CZK',
  status text not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table offers (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references requests(id) on delete cascade,
  provider_id uuid not null references users(id) on delete cascade,
  message text,
  price numeric(10,2),
  currency text not null default 'CZK',
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table conversations (
  id uuid primary key default gen_random_uuid(),
  request_id uuid references requests(id) on delete cascade,
  user_a uuid not null references users(id) on delete cascade,
  user_b uuid not null references users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  sender_id uuid not null references users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create table attachments (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references users(id) on delete cascade,
  request_id uuid references requests(id) on delete cascade,
  offer_id uuid references offers(id) on delete cascade,
  message_id uuid references messages(id) on delete cascade,
  storage_key text not null,
  mime_type text not null,
  size_bytes int not null,
  created_at timestamptz not null default now()
);

create table request_log (
  id serial primary key,
  request_id text not null,
  user_id uuid references users(id),
  endpoint text not null,
  payload jsonb,
  status text not null,
  created_at timestamptz not null default now(),
  unique (request_id, endpoint)
);

create table refresh_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  token text not null unique,
  expires_at timestamptz not null,
  revoked boolean not null default false,
  created_at timestamptz not null default now()
);

