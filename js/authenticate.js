function login(event) {
  event.preventDefault();
  const email = $("#email");
  const password = $("#password");
  const emailValue = email.val();
  const passwordValue = password.val();
  const submitButton = $("button");
  // email.attr("disabled", true);
  // password.attr("disabled", true);
  // submitButton.text("authenticating..");
}
