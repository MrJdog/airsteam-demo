-- AirSteam — database schema
-- Kør dette i Supabase Dashboard -> SQL Editor -> New query -> Run

-- ---------- profiles ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Brugere kan se egen profil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Brugere kan opdatere egen profil"
  on public.profiles for update
  using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------- packages ----------
create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  car_size text not null check (car_size in ('small', 'medium', 'large')),
  tier text not null check (tier in ('indvendig', 'bronze', 'solv', 'guld')),
  name text not null,
  description text not null default '',
  price_kr numeric(10, 2) not null,
  sort_order int not null default 0
);

alter table public.packages enable row level security;

create policy "Alle kan se pakkerne"
  on public.packages for select
  using (true);

-- ---------- bookings ----------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  package_id uuid references public.packages (id) on delete set null,
  package_name_snapshot text not null,
  booking_date date not null,
  booking_time time not null,
  status text not null default 'bekræftet',
  total_kr numeric(10, 2) not null,
  created_at timestamptz not null default now()
);

alter table public.bookings enable row level security;

create policy "Brugere kan se egne bookinger"
  on public.bookings for select
  using (auth.uid() = user_id);

create policy "Brugere kan oprette egne bookinger"
  on public.bookings for insert
  with check (auth.uid() = user_id);

-- Lader den offentlige (anonyme) rolle se dato+tid for eksisterende bookinger,
-- så ledige tider kan beregnes uden at afsløre hvem der har booket.
create policy "Alle kan se booket dato og tid"
  on public.bookings for select
  using (true);

-- ---------- seed: pakker ----------
insert into public.packages (car_size, tier, name, description, price_kr, sort_order) values
  ('small', 'indvendig', 'Indvendig', 'Måtter bankes, støvsuges og steames. Grundig aftørring af alle overflader.', 700, 1),
  ('small', 'bronze', 'Bronze-pakken', 'Indvendig rengøring plus udvendig håndvask og aftørring.', 900, 2),
  ('small', 'solv', 'Sølv-pakken', 'Bronze-pakken plus voksbehandling og rens af dørkarme.', 1500, 3),
  ('small', 'guld', 'Guld-pakken', 'Sølv-pakken plus polering og ekstra pleje af læder/tekstil.', 2200, 4),

  ('medium', 'indvendig', 'Indvendig', 'Måtter bankes, støvsuges og steames. Grundig aftørring af alle overflader.', 700, 1),
  ('medium', 'bronze', 'Bronze-pakken', 'Indvendig rengøring plus udvendig håndvask og aftørring.', 1000, 2),
  ('medium', 'solv', 'Sølv-pakken', 'Bronze-pakken plus voksbehandling og rens af dørkarme.', 1700, 3),
  ('medium', 'guld', 'Guld-pakken', 'Sølv-pakken plus polering og ekstra pleje af læder/tekstil.', 2400, 4),

  ('large', 'indvendig', 'Indvendig', 'Måtter bankes, støvsuges og steames. Grundig aftørring af alle overflader.', 1000, 1),
  ('large', 'bronze', 'Bronze-pakken', 'Indvendig rengøring plus udvendig håndvask og aftørring.', 1300, 2),
  ('large', 'solv', 'Sølv-pakken', 'Bronze-pakken plus voksbehandling og rens af dørkarme.', 1900, 3),
  ('large', 'guld', 'Guld-pakken', 'Sølv-pakken plus polering og ekstra pleje af læder/tekstil.', 2800, 4)
on conflict do nothing;
