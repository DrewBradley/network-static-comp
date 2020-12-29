const infoDisplay = document.querySelector('.info-display')
const idInput = document.querySelector('.id-input')
const nameInput = document.querySelector('.name-input')
const statusInput = document.querySelector('.status-input')
const interestsInput = document.querySelector('.interests-input')
const postButton = document.querySelector('.post-button')
const deleteButton = document.querySelector('.delete-button')
const getButton = document.querySelector('.get-user')



const resetInputs = () => {
  idInput.value = "";
  nameInput.value = "";
  statusInput.value = "";
  interestsInput.value = "";
}

const showError = (error) => {
  infoDisplay.innerText = '';
  infoDisplay.innerText = `${error}! You done goofed!
  `
}

const showUser = (data) => {
  infoDisplay.innerText = '';
  let thisUser = data.find(data => data.id == idInput.value)
  infoDisplay.innerText = `Name: ${thisUser.name}
  Status: ${thisUser.status}
  Interests: ${thisUser.interests}
  `
}

const getUser = () => {
  fetch("http://localhost:3001/api/v1/users")
    .then(response => response.json())
    .then(data => showUser(data))
    .catch(error => showError(error))
}

const postUser = () => {
  fetch("http://localhost:3001/api/v1/users", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        id: idInput.value,
        name: nameInput.value,
        status: statusInput.value,
        interests: interestsInput.value
      })
    })
    .then(response => response.json())
    .then(data => getUser());
  resetInputs();
}

const deleteUser = () => {
  fetch(`http://localhost:3001/api/v1/users/${idInput.value}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => retrieveData());
  resetInputs();
}

window.addEventListener('load', resetInputs)
postButton.addEventListener('click', postUser)
getButton.addEventListener('click', getUser)