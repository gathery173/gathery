const firebaseConfig = {
    apiKey: "AIzaSyBooRw8q86fnSegmIk9PC9ynkbp6ODyQoE",
    authDomain: "opijk-f14cd.firebaseapp.com",
    databaseURL: "https://opijk-f14cd-default-rtdb.firebaseio.com",
    projectId: "opijk-f14cd",
    storageBucket: "opijk-f14cd.appspot.com",
    messagingSenderId: "970116476040",
    appId: "1:970116476040:web:c9c81ac9b47b988028433d"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get reference to the databas
// Get a reference to the Firebase Realtime Database

const database = firebase.database();

    // Get a reference to the root of your data structure
    const dataRef = database.ref('/');

    // Function to handle login
    function login() {
        const user = document.getElementById("login").value;
        const log = document.getElementById("login");
        const pass = document.getElementById("passwordInput");
        const pwd = pass.value;
    
        // Reset password and login input border color
        pass.style.border = "";
        log.style.border = "";
    
        userref = database.ref('/users');
    
        // Array to store user names
        const userNames = [];
    
        // Fetch all user names
        dataRef.child('users').once('value')
            .then(usersSnapshot => {
                usersSnapshot.forEach(userSnapshot => {
                    const userName = userSnapshot.key;
                    userNames.push(userName);
                });


                // Check if the entered user is in the array
                if (userNames.includes(user)) {
                    // Check user credentials
                    dataRef.child('users').child(user).once('value')
                        .then(userSnapshot => {
                            const userData = userSnapshot.val();
    
                            if (userData && userData.pwd === pwd) {
                                // Set teacher in local storage
                                localStorage.setItem('tj', userData.teacher);
                                localStorage.setItem('user_login', userData.login);
                                
                                localStorage.setItem("gathery_username", userData.login)
                                localStorage.setItem("gathery_password", userData.pwd)
    
    
                                // Redirect to voting.html
                                window.location.href = "voting.html";
                            } else {
            
                                const toastLiveExample = document.getElementById('pwd-error')
                                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                                
                                
                                toastBootstrap.show()
                            
                                      
                                // Set password input border color to red
                                pass.style.border = "1px solid red";
                                pass.style.color = "red"
                            }
                        })
                        .catch(error => {
                            console.error('Error retrieving user data:', error);
                        });
                } else {
                    // Set login input border color to red
                    const toastLiveExample = document.getElementById('log-error')
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

                    toastBootstrap.show()
                    log.style.border = "1px solid red";
                    log.style.color = "red"
                    
                }
            })
            .catch(error => {
                console.error('Error retrieving user names:', error);
            });
    }
    
    // Add event listener to reset the password and login input border color on focus
    document.getElementById("passwordInput").addEventListener("focus", function() {
        this.style.border = "";
        this.style.color = "black";
        
    });
    
    document.getElementById("login").addEventListener("focus", function() {
        this.style.border = "";
        this.style.color = "black";
    });
    

  

    function togglePasswordVisibility() {
        const passwordInput = document.getElementById('passwordInput');
        const passwordToggle = document.getElementById('pp');
    
        // Toggle password input type
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    
        // Toggle eye icon
        if (passwordInput.type === 'password') {
            passwordToggle.classList.remove('fa-eye-slash');
            passwordToggle.classList.add('fa-eye');
        } else {
            passwordToggle.classList.remove('fa-eye');
            passwordToggle.classList.add('fa-eye-slash');
        }
    }
    
    function getUrlParams() {
        // Get the full URL
        var url = window.location.href;

        // Create a URLSearchParams object from the URL
        var searchParams = new URLSearchParams(new URL(url).search);

        // Get the value of login and pwd parameters
        var loginParam = searchParams.get('log');
        var pwdParam = searchParams.get('pwd');

        // Populate the login and password fields with parameters
        document.getElementById("login").value = loginParam || '';
        document.getElementById("passwordInput").value = pwdParam || '';
    }

    // Call the function when the page loads
    window.onload = getUrlParams;

    function showLoginErrorToast() {
        var toast = new bootstrap.Toast(document.getElementById('loginToast'));
        toast.show();
    }