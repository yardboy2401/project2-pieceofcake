//login event handler function
async function loginFormHandler(event) {
  event.preventDefault();
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  //make sure email and password present
  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    //if response is ok respond with console message and replace front-end homepage
    setTimeout(function () {
      if (response.ok) {
        console.log(response, " Logged in successfully!");
        document.location.replace("/");
      } else {
        alert(response.statusText);
      }
    }, 500);
  }
};

//handler function for new signup
async function signupFormHandler(event) {
  event.preventDefault();
  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  //check to make sure username/email/password have values
  if (username && email && password) {
    //POST fetch request to back-end
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log(response);
    } else {
      alert(response.statusText);
    }
    //second we send in a request to login
    const responseTwo = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    setTimeout(function () {
      if (responseTwo.ok) {
        console.log(response, " Logged in successfully!");
        document.location.replace("/");
      } else {
        alert(response.statusText);
      }
    }, 500);

    const sendEmail = await fetch('api/users/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
      }),
    })
    .then((res) => res.json())
    .then((res) => {
      console.log('here is the response: ', res);
    })
    .catch((err) => {
      console.error('here is the error: ', err);
    })
}
};
//Add event listeners for on-clicks for login/signup
document.querySelector("#login-btn").addEventListener("click", loginFormHandler);

document.querySelector("#signup-btn").addEventListener("click", signupFormHandler);
