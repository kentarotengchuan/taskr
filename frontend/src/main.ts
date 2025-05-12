import { router } from './router';

import './css/index.css';

window.addEventListener('DOMContentLoaded', () => {
    router();
});

window.addEventListener('popstate', () => {
    router();
});