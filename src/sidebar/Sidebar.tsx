import React from "react";
import { GenericPokemon } from "../models/pokemon";

const Sidebar = ({
  onClick,
  pokemons = [],
}: {
  onClick: Function;
  pokemons: GenericPokemon[];
}) => {
  return (
    <aside className="flex flex-row h-96 max-h-96">
      <div className="flex flex-col w-56 bg-white rounded-l-3xl overflow-hidden overflow-y-scroll">
        <ul className="flex flex-col py-4">
          {pokemons.map((pokemon) => (
            <li key={pokemon.name} onClick={() => onClick(pokemon.url)}>
              <p className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                <span className="mx-2 text-sm font-medium">{pokemon.name}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
