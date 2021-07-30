const loginFormHandler = async (event) => {
	event.preventDefault();
	try {
		const email = document.getElementById('email-login').value.trim();
		const password = document.getElementById('password-login').value.trim()

		if (email && password) {
			const response = await fetch('api/user/login', {
				method: 'POST',
				body: JSON.stringify({ email,password }),
				headers: { 'Content-Type': 'application/json' },
			});
			console.log(response)
			if (response.ok && User.role == 'owner') {
				document.location.replace('/owner');
			} else if (response.ok && User.role == 'tenant') 
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
		const email = document.getElementById('email-signup').value.trim();
		const password = document.getElementById('password-signup').value.trim();
		let radioValue = (role) => {
			document.getElementById('result');
			let radioEl = document.querySelector('.radio');
			for(i=0; i<radioEl.length; i++) {
				if(radioEl[i].checked) {
					return document.getElementsByTagName('result')+radioEl[i].value;
				}
			}
		}
		if(email && password) {
			const response = await fetch('api/user', {
				method: 'POST',
				body: JSON.stringify({ email, password, role: document.getElementById('result').checked }),
				headers: { 'Content-Type': 'application/json' },
			});
			console.log(response);
			if(response.ok) {
				document.location.replace('/login');
			} else {
				alert(response.StatusText);
			}
		}
};

document.getElementById('login-button').addEventListener('click', loginFormHandler);
document.getElementById('signup-button').addEventListener('click', signupFormHandler);