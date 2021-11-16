import axios from "axios";
import React, { useEffect } from "react";
import PokemonContext from "../context";
import { GenericPokemon } from "../models/pokemon";
import SearchBar from "../search-bar";
import Spinner from "../spinner";
import Details from "./Details.png";
import Modal from "react-modal";
import PokemonType from "./PokemonType.png";
import PokemonListSidebar from "./PokemonListSidebar";
import { PokemonDetail } from "../models/pokemon-detail";
import cardStyle from "../shared/pokemon-type-style";

/**
 * Renders the list of pokemons fetched from the API
 * @returns {React.ReactElement}
 */
const PokemonList = () => {
  const pokemonDetails = new Map<string, PokemonDetail>();

  const [loading, setLoading] = React.useState(true);
  const [pokemons, setPokemons] = React.useState<GenericPokemon[]>([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [currentPokemon, setCurrentPokemon] = React.useState<PokemonDetail>();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function fetchPokemonDetails(pokemonUrl: string) {
    /**
     * Attempt to find an existing value in the map rather than fetching it again
     */
    if (pokemonDetails.has(pokemonUrl)) {
      setCurrentPokemon(pokemonDetails.get(pokemonUrl));
    } else {
      const retrievedPokemon = await axios.get<PokemonDetail>(pokemonUrl);
      setCurrentPokemon(retrievedPokemon.data);
    }
  }

  async function fetchPokemons() {
    const retrievedPokemons = await axios.get<{
      results: GenericPokemon[];
    }>("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150");

    setPokemons(retrievedPokemons.data.results);
    setLoading(false);
  }

  async function previousPokemon() {
    const previousPokemonIndex =
      pokemons.findIndex((p) => p.name === currentPokemon?.name) - 1;
    const pokemonToRetrieve =
      pokemons[previousPokemonIndex] || pokemons[pokemons.length - 1];
    await fetchPokemonDetails(pokemonToRetrieve.url);
  }

  async function nextPokemon() {
    const previousPokemonIndex =
      pokemons.findIndex((p) => p.name === currentPokemon?.name) + 1;
    const pokemonToRetrieve = pokemons[previousPokemonIndex] || pokemons[0];
    await fetchPokemonDetails(pokemonToRetrieve.url);
  }

  useEffect(() => {
    fetchPokemons();
  }, []);

  function pokemonDetail() {
    if (currentPokemon) {
      return (
        <>
          <div className="flex justify-center">
            <div
              className="flex bg-cover"
              style={{
                backgroundImage: `url(${PokemonType})`,
                height: "130px",
                width: "867px",
              }}
            >
              <div className="w-1/6" onClick={previousPokemon}></div>
              <div className="w-4/6 flex justify-center items-center">
                <span className="text-center font-bold text-gray-800 text-2xl">
                  {currentPokemon?.name}
                </span>
              </div>
              <div className="w-1/6" onClick={nextPokemon}></div>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={currentPokemon?.sprites?.front_default}
              alt="Pokemon"
              className="h-32 w-32"
            />
          </div>

          <div className="flex justify-end">
            <div className="w-16 rounded-full bg-gray-400" onClick={openModal}>
              <img src={Details} alt="Details" />
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-center font-bold text-gray-800 text-2xl">
          You must select a pokemon first!
        </p>
      </div>
    );
  }

  return (
    <PokemonContext.Provider
      value={{
        pokemonsFetched: pokemons,
      }}
    >
      <div className="h-screen w-full bg-blue-800 overflow-hidden">
        <div className="flex flex-wrap overflow-hidden m-6">
          <SearchBar />
        </div>

        <div className="flex overflow-hidden sm:-mx-px">
          <div className="h-screen w-1/3 flex items-center overflow-hidden sm:my-px sm:px-px mx-8">
            {loading ? (
              <Spinner />
            ) : (
              <PokemonListSidebar handlePokemonClick={fetchPokemonDetails} />
            )}
          </div>

          <div className="w-full h-full overflow-hidden sm:my-px sm:px-px bg-white mr-8">
            {pokemonDetail()}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="flex justify-center">
          <div className="w-full p-8" style={cardStyle(currentPokemon?.types)}>
            <p className="text-center font-bold text-gray-800 text-2xl">
              {currentPokemon?.name}
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <figure className="w-32 h-32">
            <img
              src={currentPokemon?.sprites.front_default}
              alt={currentPokemon?.name}
            />
          </figure>
        </div>
        <p className="w-full text-center font-bold text-gray-700">Abilities</p>
        <div className="flex justify-center">
          <ul>
            {currentPokemon?.abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      </Modal>
    </PokemonContext.Provider>
  );
};

export default PokemonList;
