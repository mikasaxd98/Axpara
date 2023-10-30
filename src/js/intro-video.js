$(document).on("click", function (event) {
	let $trigger = $(".dropdown");
	if ($trigger !== event.target && !$trigger.has(event.target).length) {
		$(".dropdown_menu").hide();
	}
});

$(document).ready(function () {
	const API_URL = 'https://testing.jazzserve.com:8020'

	let _talent_id = '';
	let _video_uuid = '';
	const BASE_URL = `${API_URL}/talent-users/talents-video/`;
	let API_URL_MP4 = '';
	let API_URL_WEBM = '';

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
	getTalentById();
	getVideo();


	function getQueryParams() {
		let url = window.location.href;
		let _url = url.split('?');
		let queryParams = _url[1];
		let _queryParams = queryParams.split('&');
		if (_queryParams.length === 2) {
			let talent_id = _queryParams[0];
			let video_uuid = _queryParams[1];
			if (talent_id.split('=')[0] === 'tId')
				_talent_id = talent_id.split('=')[1];
			if (video_uuid.split('=')[0] === 'tV')
				_video_uuid = video_uuid.split('=')[1];
		}
	}

	function getVideo() {
		API_URL_MP4 = `${BASE_URL}${_talent_id}/${_video_uuid}/intro/mp4`;
		API_URL_WEBM = `${BASE_URL}${_talent_id}/${_video_uuid}/intro/webm`;

		let VIDEO_MP4 = $('<source />', {
			id: 'video_mp4',
			src: API_URL_MP4,
			type: 'video/mp4',
			controls: true
		});
		let VIDEO_WEBM = $('<source />', {
			id: 'video_webm',
			src: API_URL_WEBM,
			type: 'video/webm',
			controls: true
		});
		$('#video > video').append(VIDEO_MP4);
		$('#video > video').append(VIDEO_WEBM);
	}

	function getTalentById() {
		$.ajax({
			url: `${API_URL}/talent-users/${_talent_id}`,
			method: 'get',
			dataType: 'json',
			xhrFields: {
				withCredentials: true
			},
			success: function (data) {
				let _data = data;
				$('.talent_name').text(_data.personal_code);
			},
			error: function () {
				$('.talent_name').text('');
			}
		});
	}
})
