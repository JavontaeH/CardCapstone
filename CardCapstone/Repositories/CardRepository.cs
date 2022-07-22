using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using CardCapstone.Models;

namespace CardCapstone.Repositories
{
    public class CardRepository : BaseRepository
    {
        public CardRepository(IConfiguration configuration) : base(configuration) { }
        public List<Card> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT id, name FROM Card ORDER BY name";
                    var reader = cmd.ExecuteReader();

                    var categories = new List<Card>();

                    while (reader.Read())
                    {
                        categories.Add(new Card()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            Name = reader.GetString(reader.GetOrdinal("name")),
                            
                        });
                    }

                    reader.Close();

                    return categories;
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
                        SELECT Id, [Name]
                        FROM Card
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Card card = new Card()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name"))
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
                    INSERT INTO Card ([Name])
                    OUTPUT INSERTED.ID
                    VALUES (@name);
                ";

                    cmd.Parameters.AddWithValue("@name", card.Name);

                    int id = (int)cmd.ExecuteScalar();

                    card.Id = id;
                }
            }
        }

        public void DeleteCard(int cardId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Post
                            SET CardId = NULL
                            WHERE CardId = @id
                            DELETE FROM Card
                            WHERE Id = @id;
                        ";

                    cmd.Parameters.AddWithValue("@id", cardId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateCard(Card card)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Card
                                        SET 
                                        Name = @name
                                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@name", card.Name);
                    cmd.Parameters.AddWithValue("@id", card.Id);

                    cmd.ExecuteNonQuery();

                }
            }
        }

    }
}
