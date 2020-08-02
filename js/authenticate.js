// import { makeRequest, navigateUser } from "./utils.js";
const submitButton = $("button");

async function login(event) {
  event.preventDefault();
  const email = $("#email");
  const password = $("#password");
  const emailValue = email.val();
  const passwordValue = password.val();
  console.log(emailValue, passwordValue);

  if (emailValue && passwordValue) {
    email.attr("disabled", true);
    password.attr("disabled", true);
    submitButton.text("authenticating..");
    try {
      const loginURL = `${window.app.baseURL}/login`;
      const authenticationData = {
        email: emailValue,
        password: passwordValue,
      };
      const data = await makeRequest(
        "POST",
        loginURL,
        JSON.stringify(authenticationData)
      );
      localStorage.setItem("loggedIn", JSON.stringify(true));
      navigateUser("index.html");
    } catch (err) {
      alert("invalid email or password");
    }
    email.attr("disabled", false);
    password.attr("disabled", false);
    submitButton.text("Login");
  } else {
    alert("Please fill all the fields");
  }
}

submitButton.click(login);
