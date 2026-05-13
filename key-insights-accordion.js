document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('[data-insight-accordion]');

    if (!accordions.length) {
        return;
    }

    const setItemState = (item, isOpen) => {
        const trigger = item.querySelector('.insight-accordion-header');
        const panel = item.querySelector('.insight-accordion-panel');

        item.classList.toggle('is-open', isOpen);

        if (trigger) {
            trigger.setAttribute('aria-expanded', String(isOpen));
        }

        if (panel) {
            panel.setAttribute('aria-hidden', String(!isOpen));
        }
    };

    accordions.forEach((accordion) => {
        const items = Array.from(accordion.querySelectorAll('.insight-accordion-item'));

        if (!items.length) {
            return;
        }

        const openIndex = items.findIndex((item) => item.classList.contains('is-open'));

        items.forEach((item, index) => {
            setItemState(item, index === openIndex);

            const trigger = item.querySelector('.insight-accordion-header');
            if (!trigger) {
                return;
            }

            trigger.addEventListener('click', () => {
                const isOpen = item.classList.contains('is-open');

                items.forEach((otherItem) => {
                    setItemState(otherItem, false);
                });

                setItemState(item, !isOpen);
            });
        });
    });
});
