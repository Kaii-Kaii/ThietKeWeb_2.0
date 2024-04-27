$(function () {
    var includes = $('[data-include]');
    $.each(includes, function () {
        var file = 'HTML/' + $(this).data('include') + '.html';
        $(this).load(file);
    });
});
