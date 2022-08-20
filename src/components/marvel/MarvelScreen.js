import { HeroList } from "../hero/HeroList";

export const MarvelScreen = () => {
  return (
    <>
      <h1>Marvel Screen</h1>
      <hr />

      <HeroList
        publisher='Marvel Comics'
      />
    </>
  );
};
