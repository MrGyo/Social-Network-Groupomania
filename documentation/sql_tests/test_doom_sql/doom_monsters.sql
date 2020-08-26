INSERT INTO doom_monsters (name, origin) VALUES 
('Zombie', 'Hell'),
('Gargoyle', 'Exultia'),
('Pinky_demon', 'Super_Gore_Nest'),
('Soldier', 'Hell'),
('Carcass', 'Super_Gore_Nest'),
('Marauder', 'Arc_Complex');

select * from doom_monsters
inner join details_monsters
on doom_monsters.id = details_monsters.id;
