$(document).on("click", function (event) {
	let $trigger = $(".dropdown");
	if ($trigger !== event.target && !$trigger.has(event.target).length) {
		$(".dropdown_menu").hide();
		;
	}
});

$(document).ready(function () {
	let _data = [];
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
		dots:false,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 992,
				settings:{
					slidesToShow: 1,
					dots:true,
				}
			}
		]
	});

	$.ajax({
		url: `${API_URL}/landing/job-descriptions`,
		method: 'get',
		dataType: 'json',
		success: function (data) {
			_data = data;
			$.each(_data, function (index, value) {
				$('.job >.job.block >.row.justify-content-sm-center.m-0').append(`
				<div class="col-12 col-sm-8 col-md-4 mt-2 mb-4">
        <div class="item">
          <div class="item_title pt-5 text-center">
            <span>${value.name}</span>
          </div>
          <div class="item_btn d-flex justify-content-center pt-3 pb-5">
             <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary job_view_button" 
             				id="${value.id}"
                    type="button">View
            </button>
          </div>
        </div>
      </div>
				`)
			})
			$('.job').append(`
			  <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			    <div class="modal-dialog" role="document">
			      <div class="modal-content">
			        <div class="modal-header">
			          <h5 class="modal-title" id="exampleModalLabel"></h5>
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
 				 </div>`
			);
			createModal();

			$('.job_view_button').on('click', function (event) {
				let id = event.target.id;
				let currentItem = _data.filter(item => item.id.toString() === id);
				$('.modal-body').html('');
				$('.modal-title').html('');
				$('.modal-title').text(currentItem[0].name);
				$('.modal-body').append(currentItem[0].description)
			})
		}
	});

	function createModal(){
		$('.job').append(`
			  <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
			    <div class="modal-dialog" role="document">
			      <div class="modal-content">
			        <div class="modal-header">
			          <h5 class="modal-title" id="exampleModalLabel"></h5>
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

});
