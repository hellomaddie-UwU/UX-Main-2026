document.addEventListener('DOMContentLoaded', () => {
    const accordionTypes = [
        {
            containerSelector: '[data-reflection-accordion]',
            itemSelector: '.reflection-accordion-item',
            triggerSelector: '.reflection-header',
            panelSelector: '.reflection-content'
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

    const initAccordionType = ({ containerSelector, itemSelector, triggerSelector, panelSelector }) => {
        const containers = document.querySelectorAll(containerSelector);

        if (!containers.length) {
            return;
        }

        containers.forEach((container) => {
            const items = Array.from(container.querySelectorAll(itemSelector));

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
        });
    };

    accordionTypes.forEach((type) => {
        initAccordionType(type);
    });
});
