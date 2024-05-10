
    document.addEventListener('DOMContentLoaded', function () {
      const contactForm = document.getElementById('contact-form');
      const contactSubmit = document.getElementById('contact-submit');
      contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();

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
        const modalBody = document.querySelector('.modal-body');
        const modalTitle = document.querySelector('.modal-title');
        modalTitle.textContent = 'XceeDesigns LLC.';
        modalTitle.style.fontWeight = 'bold';
        modalBody.textContent = "Thank you for contacting us. We'll get back to you soon!";
        // modalBody.style.color = '#04aa6d';
        $('#myModal').modal('show');
        document.getElementById('contact-form').reset();
        console.log(response.status);
      });
    });