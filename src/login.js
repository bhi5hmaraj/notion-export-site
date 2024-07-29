
import { analytics, auth } from './init.js'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"

const submitButton = document.getElementById("submit");
// const signupButton = document.getElementById("sign-up");
// const emailInput = document.getElementById("email");
// const passwordInput = document.getElementById("password");
// const main = document.getElementById("main");
// const createacct = document.getElementById("create-acct")

// const signupEmailIn = document.getElementById("email-signup");
// const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
// const fName = document.getElementById("FName-signup");
// const lName = document.getElementById("LName-signup");
// const signupPasswordIn = document.getElementById("password-signup");
// const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
// const createacctbtn = document.getElementById("create-acct-btn");

// const returnBtn = document.getElementById("return-btn");

var email, password, signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword;

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in
//     window.location.href = '/homepage.html';
//   }
// }
// )

// ---- email login
// createacctbtn.addEventListener("click", function () {
//   var isVerified = true;

//   signupEmail = signupEmailIn.value;
//   confirmSignupEmail = confirmSignupEmailIn.value;
//   if (signupEmail != confirmSignupEmail) {
//     window.alert("Email fields do not match. Try again.")
//     isVerified = false;
//   }

//   signupPassword = signupPasswordIn.value;
//   confirmSignUpPassword = confirmSignUpPasswordIn.value;
//   if (signupPassword != confirmSignUpPassword) {
//     window.alert("Password fields do not match. Try again.")
//     isVerified = false;
//   }

//   if (signupEmail == null || confirmSignupEmail == null || signupPassword == null || confirmSignUpPassword == null) {
//     window.alert("Please fill out all required fields.");
//     isVerified = false;
//   }

//   if (isVerified) {
//     fetchProvidersForEmail(auth, signupEmail)
//       .then(providers => {
//         if (providers.length === 0) {
//           // this email hasn't signed up yet
//           createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
//             .then((userCredential) => {
//               // Signed in 
//               const user = userCredential.user;
//               // ...
//               window.alert("Success! Account created.");
//             })
//             .catch((error) => {
//               const errorCode = error.code;
//               const errorMessage = error.message;
//               // ..
//               window.alert("Error occurred. Try again.");
//             });
//         } else {
//           // has signed up
//           window.alert('This email has already been used, login instead!');
//         }
//       });

//   }
// });

// submitButton.addEventListener("click", function () {
//   email = emailInput.value;
//   console.log(email);
//   password = passwordInput.value;
//   // console.log(password);

//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user;
//       console.log("Success! Welcome back!");
//       window.alert("Success! Welcome back!");
//       window.location.replace('/homepage.html');
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log("Error occurred. Try again.");
//       window.alert("Error occurred. Try again.");
//     });
// });

// signupButton.addEventListener("click", function () {
//   main.style.display = "none";
//   createacct.style.display = "block";
// });

// returnBtn.addEventListener("click", function () {
//   main.style.display = "block";
//   createacct.style.display = "none";
// });


// ---



import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();
auth.languageCode = 'en'


submitButton.addEventListener("click", function () {

  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      user.providerData.forEach((profile) => {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
      window.location.replace('/homepage.html');
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});

// returnBtn.addEventListener("click", function () {
//   main.style.display = "block";
//   createacct.style.display = "none";
// });