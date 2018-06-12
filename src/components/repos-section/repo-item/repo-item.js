
import React from 'react';
import {ListGroupItem,ListGroupItemHeading,ListGroupItemText } from 'reactstrap';

export default class RepoItem extends React.Component{
render(){return (
<ListGroupItem>
<ListGroupItemHeading>{this.props.obj.name}</ListGroupItemHeading>
    <ListGroupItemText>
       Clone URL:  {this.props.obj.clone_url}
    </ListGroupItemText>
</ListGroupItem>)
}
}