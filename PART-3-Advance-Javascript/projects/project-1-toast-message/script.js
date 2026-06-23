function createToaster(config) {
    const {
        type = "info", // success | error | warning | info
        duration = 3,
        message = ""
    } = config;

    return function () {
        const toastDiv = document.createElement("div");

        toastDiv.className = `toast ${type}`;

        toastDiv.innerHTML = `
            <div class="toast-message">${message}</div>
            <div class="toast-progress"></div>
        `;

        const progressBar = toastDiv.querySelector(".toast-progress");
        progressBar.style.animationDuration = `${duration}s`;

        const container = document.getElementById("toast-container");

        if (!container) {
            console.error(
                'Toast container not found. Add <div id="toast-container"></div> to HTML.'
            );
            return;
        }

        container.appendChild(toastDiv);

        requestAnimationFrame(() => {
            toastDiv.classList.add("show");
        });

        setTimeout(() => {
            toastDiv.classList.remove("show");

            setTimeout(() => {
                toastDiv.remove();
            }, 300);
        }, duration * 1000);
    };
}

/* Examples */
const showSuccess = createToaster({
    type: "success",
    duration: 3,
    message: "Data saved successfully!"
});

const showError = createToaster({
    type: "error",
    duration: 4,
    message: "Failed to save data."
});

const showWarning = createToaster({
    type: "warning",
    duration: 5,
    message: "Please check your input."
});

const showInfo = createToaster({
    type: "info",
    duration: 3,
    message: "New update available."
});

showSuccess();

setTimeout(showError, 500);
setTimeout(showWarning, 1000);
setTimeout(showInfo, 1500);