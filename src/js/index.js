const timeZone = ['Asia/Manila', 'Asia/Jakarta', 'Asia/Bangkok', 'Asia/Colombo'];

$(document).on("click", function (event) {
	let $trigger = $(".dropdown");
	if ($trigger !== event.target && !$trigger.has(event.target).length) {
		$(".dropdown_menu").hide();
	}
});


$(document).ready(function () {
	const API_URL = 'https://testing.jazzserve.com:8020';
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

	$('.slider').slick({
		arrows: true,
		infinite: true,
		slidesToShow: 5,
		dots: false,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1,
					dots: true,
				}
			}
		]
	});

	$.ajax({
		url: `${API_URL}/landing/user-info`,
		method: 'get',
		dataType: 'json',
		success: function (data) {
			let _data = data;
			if (_data.isFirstTimeUser) {
				$('.cookie_container').addClass('active');
				$('.cookie_btn').on('click', function () {
					$('.cookie_container').removeClass('active');
					$('#openFirstEnterModal').click();
				})
			}
		}
	});

	$.ajax({
		url: `${API_URL}/landing/countries`,
		method: 'get',
		dataType: 'json',
		success: function (data) {
			let _data = data;
			$.each(_data, function (index, value) {
				if (value !== undefined)
					$('.talent_location > select#location').append(`<option>${value.name}</option>`)
			})
		}
	});
	$.ajax({
		url: `${API_URL}/landing/skills`,
		method: 'get',
		dataType: 'json',
		success: function (data) {
			let _data = data;
			$.each(_data, function (index, value) {
				if (value.name !== undefined)
					$('.talent_skills > select#skills').append(`<option>${value.name}</option>`)
			})
		}
	});
	$.ajax({
		url: `${API_URL}/landing/inventories`,
		method: 'get',
		dataType: 'json',
		success: function (data) {
			let _data = data;
			if (_data.length !== 0) {
				$.each(_data, function (idx, item) {
					createCandidateDesc(item)
				})
			}
		}
	});

	update();
	setInterval(update, 1000);
	clock();
	setInterval(clock, 1000);
	sendEmail()

	function sendEmail() {
		$("#form").submit(function (e) {
			e.preventDefault();
			let data = {
				country_name: $("#location option:selected").text(),
				skill_name: $("#skills option:selected").text(),
				email: $('#email').val()
			}
			$.ajax({
				method: 'post',
				url: API_URL + '/landing/resumes/emails/send',
				data: JSON.stringify(data),
				dataType: 'json',
				contentType: 'application/json',
				success: function (data) {
					alert('Done! Your requested CVs are on the way.')
				},
				error: function (data) {
					alert(data.responseJSON.message)
				}
			});
		});
	}

	function createCandidateDesc(item) {
		$('.candidate > .candidate_table').append(`
		<div class="col-12">
      <div class="candidate_description">
        <div class="row">
          <div class="col-12 col-lg-2">
            <div class="title d-block d-lg-none pointer">
              <a href="./view-pdf?uuid=${item.uuid}" target="_blank"><h5>${item.talent_user.short_personal_code}</h5></a>
            </div>
            <div class="desc d-none d-lg-block pointer">
              <a href="./view-pdf?uuid=${item.uuid}" target="_blank"><span>${item.talent_user.short_personal_code}</span></a>
            </div>
          </div>
          <div class="col-12 col-lg-2">
            <div class="country">
              <div class="country_title d-lg-none">
                <label>Country</label>
              </div>
              <div class="country_desc">
                <span>${item.country}</span>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-2">
            <div class="skills">
              <div class="skills_title d-lg-none">
                <label>Skills</label>
              </div>
              <div class="skills_desc">
                <span>${getSkills(item.job_skills)}</span>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="experience_and_lang">
              <div class="row">
                <div class="experience col-6 col-sm-4">
                  <div class="experience_title d-lg-none">
                    <label>Experience</label>
                  </div>
                  <div class="experience_desc">
                    <span>${delimiterNumber(item.total_work_experience_years, 2)}</span>
                  </div>
                </div>
                <div class="lang col-6 col-sm-4">
                  <div class="lang_title d-lg-none">
                    <label>english proficiency</label>
                  </div>
                  <div class="lang_desc">
                    <span>${item.english_proficiency}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-2">
            <div class="action">
              <button class="btn btn-primary d-block mt-4 mb-4">
                <a class="book_now" 
                data-name="${!!item.talent_user.short_personal_code ? item.talent_user.short_personal_code : ''}" 
                data-country="${!!item.country ? item.country : ''}" 
                target="_blank" 
                href="https://client.axpara.com/candidates?searchGeneral=${item.talent_user.short_personal_code}">
                + Book Now</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
		`)
	}

	function getSkills(jobs) {
		let skills = [];
		let skills_str = '';
		if (!!jobs && !!jobs.length) {
			$.each(jobs, function (idx, item) {
				skills.push(item.skill_name);
			});
			skills_str = skills.join(', ');
		}

		return skills_str;
	}

	function delimiterNumber(value, number) {
		let result = value.toString().split('.');
		return result[0].concat('.', result[1].slice(0, number));
	}
});

let update = function () {
	$.each(timeZone, function (index, value) {
		let date = moment().tz(value).format('h:mm A');
		$('#country_' + index + ' > .time').text(date);
	});
};

function clock() {
	$.each(timeZone, function (index, value) {
		let hours = moment().tz(value).format('HH');
		let minutes = moment().tz(value).format('mm');
		let hour = hours * 30;
		let minute = minutes * 6;
		$('.clock_' + index + ' .hour').css('transform', `rotate(${hour}deg)`);
		$('.clock_' + index + ' .minute').css('transform', `rotate(${minute}deg)`);

	})
}




