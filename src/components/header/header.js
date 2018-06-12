import React from 'react';
import {Jumbotron,Button} from 'reactstrap';

class MyHeader extends React.Component {
    render(){
    return (
        
        <Jumbotron >
            <h1 className="display-3">GitHub UI Test</h1>
            <p className="lead">This is a simple UI that allows users to enter a name of a user or an organisation <br/> and show their public repositories, there is a simple filter form and sorting feature as well.</p>
        </Jumbotron>
    )}
}
export default MyHeader;
