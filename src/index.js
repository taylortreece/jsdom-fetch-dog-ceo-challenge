const dogImageContainer = document.getElementById("dog-image-container")

console.log('%c HI', 'color: firebrick')

window.addEventListener('load', (e) => {
    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(resp => resp.json())
        .then(json => {
            for(const element of json.message) {
                console.log(element)
            }
        });
})