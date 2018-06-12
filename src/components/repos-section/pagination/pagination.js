import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class PaginationSection extends React.Component {
 constructor(props){
    super(props);
    this.state={
      currentPageNo:1
    }
    this.setPageNo = this.setPageNo.bind(this);
 }
  setPageNo(newPageNo){
   this.setState({currentPageNo :newPageNo});
  }
  createPageTags = ()=>{
    let pages = []
    if(this.props.pageNo>0){
      
      //previous page
      pages.push(
        <div  onClick={()=>{this.props.pageNoHandler(this.state.currentPageNo-1);this.setPageNo(this.state.currentPageNo-1); } }>
            <PaginationItem>
               <PaginationLink previous disabled href="#" />
            </PaginationItem>
        </div>
        );
       //page 1 
      pages.push( 
        <div onClick={()=> {this.props.pageNoHandler(1); this.setPageNo(1);}}>
        { 
         <PaginationItem >
           <PaginationLink >
             {1}
           </PaginationLink>
        </PaginationItem> 
      }
      </div>);
            //all pages 

      if(this.props.pageNo>1)
      {
      for (let i=2;i<=(this.props.pageNo /30) && i<9;i++   )
      {
          pages.push( 
          <div onClick={()=> {this.props.pageNoHandler(i);}}>
            <PaginationItem >
              <PaginationLink>
                {i}
              </PaginationLink>
            </PaginationItem>
        </div>);
      }
    }
      // next page
      pages.push(
      <div  onClick={()=>{ this.props.pageNoHandler((this.props.pageNo /30));}}>
          <PaginationItem>
           <PaginationLink next href="#" />
          </PaginationItem>
      </div>
      );

    return pages;
    }       
  }
  render() {
    return (
      <Pagination aria-label="Page navigation example">                      
                {this.createPageTags()}           
      </Pagination>
    );
  }
}