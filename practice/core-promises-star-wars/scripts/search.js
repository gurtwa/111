// Поиск по текстовому запросу
document.getElementById('byQueryBtn').addEventListener('click', async function () {
    const query = document.getElementById('byQueryInput').value;  // Используем уникальный ID для поиска по запросу
    const resourceSelect = document.getElementById('byQueryResourceSelect').value;  // Уникальный ID для выбора ресурса
    const resultContainer = document.getElementById('content');
    const resultBlock = document.getElementById('result-container');
    const spinner = document.querySelector('.spinner');

    resultContainer.innerHTML = '';
    spinner.style.visibility = 'visible';

    let data;

    try {
        if (resourceSelect === 'characters') {
            data = await starWars.searchCharacters(query);
        } else if (resourceSelect === 'planets') {
            data = await starWars.searchPlanets(query);
        } else if (resourceSelect === 'species') {
            data = await starWars.searchSpecies(query);
        }

        spinner.style.visibility = 'hidden';

        if (data.results.length > 0) {
            if (resourceSelect === 'characters') {
                data.results.forEach(character => {
                    const planetId = character.homeworld.split('/').filter(Boolean).pop();

                    starWars.getPlanetsById(planetId)
                        .then(planetData => {
                            const planetName = planetData.name;
                            const characterInfo = `
                                <p><strong>Name:</strong> ${character.name}</p>
                                <p><strong>Height:</strong> ${character.height}</p>
                                <p><strong>Mass:</strong> ${character.mass}</p>
                                <p><strong>Hair Color:</strong> ${character.hair_color}</p>
                                <p><strong>Skin Color:</strong> ${character.skin_color}</p>
                                <p><strong>Eye Color:</strong> ${character.eye_color}</p>
                                <p><strong>Birth Year:</strong> ${character.birth_year}</p>
                                <p><strong>Gender:</strong> ${character.gender}</p>
                                <p><strong>Homeworld:</strong> ${planetName}</p>
                                <p><strong>Species:</strong> ${character.species.length > 0 ? `<a href="${character.species[0]}">View Species</a>` : 'Unknown'}</p>
                                <p><strong>Films:</strong></p>
                                <ul>
                                    ${character.films.map(film => `<li><a href="${film}">View Film</a></li>`).join('')}
                                </ul>
                                <p><strong>Created:</strong> ${new Date(character.created).toLocaleDateString()}</p>
                                <p><strong>Edited:</strong> ${new Date(character.edited).toLocaleDateString()}</p>
                            `;
                            resultContainer.innerHTML += characterInfo;
                        })
                        .catch(err => {
                            console.error('Ошибка при получении информации о планете: ', err);
                            resultContainer.innerHTML += `<p>Error fetching planet data for ${character.name}</p>`;
                        });
                });
            } else if (resourceSelect === 'planets') {
                data.results.forEach(planet => {
                    const planetInfo = `
                        <p><strong>Name:</strong> ${planet.name}</p>
                        <p><strong>Rotation Period:</strong> ${planet.rotation_period}</p>
                        <p><strong>Orbital Period:</strong> ${planet.orbital_period}</p>
                        <p><strong>Diameter:</strong> ${planet.diameter}</p>
                        <p><strong>Climate:</strong> ${planet.climate}</p>
                        <p><strong>Gravity:</strong> ${planet.gravity}</p>
                        <p><strong>Terrain:</strong> ${planet.terrain}</p>
                        <p><strong>Population:</strong> ${planet.population}</p>
                        <p><strong>Films:</strong></p>
                        <ul>
                            ${planet.films.map(film => `<li><a href="${film}">View Film</a></li>`).join('')}
                        </ul>
                    `;
                    resultContainer.innerHTML += planetInfo;
                });
            } else if (resourceSelect === 'species') {
                data.results.forEach(species => {
                    const speciesInfo = `
                        <p><strong>Name:</strong> ${species.name}</p>
                        <p><strong>Classification:</strong> ${species.classification}</p>
                        <p><strong>Designation:</strong> ${species.designation}</p>
                        <p><strong>Average Height:</strong> ${species.average_height}</p>
                        <p><strong>Skin Colors:</strong> ${species.skin_colors}</p>
                        <p><strong>Hair Colors:</strong> ${species.hair_colors}</p>
                        <p><strong>Eye Colors:</strong> ${species.eye_colors}</p>
                        <p><strong>Average Lifespan:</strong> ${species.average_lifespan}</p>
                        <p><strong>Language:</strong> ${species.language}</p>
                        <p><strong>Homeworld:</strong> ${species.homeworld ? `<a href="${species.homeworld}">View Homeworld</a>` : 'Unknown'}</p>
                    `;
                    resultContainer.innerHTML += speciesInfo;
                });
            }

            resultBlock.style.visibility = 'visible';
            resultBlock.style.zIndex = '10';
        } else {
            resultContainer.innerHTML = '<p>No results found.</p>';
            resultBlock.style.visibility = 'visible';
        }
    } catch (err) {
        console.error('Ошибка при поиске: ', err);
        resultContainer.innerHTML = '<p>Error occurred while fetching data.</p>';
        resultBlock.style.visibility = 'visible';
        spinner.style.visibility = 'hidden';
    }
});

// Поиск по ID
document.getElementById('byIdBtn').addEventListener('click', async function () {
    const id = document.getElementById('byIdInput').value;  // Используем уникальный ID для поиска по ID
    const resourceSelect = document.getElementById('byIdResourceSelect').value;  // Уникальный ID для выбора ресурса
    const resultContainer = document.getElementById('content');
    const resultBlock = document.getElementById('result-container');
    const spinner = document.querySelector('.spinner');

    resultContainer.innerHTML = '';
    spinner.style.visibility = 'visible';

    let data;

    try {
        if (resourceSelect === 'characters') {
            data = await starWars.getCharactersById(id);
        } else if (resourceSelect === 'planets') {
            data = await starWars.getPlanetsById(id);
        } else if (resourceSelect === 'species') {
            data = await starWars.getSpeciesById(id);
        }

        spinner.style.visibility = 'hidden';

        if (data) {
            if (resourceSelect === 'characters') {
                const planetId = data.homeworld.split('/').filter(Boolean).pop();

                starWars.getPlanetsById(planetId)
                    .then(planetData => {
                        const planetName = planetData.name;
                        const characterInfo = `
                            <p><strong>Name:</strong> ${data.name}</p>
                            <p><strong>Height:</strong> ${data.height}</p>
                            <p><strong>Mass:</strong> ${data.mass}</p>
                            <p><strong>Hair Color:</strong> ${data.hair_color}</p>
                            <p><strong>Skin Color:</strong> ${data.skin_color}</p>
                            <p><strong>Eye Color:</strong> ${data.eye_color}</p>
                            <p><strong>Birth Year:</strong> ${data.birth_year}</p>
                            <p><strong>Gender:</strong> ${data.gender}</p>
                            <p><strong>Homeworld:</strong> ${planetName}</p>
                            <p><strong>Species:</strong> ${data.species.length > 0 ? `<a href="${data.species[0]}">View Species</a>` : 'Unknown'}</p>
                            <p><strong>Films:</strong></p>
                            <ul>
                                ${data.films.map(film => `<li><a href="${film}">View Film</a></li>`).join('')}
                            </ul>
                            <p><strong>Created:</strong> ${new Date(data.created).toLocaleDateString()}</p>
                            <p><strong>Edited:</strong> ${new Date(data.edited).toLocaleDateString()}</p>
                        `;
                        resultContainer.innerHTML += characterInfo;
                    })
                    .catch(err => {
                        console.error('Ошибка при получении информации о планете: ', err);
                        resultContainer.innerHTML += `<p>Error fetching planet data for ${data.name}</p>`;
                    });
            } else if (resourceSelect === 'planets') {
                const planetInfo = `
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Rotation Period:</strong> ${data.rotation_period}</p>
                    <p><strong>Orbital Period:</strong> ${data.orbital_period}</p>
                    <p><strong>Diameter:</strong> ${data.diameter}</p>
                    <p><strong>Climate:</strong> ${data.climate}</p>
                    <p><strong>Gravity:</strong> ${data.gravity}</p>
                    <p><strong>Terrain:</strong> ${data.terrain}</p>
                    <p><strong>Population:</strong> ${data.population}</p>
                    <p><strong>Films:</strong></p>
                    <ul>
                        ${data.films.map(film => `<li><a href="${film}">View Film</a></li>`).join('')}
                    </ul>
                `;
                resultContainer.innerHTML += planetInfo;
            } else if (resourceSelect === 'species') {
                const speciesInfo = `
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Classification:</strong> ${data.classification}</p>
                    <p><strong>Designation:</strong> ${data.designation}</p>
                    <p><strong>Average Height:</strong> ${data.average_height}</p>
                    <p><strong>Skin Colors:</strong> ${data.skin_colors}</p>
                    <p><strong>Hair Colors:</strong> ${data.hair_colors}</p>
                    <p><strong>Eye Colors:</strong> ${data.eye_colors}</p>
                    <p><strong>Average Lifespan:</strong> ${data.average_lifespan}</p>
                    <p><strong>Language:</strong> ${data.language}</p>
                    <p><strong>Homeworld:</strong> ${data.homeworld ? `<a href="${data.homeworld}">View Homeworld</a>` : 'Unknown'}</p>
                `;
                resultContainer.innerHTML += speciesInfo;
            }

            resultBlock.style.visibility = 'visible';
            resultBlock.style.zIndex = '10';
        } else {
            resultContainer.innerHTML = '<p>No results found.</p>';
            resultBlock.style.visibility = 'visible';
        }
    } catch (err) {
        console.error('Ошибка при поиске: ', err);
        resultContainer.innerHTML = '<p>Error occurred while fetching data.</p>';
        resultBlock.style.visibility = 'visible';
        spinner.style.visibility = 'hidden';
    }
});
