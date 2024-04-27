function loadFileWithPath(file, selector) {
    $.get(file, function(data) {
        var baseUrl = file.replace(/\/[^\/]*$/, '/');
        var $temp = $('<div>').html(data);
        $temp.find('*').addBack().each(function() {
            var $this = $(this);
            var attrs = ['src', 'href', 'data-src', 'data-href'];
            $.each(attrs, function(i, attr) {
                var value = $this.attr(attr);
                if (value && !value.startsWith('http') && !value.startsWith('/')) {
                    $this.attr(attr, baseUrl + value);
                }
            });
        });
        $(selector).html($temp.html());
    });
}