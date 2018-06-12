import React from 'react';
import RepoItem from './repo-item/repo-item';
import {ListGroup} from 'reactstrap';
export default class Repos extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
    return (
        <div>
        { 
            <div>
                
                <ListGroup>
                {
                        this.props.repos.map(i => {
                            return <RepoItem obj={i}></RepoItem>

                        })       
                }
                </ListGroup>
                
                <br/>                  
            </div>
        }
        </div>
    )
}

}