const loginFormHandler = async (event) => {
	event.preventDefault();
	try {
		const email = document.querySelector('#email-login').value.trim();
		const password = document.querySelector('#password-login').value.trim()

		if (email && password) {
			const response = await fetch('api/users/login', {
				method: 'POST',
				body: JSON.stringify({ email,password }),
				headers: { 'Content-Type': 'application/json' },
			});

			if (response.ok && User.value == 'owner') {
				document.location.replace('/owner');
			} else if (response.ok && User.value == 'tenant') 
				document.location.replace('/tenant')
				else {
				alert(response.StatusText);
			}
		}
	} catch (err) {
		if (err) console.error(err);
	}
};

const signupFormHandler = async (event) => {
	event.preventDefault();
	try {
		const name = document.querySelector('#name-signup').value.trim();
		const email = document.querySelector('#email-signup').value.trim();
		const password = document.querySelector('#password-signup').value.trim();

		if(name && password) {
			const response = await fetch('api/users', {
				method: 'POST',
				body: JSON.stringify({ name, email, password }),
				headers: { 'Content-Type': 'application/json' },
			});

			if(response.ok) {
				document.location.replace('/user');
			} else {
				alert(response.StatusText);
			}
		}
	} catch (err) {
		if (err) console.error(err);
	}
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);