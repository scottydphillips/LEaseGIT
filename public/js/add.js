const addFormHandler = async (event) => {
  event.preventDefault();
  const propertyAddress = document.getElementById('property-address')
	console.log(propertyAddress)
  let availability;
  const getAvailability = () => {
    let radio = document.getElementsByName('selectRole');
    for (let i=0; i<radio.length; i++) {
      if(radio[0].checked) {
        userRole = 'available';
      } else {
        userRole = 'unavailable';
      }
  	}
  }
  getAvailability();
	console.log(availability);
  if (propertyAddress && availability) {
    const address = {
      propertyAddress: propertyAddress,
      availability: availability,
    };
    const response = await fetch("/api/user/register", {
      method: "POST",
      body: JSON.stringify(address),
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