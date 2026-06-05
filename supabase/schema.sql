create table if not exists shifts (
  id bigint generated always as identity primary key,
  telegram_id bigint,
  shift_date date,
  peaks int,
  hours float,
  pph float,
  rate float,
  bonus float,
  above_norm int,
  created_at timestamp default now()
);