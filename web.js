const selection = document.querySelector('selection')
const selectionButton = document.querySelector('.navigation_selection')

selection.addEventListener('click', function(){
    selection.classList.toggle('is-active');
    selectionButton.classList.toggle('active');
})