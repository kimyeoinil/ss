-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  full_name text,
  avatar_url text,
  is_breeder boolean default false,
  breeder_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Animals table
create table public.animals (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  species text not null,
  price integer not null,
  description text,
  location text,
  morph text,
  gender text check (gender in ('male', 'female', 'unknown')),
  size text,
  weight text,
  birth_date date,
  is_health_checked boolean default false,
  seller_id uuid references auth.users on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Animal images table
create table public.animal_images (
  id uuid default uuid_generate_v4() primary key,
  animal_id uuid references public.animals on delete cascade not null,
  image_url text not null,
  is_primary boolean default false,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Diagnoses table
create table public.diagnoses (
  id uuid default uuid_generate_v4() primary key,
  animal_id uuid references public.animals on delete set null,
  user_id uuid references auth.users on delete cascade not null,
  health_score integer not null check (health_score between 0 and 100),
  health_status text not null check (health_status in ('excellent', 'good', 'fair', 'poor')),
  morph_species text not null,
  morph_name text not null,
  morph_confidence integer not null check (morph_confidence between 0 and 100),
  morph_description text,
  morph_rarity text check (morph_rarity in ('common', 'uncommon', 'rare', 'ultra_rare')),
  morph_characteristics jsonb,
  recommendations jsonb,
  warnings jsonb,
  image_url text not null,
  pdf_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Favorites table
create table public.favorites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  animal_id uuid references public.animals on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, animal_id)
);

-- View history table
create table public.view_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  animal_id uuid references public.animals on delete cascade not null,
  viewed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Breeders table
create table public.breeders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade unique not null,
  business_name text,
  description text,
  location text not null,
  specialties jsonb,
  rating numeric(2,1) default 0,
  review_count integer default 0,
  transaction_count integer default 0,
  ai_diagnosis_rate integer default 0,
  instagram_url text,
  youtube_url text,
  blog_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.animals enable row level security;
alter table public.animal_images enable row level security;
alter table public.diagnoses enable row level security;
alter table public.favorites enable row level security;
alter table public.view_history enable row level security;
alter table public.breeders enable row level security;

-- RLS Policies

-- Profiles
create policy "Public profiles are viewable by everyone" on public.profiles
  for select using (true);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Animals
create policy "Animals are viewable by everyone" on public.animals
  for select using (true);

create policy "Users can insert own animals" on public.animals
  for insert with check (auth.uid() = seller_id);

create policy "Users can update own animals" on public.animals
  for update using (auth.uid() = seller_id);

create policy "Users can delete own animals" on public.animals
  for delete using (auth.uid() = seller_id);

-- Animal images
create policy "Animal images are viewable by everyone" on public.animal_images
  for select using (true);

create policy "Users can manage images for own animals" on public.animal_images
  for all using (
    exists (
      select 1 from public.animals
      where animals.id = animal_images.animal_id
      and animals.seller_id = auth.uid()
    )
  );

-- Diagnoses
create policy "Users can view own diagnoses" on public.diagnoses
  for select using (auth.uid() = user_id);

create policy "Users can create own diagnoses" on public.diagnoses
  for insert with check (auth.uid() = user_id);

-- Favorites
create policy "Users can view own favorites" on public.favorites
  for select using (auth.uid() = user_id);

create policy "Users can manage own favorites" on public.favorites
  for all using (auth.uid() = user_id);

-- View history
create policy "Users can view own history" on public.view_history
  for select using (auth.uid() = user_id);

create policy "Users can insert own history" on public.view_history
  for insert with check (auth.uid() = user_id);

-- Breeders
create policy "Breeders are viewable by everyone" on public.breeders
  for select using (true);

create policy "Users can manage own breeder profile" on public.breeders
  for all using (auth.uid() = user_id);

-- Functions
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();