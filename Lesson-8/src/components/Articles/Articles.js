import React from "react";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../../store/articles/actions";
import "./style.scss"
import {
  selectArticles,
  selectArticlesLoading,
  selectError,
} from "../../store/articles/selectors";


function Articles () {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectArticlesLoading);
  const articles = useSelector(selectArticles);

  const getData = async () => {
    dispatch(getArticles());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="news-page">
        <h2>News</h2>
        <div className="news-content">
            {isLoading ? <div className="loader"><CircularProgress color="success" /></div> : 
                error ? <div className="news-error">
                        <h3>Error</h3>
                        <button className="refrash-button" onClick={getData}>Refrash</button>
                        <p>Please, refrash this page</p>
                    </div> :
                articles.map((article) => {
                return <div className="article" key={article.id}>
                    <h3>{article.title}</h3>
                    <img src={article.imageUrl} alt="article" width="250px" />
                    <p>{article.summary}</p>
                </div>
                })
            }
        </div>
    </div>
)

};

export default Articles