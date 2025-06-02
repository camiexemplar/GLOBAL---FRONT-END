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

const form = document.querySelector("form");

if (form) {
    const nameInput = document.querySelector("#nome");
    const emailInput = document.querySelector("#email");
    const motivoInput = document.querySelector("#motivo");
    const telInput = document.querySelector("#celular");
    const textareaInput = document.querySelector("#mensagem");
    const generoCheckboxes = document.querySelectorAll('input[name="genero"]');
    const generoErrorAnchor = document.querySelector("#genero-erro"); 
    const successMessageDiv = document.querySelector("#mensagem-sucesso");

    function isEmailValid(email) {
        const EmailRejeito = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;
        return EmailRejeito.test(email);
    }

//mensagem erro
    function errorInput(input, message) {
        const formItem = input.parentElement;
        let textMessage = formItem.querySelector("a[role='alert']") || formItem.querySelector(".error-message");


        if (!textMessage) {
            textMessage = document.createElement('span');
            textMessage.classList.add('error-message');
            formItem.appendChild(textMessage);
        }
        formItem.classList.add("error");
        textMessage.innerText = message;
        if (successMessageDiv) successMessageDiv.style.display = 'none';
    }

//limpa erro
    function clearError(input) {
        const formItem = input.parentElement;

        const textMessage = formItem.querySelector("a[role='alert']") || formItem.querySelector(".error-message");
        formItem.classList.remove("error");
        if (textMessage) textMessage.innerText = "";
    }

    // validar campos em sequência
    function validarCamposSequencialmente() {
        let formIsValid = true;

        // limpa mensagem-sucesso
        if (successMessageDiv) successMessageDiv.style.display = 'none';

        // Nome
        if (nameInput.value.trim() === "") {
            errorInput(nameInput, "Preencha seu nome!");
            nameInput.focus();
            formIsValid = false;
        } else {
            clearError(nameInput);
        }

        
        // Validação de email
        if (formIsValid && emailInput.value.trim() === "") { 
            errorInput(emailInput, "Por favor, preencha seu email.");
            emailInput.focus();
            formIsValid = false;
        } else if (formIsValid && !emailInput.value.includes("@")) {
            errorInput(emailInput, "O email precisa conter o caractere '@'.");
            emailInput.focus();
            formIsValid = false;
        } else {
            const [parteLocal, parteDominio] = emailInput.value.split("@");
            if (formIsValid && (!parteDominio || !/[a-zA-Z0-9]/.test(parteDominio))) {
                errorInput(emailInput, "O domínio após o '@' precisa conter letras ou números.");
                emailInput.focus();
                formIsValid = false;
            } else if (formIsValid && (!parteDominio.includes(".") || parteDominio.endsWith("."))) {
                errorInput(emailInput, "O email precisa conter um domínio como '.com' ou '.br'.");
                emailInput.focus();
                formIsValid = false;
            } else if (formIsValid && !isEmailValid(emailInput.value)) {
                errorInput(emailInput, "Por favor, digite um email válido.");
                emailInput.focus();
                formIsValid = false;
            } else if (formIsValid) { 
                clearError(emailInput);
            }
        }

        // Celular
        const telefoneSemMascara = telInput.value.replace(/\D/g, "");
        if (formIsValid && telInput.value.trim() === "") {
            errorInput(telInput, "Por favor digite seu número!");
            telInput.focus();
            formIsValid = false;
        } else if (formIsValid && telefoneSemMascara.length < 11) {
            errorInput(telInput, "O número precisa ter pelo menos 11 dígitos.");
            telInput.focus();
            formIsValid = false;
        } else if (formIsValid) {
            clearError(telInput);
        }

        // Motivo
        if (formIsValid && motivoInput.value.trim() === "") {
            errorInput(motivoInput, "Por favor selecione o motivo de contato!");
            motivoInput.focus();
            formIsValid = false;
        } else if (formIsValid) {
            clearError(motivoInput);
        }

        // Mensagem (textarea)
        if (formIsValid && textareaInput.value.trim() === "") {
            errorInput(textareaInput, "Por favor, escreva uma mensagem.");
            textareaInput.focus();
            formIsValid = false;
        } else if (formIsValid) {
            clearError(textareaInput);
        }

        // Gênero
        let generoSelecionado = false;
        generoCheckboxes.forEach((radio) => {
            if (radio.checked) generoSelecionado = true;
        });


        if (formIsValid && !generoSelecionado) {
            if (generoErrorAnchor) {
                generoErrorAnchor.innerText = "Por favor, selecione seu gênero!";
                generoErrorAnchor.parentElement.classList.add("error"); 
            }
            generoCheckboxes[0].focus(); 
            formIsValid = false;
        } else if (formIsValid) {
            if (generoErrorAnchor) {
                generoErrorAnchor.innerText = "";
                generoErrorAnchor.parentElement.classList.remove("error");
            }
        }

        return formIsValid;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // prevenir de enviar caso tenha erros

        // checar se está valido
        const isValid = validarCamposSequencialmente();

        if (isValid) {
            // mensagem validado
            if (successMessageDiv) {
                successMessageDiv.style.display = 'block';
            }
//resetar form
            form.reset();

        }
    });

    // limpar erros
    const inputsToValidate = [
        nameInput,
        emailInput,
        motivoInput,
        telInput,
        textareaInput
    ];

    inputsToValidate.forEach(input => {
        input.addEventListener('input', () => {
            clearError(input);
        });
    });

  
    generoCheckboxes.forEach(radio => {
        radio.addEventListener('change', () => {
          
            if (generoErrorAnchor) {
                generoErrorAnchor.innerText = "";
                generoErrorAnchor.parentElement.classList.remove("error");
            }
        });
    });

    // Máscara de telefone
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
}