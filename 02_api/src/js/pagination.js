import Pagination from 'pagination';

export default function (current, totalResult, link) {
    const pagination = new Pagination.TemplatePaginator({
        slashSeparator: true,
        prelink: link,
        current,
        rowsPerPage: 30,
        totalResult,
        template: function(result){
            let i, len, prelink;
            let html = '<div><ul class="pagination">';
            if (result.pageCount < 2) {
                html += '</ul></div>';
                return html;
            }
            console.log(this);
            prelink = this.preparePreLink(result.prelink);
            if (result.previous) {
                html += '<li class="page-item"><a class="page-link" href="' + prelink + result.previous + '">' + this.options.translator('PREVIOUS') + '</a></li>';
            }
            if (result.range.length) {
                for (i = 0, len = result.range.length; i < len; i++) {
                    if (result.range[i] === result.current) {
                        html += '<li class="page-item active"><a class="page-link" href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
                    } else {
                        html += '<li class="page-item"><a class="page-link" href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
                    }
                }
            }
            if (result.next) {
                html += '<li class="page-item"><a href="' + prelink + result.next + '" class="paginator-next page-link">' + this.options.translator('NEXT') + '</a></li>';
            }
            html += '</ul></div>';
            return html;
        }
    });

    return pagination.render();
}