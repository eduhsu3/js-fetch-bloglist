//=======================================================================================
export function loadingSpinner(state) {
    const eleBody = document.querySelector('body');
    if (state) {
        eleBody.classList.add('loading');
    } else {
        eleBody.classList.remove('loading');
    }
}
