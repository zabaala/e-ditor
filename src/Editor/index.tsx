import React, {FunctionComponent} from 'react';
import Toolbar from "../Toolbar";

import './styles.sass';

const Editor: FunctionComponent = () => {
    function paste(e: React.ClipboardEvent<HTMLDivElement>) {
        e.preventDefault();

        const open = new RegExp('<', 'gi');
        const close = new RegExp('>', 'gi');

        const text = e.clipboardData
            .getData('text/plain')
            .replace(open, '&lt')
            .replace(close, '&gt');

        document.execCommand('insertHTML', false, text);
    }

    return (
        <React.Fragment>
            <Toolbar />
            <div
                id='title'
                contentEditable='true'
                data-placeholder='Title...'
                className='title'
            />

            <div
                className='editor'
                id='editor'
                contentEditable='true'
                data-placeholder='Body...'
                onPaste={(e) => paste(e)}
            />
        </React.Fragment>
    );
}

export default Editor;