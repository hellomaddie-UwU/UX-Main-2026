(function () {
    function syncDividerHeight() {
        var divider = document.querySelector('.site-breadcrumb .breadcrumb-divider');
        var title = document.querySelector('.site-breadcrumb .current-bc');
        if (!divider || !title) return;

        if (window.matchMedia('(max-width: 768px)').matches) {
            divider.style.height = title.offsetHeight + 'px';
        } else {
            divider.style.height = '';
        }
    }

    window.addEventListener('DOMContentLoaded', syncDividerHeight);
    window.addEventListener('load', syncDividerHeight);
    window.addEventListener('resize', syncDividerHeight);
}());
