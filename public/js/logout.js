const logout = async () => {
	const response = await fetch('/api/user/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	});
	console.log(response);
	if(response.ok) {
		document.location.replace('/login');
		alert('you are logged out.');
	} else {
		alert(response.StatusText);
	}
};

document.querySelector('#logout').addEventListener('click', logout);