const checkAuthentication = () => {
  const loggedIn = localStorage.getItem("loggedIn");
  if (!loggedIn) {
    const currentURL = window.location.href;
    const lastIndex = currentURL.lastIndexOf("/");
    const baseURL = currentURL.slice(0, lastIndex + 1);
    const loginURL = `${baseURL}login.html`;
    location.assign(loginURL);
  }
};

checkAuthentication();
