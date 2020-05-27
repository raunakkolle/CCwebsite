// import MarkdownEditor from '@uiw/react-markdown-editor';
import React from 'react';
// import './markdown.css';
// import marked from 'marked';
import SimpleMDE from "react-simplemde-editor";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import "easymde/dist/easymde.min.css";
class Markdown extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                editor: {content: "Hello\n=======\n\nWorld\n-----------\n \n### How are you\n \nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nList one:\n\n  * sunny\n  * cloudy\n  * rainy\n\nList 2:\n\n  1. coffee\n  2. tea\n  3. pop\n\nTry it yourself.\n\n"}
            };

            this.onChange = this.onChange.bind(this);

        }

        onChange(event) {
            const change = this.state.editor;
            change.content = event.target.value;
            this.setState({editor: change})
        }

        render() {
            return (
                    <div >
                        <div id="header">Markdown Editor</div>
                        <div className='bod'>
                            <SimpleMDE onChange={this.handleChange} />
                        
                        </div>
                          <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            startIcon={<SaveIcon />}
                          >
                            Save
                          </Button>
                        
                    </div>);

        }
        }

  export default Markdown;
