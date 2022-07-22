use [CardCapstone];
GO


set identity_insert [UserProfile] on 
insert into [UserProfile] ([Id], [DisplayName], [Email], [FirebaseUserId])
values (1, 'admin', 'admin@email.com', 'hmEn13uyI8Xgl1j4bQPHbCN25mW2')
set identity_insert [UserProfile] off


set identity_insert [CardType] on 
insert into [CardType] ([Id], [CardType])
values (1, 'Normal')
set identity_insert [CardType] off


set identity_insert [Card] on 
insert into [Card] ([Id], [Name],  [ImageLocation], [Hp], [Atk], [Mana], [CardTypeId])
values (1, 'temp card', 'not_implemented', 4, 5, 4, 1)
set identity_insert [Card] off

set identity_insert [Deck] on 
insert into [Deck] ([Id], [Name], [DeckCode], [UserId])
values (1, 'temp deck', 12345, 1)
set identity_insert [Deck] off

set identity_insert [DeckCards] on 
insert into [DeckCards] ([Id], [DeckId], [CardId])
values (1, 1, 1)
set identity_insert [DeckCards] off

set identity_insert [UserCards] on 
insert into [UserCards] ([Id], [UserId], [CardId])
values (1, 1, 1)
set identity_insert [UserCards] off
