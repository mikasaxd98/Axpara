$(document).on("click", function (event) {
	let $trigger = $(".dropdown");
	if ($trigger !== event.target && !$trigger.has(event.target).length) {
		$(".dropdown_menu").hide();
		;
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
	$.ajax({
		url: `${API_URL}/landing/public-holidays`,
		method: 'get',
		dataType: 'json',
		success: function (data) {
			let _data = data;
			$.each(_data, function (index, value) {
				if (value.Country.iso !== null && value.Country.name !== null) {
					createCard(value);
				}

				if (index === 0) {
					$('.slider_countries_item .element').addClass('current_element');
				}
			});
			activateSlider();
			$.each(_data, function (index, value) {
				if (index === 0) {
					$.each(value.Holidays, function (idx, item) {
						createBlockTable(item);
						if (idx !== value.Holidays.length - 1)
							$('.content_table.block > .row').append(`<div class="d-none d-lg-block border-bottom-line">`);
					})
				}
			});
			$('.slider_countries_item .element').on('click', function (e) {
				let id = $(this).attr('data-id')
				cardClick(_data,id,e);
			})
		},
		error: function (data) {
			$('.countries_flags').html('Something went wrong');
		}
	});

	function activateSlider() {
		$('.slider_countries').slick({
			arrows: false,
			infinite: true,
			slidesToShow: 4,
			responsive: [
				{
					breakpoint: 618,
					settings: {
						slidesToShow: 2,
						dots: false,
					}
				}
			]
		})
	}

	function createBlockTable(item) {
		$('.content_table.block > .row').append(`
 <div class="col-12 pb-2 pb-lg-0 item_block p-lg-0">
	  <div class="item">
	    <div class="row m-0">
	      <div class="col-4 col-sm-4 col-md-6 col-lg-3 pt-3 pt-lg-4 pb-lg-4">
	        <span class="month">${moment(item.date).format('MMM D YYYY')}</span>
	      </div>
	      <div class="col-8 col-sm-8 col-md-6 col-lg-3 pt-3 pt-lg-4 pb-lg-4">
	        <span class="day">${moment(item.date).format('dddd')}</span>
	      </div>
	      <div class="col-12 pt-3 pb-3 col-lg-4 pt-lg-4 pb-lg-4">
	        <span class="holiday">${item.name}</span>
	      </div>
	    </div>
	  </div>
 </div>
`)
	}

	function createCard(value) {
		$('.slider_countries').append(`
	<div class="slider_countries_item">
		<div  data-id="${value.Country.name}" class="slider_countries_item element">
			<div class="slider_countries_item_img">
				<img src="./img/flags/1x1/${value.Country.iso}.svg" alt="${value.Country.name}">
			</div>
			 <div class="slider_countries_item_text">
	            <span>${value.Country.name}</span>
	     </div>
		</div>
	</div>`)
	}

	function cardClick(_data,countryId,e){
		let currentCountryId = countryId;
		$('.current_element').removeClass('current_element');
		$(e.currentTarget).addClass('current_element');
		$('.content_table.block > .row').html('');
		$.each(_data, function (index, value) {
			if (value.Country.name === currentCountryId) {
				$.each(value.Holidays, function (idx, item) {
					createBlockTable(item);
					if (idx !== value.Holidays.length - 1)
						$('.content_table.block > .row').append(` <div class="d-none d-lg-block border-bottom-line">`);
				})
			}
		})
	}
});


