/**
 * Client entry: run calculator UI when DOM is ready.
 */
import { init } from './ui.js';
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
}
else {
    init();
}
