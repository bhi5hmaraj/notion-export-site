import {analytics, auth} from './init.js'

// Function to check authentication state
function checkAuth() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          resolve(user);
        } else {
          // User is signed out
          reject('User not authenticated');
        }
      });
    });
  }
  
  // Function to protect pages
  function protectPage() {
    checkAuth()
      .then((user) => {
        // User is authenticated, allow access to the page
        console.log('User authenticated:', user.email);
        // Here you can initialize your page content
      })
      .catch((error) => {
        // User is not authenticated, redirect to login page
        console.log('Authentication failed:', error);
        window.location.href = '/index.html';
        // window.location.href = path.resolve(__dirname, 'index.html');
      });
  }
  
  // Call this function at the start of each protected page
  document.addEventListener('DOMContentLoaded', protectPage);