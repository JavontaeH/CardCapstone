import "./Deck.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export const Deck = ({ deck, handleDeckClick }) => {
  return (
    <Box
      sx={{
        width: 500,
        height: 500,
        backgroundImage:
          deck.deckCards.length >= 1
            ? `url(${deck.deckCards[0].imageLocation})`
            : `url(${"/images/card-art/Leeroy_Jenkins.png"})`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {deck.name}
    </Box>
  );
};
