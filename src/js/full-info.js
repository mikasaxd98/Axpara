const API_URL = 'https://testing.jazzserve.com:8020';

$(document).on("click", function (event) {
	let $trigger = $(".dropdown");
	if ($trigger !== event.target && !$trigger.has(event.target).length) {
		$(".dropdown_menu").hide();
	}
});

$(document).ready(function () {

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

	getQueryParams()

	function getQueryParams() {
		let url = window.location.href;
		let _url = url.split('?');
		let queryParams = _url[1];
		let _queryParams = queryParams.split('=');
		if (_queryParams.length === 2) {
			let queryName = _queryParams[0];
			let queryValue = _queryParams[1];

			if (queryName === 'jobsId' && !!queryValue) {
				getJobById(queryValue)
			}
		}
	}


	function getJobById(queryValue) {
		$.ajax({
			url: `${API_URL}/jobs/${queryValue}`,
			method: 'get',
			dataType: 'json',
			success: function (data) {
				let _data = data;
				createJobInfoBlock(_data)
				createModal();

				$('#viewJobDesc').on('click', function (e) {
					$('.modal-body').html('');
					$('.modal-body').append(_data.job_description);
				})
				$('#viewJobDesc').click();
			}
		});
	}

	function createJobInfoBlock(item) {
		$('.container .wrap').append(`
			<div class="order_title d-flex">
        <div class="order_title_text flex-grow-1">
          <h3> ${!!item.job_title ? item.job_title : ''} </h3>
          <div class="employer-name">
            ${!!item.blind_employer_description ? item.blind_employer_description : ''}
          </div>
        </div>
        <div class="order_title_button flex-grow-1">
          <button class="full-info-btn btn-primary">
            <a data-name="${!!item.job_title ? item.job_title : ''}" 
            	data-company="${!!item.blind_employer_description ? item.blind_employer_description : ''}"
            href="/apply?jobsId=${item.id}&jobTitle=${item.job_title}">Apply</a>
          </button>
        </div>
      </div>
      <div class="container p-0">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="section">
              <div class="section_title">
                Skills required
              </div>
              <div class="description">
              ${getValue(item.technology_stack)}
              </div>
            </div>
            <div class="section">
              <div class="section_title">
                Intended Location of Services
              </div>
              <div class="description location_of_services">
               ${getValue(item.intended_location_of_services)}
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="section">
              <div class="section_title">
                Requires English
              </div>
              <div class="description">
                <span>${isRequired(item.is_english_required)}</span>
              </div>
            </div>
            <div class="section">
              <div class="section_title">
                Seniority Level
              </div>
              <div class="description">
                <span>${!!item.seniority_level ? item.seniority_level : ''}</span>
              </div>
            </div>
            <div class="section">
              <div class="section_title">
                Job Description
              </div>
              <div class="description">
              <button data-name="${!!item.job_title ? item.job_title : ''}"
              	data-company="${!!item.blind_employer_description ? item.blind_employer_description : ''}" 
              id="viewJobDesc" data-bs-toggle="modal"  data-bs-target="#exampleModal">
								View
							</button>
              </div>
            </div>
          </div>
        </div>
      </div>
`)
	}

	function getValue(value) {
		let _value = '';
		if (!!value && value.length !== 0) {
			$.each(value, function (idx, item) {
				_value += `<div>${item}</div>`
			});
		}
		return _value;
	}

	function isRequired(is_english_required) {
		return is_english_required ? 'Requires English' : ''
	}


	function createModal() {
		$('.job-details').append(`
			  <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
			    <div class="modal-dialog" role="document">
			      <div class="modal-content">
			        <div class="modal-header">
			          <h5 class="modal-title" id="exampleModalLabel">Job Description</h5>
			          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
			            <span aria-hidden="true">&times;</span>
			          </button>
			        </div>
			        <div class="modal-body">
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
			        </div>
			      </div>
			    </div>
  </div>`);
	}
})
