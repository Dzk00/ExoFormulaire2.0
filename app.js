//   Valider les données côté Front permet de soulager le travail du serveur tout en créant une bonne expérience pour l'utilisateur.


// Fonctionnalités JavaScript à coder pour ce projet

// 1. Gérer l'input "utilisateur", faites-en sorte qu'il passe la validation lorsque le pseudo fait plus de 3 caractères.

// 2. Paramètrez le second input afin qu'il reçoive un email, et qu'il montre un message d'alerte si la chaîne rentrée n'est pas au bon format, le tout à l'aide d'un regex.

// 3. Le mot de passe doit contenir au moins un symbole, une lettre minuscule et un chiffre.

// 4. Montrez la "force" du mot de passe en fonction de ce que l'on rentre dans l'input.
// - Si la longueur du mot de passe est entre 0 et 5 affichez : faible.
// - Si la longueur est supérieure ou égale à 6 et inférieure à 9 et qu'elle contient au moins un symbole ou  un chiffre, affichez : moyen
// - Si la longueur est supérieur ou égale à 9 et quelle contient au moins un symbole et un chiffre affichez : fort
// - Gérez la confirmation de mot de passe.
// - Enfin envoyez un .alert("données envoyées") si on appuie sur le bouton "Création du compte" en ayant passé tous les tets.

const form = document.querySelector('form');
const usernameInputs = document.querySelectorAll('input');
const nom = document.querySelectorAll('p');
const imgs = document.querySelectorAll('img');


window.addEventListener('load', () => {
  form.reset();
});

usernameInputs.forEach((usernameInput, index) => {
  usernameInput.addEventListener('input', () => {
    const isEmail = index === 1;
    const isPassword = index === 2;
    const isConfirmPassword = index === 3;

    if (usernameInput.value.length <= 3) {
      nom[index].style.color = 'red';
      imgs[index].src = 'error.svg';
      imgs[index].classList.add('active');
    } else if (isEmail && !isValidEmail(usernameInput.value)) {
      nom[index].style.color = 'red';
      imgs[index].src = 'error.svg';
      imgs[index].classList.add('active');
    } else if (isPassword && !isValidPassword(usernameInput.value)) {
      nom[index].style.color = 'red';
      imgs[index].src = 'error.svg';
      imgs[index].classList.add('active');
    } else if (isConfirmPassword && !isValidConfirmPassword(usernameInput.value, usernameInputs[2].value)) {
      nom[index].style.color = 'red';
      imgs[index].src = 'error.svg';
      imgs[index].classList.add('active');
    } else {
      nom[index].style.color = 'green';
      imgs[index].src = 'check.svg';
    }
  });
});

function isValidEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const hasLowercaseLetter = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  return password.length >= 6 && hasSymbol && hasLowercaseLetter && hasNumber;
}

function isValidConfirmPassword(confirmPassword, password) {
  return confirmPassword === password;
}

const faibleSpan = document.querySelector('#faible');
const moyenSpan = document.querySelector('#moyen');
const correctSpan = document.querySelector('#good');

function updatePasswordStrength(password) {
  const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const hasLowercaseLetter = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  if (password.length < 6 || (!hasLowercaseLetter && !hasNumber && !hasSymbol)) {
    faibleSpan.style.visibility = "visible";
    moyenSpan.style.visibility = "hidden";
    correctSpan.style.visibility = "hidden";
  } else if ((password.length >= 6 && password.length < 8 && hasLowercaseLetter && (hasNumber || hasSymbol)) ||
             (password.length >= 8 && password.length < 10 && hasLowercaseLetter && hasNumber && !hasSymbol) ||
             (password.length >= 8 && password.length < 10 && hasLowercaseLetter && !hasNumber && hasSymbol) ||
             (password.length >= 8 && password.length < 10 && !hasLowercaseLetter && hasNumber && hasSymbol)) {
    faibleSpan.style.visibility = "hidden";
    moyenSpan.style.visibility = "visible";
    correctSpan.style.visibility = "hidden";
  } else if ((password.length >= 8 && password.length < 10 && hasLowercaseLetter && hasNumber && hasSymbol) ||
             (password.length >= 10 && hasLowercaseLetter && hasNumber && hasSymbol)) {
    faibleSpan.style.visibility = "hidden";
    moyenSpan.style.visibility = "hidden";
    correctSpan.style.visibility = "visible";
  }}

const passwordInput = document.querySelector('#password');

passwordInput.addEventListener('input', () => {
  updatePasswordStrength(passwordInput.value);
});


const truc = [];
form.addEventListener('submit', (event) => {
    event.preventDefault();
    truc.length = 0; 
  imgs.forEach((index) => {
    if (index.src.endsWith('check.svg')) {
      truc.push(true);
    } else {
      truc.push(false);
    }
  });

  const machin = truc.every((value) => {
    return value === true;
  });

  if (machin) {
    alert('Données envoyées');
    } else {
        alert('Vous avez mal rempli le formulaire');
    }


  console.log(truc);
  console.log(machin);
});

// form.addEventListener('submit', (event) => {
//     event.preventDefault();
  
//     // Vérifier que tous les champs sont valides
//     const allValid = Array.from(usernameInputs).every((input, index) => {
//       const isEmail = index === 1;
//       const isPassword = index === 2;
//       const isConfirmPassword = index === 3;
  
//       if (input.value.length <= 3) {
//         return false;
//       } else if (isEmail && !isValidEmail(input.value)) {
//         return false;
//       } else if (isPassword && !isValidPassword(input.value)) {
//         return false;
//       } else if (isConfirmPassword && !isValidConfirmPassword(input.value, usernameInputs[2].value)) {
//         return false;
//       } else {
//         return true;
//       }
//     });
  
//     // Si tous les champs sont valides, afficher un message d'alerte
//     if (allValid) {
//       alert('Le formulaire a bien été envoyé');
//     } else{
//         alert('Au moins un champ est incorrect');
//         form.reset();
//     }
//   });