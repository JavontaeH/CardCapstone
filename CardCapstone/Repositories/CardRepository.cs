using System.Collections.Generic;
using CardCapstone.Models;
using CardCapstone.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace CardCapstone.Repositories
{
    public class CardRepository : BaseRepository, ICardRepository
    {
        public CardRepository(IConfiguration configuration) : base(configuration) { }
        public List<Card> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT card.id, card.name, imagelocation, hp, atk, mana, description, card.cardtypeid, ct.name as 'ct-name' 
                    from card 
                    join cardtype ct on card.CardTypeId = ct.Id";
                    var reader = cmd.ExecuteReader();

                    var cards = new List<Card>();

                    while (reader.Read())
                    {
                        cards.Add(new Card()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            Name = reader.GetString(reader.GetOrdinal("name")),
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

                    reader.Close();

                    return cards;
                }
            }
        }

        public Card GetCardById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT card.id, card.name, imagelocation, hp, atk, mana, description, card.cardtypeid, ct.name as 'ct-name' 
                        from card 
                        join cardtype ct on card.CardTypeId = ct.Id
                        where card.id = @id ";

                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Card card = new Card()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                Name = reader.GetString(reader.GetOrdinal("name")),
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
                            };

                            return card;
                        }

                        return null;
                    }
                }
            }
        }

        public void AddCard(Card card)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Card ([Name], [ImageLocation], [Hp], [Atk], [Mana], [Description], [CardTypeId])
                    OUTPUT INSERTED.ID
                    VALUES (@name, @imagelocation, @hp, @atk, @mana, @description, @cardTypeId);
                ";

                    cmd.Parameters.AddWithValue("@name", card.Name);
                    DbUtils.AddParameter(cmd, "@imagelocation", card.ImageLocation);
                    DbUtils.AddParameter(cmd, "@hp", card.Hp);
                    DbUtils.AddParameter(cmd, "@atk", card.Atk);
                    DbUtils.AddParameter(cmd, "@mana", card.Mana);
                    DbUtils.AddParameter(cmd, "@description", card.Description);
                    DbUtils.AddParameter(cmd, "@cardTypeId", card.CardTypeId);

                    int id = (int)cmd.ExecuteScalar();

                    card.Id = id;
                }
            }
        }


        // implement deactivating a card?

        public void UpdateCard(Card card)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Card
                                        SET 
                                        Name = @name,
                                        ImageLocation = @imagelocation,
                                        Hp = @hp,
                                        Atk = @atk,
                                        Mana = @mana,
                                        Description = @description,
                                        CardTypeId = @cardTypeId
                                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@name", card.Name);
                    cmd.Parameters.AddWithValue("@id", card.Id);
                    DbUtils.AddParameter(cmd, "@imagelocation", card.ImageLocation);
                    DbUtils.AddParameter(cmd, "@hp", card.Hp);
                    DbUtils.AddParameter(cmd, "@atk", card.Atk);
                    DbUtils.AddParameter(cmd, "@mana", card.Mana);
                    DbUtils.AddParameter(cmd, "@description", card.Description);
                    DbUtils.AddParameter(cmd, "@cardTypeId", card.CardTypeId);


                    cmd.ExecuteNonQuery();

                }
            }
        }

        public List<Card> TextSearchForCard(string query)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT card.id, card.name, imagelocation, hp, atk, mana, description, card.cardtypeid, ct.name as 'ct-name' 
                    from card 
                    join cardtype ct on card.CardTypeId = ct.Id
                    where card.name like @query OR card.description like @query";
                    DbUtils.AddParameter(cmd, "@query", $"%{query}%");
                    var reader = cmd.ExecuteReader();

                    var cards = new List<Card>();

                    while (reader.Read())
                    {
                        cards.Add(new Card()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            Name = reader.GetString(reader.GetOrdinal("name")),
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

                    reader.Close();

                    return cards;
                }
            }
        }


        public List<Card> ManaSearchForCard(int mana)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    if (mana < 7)
                    {
                        cmd.CommandText = @"
                    SELECT card.id, card.name, imagelocation, hp, atk, mana, description, card.cardtypeid, ct.name as 'ct-name' 
                    from card 
                    join cardtype ct on card.CardTypeId = ct.Id
                    where card.mana = @mana";
                    }
                    else if (mana == 7)
                    {
                        cmd.CommandText = @"
                    SELECT card.id, card.name, imagelocation, hp, atk, mana, description, card.cardtypeid, ct.name as 'ct-name' 
                    from card 
                    join cardtype ct on card.CardTypeId = ct.Id
                    where card.mana = @mana OR card.mana > @mana";
                    }
                    DbUtils.AddParameter(cmd, "@mana", mana);
                    var reader = cmd.ExecuteReader();

                    var cards = new List<Card>();

                    while (reader.Read())
                    {
                        cards.Add(new Card()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            Name = reader.GetString(reader.GetOrdinal("name")),
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

                    reader.Close();

                    return cards;
                }
            }
        }

    }
}
