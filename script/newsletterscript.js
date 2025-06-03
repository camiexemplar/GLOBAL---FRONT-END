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

const formNewsletter = document.getElementById("formnewsletter");

if (formNewsletter) {
    const nameInput = document.getElementById("nomenewsletter");
    const emailInput = document.getElementById("emailnewsletter");
    const telInput = document.getElementById("celularnewsletter");
    const checkboxInput = document.getElementById("newsletterassine");
    const successMessageDiv = document.getElementById("mensagem-sucesso");

    function isEmailValid(email) {
        const EmailRejeito = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;
        return EmailRejeito.test(email);
    }

    function errorInput(input, message) {
        const formItem = input.parentElement;
        let textMessage = formItem.querySelector("span[role='alert']") || formItem.querySelector(".error-message");

        if (!textMessage) {
            textMessage = document.createElement('span');
            textMessage.classList.add('error-message');
            formItem.appendChild(textMessage);
        }
        formItem.classList.add("error");
        textMessage.innerText = message;
        if (successMessageDiv) successMessageDiv.style.display = 'none';
    }

    function clearError(input) {
        const formItem = input.parentElement;
        const textMessage = formItem.querySelector("span[role='alert']") || formItem.querySelector(".error-message");
        formItem.classList.remove("error");
        if (textMessage) textMessage.innerText = "";
    }

    function validarCamposSequencialmente() {
        let formIsValid = true;

        if (successMessageDiv) successMessageDiv.style.display = 'none';

        if (nameInput.value.trim() === "") {
            errorInput(nameInput, "Preencha seu nome!");
            nameInput.focus();
            return false;
        } else {
            clearError(nameInput);
        }

        if (emailInput.value.trim() === "") {
            errorInput(emailInput, "Por favor, preencha seu email.");
            emailInput.focus();
            return false;
        } else if (!emailInput.value.includes("@")) {
            errorInput(emailInput, "O email precisa conter o caractere '@'.");
            emailInput.focus();
            return false;
        } else {
            const [parteLocal, parteDominio] = emailInput.value.split("@");
            if (!parteDominio || !/[a-zA-Z0-9]/.test(parteDominio)) {
                errorInput(emailInput, "O domínio após o '@' precisa conter letras ou números.");
                emailInput.focus();
                return false;
            } else if (!parteDominio.includes(".") || parteDominio.endsWith(".")) {
                errorInput(emailInput, "O email precisa conter um domínio como '.com' ou '.br'.");
                emailInput.focus();
                return false;
            } else if (!isEmailValid(emailInput.value)) {
                errorInput(emailInput, "Por favor, digite um email válido.");
                emailInput.focus();
                return false;
            } else {
                clearError(emailInput);
            }
        }

        const telefoneSemMascara = telInput.value.replace(/\D/g, "");
        if (telInput.value.trim() === "") {
            errorInput(telInput, "Por favor digite seu número!");
            telInput.focus();
            return false;
        } else if (telefoneSemMascara.length < 11) {
            errorInput(telInput, "O número precisa ter pelo menos 11 dígitos.");
            telInput.focus();
            return false;
        } else {
            clearError(telInput);
        }

        if (!checkboxInput.checked) {
            errorInput(checkboxInput, "Você precisa aceitar receber atualizações para prosseguir.");
            return false;
        } else {
            clearError(checkboxInput);
        }

        return true;
    }

    formNewsletter.addEventListener("submit", (event) => {
        event.preventDefault();

        const isValid = validarCamposSequencialmente();

        if (isValid) {
            if (successMessageDiv) {
                successMessageDiv.innerText = "Inscrição feita com sucesso!";
                successMessageDiv.style.display = 'block';
                setInterval(successMessageDiv, 5000)

                setTimeout(() => {
                    successMessageDiv.style.display = 'none';
                    successMessageDiv.innerText = "";
                }, 6000);
            }
            formNewsletter.reset();
            
        }
    });

    [nameInput, emailInput, telInput, checkboxInput].forEach(input => {
        input.addEventListener('input', () => {
            clearError(input);
        });
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
}
