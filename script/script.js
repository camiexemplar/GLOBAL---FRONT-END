/*slideshow de imagens*/

const imagens = [
    'img/agriculturafamiliar.svg',
    'img/agriculturafamiliar2.svg',
    'img/amazonia.svg',
    'img/amazonia2.svg'
];

let index = 0
const imgamazon = document.querySelector('.imgamazon-slideshow')

function trocarBackground() {
    imgamazon.style.backgroundImage = `url('${imagens[index]}')`;
    index = (index + 1) % imagens.length;
}
trocarBackground ();
setInterval(trocarBackground, 5000);