import React, { useContext } from "react";
import PokemonContext from "../context";
import Sidebar from "../sidebar";

const PokemonListSidebar = ({
  handlePokemonClick,
}: {
  handlePokemonClick: Function;
}) => {
  const pokemons = useContext(PokemonContext);

  return (
    <Sidebar pokemons={pokemons.pokemonsFetched} onClick={handlePokemonClick} />
  );
};

export default PokemonListSidebar;
