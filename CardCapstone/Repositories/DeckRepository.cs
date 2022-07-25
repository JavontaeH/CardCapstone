using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using CardCapstone.Models;
using CardCapstone.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace CardCapstone.Repositories
{
    public class DeckRepository : BaseRepository, IDeckRepository
    {
        public DeckRepository(IConfiguration configuration) : base(configuration) { }
        public List<Deck> GetAllUserDecks(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    select d.id, d.name, d.deckcode, d.userid, u.displayname, dc.CardId, c.name as 'card-name', c.imagelocation, c.hp, c.atk, c.mana, c.description, c.cardtypeid, ct.name as 'ct-name' 
                    from deck d
                    join userprofile u on u.id = d.userid AND d.userId = @id
                    left join DeckCards dc on dc.DeckId = d.id
                    left join card c on c.id = dc.CardId
                    left join cardtype ct on c.CardTypeId = ct.Id";

                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    var decks = new List<Deck>();

                    while (reader.Read())
                    {
                        var deckId = DbUtils.GetInt(reader, "id");
                        var existingDeck = decks.FirstOrDefault(d => d.Id == deckId);
                        if (existingDeck == null)
                        {
                            existingDeck = new Deck()
                            {
                                Id = DbUtils.GetInt(reader, "id"),
                                Name = DbUtils.GetString(reader, "name"),
                                DeckCode = DbUtils.GetString(reader, "DeckCode"),
                                UserId = DbUtils.GetInt(reader, "userId"),
                                User = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "userId"),
                                    DisplayName = DbUtils.GetString(reader, "displayname")
                                },
                                DeckCards = new List<Card>()

                            };

                            decks.Add(existingDeck);

                        }

                        if (DbUtils.IsNotDbNull(reader, "CardId"))
                        {
                            existingDeck.DeckCards.Add(new Card()
                            {
                                Id = DbUtils.GetInt(reader, "CardId"),
                                Name = reader.GetString(reader.GetOrdinal("card-name")),
                                ImageLocation = reader.GetString(reader.GetOrdinal("imagelocation")),
                                Mana = DbUtils.GetInt(reader, "mana"),
                                Atk = DbUtils.GetInt(reader, "atk"),
                                Hp = DbUtils.GetInt(reader, "hp"),
                                Description = reader.GetString(reader.GetOrdinal("description")),
                                CardTypeId = DbUtils.GetInt(reader, "cardtypeid"),
                                CardType = new CardType()
                                {
                                    Id = DbUtils.GetInt(reader, "cardtypeid"),
                                    Name = DbUtils.GetString(reader, "ct-name")
                                }
                            });
                        }

                    }

                    reader.Close();

                    return decks;
                }
            }
        }

        public Deck GetDeckById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    select d.id, d.name, d.deckcode, d.userid, u.displayname, dc.CardId, c.name as 'card-name', c.imagelocation, c.hp, c.atk, c.mana, c.description, c.cardtypeid, ct.name as 'ct-name' 
                    from deck d
                    join userprofile u on u.id = d.userid AND d.Id = @id
                    left join DeckCards dc on dc.DeckId = d.id
                    left join card c on c.id = dc.CardId
                    left join cardtype ct on c.CardTypeId = ct.Id";

                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    var decks = new List<Deck>();

                    while (reader.Read())
                    {
                        var deckId = DbUtils.GetInt(reader, "id");
                        var existingDeck = decks.FirstOrDefault(d => d.Id == deckId);
                        if (existingDeck == null)
                        {
                            existingDeck = new Deck()
                            {
                                Id = DbUtils.GetInt(reader, "id"),
                                Name = DbUtils.GetString(reader, "name"),
                                DeckCode = DbUtils.GetString(reader, "DeckCode"),
                                UserId = DbUtils.GetInt(reader, "userId"),
                                User = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "userId"),
                                    DisplayName = DbUtils.GetString(reader, "displayname")
                                },
                                DeckCards = new List<Card>()

                            };

                            decks.Add(existingDeck);

                        }

                        if (DbUtils.IsNotDbNull(reader, "CardId"))
                        {
                            existingDeck.DeckCards.Add(new Card()
                            {
                                Id = DbUtils.GetInt(reader, "CardId"),
                                Name = reader.GetString(reader.GetOrdinal("card-name")),
                                ImageLocation = reader.GetString(reader.GetOrdinal("imagelocation")),
                                Mana = DbUtils.GetInt(reader, "mana"),
                                Atk = DbUtils.GetInt(reader, "atk"),
                                Hp = DbUtils.GetInt(reader, "hp"),
                                Description = reader.GetString(reader.GetOrdinal("description")),
                                CardTypeId = DbUtils.GetInt(reader, "cardtypeid"),
                                CardType = new CardType()
                                {
                                    Id = DbUtils.GetInt(reader, "cardtypeid"),
                                    Name = DbUtils.GetString(reader, "ct-name")
                                }
                            });
                        }

                    }

                    reader.Close();

                    return decks[0];
                }
            }
        }

        public void AddDeck(Deck deck)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Deck ([Name], [DeckCode], [UserId])
                    OUTPUT INSERTED.ID
                    VALUES (@name, @deckcode, @UserId);
                ";

                    cmd.Parameters.AddWithValue("@name", deck.Name);
                    DbUtils.AddParameter(cmd, "@deckcode", deck.DeckCode);
                    DbUtils.AddParameter(cmd, "@userId", deck.UserId);

                    int id = (int)cmd.ExecuteScalar();

                    deck.Id = id;
                }
            }
        }

        public void DeleteDeck(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Delete From Deck
                                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);


                    cmd.ExecuteNonQuery();

                }
            }
        }

        public void UpdateDeck(Deck deck)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Deck
                                        SET 
                                        Name = @name
                                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@name", deck.Name);
                    DbUtils.AddParameter(cmd, "@id", deck.Id);

                    cmd.ExecuteNonQuery();

                }
            }
        }

        public void UpdateDeckCards(Deck deck)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Delete From DeckCards
                                        WHERE DeckId = @id";
                    cmd.Parameters.AddWithValue("@id", deck.Id);

                    cmd.ExecuteNonQuery();

                }
                foreach (Card card in deck.DeckCards)
                {
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                    INSERT INTO DeckCards ([DeckId], [CardId])
                    VALUES (@deckId, @cardId)
                    ";
                        DbUtils.AddParameter(cmd, "@deckId", deck.Id);
                        DbUtils.AddParameter(cmd, "@cardId", card.Id);

                        cmd.ExecuteNonQuery();

                    }
                }
            }
        }

    }
}
