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


/* faq */

const botoes = document.querySelectorAll('.faq-botao');

  botoes.forEach(btn => {
    btn.addEventListener('click', () => {
      const resposta = btn.nextElementSibling;
      const isAtivo = btn.classList.contains('ativo');
      btn.blur();

      botoes.forEach(b => {
        b.classList.remove('ativo');
        const r = b.nextElementSibling;
        r.classList.remove('show');
        r.setAttribute('hidden', true);
        b.setAttribute('aria-expanded', 'false');
      });

      if (!isAtivo) {
        btn.classList.add('ativo');
        resposta.classList.add('show');
        resposta.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });