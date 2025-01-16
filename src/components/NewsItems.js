import React, { Component } from "react";

export default class NewsItems extends Component {
    render() {
        let { title, description, imgUrl, newsurl, author, date } = this.props;
        return (
            <div>
                <div className="card my-3" >
                    <img
                        src={imgUrl || "https://media.cnn.com/api/v1/images/stellar/prod/sipausa-51061406.jpg?c=16x9&q=w_800,c_fill"}
                        className="card-img-top"
                        alt="..."
                        height = {350}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description?description:"Description not available"}</p>
                        <p className="card-text"><small className="text-muted">By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsurl} rel="noreferrer"  target = "_blank" className="btn btn-primary">
                            Read in detail
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
