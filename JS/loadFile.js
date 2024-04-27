$(function () {
    var includes = $('[data-include]');
    $.each(includes, function () {
        var file = 'HTML/' + $(this).data('include') + '.html';
        $(this).load(file);
    });
});

function loadContent(pageName, elementID) {
    var file = 'HTML/' + pageName + '.html';
    $('#' + elementID).load(file);
}