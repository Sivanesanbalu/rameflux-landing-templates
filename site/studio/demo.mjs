import { templateFor, configFor, renderPage } from './templates.mjs';

const template = templateFor(new URLSearchParams(location.search).get('template'));
document.title = template.name + ' demo — FrameFlux';
document.getElementById('demo').srcdoc = renderPage(configFor(template.id), { interactive: true });
document.getElementById('remix').href = './#studio=' + template.id;
