document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
      const response = await fetch('https://xceedesigns-backend.vercel.app/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });

      const parsedResponse = await response.json(); // If the server returns JSON

      // Check if the response is ok (status in the range 200-299)
      if (response.ok) {
        // Show success modal
        const modalBody = document.querySelector('.modal-body');
        const modalTitle = document.querySelector('.modal-title');
        modalTitle.textContent = 'XceeDesigns LLC.';
        modalTitle.style.fontWeight = 'bold';
        modalBody.textContent = "Thank you for contacting us. We'll get back to you soon!";
        $('#myModal').modal('show');

        // Reset form
        contactForm.reset();
      } else {
        // Show error modal
        const modalBody = document.querySelector('.modal-body');
        const modalTitle = document.querySelector('.modal-title');
        modalTitle.textContent = 'Error';
        modalTitle.style.fontWeight = 'bold';
        modalBody.textContent = "There was a problem with your submission. Please try again later.";
        $('#myModal').modal('show');
      }

      // Log response details for debugging
      console.log('Response status:', response.status);
      console.log('Response body:', parsedResponse);

    } catch (error) {
      // Log the error and show a general error message
      console.error('Fetch error:', error);

      const modalBody = document.querySelector('.modal-body');
      const modalTitle = document.querySelector('.modal-title');
      modalTitle.textContent = 'Error';
      modalTitle.style.fontWeight = 'bold';
      modalBody.textContent = "Could not connect to the server. Please try again later";
      $('#myModal').modal('show');
    }
  });
});
