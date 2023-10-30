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
	});

	$.ajax({
		url: `${API_URL}/jobs?offset=0&limit=40`,
		method: 'get',
		dataType: 'json',
		success: function (data) {
			let _data = data;
			if (_data.length !== 0) {
				$.each(_data, function (idx, item) {
					createJobsDesc(item)
				})
			}
		}
	});


	function createJobsDesc(item) {
		$('.jobs > .jobs_table').append(`
		  <div class="col-12">
      <div class="jobs_description">
        <div class="row">
          <div class="col-12 col-lg-2">
            <div class="title d-block d-lg-none">
              <h5>${!!item.job_title ? item.job_title : ''}</h5>
            </div>
            <div class="desc d-none d-lg-block">
              <span>${!!item.job_title ? item.job_title : ''}</span>
            </div>
          </div>
          <div class="col-12 col-lg-2">
            <div class="name">
              <div class="name_title d-lg-none">
                <label>Company name</label>
              </div>
              <div class="name_desc">
                <span >${!!item.blind_employer_description ? item.blind_employer_description : ''}</span>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-2">
            <div class="skills">
              <div class="skills_title d-lg-none">
                <label>Skills</label>
              </div>
              <div class="skills_desc">
                <span>${!!item.technology_stack ? getSkills(item.technology_stack) : ''}</span>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="experience_and_lang">
              <div class="row">
                <div class="experience col-6 col-sm-4">
                  <div class="experience_title d-lg-none">
                    <label>Seniority level</label>
                  </div>
                  <div class="experience_desc">
                    <span>${!!item.seniority_level ? item.seniority_level : ''}</span>
                  </div>
                </div>
                <div class="lang col-6 col-sm-4">
                  <div class="lang_title d-lg-none">
                    <label>Requires English</label>
                  </div>
                  <div class="lang_desc">
                    <span>${isRequired(item.is_english_required)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-2">
            <div class="action">
              <button class="btn btn-primary d-block mt-4 mb-4">
                <a data-name="${!!item.job_title ? item.job_title : ''}" 
                	data-company="${!!item.blind_employer_description ? item.blind_employer_description : ''}"
                	href="/full-info?jobsId=${item.id}">
                  Get full info</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
		`)


		function getSkills(technology_stack) {
			let skills = [];
			let skills_str = '';
			if (technology_stack.length !== 0) {
				$.each(technology_stack, function (idx, item) {
					skills.push(item);
				});
				skills_str = skills.join(', ');
			}

			return skills_str;
		}

		function isRequired(is_english_required) {
			return is_english_required ? 'Requires English' : ''
		}
	}
})
