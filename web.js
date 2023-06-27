// ------------------------------------------***Main Page**------------------------------------------------
//const selection = document.querySelector('selection')
//const selectionButton = document.querySelector('.navigation_selection')

//selection.addEventListener('click', function(){
//    selection.classList.toggle('is-active');
//    selectionButton.classList.toggle('active');
//})




// ------------------------------------------***Login Page**------------------------------------------------



function messageSetting(Element, type, output) {
    const messageElement = Element.querySelector(".Message_Failed");

    messageElement.textContent = message.textContent = output;
    output.classList.remove("Message_Success", "Message_Failed");
    output.classList.add(`Message_${type}`)
};

document.addEventListener("DOMContentLoaded", () => {
    const SignIn = document.querySelector("#SignInPage");
    const CreateAccount = document.querySelector("#CreateAccountPage");

    //document.querySelector("#ButtonSignInPage") document.querySelector("#LinkSignIn")
    document.querySelector("#ButtonSignInPage").addEventListener("click", a => {
        a.preventDefault();
        CreateAccount.classList.add("Inputs_DisplayNone");
        SignIn.classList.remove("Inputs_DisplayNone");
    });

    //document.querySelector("#ButtonToCreateAccount") document.querySelector("#LinkCreateAccount")
    document.querySelector("#ButtonToCreateAccount").addEventListener("click", a =>{
        a.preventDefault();
        SignIn.classList.add("Inputs_DisplayNone");
        CreateAccount.classList.remove("Inputs_DisplayNone");
    });

    SignIn.addEventListener("submit", a =>{
        a.preventDefault();

        //Perform Login

        messageSetting(SignIn, "error", "invalid username/password combination");
    })

});