import React from "react";
import PokemonContext from "../context";
import SearchBar from "../search-bar";
import Sidebar from "../sidebar";

const Home = () => {
  return (
    <PokemonContext.Provider
      value={{
        pokemonsFetched: [],
      }}
    >
      <div className="h-screen w-full bg-blue-800 overflow-hidden">
        <div className="flex flex-wrap overflow-hidden m-6">
          <SearchBar />
        </div>

        <div className="flex flex-wrap overflow-hidden sm:-mx-px">
          <div className="h-screen w-1/3 flex items-center overflow-hidden sm:my-px sm:px-px mx-8">
            <Sidebar pokemons={[]} onClick={() => null} />
          </div>

          <div className="w-2/3 overflow-hidden sm:my-px sm:px-px"></div>
        </div>
      </div>
    </PokemonContext.Provider>
  );
};

export default Home;
