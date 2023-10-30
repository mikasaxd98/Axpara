const API_URL = 'https://testing.jazzserve.com:8020';

$(document).on("click", function (event) {
	let $trigger = $(".dropdown");
	if ($trigger !== event.target && !$trigger.has(event.target).length) {
		$(".dropdown_menu").hide();
	}
});

$(document).ready(function () {


	let _jobs_id = '';
	let _job_title = '';

	$(".dropdown").on('click', function () {
		$(this).find(".dropdown_menu").toggle();
	});
	$('.container-fluid > button').on('click', function () {
		if ($('#navbarSupportedContent').hasClass('collapsing')) {
			$(document.body).css('overflow', 'hidden')
		} else {
			$(document.body).css('overflow', 'scroll')
		}
	})

	getQueryParams();
	$('.job-title').text(`Back to ${decodeURI(_job_title)}`);
	$('#backTo').attr('href', `./full-info?jobsId=${_jobs_id}`);


	let selectedValueSkills = [];
	let selectedValueCountry = '';
	$('.multi_select').selectpicker();
	$('.none_multi_select').selectpicker();

	$(".multi_select").on("change", function (e) {
		e.stopPropagation();
		selectedValueSkills = $(this).val();
	});
	$(".none_multi_select").on("change", function (e) {
		e.stopPropagation();
		selectedValueCountry = $(this).val();
	});


	$('.multi_select_box button').addClass('custom-btn')
	$('.none_multi_select_box button').addClass('custom-btn')

	$('.registerForm').bootstrapValidator({
		message: 'This value is not valid',
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			name: {
				message: 'This value is not valid',
				validators: {
					notEmpty: {
						message: 'This value is not valid'
					},
				}
			},
			country: {
				message: 'This value is not valid',
				validators: {
					notEmpty: {
						message: 'This value is not valid'
					},
				}
			},
			phoneNumber: {
				message: 'This value is not valid',
				validators: {
					notEmpty: {
						message: 'This value is not valid'
					},
					integer: {
						message: 'This value is not valid'
					},
				}
			},
			email: {
				message: 'This value is not valid',
				validators: {
					notEmpty: {
						message: 'This value is not valid'
					},
					emailAddress: {
						message: 'The input is not a valid email address'
					}
				}
			},
			skills: {
				message: 'This value is not valid',
				validators: {
					notEmpty: {
						message: 'This value is not valid'
					},
				}
			},
			uploadCV: {
				message: 'This value is not valid',
				validators: {
					notEmpty: {
						message: 'This value is not valid'
					},
				}
			},
			uploadMobileCV: {
				message: 'This value is not valid',
				validators: {
					notEmpty: {
						message: 'This value is not valid'
					},
				}
			},
		}
	}).on('success.form.bv', function (e) {
		e.preventDefault();
		const dataForm = {
			full_name: $('#name').val(),
			country: selectedValueCountry,
			phone_number: $('#phoneNumber').val(),
			email: $('#email').val(),
			skills: selectedValueSkills,
		}

		let uploadCV = $("#uploadCV");
		let uploadMobileCV = $("#uploadMobileCV");
		const formData = new FormData();

		let file = uploadCV.prop('files')[0] !== undefined ? uploadCV.prop('files')[0] : uploadMobileCV.prop('files')[0];
		formData.append('cv', file);
		formData.append('application', JSON.stringify(dataForm));


		$.ajax({
			method: 'post',
			url: `${API_URL}/jobs/${_jobs_id}/application`,
			data: formData,
			processData: false,
			contentType: false,
			success: function (data) {
				$('section.apply').addClass('d-none');
				$('section.success').removeClass('d-none');
			},
		})

	})

	$('#uploadFile').on('click', function () {
		$('#uploadMobileCV').click();
	});

	$('#uploadMobileCV').change(function (e) {
		let fileName = e.target.files[0].name;
		$('#uploadFile').text(fileName)
	});
	$('#uploadCV').change(function (e) {
		let fileName = e.target.files[0].name;
		$('.choose-file').text(fileName)
	});


	$.ajax({
		url: `${API_URL}/landing/system-values/countries?limit=300`,
		method: 'get',
		dataType: 'json',
		success: function (data) {
			let _data = data;
			$.each(_data, function (index, value) {
				if (value !== undefined)
					$('.registerForm select#country').append(`<option value="${value.name}">${value.name}</option>`);
			})
			$('.none_multi_select').selectpicker('refresh');
		}
	});

	$.ajax({
		url: `${API_URL}/landing/skills?limit=3000`,
		method: 'get',
		dataType: 'json',
		success: function (data) {
			let _data = data;
			$.each(_data, function (index, value) {
				if (value.name !== undefined)
					$('.registerForm  select#skills').append(`<option value="${value.name}">${value.name}</option>`)
			})
			$('.multi_select').selectpicker('refresh');
		}


	});

	function getQueryParams() {
		let url = window.location.href;
		let _url = url.split('?');
		let queryParams = _url[1];
		let _queryParams = queryParams.split('&');
		if (_queryParams.length === 2) {
			let jobs_id = _queryParams[0];
			let job_title = _queryParams[1];
			if (jobs_id.split('=')[0] === 'jobsId')
				_jobs_id = jobs_id.split('=')[1];
			if (job_title.split('=')[0] === 'jobTitle')
				_job_title = job_title.split('=')[1];
		}
	}

});
