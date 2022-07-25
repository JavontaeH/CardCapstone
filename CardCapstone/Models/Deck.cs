using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace CardCapstone.Models
{
    public class Deck
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string DeckCode { get; set; }

        public int UserId { get; set; }

        public UserProfile User { get; set; }

        public List<Card> DeckCards { get; set; }

    }
}