const logout = async () => {
	console.log('clicked');
	const response = await fetch('/api/user/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	});

	if(response.ok) {
		document.location.replace('/login');
		alert('you are logged out.');
	} else {
		alert(response.StatusText);
	}
};

document.querySelector('#logout').addEventListener('click', logout);