$('.hamburgerMenu').on('click', function (e) {
    const navEl = $('nav');
    if(navEl.hasClass('none')){
        $('nav').toggleClass('none');
        $('nav').css({height: '0px'});
        $('nav').stop().animate({
            height: '100px'
        })
    } else {
        $('nav').stop().animate({
            height: '0'
        }, () => $('nav').toggleClass('none'));
    } 
})

$('#update_btn').on('click', function (event) {
    $('#edit_book_form_container').toggle();
    $('html, body').animate({
        scrollTop: $('#edit_book_form_container').offset().top
      }, 1000);
})