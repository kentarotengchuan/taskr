export function displayValidationErrors(errors: Record<string, string[]>): void {
    const errorSpans = document.querySelectorAll('.error-message');
    errorSpans.forEach(span => span.remove());
    console.log(errors);

    Object.entries(errors).forEach(([field, messages]) => {
        const input = document.querySelector(`[name="${field}"]`);
        if (input) {
            const span = document.createElement('span');
            span.className = 'error-message';
            span.style.color = 'red';
            span.textContent = messages[0]; 

            input.parentElement?.appendChild(span);
        }
    });
}