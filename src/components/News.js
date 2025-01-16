import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroller";

export default class News extends Component {
  static defaultProps = {
      country : "in",
      category : "general",
      pageSize : 6
  }
  static propTypes = {
      country : PropTypes.string,
      category : PropTypes.string,
      pageSize : PropTypes.number
  }
  
  constructor() {
    super();
    this.state = {
      articles: [],
      // loading: false,
      page: 1,
      totalResults : 0
    };
  }

  updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2aa09ec00fce4a84aa6350d3e9cc3c97&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults : parsedData.totalResults,
      // loading : false
      }
    );
  };

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=53c7ed21ef4f45608fde4ae56bb76160&page=${nextPage}&pagesize=${this.props.pageSize}`;
    
    let data = await fetch(url);
    let parsedData = await data.json();
  
    this.setState({
      page: nextPage,
      articles: this.state.articles.concat(parsedData.articles), // Concatenate new articles
    });
  };
  
  async componentDidMount() {
    this.updateNews();
  }

  // handlePrevclick = async () => {
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.updateNews();
  // };
  // handleNextclick = async () => {
  //   this.setState({
  //     page: this.state.page + 1,
  //   });
  //   this.updateNews();
  // };

  render() {
    return (
      <div className="container my-5">
        <h2 className="text-center" style={{marginTop: "70px"}}>NewsMonkey-Top {this.props.category} Headlines</h2>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          // dataLength={this.state.articles.length}
          loadMore={this.fetchMoreData}
          // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
          // inverse={true} //
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="row  my-3">
          {/* !this.state.loading && */ this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItems
                  title={element.title}
                  description={element.description}
                  imgUrl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            );
          })}
        </div>
        </InfiniteScroll>
        {/* <div className="component d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            class="btn btn-dark"
            onClick={this.handlePrevclick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            class="btn btn-dark"
            onClick={this.handleNextclick}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}
