let breeds = [];

window.addEventListener('load', (e) => {
    loadDogImages();
    loadDogBreeds();
})

// helper functions ---------------------------------------------------------------------

function loadDogImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
        .then(resp => resp.json())
        .then(json => addDogsToContainer(json.message));
}

function loadDogBreeds() {
    const breedUrl = "https://dog.ceo/api/breeds/list/all"
    fetch(breedUrl)
        .then(resp => resp.json())
        .then(json => {
            breeds = Object.keys(json.message);
            addDogBreedsToList(breeds);
            filterBreeds(breeds);
        })
}

function addDogsToContainer(array) {
    const dogImageContainer = document.getElementById("dog-image-container")

    for(const element of array) {
        let newDog = document.createElement("img")
        newDog.src = element
        dogImageContainer.appendChild(newDog)
       }
}

function addDogBreedsToList(array) {
    const dogList = document.getElementById("dog-breeds")

    for(const element of array) {
        let breed = document.createElement("li")
        breed.innerText = element
        dogList.appendChild(breed)

        addTextColorEventListener(breed)
        // filterBreeds(dogList)
    }
}

function addTextColorEventListener(element, colorOne = 'black', colorTwo = 'red') {
    element.addEventListener('click', (e) => {
        if(element.style.color === colorTwo) {
            element.style.color = colorOne
        } else {
            element.style.color = colorTwo
        }
    })
}

function filterBreeds(array) {
    const selector = document.getElementById("breed-dropdown");
    let filteredList = []

    selector.addEventListener('change', (e) => {
        clearBreedList()
        filteredList = []
        let value = `${e.target.value}`
        for(const element of array) {
            if(element[0] === value) {
            filteredList.push(element)
            }
        }

        addDogBreedsToList(filteredList)
    });
}

function clearBreedList() {
    let parent = document.getElementById("dog-breeds")
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}