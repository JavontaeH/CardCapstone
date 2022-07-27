use [CardCapstone];
GO


set identity_insert [UserProfile] on 
insert into [UserProfile] ([Id], [DisplayName], [Email], [FirebaseUserId])
values (1, 'admin', 'admin@email.com', 'hmEn13uyI8Xgl1j4bQPHbCN25mW2')
set identity_insert [UserProfile] off


set identity_insert [CardType] on 
insert into [CardType] ([Id], [Name])
values (1, 'Normal')
set identity_insert [CardType] off


set identity_insert [Card] on 
insert into [Card] ([Id], [Name],  [ImageLocation], [Description], [Mana], [Atk], [Hp], [CardTypeId])
values 
(1, 'Murloc Tinyfin', '/images/card-art/Murloc_Tinyfin.png', '', 0, 1, 1, 1),
(2, 'Flame Imp', '/images/card-art/Flame_Imp.png', '<b>Battlecry</b>: Deal 3 damage to your hero.', 1, 3, 2, 1),
(3, 'Acidic Ooze', '/images/card-art/Acidic_Ooze.png', 'Destroy your opponent''s weapon.', 2, 3, 2, 1), 
(4, 'Tar Creeper', '/images/card-art/Tar_Creeper.png', '<b>Taunt</b> Has +2 Attack during your opponent''s turn.', 3, 1, 5, 1),
(5, 'Chillwind Yeti', '/images/card-art/Chillwind_Yeti.png', '', 4, 4, 5, 1),
(6, 'Prince Malchezar', '/images/card-art/Prince_Malchezaar.png', '<b>Start of Game:</b> add 5 extra <b>Legendary</b> minions to your deck.', 5, 5, 6, 1),
(7, 'Crystal Runner', '/images/card-art/Kabal_Crystal_Runner.png', 'Costs (2) less for each secret you''ve played this game.', 6, 5, 5, 1),
(8, 'Dr. Boom', '/images/card-art/Dr_Boom.png', '<b>Battlecry:</b> Summon two 1/1 Boom Bots. WARNING: Bots may explode.', 7, 7, 7, 1),
(9, 'Ragnaros', '/images/card-art/Ragnaros.png', 'Can''t attack. At the end of your turn, deal 8 damage to a random enemy.', 8, 8, 8, 1),
(10, 'Alexstrasza', '/images/card-art/Alexstrasza.png', '<b>Battlecry:</b> Set a hero''s remaining Health to 15.', 9, 8, 8, 1),
(11, 'C''Thun', '/images/card-art/Cthun.png', '<b>Battlecry:</b> Deal damage equal to this minion''s Attack.', 10, 6, 6, 1)
set identity_insert [Card] off

set identity_insert [Deck] on 
insert into [Deck] ([Id], [Name], [DeckCode], [UserId])
values (1, 'temp deck', '12345-admin', 1)
set identity_insert [Deck] off

set identity_insert [DeckCards] on 
insert into [DeckCards] ([Id], [DeckId], [CardId])
values (1, 1, 1)
set identity_insert [DeckCards] off

set identity_insert [UserCards] on 
insert into [UserCards] ([Id], [UserId], [CardId])
values (1, 1, 1)
set identity_insert [UserCards] off
