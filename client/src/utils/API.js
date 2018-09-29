import axios from "axios";
// const router = require("express").Router();

const API = {
    SearchNYT: function(topic, startYear, endYear) {
        const APIKEY = "a59be30bd86a457295ded9a131b1b815";
        const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" 
        + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101";
        return axios.get(queryURL);
    },
    getArticle: function() {
        return axios.get("/api/saved");
    },
    saveArticle: function(articleObj) {
        return axios.post("api/saved", articleObj);
    },
    deleteArticle: function(id) {
        return axios.delete("/api/saved/${id}");
    }
};

export default API;