console.log('Script carregado');

const limit = 10;
const offset = 0;

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then(response => {
        console.log('Response Status:', response.status); // Log do status da resposta
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data received:', data); // Log dos dados recebidos
        const pokemonContainer = document.getElementById('pokemon-container');

        // Limpa o container antes de adicionar novos itens
        pokemonContainer.innerHTML = '';

        data.results.forEach((pokemon, index) => {
            console.log('Processing Pokémon:', pokemon); // Log de cada Pokémon processado

            // Crie o HTML para cada Pokémon
            const pokemonHTML = `
                <div class="col-12 col-md-4 mb-4 pokemon grass">
                    <div class="header ">
                        <h3 class="namepokemon">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3> 
                        <p class="id">#${index + 1 + offset}</p>
                    </div>
                    <div class="img1 text-center">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1 + offset}.svg"
                            alt="${pokemon.name}" class="img-fluid">
                    </div>
                    <div class="subtitle">
                        <p>Height: (placeholder)</p> 
                        <p>Weight: (placeholder)</p>
                    </div>
                    <div class="types d-flex">
                        <div class="type grass me-2">
                            <p>(type placeholder)</p>
                        </div>
                        <div class="type poison">
                            <p>(type placeholder)</p>
                        </div>
                    </div>
                    <div class="capsule mt-3">
                        <div class="abilities">
                            <p>Abilities:</p>
                            <div class="ability">
                                <p>(ability placeholder)</p>
                            </div>
                        </div>
                        <div class="footer d-flex justify-content-between mt-3">
                            <div class="pokeball">
                                <img src="./img/2.png" alt="" class="img-fluid">
                            </div>
                            <div class="pokeball">
                                <img src="./img/trainer1.png" alt="" class="img-fluid">
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Crie um elemento div e adicione o HTML gerado
            const pokemonDiv = document.createElement('div');
            pokemonDiv.innerHTML = pokemonHTML;

            // Adicione a div ao contêiner
            pokemonContainer.appendChild(pokemonDiv.firstElementChild);
        });
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
