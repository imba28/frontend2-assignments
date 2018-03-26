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
            let html = '<div><ul class="pagination justify-content-center">';
            if (result.pageCount < 2) {
                html += '</ul></div>';
                return html;
            }
            console.log(this);
            prelink = this.preparePreLink(result.prelink);
            if (result.previous) {
                html += '<li class="page-item"><a class="page-link" href="' + prelink + result.previous + '"><span aria-hidden="true">&laquo;</span><span class="sr-only">' + this.options.translator('PREVIOUS') + '</span></a></li>';
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
                html += '<li class="page-item"><a href="' + prelink + result.next + '" class="paginator-next page-link"><span aria-hidden="true">&raquo;</span><span class="sr-only">' + this.options.translator('NEXT') + '</span></a></li>';
            }
            html += '</ul></div>';
            return html;
        }
    });

    return pagination.render();
}