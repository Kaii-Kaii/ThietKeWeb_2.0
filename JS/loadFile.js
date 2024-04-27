$(function () {
    var includes = $('[data-include]');

    $.each(includes, function () {
        var file = 'HTML/' + $(this).data('include') + '.html';
        var baseURL = window.location.href.replace(/\/[^\/]*$/, '/');

        $(this).load(file, function() {
            $(this).contents().each(function() {
                if (this.nodeType === Node.ELEMENT_NODE) {
                    $(this).attr('data-baseurl', baseURL);
                }
            });
        });
    });
});
