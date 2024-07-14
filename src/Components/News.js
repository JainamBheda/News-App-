import React, { Component } from 'react'
import Newsitems from './Newsitems'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";
class News extends Component {
  static defaultProps = {
    country: 'in',
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
  }
  constructor(props) {
    super(props) //constructor only runs when there is super() in it
    //you can set the state of bel{w class here
    this.state = {
      articles: [],
      loading: true,
      totalResults:0
    }
    document.title = `${this.props.category}-Kal Tak News`
  }
  handleprevclick = async () => {
    console.log("prev")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=70ae63c8288a41898c05e3ca6f3786ba&page=${this.state.page - 1}&pagesize=20`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      page: this.page - 1,
      articles: parsedData.articles,
      loading: false
    })
  }
  handlenextclick = async () => {
    console.log("next")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=70ae63c8288a41898c05e3ca6f3786ba=${this.state.page + 1}&pagesize=20`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()

    this.setState({
      page: this.page + 1,
      articles: parsedData.articles,
      loading: false,
      totalResults:parsedData.totalResults
    })
  }
  async updateNews(){
    this.props.setProgress(30);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=70ae63c8288a41898c05e3ca6f3786ba&page=1&pagesize=20`;
    this.setState({ loading: true });
    let data = await fetch(url);  //fetch api
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, loading: false,totalResults:parsedData.totalResults })
    this.props.setProgress(100)
  }
   fetchMoreData = async() => {
    this.setState({page:this.state.page+1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=70ae63c8288a41898c05e3ca6f3786ba&page=1&pagesize=20`;
    // this.setState({ loading: true });
    let data = await fetch(url);  //fetch api
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ articles: this.state.articles.concat(parsedData.articles), 
      totalResults:parsedData.totalResults })
  };
  async componentDidMount() {
    //render method ke badd componetDidMount method run hota hai
    this.updateNews();
  }

  render() {
    return (
      <>
        <h2 className='text-center' style={{margin:'35px 0px',marginTop:'90px'}}>Breaking News ! <br />{this.props.category} category </h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4><Spinner/></h4>}
        >
          <div className="conatiner">
             <div className="row justify-content-center">
            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <Newsitems title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) : ""} url={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
        s
      </>
    )
  }
}

export default News
