import React, { Component } from 'react'

export class Newsitems extends Component {
  render() {
   let {title,description,url,newsUrl,author,date,source} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem",margin: '20px auto'}}>
        <img src={url} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}....</h5>
            <p className="card-text">{description}.....</p>
            <h5><span className="badge rounded-pill text-bg-success">{source}</span></h5>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date (date).toGMTString()}</small></p>
            <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-sm btn-danger">Read more</a>
        </div>
        </div>
      </div>
    )
  }
}

export default Newsitems
