-- Seeds menu_items and gym_classes with the site's current launch content.
-- Run once after schema.sql, in the Supabase SQL Editor. Safe to re-run —
-- upserts on primary key, so editing rows in the admin dashboard afterwards
-- won't be clobbered unless you re-run this file.

insert into menu_items (id, category, name, description, price, image, spicy, vegetarian, popular, sort_order)
values
  ('app-01', 'Appetizers', 'Grilled Tiger Prawns', 'Charred jumbo prawns, chili-lime glaze, coconut cream dip.', 185, '/images/restaurant/dish-crispy-shrimp.jpg', true, false, true, 10),
  ('app-02', 'Appetizers', 'Plantain & Halloumi Stack', 'Sweet plantain, grilled halloumi, pepper sauce drizzle.', 120, '/images/restaurant/dish-spring-rolls.jpg', false, true, false, 20),
  ('app-03', 'Appetizers', 'Smoked Fish Croquettes', 'Bonga fish, scotch bonnet aioli, crisp herb crumb.', 140, '/images/restaurant/dish-ceviche.jpg', true, false, false, 30),
  ('main-01', 'Mains', 'LÖR Signature Jollof & Grilled Lobster', 'Smoked jollof rice, butter-poached lobster tail, herb oil.', 420, '/images/restaurant/dish-lobster.jpg', false, false, true, 10),
  ('main-02', 'Mains', 'Wagyu Beef Short Rib', '24-hour braise, cassava purée, red wine jus.', 480, '/images/restaurant/dish-tomahawk.jpg', false, false, true, 20),
  ('main-03', 'Mains', 'Groundnut Stew Risotto', 'Slow-cooked peanut stew folded into saffron risotto.', 260, '/images/restaurant/dish-night-dinner.jpg', false, true, false, 30),
  ('main-04', 'Mains', 'Pepper Chicken Supreme', 'Free-range chicken breast, roasted pepper sauce, fried yam.', 240, '/images/restaurant/dish-plated-chicken.jpg', true, false, false, 40),
  ('cock-01', 'Cocktails', 'Goderich Sunset', 'Spiced rum, hibiscus, ginger, fresh lime.', 95, '/images/restaurant/cocktail-sunset.jpg', false, false, true, 10),
  ('cock-02', 'Cocktails', 'Freetown Old Fashioned', 'Bourbon, palm sugar bitters, orange oils.', 110, '/images/restaurant/dish-berry-cocktail.jpg', false, false, false, 20),
  ('cock-03', 'Cocktails', 'LÖR Gold Fizz', 'Gin, elderflower, champagne top, 24k gold leaf.', 135, '/images/restaurant/dish-cocktail-pineapple.jpg', false, false, true, 30),
  ('lng-01', 'Shisha & Lounge', 'Double Apple Shisha', 'Classic blend, premium coal, 45-min service.', 150, '/images/restaurant/interior-lounge.jpg', false, false, false, 10),
  ('lng-02', 'Shisha & Lounge', 'Mint Mojito Shisha', 'Fresh mint and citrus blend, chilled hose.', 160, '/images/restaurant/interior-bar.jpg', false, false, false, 20),
  ('lng-03', 'Shisha & Lounge', 'Lounge Sharing Platter', 'Curated bites for the table — chef''s selection.', 320, '/images/restaurant/dish-sushi-spread.jpg', false, false, true, 30)
on conflict (id) do update set
  category = excluded.category,
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  image = excluded.image,
  spicy = excluded.spicy,
  vegetarian = excluded.vegetarian,
  popular = excluded.popular,
  sort_order = excluded.sort_order;

insert into gym_classes (id, name, type, day, time, instructor, spots, sort_order)
values
  ('cls-01', 'Sunrise HIIT', 'HIIT', 'Monday', '6:00 AM', 'Coach Amara', 12, 10),
  ('cls-02', 'Iron Strength', 'Strength', 'Monday', '6:00 PM', 'Coach Musa', 15, 20),
  ('cls-03', 'Flow Yoga', 'Yoga', 'Tuesday', '7:00 AM', 'Coach Fatmata', 18, 30),
  ('cls-04', 'HIIT Burn', 'HIIT', 'Wednesday', '6:00 PM', 'Coach Amara', 12, 40),
  ('cls-05', 'Power Lifting', 'Strength', 'Thursday', '6:00 AM', 'Coach Musa', 10, 50),
  ('cls-06', 'Sunset Yoga', 'Yoga', 'Friday', '6:00 PM', 'Coach Fatmata', 18, 60),
  ('cls-07', 'Weekend HIIT', 'HIIT', 'Saturday', '9:00 AM', 'Coach Amara', 20, 70),
  ('cls-08', 'Strength Foundations', 'Strength', 'Sunday', '10:00 AM', 'Coach Musa', 15, 80)
on conflict (id) do update set
  name = excluded.name,
  type = excluded.type,
  day = excluded.day,
  time = excluded.time,
  instructor = excluded.instructor,
  spots = excluded.spots,
  sort_order = excluded.sort_order;
