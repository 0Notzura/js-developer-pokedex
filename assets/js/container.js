const closeModal=document.getElementById("modal--close")
const container=document.getElementsByClassName("container")[0]
const pokemons=document.getElementsByClassName('pokemon')

closeModal.addEventListener('click',()=>{
    container.style.display="none"
})

function getAllDetails(name){
    const url=`https://pokeapi.co/api/v2/pokemon/${name}`
    return fetch(url).then((response) => response.json().then(convertPokeApiDetailToPokemon))
}
getAllDetails("bulbasaur")










function createContainer() {
    const container = document.createElement('div');
    container.className = 'container';
    return container;
}

function createModal(back) {
    const modal = document.createElement('div');
    modal.className = 'modal '+back;
    return modal;
}

function createPokemonModal(pokemonName, pokemonNumber, pokemonImageSrc, pokemonTypes) {
    const pokemonModal = document.createElement('div');
    pokemonModal.className = 'modal--pokemon';

    const titleSpan = document.createElement('span');
    titleSpan.className = 'modal--pokemon--title';
    titleSpan.innerHTML = `<span>${pokemonName}</span><span>#${pokemonNumber}</span>`;

    const img = document.createElement('img');
    img.src = pokemonImageSrc;
    img.alt = pokemonName;

    const typesOl = document.createElement('ol');
    typesOl.className = 'modal-types';
    pokemonTypes.forEach(pokemonType=>{
        typesOl.innerHTML += `<li class="type ${pokemonType}">${pokemonType}</li>`;
    })  
    pokemonModal.appendChild(titleSpan);
    pokemonModal.appendChild(img);
    pokemonModal.appendChild(typesOl);

    return pokemonModal;
}

function createTable(tableHeaders, stats) {
    const table = document.createElement('table');
    table.className = 'modal-table';

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');
    tableHeaders.forEach((headerText) => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    const exampleRow = document.createElement('tr');
    stats.forEach((stat) => {
        const td = document.createElement('td');
        td.textContent = stat;
        exampleRow.appendChild(td);
    });
    tbody.appendChild(exampleRow);

    table.appendChild(thead);
    table.appendChild(tbody);

    return table;
}

function createAbilitiesSection(abilities) {
    const abilitiesSection = document.createElement('div');
    abilitiesSection.className = 'modal--abilities';

    const abilitiesHeader = document.createElement('h2');
    abilitiesHeader.textContent = 'abilities';

    const abilitiesList = document.createElement('ul');
    abilitiesList.className = 'modal--abilities--list';

    abilities.forEach((ability) => {
        const li = document.createElement('li');
        li.textContent = ability;
        abilitiesList.appendChild(li);
    });

    abilitiesSection.appendChild(abilitiesHeader);
    abilitiesSection.appendChild(abilitiesList);

    return abilitiesSection;
}

function createCloseButton() {
    const closeModal = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    closeModal.id = 'modal--close';
    closeModal.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    closeModal.setAttribute('width', '30');
    closeModal.setAttribute('height', '30');
    closeModal.setAttribute('viewBox', '0 0 30 30');

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute('cx', '15');
    circle.setAttribute('cy', '15');
    circle.setAttribute('r', '14');
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', '#000000');
    circle.setAttribute('stroke-width', '2');

    const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line1.setAttribute('x1', '9');
    line1.setAttribute('y1', '9');
    line1.setAttribute('x2', '21');
    line1.setAttribute('y2', '21');
    line1.setAttribute('stroke', '#000000');
    line1.setAttribute('stroke-width', '2');

    const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line2.setAttribute('x1', '9');
    line2.setAttribute('y1', '21');
    line2.setAttribute('x2', '21');
    line2.setAttribute('y2', '9');
    line2.setAttribute('stroke', '#000000');
    line2.setAttribute('stroke-width', '2');

    closeModal.appendChild(circle);
    closeModal.appendChild(line1);
    closeModal.appendChild(line2);

    return closeModal;
}


function createDetailsSection(table, abilitiesSection) {
    const modalDetails = document.createElement('div');
    modalDetails.className = 'modal--details';

    modalDetails.appendChild(table);
    modalDetails.appendChild(abilitiesSection);

    return modalDetails;
}

function createAndShowModal(pokemon) {
    const pokemonName = pokemon.querySelector('.name').textContent;

    getAllDetails(pokemonName).then(pokemodel => {
        const pokemonNumber = pokemodel.number;
        const pokemonTypes = pokemodel.types;
        const pokemonImageSrc = pokemodel.photo;

        const modalContainer = createContainer();
        const modal = createModal(pokemonTypes[0]);
        const pokemonModal = createPokemonModal(pokemonName, pokemonNumber, pokemonImageSrc, pokemonTypes);
        const table = createTable(['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'], pokemodel.status || []);
        const abilitiesSection = createAbilitiesSection(pokemodel.abilities || []);
        const closeModalButton = createCloseButton();
        const detailsSection = createDetailsSection(table, abilitiesSection);

        closeModalButton.addEventListener('click', () => {
            document.body.removeChild(modalContainer);
        });

        modal.appendChild(pokemonModal);
        modal.appendChild(detailsSection);
        modal.appendChild(closeModalButton);
        
        modalContainer.appendChild(modal);
        document.body.appendChild(modalContainer);
    });
}