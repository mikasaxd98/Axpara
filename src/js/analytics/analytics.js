$(document).ready(function () {

	/* Start Public Holiday */
	$('nav .public-holidays').on('click', function () {
		gtag('event', 'Click', {'event_category': 'Public Holidays', 'event_label': 'Header'});
	});
	$('footer .public-holidays').on('click', function () {
		gtag('event', 'Click', {'event_category': 'Public Holidays', 'event_label': 'Footer'});
	})
	/* End Public Holiday */

	/* Start Job Description */
	$('nav .job-descriptions').on('click', function () {
		gtag('event', 'Click', {'event_category': 'Job Description', 'event_label': 'Header'});
	});
	$('footer .job-descriptions').on('click', function () {
		gtag('event', 'Click', {'event_category': 'Job Description', 'event_label': 'Footer'});
	})
	/* End Public Holiday */

	/* Start Client Login */
	$('nav .client-login').on('click', function () {
		gtag('event', 'Click', {'event_category': 'Client Login', 'event_label': 'Header'});
	});
	$('footer .client-login').on('click', function () {
		gtag('event', 'Click', {'event_category': 'Client Login', 'event_label': 'Footer'});
	})
	/* End Client Login */

	/* Start Talent Login */
	$('nav .talent-login').on('click', function () {
		gtag('event', 'Click', {'event_category': 'Talent Login', 'event_label': 'Header'});
	});
	$('footer .talent-login').on('click', function () {
		gtag('event', 'Click', {'event_category': 'Talent Login', 'event_label': 'Footer'});
	})
	/* End Talent Login */

	/* Start open jobs */
	$('nav .open-jobs').on('click', function () {
		gtag('event', 'Click', {'event_category': 'Open Jobs', 'event_label': 'Header'});
	})
	$('footer .open-jobs').on('click', function () {
		gtag('event', 'Click', {'event_category': 'Open Jobs', 'event_label': 'Footer'});
	})
	/* End open jobs */

	/* Start full info */
	let full_info_get = setTimeout(() => {
		$('.jobs_description .action a').on('click', function (e) {
			const job_position = $(this).data('name');
			const company_name = $(this).data('company');
			gtag('event', 'Full Info', {
				'event_category': 'Open Jobs',
				'event_label': `${job_position} | ${company_name}`,
			});
		})

	}, 500);

	let full_info_apply = setTimeout(() => {
		$('.full_info .order_title .full-info-btn a').on('click', function (e) {
			const name = $(this).data('name');
			const company = $(this).data('company');
			gtag('event', 'Apply Button', {
				'event_category': 'Open Jobs',
				'event_label': `${name} | ${company}`,
			});
		})
	}, 500);

	let full_info_view_job_desc = setTimeout(() => {
		$('.full_info #viewJobDesc').on('click', function (e) {
			const name = $(this).data('name');
			const company = $(this).data('company');
			gtag('event', 'View Description', {
				'event_category': 'Open Jobs',
				'event_label': `${name} | ${company}`,
			});
		})
	}, 500)
	/* End full info */

	/* Start whatsapp and telegram */
	$('nav a.whatsApp').on('click', function () {
		gtag('event', 'WhatsApp Us', {'event_category': 'Messengers Buttons', 'event_label': 'Header'});
	});
	$('nav a.telegram').on('click', function () {
		gtag('event', 'Telegram Us', {'event_category': 'Messengers Buttons', 'event_label': 'Header'});
	});
	$('.contact_us a.whatsApp').on('click', function () {
		gtag('event', 'WhatsApp Us', {'event_category': 'Messengers Buttons', 'event_label': 'Mid'});
	});
	$('.contact_us a.telegram').on('click', function () {
		gtag('event', 'Telegram Us', {'event_category': 'Messengers Buttons', 'event_label': 'Mid'});
	});
	$('.contact_us.public_holiday a.whatsApp').on('click', function () {
		gtag('event', 'WhatsApp Us', {'event_category': 'Messengers Buttons', 'event_label': 'Resources Public Holidays'});
	});
	$('.contact_us.public_holiday a.telegram').on('click', function () {
		gtag('event', 'Telegram Us', {'event_category': 'Messengers Buttons', 'event_label': 'Resources Public Holidays'});
	});
	$('.contact_us.job_description_section a.whatsApp').on('click', function () {
		gtag('event', 'WhatsApp Us', {'event_category': 'Messengers Buttons', 'event_label': 'Resources Job Description'});
	});
	$('.contact_us.job_description_section a.telegram').on('click', function () {
		gtag('event', 'Telegram Us', {'event_category': 'Messengers Buttons', 'event_label': 'Resources Job Description'});
	});
	/* End whatsapp and telegram */

	/* Start Book now*/
	let index_book_now = setTimeout(() => {
		$('.candidate_table a.book_now ').on('click', function () {
			const name = $(this).data('name');
			const country = $(this).data('country');
			gtag('event', 'click', {
				'event_category': 'Book Now Button',
				'event_label': `${name} | ${country}`,
			});
		})
	}, 500);
	/* End Book now*/

	/* Start View Entire Candidate Database*/
	$('.view_btn').on('click', function () {
		gtag('event', 'click', {
			'event_category': 'View Entire Candidate Database Button',
		});
	});
	/* End View Entire Candidate Database*/

	/* Start View Deck*/
	$('.we_offer a.view_deck').on('click', function () {
		gtag('event', 'click', {'event_category': ' View Deck PDF', 'event_label': 'Top'});
	});
	$('.hire_and_manage_talent a.view_deck').on('click', function () {
		gtag('event', 'click', {'event_category': 'View Deck PDF', 'event_label': 'Bottom'});
	});
	/* End View Deck*/

	/* Start View Portfolio*/
	$('.we_offer a.view_portfolio').on('click', function () {
		gtag('event', 'click', {'event_category': 'View Portfolio PDF'});
	});
	/* End View Portfolio*/

	/* Start Map*/
	$('.map').on('click', function () {
		gtag('event', 'click', {
			'event_category': 'Live Map',
			'event_label': `${localStorage.getItem('oldCountry')}`,
		});
	});
	/* End Map*/


});
