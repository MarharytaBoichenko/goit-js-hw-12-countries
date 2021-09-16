import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { info, error } from '@pnotify/core';

function infoNotice(infoText) {
    info({
        text: infoText,
        delay: '2000'
    })
}

function errorNotice(errorText) { error({ text: errorText, delay: '2000' }) }


export {infoNotice, errorNotice}