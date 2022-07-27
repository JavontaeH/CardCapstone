const baseUrl = "/api/Deck";

//TODO: ADD AUTHORIZATION TO MANAGER METHODS

export const getAllUserDecks = (id) => {
  return fetch(`${baseUrl}/GetAllUserDecks/${id}`).then((response) =>
    response.json()
  );
};

export const getDeckById = (id) => {
  return fetch(`${baseUrl}/${id}`).then((res) => res.json());
};

export const editDeck = (deck) => {
  return fetch(`${baseUrl}/${deck.id}`, {
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

export const addDeck = (deck) => {
  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deck),
  }).then((response) => response.json());
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
