using System.Collections.Generic;
using CardCapstone.Models;

namespace CardCapstone.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetUserProfileById(int id);
    }
}