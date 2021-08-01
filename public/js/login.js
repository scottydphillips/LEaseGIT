const loginFormHandler = async (event) => {
  event.preventDefault();
  const email = document.getElementById("email-login").value.trim();
  const password = document.getElementById("password-login").value.trim();

  if (email && password) {
    const response = await fetch("api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    // if (response.role = "owner") {
    //   document.location.replace("api/owner");
    // } else if (response.role = "tenant") {
		//  document.location.replace("api/tenant");
  	// } else {
    // alert(response.StatusText);
	  // }
    if(response.ok){
      document.location.replace("api/listing");
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
    const response = await fetch("api/user", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/listing");
    } 
    // else if (response.ok && userRole == 'tenant') {
    //   document.location.replace('/tenant')
    // } 
    else {
      alert(response.StatusText);
    }
  }
};

document
  .getElementById("login-button")
  .addEventListener("click", loginFormHandler);
document
  .getElementById("signup-button")
  .addEventListener("click", signupFormHandler);
