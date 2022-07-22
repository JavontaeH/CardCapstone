using System;
using System.Collections.Generic;
using CardCapstone.Models;
using CardCapstone.Utils;
using Microsoft.Extensions.Configuration;

namespace CardCapstone.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, Up.FirebaseUserId,  up.DisplayName, 
                               up.Email
                          FROM UserProfile up
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile UserProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        UserProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),

                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),

                        };
                    }
                    reader.Close();

                    return UserProfile;
                }
            }
        }

        public void Add(UserProfile UserProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, DisplayName, 
                                                                 Email)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId,  @DisplayName, 
                                                @Email)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", UserProfile.FirebaseUserId);

                    DbUtils.AddParameter(cmd, "@DisplayName", UserProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", UserProfile.Email);


                    UserProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<UserProfile> GetAllUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id,  up.DisplayName, up.Email
                        FROM UserProfile up
                        ORDER BY up.DisplayName
                    ";

                    List<UserProfile> users = new List<UserProfile>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        UserProfile UserProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),

                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),

                        };
                        users.Add(UserProfile);
                    }
                    reader.Close();

                    return users;
                }
            }
        }


        public UserProfile GetUserProfileById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id,  up.DisplayName, 
                               up.Email
                          FROM UserProfile up
                         WHERE up.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    UserProfile UserProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        UserProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),

                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),

                        };
                    }
                    reader.Close();

                    return UserProfile;
                }
            }
        }


    }
}
