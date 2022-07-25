using CardCapstone.Models;
using System.Collections.Generic;

namespace CardCapstone.Repositories
{
    public interface ICardRepository
    {
        void AddCard(Card card);
        List<Card> GetAll();
        Card GetCardById(int id);
        void UpdateCard(Card card);

        List<Card> TextSearchForCard(string query);

        List<Card> ManaSearchForCard(int mana);

    }
}