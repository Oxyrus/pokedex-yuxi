interface PokemonType {
  type: {
    name: string;
  };
}

const pokemonTypeStyles = new Map()
  .set("fire", "#fb6c6c")
  .set("grass", "#48d0b0")
  .set("poison", "#28ab68")
  .set("bug", "#ce8e3f")
  .set("flying", "#adbcc3")
  .set("water", "#6db3f8")
  .set("electric", "#ffd76f");

const cardStyle = (types: PokemonType[] = []) => {
  const backgroundColor = types
    .map((t) => t.type.name)
    .find((type) => pokemonTypeStyles.has(type));

  const style = {
    backgroundColor: pokemonTypeStyles.get(backgroundColor) || "gray",
  };

  return style;
};

export default cardStyle;
