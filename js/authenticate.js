function login(event) {
  event.preventDefault();
  const email = $("#email");
  const password = $("#password");
  const emailValue = email.val();
  const passwordValue = password.val();
  const submitButton = $("button");
  email.attr("disabled", true);
  password.attr("disabled", true);
  submitButton.text("authenticating..");
  setTimeout(() => {
    console.log("entered the setTime out function");
    if (emailValue && passwordValue) {
      if (emailValue === "deerajn04@gmail.com" && passwordValue === "abc") {
        localStorage.setItem("loggedIn", JSON.stringify(true));
        window.location.assign("http://127.0.0.1:5501/index.html");
      } else {
        alert("invalid email or password");
      }
    }
    email.attr("disabled", false);
    password.attr("disabled", false);
    submitButton.text("Login");
  }, 2000);
}
