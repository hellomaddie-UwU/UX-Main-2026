document.addEventListener('DOMContentLoaded', function () {
    var grid = document.getElementById('catalogueGrid');
    var noResults = document.getElementById('catalogueNoResults');
    var resetBtn = document.getElementById('catalogueFilterReset');
    var mediumSelect = document.getElementById('filterMedium');
    var projectTypeSelect = document.getElementById('filterProjectType');
    var industrySelect = document.getElementById('filterIndustry');

    if (!grid || !mediumSelect || !projectTypeSelect || !industrySelect) {
        return;
    }

    var cards = Array.from(grid.querySelectorAll('.catalogue-card'));

    function cardMatches(card, field, value) {
        if (!value) {
            return true;
        }
        var cardValues = (card.dataset[field] || '').split(/\s+/).filter(Boolean);
        return cardValues.indexOf(value) !== -1;
    }

    function applyFilters() {
        var mediumValue = mediumSelect.value === 'all' ? '' : mediumSelect.value;
        var projectTypeValue = projectTypeSelect.value;
        var industryValue = industrySelect.value;

        var visibleCount = 0;

        cards.forEach(function (card) {
            var matches =
                cardMatches(card, 'medium', mediumValue) &&
                cardMatches(card, 'projectType', projectTypeValue) &&
                cardMatches(card, 'industry', industryValue);

            card.hidden = !matches;

            if (matches) {
                visibleCount += 1;
            }
        });

        if (noResults) {
            noResults.hidden = visibleCount !== 0;
        }
    }

    [mediumSelect, projectTypeSelect, industrySelect].forEach(function (select) {
        select.addEventListener('change', applyFilters);
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            mediumSelect.value = 'all';
            projectTypeSelect.value = '';
            industrySelect.value = '';
            applyFilters();
        });
    }

    applyFilters();
});
