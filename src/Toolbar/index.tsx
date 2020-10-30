import React, {FunctionComponent} from 'react';
import './styles.sass';

const Toolbar: FunctionComponent = () => {

    const txtFormatUrlRef = React.createRef<HTMLInputElement>();
    const urlContainerRef = React.createRef<HTMLDivElement>();

    const format = (com: string, val?: any) => {
        document.execCommand(com, false, val);
    }

    const addLink = () => {
        const show = document.getElementById('url-input');
        if (show.classList.contains('hidden')) {
            show.classList.remove('hidden');
        } else {
            show.classList.add('hidden');
        }
    }

    const setUrl = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        const url = txtFormatUrlRef.current!.value;
        const show = urlContainerRef.current;
        const text = document.getSelection();

        format(
            'insertHTML',
            `<a href='${url}' target='_blank'>${text}</a>`
        );

        txtFormatUrlRef.current!.value = '';
        show!.classList.add('hidden');
    }

    function setHeader() {
        const target = document.getSelection();
        format('insertHTML', `<h2>${target}</h2>`);
    }

    function addCodeBlock() {
        const codeBlock = document.createElement('pre');
        const target: Selection | null = document.getSelection();
        const targetNode = target.focusNode as HTMLElement;

        if (
            targetNode.nodeName.includes('#text') ||
            targetNode.classList.contains('title') ||
            targetNode.className.includes('codeBlock')
        ) {
            return;
        }

        const id = `codeBlock-${
            document.getElementsByClassName('codeBlock').length + 1
        }`;

        codeBlock.classList.add('codeBlock');

        format(
            'insertHTML',
            `<pre class='codeBlock' id='${id}'>${target}</pre>`
        );

        addLineAfterBlock(id);
    }

    function addLineAfterBlock(id: string) {
        const block = document.getElementById(`${id}`);
        const div = document.createElement('div');
        const br = document.createElement('br');

        div.appendChild(br);

        if (block) {
            block.after(div);
        }
    }

    function handleSubmit() {
        const content = document.getElementById('editor').innerHTML;
        const title = document.getElementById('title').textContent;
        const post = {
            title,
            content
        };

        // do an api post request here, save to state, etc...
        console.log(post);
    }

    return (
        <div className='toolbar'>
            <button onClick={e => format('bold')}>Bold</button>
            <button onClick={e => format('italic')}>Italics</button>
            <button onClick={e => format('insertUnorderedList')}>List</button>
            <button onClick={e => addLink()}>Link</button>
            <div id='url-input' className='hidden'>
                <input ref={txtFormatUrlRef} placeholder='url'/>
                <button onClick={e => setUrl(e)}>Create Link</button>
            </div>
            <button onClick={e => setHeader()}>Header</button>
            <button onClick={e => addCodeBlock()}>CodeBlock</button>
            <button onClick={e => handleSubmit()}>Submit</button>
        </div>
    );
}

export default Toolbar;