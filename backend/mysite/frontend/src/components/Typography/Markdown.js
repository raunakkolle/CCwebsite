// import MarkdownEditor from '@uiw/react-markdown-editor';
import React from 'react';
// import './markdown.css';
// import marked from 'marked';
import SimpleMDE from "react-simplemde-editor";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import "easymde/dist/easymde.min.css";
class Markdown extends React.Component {
        constructor(props) {
            super(props);
            console.log("PROPS IS ", props)
            this.state = {
                data:this.props.blogData
            }

            this.handleChange = this.handleChange.bind(this);
            this.handleContentChange = this.handleContentChange.bind(this);

        }

        handleChange(event) {
            const data = this.state.data;
            data[event.target.id] = event.target.value;
            
            this.setState({data: data})
        }
        handleContentChange = value => {
          
            const data = this.state.data;
            data['content'] = value;
            this.setState({data: data})
        };

        render() {
            return (
                    <div >
                        <div>
                        <TextField
                          id="title"
                          label="Title"
                          placeholder="Title"
                          value= {this.state.data.title}
                          // defaultValue= "This is default value"
                          fullWidth
                          onChange={this.handleChange}
                        />
                        <br/>
                        <TextField
                          id="tagline"
                          label="Tagline"
                          placeholder="tagline"
                          value= {this.state.data.tagline}
                          multiline
                          fullWidth
                          onChange={this.handleChange}
                        />
                        <br/>
                        </div>
                        <div id="header">Markdown Editor</div>
                        <div className='bod'>
                            <SimpleMDE  id="content" style={{ "text-align": "justify"}} onChange={this.handleContentChange} value={this.state.data.content} />
                            <br/>
                            <TextField
                          id="tags"
                          label="Tags"
                          placeholder="write comma saperated tags. eg blog,html,machine learning, ..."
                          multiline
                          value= {this.state.data.tags}
                          fullWidth
                          onChange={this.handleChange}
                        />
                        <br/>
                        </div>
                        <br/>
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SaveIcon />}
                            onClick = {()=>(this.props.saveAction(this.state.data))}
                          >
                            Save
                          </Button>
                        
                    </div>);

        }
        }

  export default Markdown;
