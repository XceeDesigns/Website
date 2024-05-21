    // for handling form submission
    document.addEventListener('DOMContentLoaded', function () {
      
      const contactForm = document.getElementById('contact-form');
      const contactSubmit = document.getElementById('contact-submit');
      contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const emailInput = document.getElementById('email').value;
  
        // Check if email matches the pattern
        if (!emailPattern.test(emailInput)) {
          alert('Please enter a valid email address (e.g., user@example.com)');
          return;
        }
          // sending data back to API
        const response = await fetch('https://xceedesigns-backend.vercel.app/contact', {
          method: 'POST',
          body: JSON.stringify({
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const parsedResponse = await response.text();

        // modal info
        const modalBody = document.querySelector('.modal-body');
        const modalTitle = document.querySelector('.modal-title');
        modalTitle.textContent = 'XceeDesigns LLC.';
        modalTitle.style.fontWeight = 'bold';
        modalBody.textContent = "Thank you for contacting us. We'll get back to you soon!";
        // modalBody.style.color = '#04aa6d';
        $('#myModal').modal('show');

        //reset form
        document.getElementById('contact-form').reset();
        //log status
        console.log(response.status);
      });
    });