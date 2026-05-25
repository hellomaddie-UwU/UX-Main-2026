document.addEventListener("DOMContentLoaded", () => {
    const swatchBlocks = document.querySelectorAll(".swatch-block");
    const copyNotification = document.querySelector(".copy-notification");

    if (!swatchBlocks.length) {
        return;
    }

    swatchBlocks.forEach((block) => {
        block.addEventListener("click", async () => {
            const colorValue = getInlineBackgroundColor(block);

            if (!colorValue) {
                return;
            }

            const copied = await copyToClipboard(colorValue);

            if (!copied) {
                return;
            }

            block.classList.add("is-copied");
            showCopyNotification(copyNotification, "Color copied to clipboard");

            window.setTimeout(() => {
                block.classList.remove("is-copied");
            }, 400);
        });
    });
});

function getInlineBackgroundColor(element) {
    const inlineStyle = element.getAttribute("style") || "";
    const match = inlineStyle.match(/background-color\s*:\s*([^;]+)/i);

    if (match && match[1]) {
        return match[1].trim();
    }

    return element.style.backgroundColor ? element.style.backgroundColor.trim() : "";
}

async function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            // Fall back to document.execCommand in restricted clipboard contexts.
        }
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    let copied = false;

    try {
        copied = document.execCommand("copy");
    } catch (error) {
        copied = false;
    }

    document.body.removeChild(textarea);

    return copied;
}

function showCopyNotification(notificationElement, message) {
    if (!notificationElement) {
        return;
    }

    notificationElement.textContent = message;
    notificationElement.classList.add("is-visible");

    window.clearTimeout(notificationElement.hideTimeoutId);
    notificationElement.hideTimeoutId = window.setTimeout(() => {
        notificationElement.classList.remove("is-visible");
    }, 1400);
}
