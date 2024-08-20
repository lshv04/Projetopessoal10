console.log('Script carregado');

const limit =151;
const offset = 0;

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const promises = data.results.map(pokemon =>
            fetch(pokemon.url).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
        );

        
        Promise.all(promises)
            .then(pokemonDetails => {
                // Ordena os detalhes dos Pokémon pelo ID
                pokemonDetails.sort((a, b) => a.id - b.id);

                const pokemonContainer = document.getElementById('pokemon-container');
                pokemonContainer.innerHTML = '';

                pokemonDetails.forEach(details => {
                    console.log(`Detalhes do Pokémon ${details.id}:`, details);
                    
                    // Obtenha o primeiro tipo do Pokémon
                    const firstType = details.types[0].type.name;



                    
                    const pokemonHTML = `
                        <div class="col-12 col-md-3 m-1 pokemon ${firstType}">
                            <div class="header">
                                <h3 class="namepokemon">${details.name.charAt(0).toUpperCase() + details.name.slice(1)}</h3> 
                                <p class="id">#${details.id}</p>
                            </div>
                            <div class="img1 text-center">
                                <img src="${details.sprites.other['dream_world'].front_default}"
                                    alt="${details.name}" class="img-fluid">
                            </div>
                            <div class="subtitle">
                                <p>Height: ${details.height} dm</p> 
                                <p>Weight: ${details.weight} hg</p>
                            </div>
                            <div class="types d-flex">
                                ${details.types.map(typeInfo => `
                                    <div class="type ${typeInfo.type.name} me-2">
                                        <p>${typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}</p>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="capsule mt-3">
                                <div class="abilities">
                                 <div class="abilities">
                                    <p>Abilities:</p>
                                    ${details.abilities.slice(0, 2).map(abilityInfo => `
                                        <div class="ability">
                                            <p>${abilityInfo.ability.name.charAt(0).toUpperCase() + abilityInfo.ability.name.slice(1)}</p>
                                        </div>
                                    `).join('')}
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

                    const pokemonDiv = document.createElement('div');
                    pokemonDiv.innerHTML = pokemonHTML;
                    pokemonContainer.appendChild(pokemonDiv.firstElementChild);
                });
            })
            .catch(error => {
                console.error('Error fetching details for Pokémon:', error);
            });
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
