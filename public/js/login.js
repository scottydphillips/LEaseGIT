const loginFormHandler = async (event) => {
  event.preventDefault();
  const email = document.getElementById("email-login").value.trim();
  const password = document.getElementById("password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if(response.ok){
      document.location.replace("/");
    }else{
      alert('failed to log in');
    }
	};
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  const userName = document.getElementById("name-signup").value.trim();
  const userEmail = document.getElementById("email-signup").value.trim();
  const userPassword = document.getElementById("password-signup").value.trim();
  let userRole;
  const getRole = () => {
    let radio = document.getElementsByName('selectRole');
    for (let i=0; i<radio.length; i++) {
      if(radio[0].checked) {
        userRole = 'owner';
      } else {
        userRole = 'tenant';
      }
  	}
  }
  getRole();
  if (userName && userEmail && userPassword && userRole) {
    const user = {
      username: userName,
      email: userEmail,
      password: userPassword,
      role: userRole,
    };
    const response = await fetch("/api/user/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } 
    else {
      alert("failed to register");
    }
  }
};

document
  .getElementById("login-button")
  .addEventListener("click", loginFormHandler);
document
  .getElementById("signup-button")
  .addEventListener("click", signupFormHandler);
