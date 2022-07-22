using System;
using System.Security.Claims;
using CardCapstone.Models;
using CardCapstone.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CardCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserProfileId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserProfileId);
        }

        [HttpGet("{firebaseUserProfileId}")]
        public IActionResult GetUserProfile(string firebaseUserProfileId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserProfileId));
        }

        [HttpGet("GetCurrentUserProfileInfo")]
        public IActionResult GetLoggedInUserProfile()
        {
            UserProfile userProfile = GetCurrentUserProfile();
            userProfile.FirebaseUserId = "lol you can't see this";
            return Ok(userProfile);
        }

        [HttpGet("DoesUserProfileExist/{firebaseUserProfileId}")]
        public IActionResult DoesUserProfileExist(string firebaseUserProfileId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserProfileId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }



        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserProfileId = userProfile.FirebaseUserId },
                userProfile);
        }


        [HttpGet("Details/{id}")]
        public IActionResult GetUserProfileById(int id)
        {
            var userProfile = _userProfileRepository.GetUserProfileById(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }
    }
}
