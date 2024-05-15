jQuery(document).ready(function($) {

	'use strict';

	$('#contact-form').validate({
		submitHandler: function(form) {

			var $form = $(form),
				$messageSuccess = $('#contactSuccess'),
				$messageError = $('#contactError'),
				$submitButton = $(this.submitButton);

        $submitButton.button('loading');

			// Ajax Submit
			$.ajax({
				type: 'POST',
				url: $form.attr('action'),
				data: $('#contact-form').serialize(),
				dataType: 'json',
				complete: function(data) {
				
					if (typeof data.responseJSON === 'object') {
						if (data.responseJSON.response == 'success') {

							$messageSuccess.removeClass('hidden');
							$messageError.addClass('hidden');

							// Reset Form
							$form.find('.controled')
								.val('')
								.blur()
								.parent()
								.removeClass('has-success')
								.removeClass('has-error')
								.find('label.error')
								.remove();
                
              $form.find('.controled').removeClass('error');  

 							if (($messageSuccess.offset().top - 80) < $(window).scrollTop()) {
								$('html, body').animate({
									scrollTop: $messageSuccess.offset().top - 80
								}, 300);
							} 

							$submitButton.button('reset');
              
              $('.controled').keyup(function(){
                $messageSuccess.addClass('hidden');
              });
							grecaptcha.reset();
							return;

						}
					}

					$messageError.removeClass('hidden');
					$messageSuccess.addClass('hidden');
          
          // Reset Form
							$form.find('.controled')
								.val('')
								.blur()
								.parent()
								.removeClass('has-success')
								.removeClass('has-error')
								.find('label.error')
								.remove();

					if (($messageError.offset().top - 80) < $(window).scrollTop()) {
						$('html, body').animate({
							scrollTop: $messageError.offset().top - 80
						}, 300);
					}

					$form.find('.has-success').removeClass('has-success');
						
					$submitButton.button('reset');
          
          $('.controled').keyup(function(){
            $messageError.addClass('hidden');
          });

				}
			});
		}
	});


});