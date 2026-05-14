document.addEventListener('DOMContentLoaded', () => {
    const accordionTypes = [
        {
            containerSelector: '[data-insight-accordion]',
            itemSelector: '.insight-accordion-item',
            triggerSelector: '.insight-accordion-header',
            panelSelector: '.insight-accordion-panel'
        },
        {
            containerSelector: '[data-design-iteration-accordion], .design-iteration-accordion',
            itemSelector: '.design-iteration-accordion-item',
            triggerSelector: '.iteration-header',
            panelSelector: '.iteration-content'
        }
    ];

    const setItemState = (item, isOpen, triggerSelector, panelSelector) => {
        const trigger = item.querySelector(triggerSelector);
        const panel = item.querySelector(panelSelector);

        item.classList.toggle('is-open', isOpen);

        if (trigger) {
            trigger.setAttribute('aria-expanded', String(isOpen));
        }

        if (panel) {
            panel.setAttribute('aria-hidden', String(!isOpen));
        }
    };

    const initializeAccordionType = ({
        containerSelector,
        itemSelector,
        triggerSelector,
        panelSelector
    }) => {
        const accordions = document.querySelectorAll(containerSelector);

        if (!accordions.length) {
            return;
        }

        const items = Array.from(accordions).flatMap((accordion) =>
            Array.from(accordion.querySelectorAll(itemSelector))
        );

        if (!items.length) {
            return;
        }

        const configuredOpenIndex = items.findIndex((item) => item.classList.contains('is-open'));
        const openIndex = configuredOpenIndex === -1 ? 0 : configuredOpenIndex;

        items.forEach((item, index) => {
            setItemState(item, index === openIndex, triggerSelector, panelSelector);

            const trigger = item.querySelector(triggerSelector);
            if (!trigger) {
                return;
            }

            trigger.addEventListener('click', () => {
                const isOpen = item.classList.contains('is-open');

                items.forEach((otherItem) => {
                    setItemState(otherItem, false, triggerSelector, panelSelector);
                });

                setItemState(item, !isOpen, triggerSelector, panelSelector);
            });
        });
    };

    accordionTypes.forEach((accordionType) => {
        initializeAccordionType(accordionType);
    });
});
