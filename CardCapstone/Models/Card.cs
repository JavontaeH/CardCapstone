using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace CardCapstone.Models
{
    public class Card
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageLocation { get; set; }

        public string Description { get; set; }

        public int Hp { get; set; }

        public int Atk { get; set; }

        public int Mana { get; set; }

        public int CardTypeId { get; set; }


    }
}