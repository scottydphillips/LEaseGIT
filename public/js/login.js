const loginFormHandler = async (event) => {
	event.preventDefault();
	try {
		const email = document.querySelector('#email-login').value.trim();
		const password = document.querySelector('#password-login').value.trim()

		if (email && password) {
			const response = await fetch('api/user', {
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
	try {
		const name = document.querySelector('#name-signup').value.trim();
		const email = document.querySelector('#email-signup').value.trim();
		const password = document.querySelector('#password-signup').value.trim();
		let radioValue = () => {
			document.getElementById('result');
			let radioEl = document.querySelector('.radio');
			for(i=0; i<radioEl.length; i++) {
				if(radioEl[i].checked) {
					return document.getElementsByTagName('result')+radioEl[i].value;
				}
			}
		}
		if(name && password) {
			const response = await fetch('api/user', {
				method: 'POST',
				body: JSON.stringify({ name, email, password, radioValue }),
				headers: { 'Content-Type': 'application/json' },
			});
			console.log(response);
			if(response.ok) {
				document.location.replace('/login');
			} else {
				alert(response.StatusText);
			}
		}
	} catch (err) {
		if (err) console.error(err);
	}
};

document.querySelector('#login-button').addEventListener('submit', loginFormHandler);
document.querySelector('#signup-button').addEventListener('submit', signupFormHandler);