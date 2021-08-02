const addProp = async (event) => {
    event.preventDefault();
    const propAddress = document.getElementById("property-address").value.trim();
    let available;
    let radio;
    const getAvailability = () => {
       radio = document.getElementsByName('selectAvailability');
    }
    getAvailability();
    if (propAddress && radio) {
        for (let i=0; i<radio.length; i++) {
            if(radio[0].checked) {
              available = true;
            } else {
              available = false;
            }
          }
      const property = {
        address: propAddress,
        availability: available,
      };
      console.log(property);
      const response = await fetch("/api/property/add", {
        method: "POST",
        body: JSON.stringify(property),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.replace("/api/user");
      } 
      else {
        alert("failed to add property");
      }
    }
  };
  
  document
    .getElementById("add-button")
    .addEventListener("click", addProp);