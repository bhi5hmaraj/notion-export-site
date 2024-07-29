
import { analytics, auth, app } from './init.js'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { getFirestore, collection, addDoc, getDocs, query, where, doc } from "firebase/firestore";

// Get a reference to the Firestore database
// Initialize Firebase


const db = getFirestore(app);


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


// Example: Search for a user by email
async function findUserByEmail(email) {
  console.log('finding by email');
  const usersCollectionRef = collection(db, '/users');
  console.log("collection " + JSON.stringify(usersCollectionRef));
  const q = query(usersCollectionRef, where('email', '==', email));
  console.log('query ' + JSON.stringify(q));
  const querySnapshot = await getDocs(q);
  console.log('query snap ' + JSON.stringify(querySnapshot));
  if (querySnapshot.empty) {
    console.log('No matching documents.');
    return null;
  }

  const userDoc = querySnapshot.docs[0];
  const userData = userDoc.data();
  console.log('Found user:', userData);
  return userData;
}

// Example usage:
// findUserByEmail('john.doe@example.com');


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
      const user = result.user.providerData[0];
      // IdP data available using getAdditionalUserInfo(result)
      console.log("Sign-in provider: " + user.providerId);
      console.log("  Provider-specific UID: " + user.uid);
      console.log("  Name: " + user.displayName);
      console.log("  Email: " + user.email);
      console.log("  Photo URL: " + user.photoURL);

      if (!findUserByEmail(user.email)) {
        // New user
        // Create a new document with data
        const newUserData = {
          email: user.email,
          name: user.displayName
        };

        // Add the document to the collection
        addDoc(usersCollectionRef, newUserData)
          .then((docRef) => {
            console.log('Document written with ID: ', docRef.id);
          })
          .catch((error) => {
            console.error('Error adding document: ', error);
          });

      }


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