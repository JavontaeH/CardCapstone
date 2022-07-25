const baseUrl = "/api/Card";

export const getAllCards = () => {
  return fetch(baseUrl).then((res) => res.json());
};

export const textSearchCards = (query) => {
  return fetch(`${baseUrl}/textsearch?q=${query}`);
};

export const manaSearchCards = (mana) => {
  return fetch(`${baseUrl}/manasearch?m=${mana}`);
};
