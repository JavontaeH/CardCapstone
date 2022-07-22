using System;
using CardCapstone.Models;
using CardCapstone.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CardCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly ICardRepository _cardRepository;
        public CardController(ICardRepository cardRepository)
        {
            _cardRepository = cardRepository;
        }

        [HttpGet]
        public IActionResult GetAllCards()
        {
            return Ok(_cardRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var card = _cardRepository.GetCardById(id);
            if (card == null)
            {
                return NotFound();
            }
            return Ok(card);
        }


        [HttpPost]
        public IActionResult Post(Card card)
        {
            _cardRepository.AddCard(card);
            return CreatedAtAction("Get", new { id = card.Id }, card);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Card card)
        {
            if (id != card.Id)
            {
                return BadRequest();
            }

            _cardRepository.UpdateCard(card);
            return NoContent();
        }

    }
}