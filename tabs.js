document.addEventListener('DOMContentLoaded', function () {
    var tabGroups = document.querySelectorAll('[data-service-tabs]');

    if (!tabGroups.length) {
        return;
    }

    tabGroups.forEach(function (group) {
        var tabs = Array.from(group.querySelectorAll('[role="tab"]'));
        var panels = Array.from(group.querySelectorAll('[role="tabpanel"]'));

        if (!tabs.length || !panels.length) {
            return;
        }

        function activateTab(tabToActivate, moveFocus) {
            tabs.forEach(function (tab) {
                var isActive = tab === tabToActivate;
                var panelId = tab.getAttribute('aria-controls');
                var panel = panelId ? group.querySelector('#' + panelId) : null;

                tab.classList.toggle('is-active', isActive);
                tab.setAttribute('aria-selected', String(isActive));
                tab.setAttribute('tabindex', isActive ? '0' : '-1');

                if (panel) {
                    panel.classList.toggle('is-active', isActive);
                    panel.hidden = !isActive;
                }
            });

            if (moveFocus) {
                tabToActivate.focus();
            }
        }

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                activateTab(tab, false);
            });

            tab.addEventListener('keydown', function (event) {
                var currentIndex = tabs.indexOf(tab);
                var nextIndex = currentIndex;

                if (event.key === 'ArrowRight') {
                    nextIndex = (currentIndex + 1) % tabs.length;
                } else if (event.key === 'ArrowLeft') {
                    nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                } else if (event.key === 'Home') {
                    nextIndex = 0;
                } else if (event.key === 'End') {
                    nextIndex = tabs.length - 1;
                } else if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    activateTab(tab, false);
                    return;
                } else {
                    return;
                }

                event.preventDefault();
                activateTab(tabs[nextIndex], true);
            });
        });

        var initiallySelectedTab = tabs.find(function (tab) {
            return tab.getAttribute('aria-selected') === 'true';
        }) || tabs[0];

        activateTab(initiallySelectedTab, false);
    });
});
