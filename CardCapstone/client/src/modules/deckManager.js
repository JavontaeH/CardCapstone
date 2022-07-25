const baseUrl = "/api/Deck";

export const getAllUserDecks = (id) => {
  return fetch(`${baseUrl}/GetAllUserDecks/${id}`);
};

export const getDeckById = (id) => {
  return fetch(`${baseUrl}/${id}`);
};

export const editDeck = (deck) => {
  return fetch(`${baseUrl}/EditDeck/${deck.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deck),
  });
};

export const deleteDeck = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
};

export const UpdateDeckCards = (deck) => {
  return fetch(`${baseUrl}/UpdateDeckCards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deck),
  });
};
