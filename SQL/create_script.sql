USE [master]

IF db_id('CardCapstone') IS NULl
  CREATE DATABASE [CardCapstone]
GO

USE [CardCapstone]
GO


DROP TABLE IF EXISTS [DeckCards];
DROP TABLE IF EXISTS [UserCards];
DROP TABLE IF EXISTS [Deck];
DROP TABLE IF EXISTS [Card];
DROP TABLE IF EXISTS [CardType];
DROP TABLE IF EXISTS [UserProfile];
GO



CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [DisplayName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FirebaseUserId] nvarchar(28) NOT NULL

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)
GO

CREATE TABLE [Deck] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [DeckCode] int NOT NULL,
  [UserId] int NOT NULL

  CONSTRAINT UQ_DeckCode UNIQUE(DeckCode)
)
GO

CREATE TABLE [Card] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [ImageLocation] nvarchar(255) NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [Hp] int,
  [Atk] int,
  [Mana] int NOT NULL,
  [CardTypeId] int NOT NULL
)
GO

CREATE TABLE [CardType] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [DeckCards] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [DeckId] int NOT NULL,
  [CardId] int NOT NULL
)
GO

CREATE TABLE [UserCards] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [CardId] int NOT NULL,
  [UserId] int NOT NULL
)
GO

ALTER TABLE [Deck] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Card] ADD FOREIGN KEY ([CardTypeId]) REFERENCES [CardType] ([Id])
GO

ALTER TABLE [DeckCards] ADD FOREIGN KEY ([CardId]) REFERENCES [Card] ([Id])
GO

ALTER TABLE [UserCards] ADD FOREIGN KEY ([CardId]) REFERENCES [Card] ([Id])
GO

ALTER TABLE [UserCards] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [DeckCards] ADD FOREIGN KEY ([DeckId]) REFERENCES [Deck] ([Id]) ON DELETE CASCADE
GO