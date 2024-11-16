let currentIndex = 1; // Começa com Bulbasaur

// Elementos DOM
const pokemonNameElement = document.getElementById("pokemon-name");
const pokemonImageElement = document.getElementById("pokemon-image");
const pokemonDescriptionElement = document.getElementById(
  "pokemon-description"
);
const pokemonTypeElement = document.getElementById("pokemon-type");
const pokemonStatsElement = document.getElementById("pokemon-stats");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");

// Função para buscar Pokémon
async function fetchPokemon(query) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!response.ok) throw new Error("Pokémon não encontrado.");
    const data = await response.json();

    // Atualizar detalhes
    updatePokemonDetails(data);
  } catch (error) {
    console.error(error);
    pokemonNameElement.textContent = "Pokémon não encontrado.";
    pokemonImageElement.src = "https://via.placeholder.com/150";
    pokemonTypeElement.innerHTML = `<strong>Tipo:</strong> -`;
    pokemonStatsElement.innerHTML = `<strong>Status:</strong> -`;
    pokemonDescriptionElement.textContent = "Tente outro nome ou número.";
  }
}

// Atualizar DOM com dados do Pokémon
function updatePokemonDetails(pokemon) {
  pokemonNameElement.textContent =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  pokemonImageElement.src =
    pokemon.sprites.front_default || "https://via.placeholder.com/150";
  pokemonImageElement.alt = pokemon.name;

  const types = pokemon.types.map((typeInfo) => typeInfo.type.name).join(", ");
  pokemonTypeElement.innerHTML = `<strong>Tipo:</strong> ${types}`;

  pokemonStatsElement.innerHTML = `
    <strong>Status:</strong> 
    HP - ${pokemon.stats[0].base_stat}, 
    Ataque - ${pokemon.stats[1].base_stat}, 
    Defesa - ${pokemon.stats[2].base_stat}
  `;

  pokemonDescriptionElement.textContent = `#${pokemon.id} - Explore o mundo Pokémon!`;
  currentIndex = pokemon.id; // Atualiza o índice atual
}

// Navegar para o próximo ou anterior
prevButton.addEventListener("click", () => {
  currentIndex = currentIndex > 1 ? currentIndex - 1 : 1010; // Rotação no índice
  fetchPokemon(currentIndex);
});

nextButton.addEventListener("click", () => {
  currentIndex = currentIndex < 1010 ? currentIndex + 1 : 1; // Rotação no índice
  fetchPokemon(currentIndex);
});

// Busca Pokémon ao clicar no botão
searchButton.addEventListener("click", () => {
  const query = searchBar.value.trim().toLowerCase();
  if (query) fetchPokemon(query);
});

// Carrega o Pokémon inicial
fetchPokemon(currentIndex);
