document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
  
    // Send the data to your server for storing
    fetch('/store-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Redirect to the Wefunder page
      window.location.href = document.getElementById('wefunderUrl').value;
    })
    .catch((error) => {
      console.error('Error:', error);
      // Redirect to the Wefunder page even if there's an error
      window.location.href = document.getElementById('wefunderUrl').value;
    });
  });
  