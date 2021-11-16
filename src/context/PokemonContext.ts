import { createContext } from "react";

interface PokemonContextStore {
  pokemonsFetched: { name: string; url: string }[];
}

const PokemonContext = createContext<PokemonContextStore>({
  pokemonsFetched: [],
});

export default PokemonContext;
