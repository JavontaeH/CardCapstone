using System;
using CardCapstone.Models;
using CardCapstone.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CardCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeckController : ControllerBase
    {
        private readonly IDeckRepository _deckRepository;
        public DeckController(IDeckRepository deckRepository)
        {
            _deckRepository = deckRepository;
        }

        [HttpGet("GetAllUserDecks/{id}")]
        public IActionResult GetAllUserDecks(int id)
        {
            return Ok(_deckRepository.GetAllUserDecks(id));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var deck = _deckRepository.GetDeckById(id);
            if (deck == null)
            {
                return NotFound();
            }
            return Ok(deck);
        }


        [HttpPost]
        public IActionResult Post(Deck deck)
        {
            _deckRepository.AddDeck(deck);
            return CreatedAtAction("Get", new { id = deck.Id }, deck);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Deck deck)
        {
            if (id != deck.Id)
            {
                return BadRequest();
            }

            _deckRepository.UpdateDeck(deck);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _deckRepository.DeleteDeck(id);
            return NoContent();
        }

        [HttpPost("UpdateDeckCards")]
        public IActionResult UpdateDeckCards(Deck deck)
        {
            _deckRepository.UpdateDeckCards(deck);
            return NoContent();
        }


    }
}