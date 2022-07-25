using CardCapstone.Models;
using System.Collections.Generic;

namespace CardCapstone.Repositories
{
    public interface IDeckRepository
    {
        void AddDeck(Deck deck);
        void DeleteDeck(int id);
        List<Deck> GetAllUserDecks(int id);
        Deck GetDeckById(int id);
        void UpdateDeck(Deck deck);
        void UpdateDeckCards(Deck deck);
    }
}