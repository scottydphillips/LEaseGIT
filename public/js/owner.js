

const ownerFormHandler = async (event) => {
  event.preventDefault();

  const propertyAddress = document.getElementById("property-address").value;
  const leaseLength = document.getElementById("lease-length").value;

  if (propertyAddress && leaseLength) {
    const response = await fetch("/api/owner", {
      method: "POST",
      body: JSON.stringify({ propertyAddress, leaseLength }),
      headers: { "content-type": "owner/json" },
    });
    console.log(response);
    if(response.ok) {
        document.location.replace('/owner');
    } else {
        alert(response.statusText);
    }

  }
}; 
    

document.getElementById('owner-post').addEventListener('submit',ownerFormHandler);