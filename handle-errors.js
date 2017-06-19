import { Component, render } from 'preact';
import h from 'preact-hyperscript-h';

window.addEventListener('error', e => render(h.pre(e.error.stack), document.body));
