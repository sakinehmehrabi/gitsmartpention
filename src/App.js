import React, { Component } from 'react';
import {Button, FormGroup, Label, 
        Input, Container, Col, Row, Table,
        Alert, Collapse, Card, CardBody,
        Navbar,Nav,NavLink,NavItem} from 'reactstrap';
        import update from 'react-addons-update';
import FilterForm from './components/filter-form/filter-form';
import MyHeader from './components/header/header';
import Repos from './components/repos-section/repos';
import PaginationSection from './components/repos-section/pagination/pagination';
import OrderByMenu from './components/orderby-menu/orderby-menu';
class App extends Component {
    constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.fetchRepos = this.fetchRepos.bind(this);
      this.setUser = this.setUser.bind(this);
      this.fetchRepos = this.fetchRepos.bind(this);
      this.pageNoHandler = this.pageNoHandler.bind(this);
      this.searchRepos=this.searchRepos.bind(this);
      this.setQuery=this.setQuery.bind(this);
      //this.orderHandler=this.orderHandler.bind(this);
      this.setOrderBy=this.setOrderBy.bind(this);
      this.state = { 
                    que:'',
                    collapse: false,
                    user: '',
                    repos:[],
                    pageNumber:0,
                    reposSource:0,
                    orderBy:''
                   };
    }
    render() {
    return (
    <Container>
     <MyHeader></MyHeader>
    <Row>
        <Col>
        <div>
        <FormGroup >
              <Label for="usersgithub">User or Company's github</Label>
              <Input type="text" 
                     name="usersgithub" id="usersgithub" 
                     placeholder="User or Company's github" 
                     onChange={this.setUser}
                     value={this.state.user}/>
          </FormGroup>
        <FormGroup>
          <Button  size="lg" color="success" onClick={this.fetchRepos} style={{ marginBottom: '1rem' }}>GO!</Button>  {' '}
          <Button  size="lg" color="success" onClick={this.toggle} style={{ marginBottom: '1rem' }} > Filters</Button>
        </FormGroup>

        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
               <FilterForm searchRepos={this.searchRepos} queryHandler={this.setQuery}/>
            </CardBody>
          </Card>
        </Collapse>
      </div>
        </Col>
      </Row>
      <Row>
          <Col>
          {
            (this.state.repos.length>0)?
            <div>
                 <br/>
                <Navbar color="light" light expand="md">
                <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink  ></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={()=>this.setOrderBy("sort=updated")}>Recently updated</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={()=>this.setOrderBy("sort=stars")}>Star highest to lowest</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={()=>this.setOrderBy("sort=forks")}>Forks highest to lowest</NavLink>
                </NavItem>
                </Nav>
             </Navbar>
              <br/>
              <PaginationSection pageNo={this.state.pageNumber} pageNoHandler= {this.pageNoHandler.bind(this)}/>
              <Repos repos={this.state.repos}/>
              <PaginationSection pageNo={this.state.pageNumber} pageNoHandler= {this.pageNoHandler.bind(this)}/>
            </div>
            :
            <div> 
            <br/>
             <Alert color="danger">
               There is no repositories, enter a valid GitHub user and press GO! 
             </Alert>
            </div>             
          }
          </Col>
        </Row>
    </Container>
    );
  }
 fetchRepos(){
    fetch('https://api.github.com/search/repositories?q=user:'+this.state.user+'&page=1')
    .then(response => response.json())
    .then((repositories) => {
      this.setState({repos:repositories.items,pageNumber:repositories.total_count});
    })
    .catch(
      ()=> console.log("error")
    );
  }
  searchRepos(){
    fetch('https://api.github.com/search/repositories?q='+this.state.que)
    .then(response => response.json())
    .then((repositories) => {
      this.setState({repos:repositories.items});
    })
    .catch(
      ()=> console.log("error")
    );
  }
  pageNoHandler(i){
    let url='https://api.github.com/search/repositories?q='
    let query="";
    if(this.state.user!='') url+='user:'+this.state.user+'&';
    if(this.state.que!='') url+=this.state.que+'&';
    url+='page='+i;
    if(this.state.orderBy!='') url+='&'+this.state.orderBy;
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then((repositories) => {
      this.setState({repos:repositories.items});
    })
    .catch(
      ()=> console.log("error")
    );
  }
  setUser(event){
    this.setState({user:event.target.value});
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  setQuery(query){
    if(this.state.user!='')
    query+='user:'+this.state.user;
    console.log('https://api.github.com/search/repositories?q='+query);
    fetch('https://api.github.com/search/repositories?q='+query)
    .then(response => response.json())
    .then((repositories) => {
      this.setState({repos:repositories.items});
    })
    .catch(
      ()=> console.log("error set query")
    );
    this.setState({que: query}); 
  }
  setOrderBy(orderByquery){
    let query ='';
    if(this.state.user!='') query+='+user:'+this.state.user+'&';
    if(this.state.que!='') query+= ''+this.state.que+'&';
    fetch('https://api.github.com/search/repositories?q='+query+orderByquery)
    .then(response => response.json())
    .then((repositories) => {
      this.setState({repos:repositories.items});
    })
    .catch(
      ()=> console.log("error")
    );
    this.setState({orderBy: orderByquery}); 
  }
}

export default App;
