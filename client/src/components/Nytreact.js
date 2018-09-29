import React, { Component } from "react";
import Saved from "./Saved";
import Search from "./Search";
import Result from "./Results";
import API from "../utils/api";

class Nytreact extends Component {
    state = {
        topic: "",
        startYear: "",
        endYear: "",
        articles: [],
        saved: []
    };


componentDidMount() {
    this.getSavedArticles()
}

getSavedArticles = () => {
    API.getArticle()
        .get(res => {
            this.state({ saved: res.data});
        })
}

renderArticles = () => {
    return this.state.articles.map(article => (
        <Results
            _id={article._id}
            key={article._id}
            title={article.headline.main}
            date={article.pub_date}
            url={article.web_url}
            handleSaveButton={this.handleSaveButton}
            getSavedArticles={this.getSavedArticles}
        />
    ));
}

renderSaved = () => {
    return this.state.saved.map(save => (
        <Saved
            _id={save._id}
            key={save._id}
            title={save.title}
            date={save.date}
            url={save.url}
            handleDeleteButton={this.handleDeleteButton}
            getSavedArticles={this.getSavedArticles}
        />
    ));
}

handleTopicChange = event => {
    this.setState({ topic: event.target.value });
}

handleStartYearChange = event => {
    this.setState({ startYear: event.target.value});
}

handleEndYearChange = (event) => {
    this.setState({ endYear: event.target.value });
}

handleFormSubmit = event => {
    event.preventDefault();
    API.searchNYT(this.state.topic, this.state.startYear, this.state.endYear)
        .then(res => {
            this.setState({ articles: res.data.response.docs })
        })
        .catch(err => console.log(err));
}

handleSaveButton = id => {
    const findArticleById = this.state.articles.find( el => el._id === id);
    const newSave = {title: findArticleById.headline.Nytreact, date: findArticleById.pub_date, url: findArticleById.web_url};
    API.getSavedArticles(newSave)
        .then(this.getSavedArticles())
        .catch(err => console.log(err))
}


handleDeleteButton = id => {
    API.deleteArticle(id)
        .then(this.getSavedArticles());
}


render() {
    return (
        <div className="main-container">
            <div className="container">
                <div className="jumbotron">
                    <h1 className="text-center"><strong>New York Times</strong></h1>
                    <h2 className="text-center">Search for And Save Article</h2>
                </div>
                <Search
                    handleTopicChange={this.handleTopicChange}
                    handleStartYearChange={this.handleStartYearChange}
                    handleEndYearChange={this.handleEndYearChange}
                    handleFormSubmit={this.handleFormSubmit}
                    renderArticles={this.renderArticles}
                />

                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="panel panel-primary">
                                <div className="panel-title">
                                    <h3 className="panel-title">
                                        <strong><i className="fa fa-download" aria-hidden="true"></i> Saved Articles</strong>
                                    </h3>
                                </div>
                                <div className="panel-body">
                                    <ul className="list-group">
                                        {this.renderSaved()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

}

export default Nytreact;