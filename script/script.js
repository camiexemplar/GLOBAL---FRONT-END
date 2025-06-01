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




  
/*formulário*/
const form = document.querySelector('form');

if (form) {
  const nameInput = document.querySelector("#nome");
  const emailInput = document.querySelector("#email");
  const faixaInput = document.querySelector("#faixa");
  const telInput = document.querySelector("#celular");
  const generoCheckboxes = document.querySelectorAll('input[name="genero"]');

  // Eventos para limpar erros durante a digitação ou seleção

  nameInput.addEventListener("input", () => {
    if (nameInput.value !== "") clearError(nameInput);
  });

  emailInput.addEventListener("input", () => {
    if (emailInput.value !== "" && isEmailValid(emailInput.value)) {
      clearError(emailInput);
    } else if (emailInput.value === "") {
      clearError(emailInput);
    }
  });

  faixaInput.addEventListener("change", () => {
    if (faixaInput.value !== "") clearError(faixaInput);
  });

  telInput.addEventListener("input", () => {
    let valor = telInput.value.replace(/\D/g, "");
    if (valor.length > 11) valor = valor.slice(0, 11);

    if (valor.length > 6) {
      telInput.value = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
    } else if (valor.length > 2) {
      telInput.value = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
    } else if (valor.length > 0) {
      telInput.value = `(${valor}`;
    }
  });

  form.addEventListener("submit", (event) => {
    let formValido = true;
    let primeiroErro = null;

    // Validação nome
    if (nameInput.value.trim() === "") {
      errorInput(nameInput, "Preencha seu nome!");
      if (!primeiroErro) primeiroErro = nameInput;
      formValido = false;
    } else {
      clearError(nameInput);
    }


    /*validações*/



    // Validação email
    if (emailInput.value.trim() === "") {
      errorInput(emailInput, "Por favor, preencha seu email.");
      if (!primeiroErro) primeiroErro = emailInput;
      formValido = false;
    } else if (!emailInput.value.includes("@")) {
      errorInput(emailInput, "O email precisa conter o caractere '@'.");
      if (!primeiroErro) primeiroErro = emailInput;
      formValido = false;
    } else {
      const [parteLocal, parteDominio] = emailInput.value.split("@");
      if (!parteDominio || !/[a-zA-Z0-9]/.test(parteDominio)) {
        errorInput(emailInput, "O domínio após o '@' precisa conter letras ou números.");
        if (!primeiroErro) primeiroErro = emailInput;
        formValido = false;
      } else if (!parteDominio.includes(".") || parteDominio.endsWith(".")) {
        errorInput(emailInput, "O email precisa conter um domínio como '.com' ou '.br'.");
        if (!primeiroErro) primeiroErro = emailInput;
        formValido = false;
      } else if (!isEmailValid(emailInput.value)) {
        errorInput(emailInput, "Por favor, digite um email válido.");
        if (!primeiroErro) primeiroErro = emailInput;
        formValido = false;
      } else {
        clearError(emailInput);
      }
    }


      //validação regex do email
  function isEmailValid(email) {
    const EmailRejeito = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;
    return EmailRejeito.test(email);
  }



    // Validação celular
    const telefoneSemMascara = telInput.value.replace(/\D/g, "");
    if (telInput.value.trim() === "") {
      errorInput(telInput, "Por favor digite seu número!");
      if (!primeiroErro) primeiroErro = telInput;
      formValido = false;
    } else if (telefoneSemMascara.length < 8) {
      errorInput(telInput, "O número precisa ter pelo menos 8 dígitos.");
      if (!primeiroErro) primeiroErro = telInput;
      formValido = false;
    } else {
      clearError(telInput);
    }



    // Validação faixa-etária
    if (faixaInput.value.trim() === "") {
      errorInput(faixaInput, "Por favor selecione sua faixa-etária!");
      if (!primeiroErro) primeiroErro = faixaInput;
      formValido = false;
    } else {
      clearError(faixaInput);
    }



    // Validação gênero
    let generoSelecionado = false;
    generoCheckboxes.forEach((radio) => {
      if (radio.checked) generoSelecionado = true;
    });
    const generoContainer = generoCheckboxes[0]?.closest('.form-group');
    if (!generoSelecionado) {
      if (generoContainer) {
        generoContainer.classList.add("error");
        const errorAnchor = generoContainer.querySelector("a");
        if (errorAnchor) errorAnchor.innerText = "Por favor, selecione seu gênero!";
      }
      if (!primeiroErro) primeiroErro = generoCheckboxes[0];
      formValido = false;
    } else {
      if (generoContainer) {
        generoContainer.classList.remove("error");
        const errorAnchor = generoContainer.querySelector("a");
        if (errorAnchor) errorAnchor.innerText = "";
      }
    }



    // foco nos erros
    if (!formValido) {
      event.preventDefault();
      if (primeiroErro) primeiroErro.focus();
    }
  });



  // mostrar erros (<a>)
  function errorInput(input, message) {
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a");
    formItem.classList.add("error");
    if (textMessage) textMessage.innerText = message;
  }


  
//limpa erros
  function clearError(input) {
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a");
    formItem.classList.remove("error");
    if (textMessage) textMessage.innerText = "";
  }
}