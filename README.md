# Wefunder Investment Form

This project provides a template for companies to collect basic user data (name and email) and redirect to their Wefunder investment page.

## Quick Setup Instructions

### 1. Download the Preconfigured Zip File
[Download the preconfigured zip file](https://drive.google.com/your-download-link) to your local machine.

### 2. Extract the Zip File
Extract the contents of the zip file to a directory on your local machine.

### 3. Customize the Wefunder URL
Open `public/index.html` and locate the hidden input field with `id="wefunderUrl"`. Replace the `value` attribute with your specific Wefunder URL:

```html
<input type="hidden" id="wefunderUrl" name="wefunderUrl" value="https://wefunder.com/your-company">
```

### 4. Upload to Your Website
For Traditional Web Hosting Services:
- Use an FTP client or your hosting provider's file manager to upload the contents of the public directory to the desired directory on your web server (e.g., www.mysite.com/invest).

For Websites Built with Frameworks (e.g., React):

Copy the Form Component:
- Copy the form HTML from public/index.html and the CSS from public/default-styles.css.

Create a New Component in Your Framework:

Example for React:
`src/InvestmentForm.js`

```jsx
Copy code
import React, { useState } from 'react';
import './InvestmentForm.css';

const InvestmentForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const wefunderUrl = 'https://wefunder.com/your-company'; // Update this URL

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/store-data', { // Adjust the endpoint as necessary
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      window.location.href = wefunderUrl;
    })
    .catch((error) => {
      console.error('Error:', error);
      window.location.href = wefunderUrl;
    });
  };

  return (
    <div className="container">
      <h1>Interested in investing?</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InvestmentForm;
```

`src/InvestmentForm.css`
```css
body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background-color: #f9f9f9;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    text-align: center;
}

h1 {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
}

form {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    box-sizing: border-box;
    text-align: left;
}

label {
    display: block;
    margin-bottom: 5px;
    color: #555;
}

input[type="text"],
input[type="email"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 3px;
    box-sizing: border-box;
}

button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
}

button:hover {
    background-color: #0056b3;
}
```

Import and Use the Component:
- Import the InvestmentForm component into the main application file (e.g., App.js) and include it in your JSX.

`src/App.js`
```jsx
import React from 'react';
import InvestmentForm from './InvestmentForm';

function App() {
  return (
    <div className="App">
      <InvestmentForm />
    </div>
  );
}

export default App;
```

Deploy Your React App:
- Build and deploy your React app according to your usual deployment process.

For Websites with Server-Side Logic:

Customize Server-Side Logic:
- Ensure that your server-side logic is set up to handle the /store-data endpoint. Here’s an example using Node.js with Express:

`server.js`
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/store-data', (req, res) => {
    const { name, email } = req.body;
    console.log('Received data:', req.body);

    // Read the existing data from the JSON file
    fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data.json:', err);
            return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }

        // Parse the existing data and add the new data
        const jsonData = JSON.parse(data);
        jsonData.push({ name, email });

        // Write the updated data back to the JSON file
        fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to data.json:', err);
                return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
            }

            // Respond with success and redirect
            res.json({ status: 'success', data: req.body });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
```

Deploy the Application:
- Deploy your application according to your usual deployment process, ensuring that the static files and server-side logic are correctly configured.

Example File Structure
```java
wefunder-investment-form/
├── public/
│   ├── index.html
│   ├── script.js
│   ├── default-styles.css
│   ├── custom-styles.css (optional)
├── package.json
├── package-lock.json
├── server.js
├── README.md
├── .gitignore
```

.gitignore File
Your .gitignore file should include the following to avoid committing unnecessary files:

```kotlin
node_modules/
data.json
```