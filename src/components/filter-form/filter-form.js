import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
export default class FilterForm extends React.Component {
 constructor(props){
   super(props);
   this.state={
     user: '',
    language:'',
    topic:'',
    forked:true,
    archived:false
   }
   this.setArchived=this.setArchived.bind(this);
   this.setForked=this.setForked.bind(this);
   this.setTopic=this.setTopic.bind(this);
   this.setLanguage=this.setLanguage.bind(this);
   this.sendQuery=this.sendQuery.bind(this);
 }
  render() {
    return (
      <Form>
        <FormGroup>
        </FormGroup>
        <FormGroup row>
          <Label for="language" sm={3}>Programming language</Label>
          <Col sm={9}>
            <Input type="text" 
                   name="language" 
                   id="language" 
                   placeholder="Enter a programming language " 
                   onChange={this.setLanguage}
                   value={this.state.language}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="topic" sm={3}>Topic</Label>
          <Col sm={9}>
            <Input 
                  type="text" 
                  name="topic" 
                  id="topic" 
                  placeholder="Enter a topic " 
                  onChange={this.setTopic}
                  value={this.state.topic}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="checkbox2" sm={2}>Include forked?</Label>
          <Col sm={{ size: 10 }}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="forked"  checked onChange={this.setForked} value={this.state.forked}/>
                Forked
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="checkbox2" sm={2}>Include Archived?</Label>
          <Col sm={{ size: 10 }}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="archived" onChange={this.setArchived} value={this.state.archived}/>
                Achived
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col>
            <Button color="info" onClick={this.sendQuery}>Update result</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
  setArchived(){this.setState({archived:!this.state.archived});}
  setForked(){this.setState({forked:!this.state.forked});}
  setTopic(event){this.setState({topic:event.target.value});}
  setLanguage(event){this.setState({language:event.target.value});}
  sendQuery(){
    let queryStr="";
    this.state.topic != ''? queryStr+="topic:"+this.state.topic+'&':"";
    this.state.language != ''? queryStr+="language:"+this.state.language+'&': '';
    queryStr+="&forked:"+this.state.forked;
    queryStr+="&archived:"+this.state.archived;
    console.log(queryStr);
    this.props.queryHandler(queryStr);
  }
}

