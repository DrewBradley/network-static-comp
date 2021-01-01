const infoDisplay = document.querySelector('.info-display')
const idInput = document.querySelector('.id-input')
const nameInput = document.querySelector('.name-input')
const statusInput = document.querySelector('.status-input')
const statusInputLabel = document.querySelector('.status-input-label')
const interestsInput = document.querySelector('.interests-input')
const interestsInputLabel = document.querySelector('.interests-input-label')
const postButton = document.querySelector('.post-button')
const addButton = document.querySelector('.add-info-button')
const deleteButton = document.querySelector('.delete-button')
const getButton = document.querySelector('.get-user')
const apiSelector = document.querySelector('#api-selector')
const showApiButton = document.querySelector('.api-selector-button')
const addInfoInputs = document.querySelector('.inputs-add-info')

let currentApi
let extraInfo1;
  let extraInfo2;

const resetInputs = () => {
  idInput.value = "";
  nameInput.value = "";
  statusInput.value = "";
  interestsInput.value = "";
}

const addInfo = () => {
  currentApi = apiSelector.value;
  addInfoInputs.classList.toggle('hidden');
  addButton.classList.toggle('hidden');
  postButton.classList.toggle('hidden');
  if (currentApi === "users") {
    extraInfo1 = 'Status'
    extraInfo2 = 'Interests'
  }
  else if (currentApi === "sport-teams") {
    extraInfo1 = 'Coach'
    extraInfo2 = 'Sport'
  } else if (currentApi === "animals") {
    extraInfo1 = 'Diet'
    extraInfo2 = 'Fact'
  }
  statusInputLabel.innerText = extraInfo1;
  interestsInputLabel.innerText = extraInfo2;
}

const showError = (error) => {
  infoDisplay.innerText = '';
  infoDisplay.innerText = `${error}! You done goofed!
  `
}

const showData = (data) => {
  infoDisplay.innerHTML = `<h2 class="info-display-header">${currentApi.toUpperCase()} API Information Display</h2>`;
  if (currentApi === "users") {
    data.forEach(data => showUser(data))
  } else if (currentApi === "sport-teams") {
    data.forEach(data => showTeam(data))
  } else if (currentApi === "animals") {
    data.forEach(data => showAnimal(data))
  }
};

const showUser = (data) => {
    infoDisplay.innerHTML += `
    <article class="card grid${data.id}">
      <h2 class="card-name">${data.name}</h2>
      <p class="card-id">ID: ${data.id}</p>
      <p class="card-interests">INTERESTS: ${data.interests}</p>
      <p class="card-status">STATUS: ${data.status}</p>
    </article>
    `
}

const showTeam = (data) => {
    infoDisplay.innerHTML += `
    <article class="card grid${data.id}">
      <h2 class="card-name">${data.name}</h2>
      <p class="card-id">ID: ${data.id}</p>
      <p class="card-interests">COACH: ${data.head_coach}</p>
      <p class="card-status">SPORT: ${data.sport}</p>
    </article>
    `
}

const showAnimal = (data) => {
    infoDisplay.innerHTML += `
    <article class="card grid${data.id}">
      <h2 class="card-name">${data.name}</h2>
      <p class="card-id">ID: ${data.id}</p>
      <p class="card-interests">DIET: ${data.diet}</p>
      <p class="card-status">FACT: ${data.fun_fact}</p>
    </article>
    `
}

const showInfoById = (data) => {
  infoDisplay.innerHTML = `<h2 class="info-display-header">${currentApi} API Information Display</h2>`;
  let thisUser = data.find(data => data.id == idInput.value)
  if (currentApi === "users") {
    showUser(thisUser)
  } else if (currentApi === "sport-teams") {
    showTeam(thisUser)
  } else if (currentApi === "animals") {
    showAnimal(thisUser)
  }
}

const getData = () => {
  currentApi = apiSelector.value
  fetch(`http://localhost:3001/api/v1/${currentApi}`)
    .then(response => response.json())
    .then(data => showData(data))
    .catch(error => showError(error))
}

const getInfoById = () => {
  fetch(`http://localhost:3001/api/v1/${currentApi}`)
    .then(response => response.json())
    .then(data => showInfoById(data))
    .catch(error => showError(error))
}

const postInfo = () => {
  let infoObject = {
    id: idInput.value,
    name: nameInput.value,
    status: statusInput.value,
    interests: interestsInput.value
  }
  fetch(`http://localhost:3001/api/v1/${currentApi}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(
        infoObject
      )
    })
    .then(response => response.json())
    .then(data => getData(data));
  resetInputs();
}

const deleteUser = () => {
  fetch(`http://localhost:3001/api/v1/${currentApi}/${idInput.value}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => getData(data));
  resetInputs();
}

window.addEventListener('load', resetInputs)
showApiButton.addEventListener('click', getData)
postButton.addEventListener('click', postInfo)
deleteButton.addEventListener('click', deleteUser)
getButton.addEventListener('click', getInfoById)
addButton.addEventListener('click', addInfo)