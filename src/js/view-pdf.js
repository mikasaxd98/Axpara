const API_URL = 'https://testing.jazzserve.com:8020';

$(document).ready(function () {

	getQueryParams();

	function getQueryParams() {
		let url = window.location.href;
		let _url = url.split('?');
		let queryParams = _url[1];
		let _queryParams = queryParams.split('=');
		if (_queryParams.length === 2) {
			let queryName = _queryParams[0];
			let queryValue = _queryParams[1];
			if (queryName === 'uuid' && !!queryValue) {
				getLinkByUuid(queryValue);
			}
		}
	}

	function getLinkByUuid(uuid) {
		$('iframe').attr('src', `${API_URL}/landing/resumes/${uuid}/generate-pdf?no_download=true`)
	}
})
