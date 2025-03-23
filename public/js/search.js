const searchIcon = document.getElementById('seachIcon')
const searchEngine = document.getElementById('seachEngine')

searchIcon.addEventListener('click', () => {
    searchEngine.classList.toggle('active')
})