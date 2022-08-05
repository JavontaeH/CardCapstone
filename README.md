# Webstone

## Description

Webstone is a full-stack web api application using React, .NET, and C# to create a website where users can create their own decks of cards

### Additional Info

Webstone is a full-stack web api that I created for my back-end capstone project at NSS, I believe it encapsulates everything I've learned over the 6 month period and my ability to learn outside of the course requirements. Using C#, .NET, & React I was able to create a full-stack application with a RESTful api that gives users full CRUD access to their decks, is expandable for more admin features, creates dynamically rendered SVGs for cards so that they can be added to the game easily, and allows a game to be played with those decks! (AI or WebSockets coming soon?)

## Demos

### Deck Collection

![Battling Pokemon Demo](/demos/deck-creation.gif)

### Gameplay

![Battling Pokemon Demo](/demos/gameplay.gif)

## Getting Started

### Dependencies

- React, SQLServer, NPM/Yarn.

### Executing program locally

- `git clone` the project into your wanted directory.

- Create a firebase project for this application, set up sign in method for username and password and create a user.

- Once firebase creates a UID for the user, copy the UID from firebase and update the `FirebaseUserId` column for the same users in your SQL Server database.

- Open your client directory in an editor. Open the `.env.local.example` file and replace `**YOUR_API_KEY_HERE**` with your own firebase Web API Key.

- You need an application with the ability to run SQLServer databases (I recommend visual studio)

- If using visual studio, run the create and seed scripts from the SQL folder on your database, and then navigate to the server named "CardCapstone" and click the green play button, make sure to serve it to port 5001.

- After that you can `cd` into the client folder of your project directory, install dependencies using `npm install` and start the application using `npm start`.

## License

I do not claim to own any of the assets used in this website, many of them are owned and trademarked by Blizzard and the various artists they hired to create them, and this was designed purely for educational purposes.

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

- [Joshua Barton (Teacher)](https://github.com/joshdbarton)
- [Dakota Lambert (Teacher)](https://www.linkedin.com/in/dakotashaynelambert/)
- [Doug Silvera (Teacher)](https://www.linkedin.com/in/douglas-silvera-551104a1/)
- [Eric Biershenk (Peer/Advice)](https://www.linkedin.com/in/eric-bierschenk-b38ab71b3/)
- [Ben Watts (Peer/Advice)](https://www.linkedin.com/in/ben-watts9/)
- [Hearthstone Wiki (Inspiration/Source)](https://hearthstone.fandom.com/wiki/Hearthstone_Wiki)
- [Hearthstone (Inspiration/Source)](https://hearthstone.blizzard.com/en-us)

## Tech Stack

- <nobr><img width ='32px' src ='https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/react/react-original.svg'><img width ='32px' src ='https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg'><img width ='32px' src ='https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg'><img width ='32px' src ='https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg'><img width ='32px' src ='https://github.com/devicons/devicon/blob/master/icons/figma/figma-original.svg'>
  <img width ='32px' src ='https://github.com/devicons/devicon/blob/master/icons/csharp/csharp-line.svg'><img width ='32px' src ='https://github.com/devicons/devicon/blob/master/icons/dot-net/dot-net-plain-wordmark.svg'>
