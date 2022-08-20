import { HeroCard } from "./HeroCard";
import { getHeroesByPublisher } from "../selectors/getHeroesByPublisher";
import { useMemo } from "react";

export const HeroList = ({ publisher }) => {
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

  return (
    <div className="rows rows-cols-1 rows-cols-md-3 g-3 animate__animated animate__fadeIn">
      { heroes.map(hero => (
        <HeroCard
          key={ hero.id }
          { ...hero }
        />
      ))}
    </div>
  );
};
