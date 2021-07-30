const loginFormHandler = async (event) => {
	event.preventDefault();
		const email = document.getElementById('email-login').value.trim();
		const password = document.getElementById('password-login').value.trim()

		if (email && password) {
			const response = await fetch('api/user/login', {
				method: 'POST',
				body: JSON.stringify({ email, password }),
				headers: { 'Content-Type': 'application/json' }
			});
			console.log(response);
			// const getRole = await fetch('api/user', {
			// 	method: 'GET',
			// 	body: JSON.parse({ role }),
			// });
			if (response.ok) {
				document.location.replace('/owner');
			}	else {
				alert(response.StatusText);
			}
		}
};

const signupFormHandler = async (event) => {
	event.preventDefault();
		const userName = document.getElementById('name-signup').value.trim();
		console.log(userName)
		const userEmail = document.getElementById('email-signup').value.trim();
		console.log(userEmail)
		const userPassword = document.getElementById('password-signup').value.trim();
		console.log(userPassword);
		let userRole
		const getRole = () => {
			const radioEl = document.querySelector('.radio');
			console.log(radioEl);
			if (radioEl.id == 'owner-signup') {
			  userRole = 'owner'
			} else {
				userRole = 'tenant'
			}
		}
		getRole();
		if(userName && userEmail && userPassword && userRole) {
			console.log(userName + userEmail + userPassword + userRole);
			const user = {
				username: userName,
				email: userEmail,
				password: userPassword,
				role: userRole
			}
			const response = await fetch('api/user', {
				method: 'POST',
				body: JSON.stringify(user),
				headers: { 'Content-Type': 'application/json' },
			});
			if(response.ok) {
				document.location.replace('/login');
			} else {
				alert(response.StatusText);
			}
		}
};

document.getElementById('login-button').addEventListener('click', loginFormHandler);
document.getElementById('signup-button').addEventListener('click', signupFormHandler);