import { heroes } from "../data/heroes"

export const getHeroesByName = (name = '') => {
  if (name === '') {
    return [];
  }

  const nameInLowerCase = name.toLowerCase();

  return heroes.filter(hero => {
    const superheroInLowerCase = hero.superhero.toLowerCase();
    return superheroInLowerCase.includes(nameInLowerCase);
  });
};
