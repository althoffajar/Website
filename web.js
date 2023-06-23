// Main Page
//const selection = document.querySelector('selection')
//const selectionButton = document.querySelector('.navigation_selection')

//selection.addEventListener('click', function(){
//    selection.classList.toggle('is-active');
//    selectionButton.classList.toggle('active');
//})

// Login Page
let CreateButton = document.getElementById("CreateButton");
let SignInButton = document.getElementById("SignInButton");
let UserInput = document.getElementById("UserInput");
let FormHeader = document.getElementById("FormHeader");
let LoginOrCreateLink = document.getElementById("LoginOrCreateLink");

LoginOrCreateLink.onclick = function(){ 
    if(UserInput.style.maxHeight == "60px"){
        UserInput.style.maxHeight = "0";
        CreateButton.classList.add("disable");
        SignInButton.classList.remove("disable");
        FormHeader.innerHTML = "Log In";
        LoginOrCreateLink.innerHTML = "Create an account here";
    }
    else{
        UserInput.style.maxHeight = "60px";
        CreateButton.classList.remove("disable");
        SignInButton.classList.add("disable");
        FormHeader.innerHTML = "Create an Account";
        LoginOrCreateLink.innerHTML = "Already Have An Account? Go Login!";
    }
}
