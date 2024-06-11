document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contact-form');
  const emailPattern = /^[^\s@]+@gmail\.com$/;

  contactForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      
      // Resetting validation feedback
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      let isValid = true;

      email.classList.remove('is-invalid');
      message.classList.remove('is-invalid');

      // Validate email
      if (!emailPattern.test(email.value)) {
          email.classList.add('is-invalid');
          email.nextElementSibling.textContent = 'This is not a valid email.';
          isValid = false;
      }

      // Validate message length
      if (message.value.length < 50) {
          message.classList.add('is-invalid');
          message.nextElementSibling.textContent = 'The message needs to be at least 50 characters.';
          isValid = false;
      }

      // Check if the form is valid
      if (!contactForm.checkValidity() || !isValid) {
          contactForm.classList.add('was-validated');
          return;
      }

      // Sending data to the API if the form is valid
      try {
          const response = await fetch('https://xceedesigns-backend.vercel.app/contact', {
              method: 'POST',
              body: JSON.stringify({
                  name: document.getElementById('name').value,
                  email: email.value,
                  message: message.value
              }),
              headers: {
                  'Content-Type': 'application/json'
              }
          });

          const parsedResponse = await response.text();

          // Update modal content
          const modalBody = document.querySelector('.modal-body');
          const modalTitle = document.querySelector('.modal-title');
          modalTitle.textContent = 'XceeDesigns LLC.';
          modalTitle.style.fontWeight = 'bold';
          modalBody.textContent = "Thank you for contacting us. We'll get back to you soon!";
          $('#myModal').modal('show');

          // Reset form
          contactForm.reset();
          contactForm.classList.remove('was-validated');

          // Log status
          console.log(response.status);
      } catch (error) {
          console.error('Error:', error);
      }
  });
});
