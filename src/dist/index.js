const inputBar = document.getElementById("search-bar");
const buttonConfirm = document.getElementById("comfirm-Search");
const pokedexGrid = document.getElementById("pokemon-container");
await createCardPokelist(1,'');

async function buscarDescricao(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    const data = await response.json();
    console.log(data);
    return data.flavor_text_entries[0].flavor_text.replace(/\n/g, ' ');
  } catch (error) {
    console.error('Erro:', error);
  }
}
async function buscarPokemon(id,name) {
  try {
    if(id){
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const data = await response.json();
      console.log(data);
      return data}
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    const data = await response.json();
    console.log(data);
    return data
  } catch (error) {
    console.error('Erro:', error);
  }
}

async function createCardPoke(id,name){
    const response = await buscarPokemon(id,name)
    const types = response.types
    
    const elementsSpan = types
        .map(element => `<span class="element-type">${element.type.name}</span>`)
        .join("");
    
    
    let cardPOKE = ` <div class="square-cards">
        <div class="elements">
            ${elementsSpan}
        </div>
        <span class="description-poke">
          <h1>${response.name}</h1>
          <p>
            ${await buscarDescricao(response.id)}
          </p>
          <button class="info-${response.id}"> know more</button>
        </span>
        <img src="${response.sprites.front_default}" alt="${response.name}">
        <p class="index">#${String(response.id).padStart(3, "0")}</p>
      
      </div>`;

    pokedexGrid.innerHTML += cardPOKE;
}
async function createCardPokelist(id,name){
    await createCardPoke(id,name);
    for(let i = id+1; i <= id+20; i++){
        await createCardPoke(i,'');
    }

}
buttonConfirm.addEventListener("click", async () => {
    const name = inputBar.value.trim().toLowerCase()
    if (!name) return

    await createCardPokelist(name)
})
