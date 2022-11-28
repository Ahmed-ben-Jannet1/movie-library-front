import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import { connect } from "react-redux";

import NothingSvg from "../svg/nothing.svg";
import Rating from "../components/Rating";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  getPerson,
  clearPerson,
  getMoviesforPerson,
  clearMoviesforPerson,
  adddeleteFavoriteFilm,
} from "../actions";
import Loader from "./Loader";
const MovieWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  background-color: transparent;
  border-radius: 0.8rem;
  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);

  &:hover {
    transform: scale(1.03);

    ::after {
      transform: scaleY(1);
      opacity: 1;
    }
    .iconheart svg path:hover {
      stroke: #ffffff;
      stroke-width: 30;
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0.8rem;
    transform: scaleY(0);
    transform-origin: top;
    opacity: 0;
    background-color: var(--color-primary);
    z-index: -99;
    box-shadow: 0rem 2rem 5rem var(--shadow-color-dark);
    transition: all 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
`;
const IconStyle = styled.div`
  stroke: #263238;
  stroke-width: 30;
  margin-left: 1rem;
  cursor: pointer;
  ${MovieWrapper}:hover & {
    stroke: #ffffff;
    stroke-width: 30;
  }
`;
const MovieImg = styled.img`
  width: 100%;
  height: 38rem;
  object-fit: ${(props) => (props.error ? "contain" : "cover")};
  border-radius: 0.8rem;
  padding: ${(props) => (props.error ? "2rem" : "")};
  box-shadow: 0rem 2rem 5rem var(--shadow-color);
  transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);

  ${MovieWrapper}:hover & {
    border-radius: 0.8rem 0.8rem 0rem 0rem;
    box-shadow: none;
  }

  @media ${(props) => props.theme.mediaQueries.smaller} {
    height: 28rem;
  }
`;

const ImgLoading = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 300px;
  border-radius: 0.8rem;
  box-shadow: 0rem 2rem 5rem var(--shadow-color);
  transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--color-primary-light);
  margin-bottom: 1rem;
  line-height: 1.4;
  transition: color 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

  ${MovieWrapper}:hover & {
    color: var(--text-color);
  }
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;

  @media ${(props) => props.theme.mediaQueries.smaller} {
    padding: 1.5rem 1.5rem;
  }
`;

const RatingsWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: 0.5rem;
  color: var(--color-primary);

  ${MovieWrapper}:hover & {
    color: var(--color-primary-lighter);
  }
`;

const Tooltip = styled.span`
  visibility: hidden;
  opacity: 0;
  width: 120px;
  font-weight: 500;
  font-size: 1.1rem;
  background-color: var(--color-primary-light);
  color: var(--text-color);
  text-align: center;
  border-radius: 6px;
  padding: 1rem;
  position: absolute;
  z-index: 999;
  bottom: 150%;
  left: 50%;
  margin-left: -60px;
  transition: all 200ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    transition: all 200ms cubic-bezier(0.645, 0.045, 0.355, 1);
    border-color: var(--color-primary-light) transparent transparent transparent;
  }

  ${RatingsWrapper}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

// Function to render list of movies
const MovieItem = ({ movie, baseUrl, adddeleteFavoriteFilm, person }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    return () => setLoaded(false);
  }, []);

  const handleClick = async () => {
    let typeRequest;
    var arraycontainsturtles = person.favoriteFilm.indexOf(`${movie.id}`) > -1;
    arraycontainsturtles
      ? (typeRequest = "removeFavoriteFilm")
      : (typeRequest = "addFavoriteFilm");
    adddeleteFavoriteFilm(person, typeRequest, movie);
  };
  const fav = () => {
    if (person && person.favoriteFilm && person.favoriteFilm.length > 0) {
      var arraycontainsturtles =
        person.favoriteFilm.indexOf(`${movie.id}`) > -1;
      return arraycontainsturtles;
    }
  };
  if (person.loading) {
    return <Loader />;
  }
  return (
    <LazyLoad height={200} offset={200}>
      <MovieWrapper>
        {!loaded ? (
          <ImgLoading>
            <Loading />
          </ImgLoading>
        ) : null}
        <Link
          style={{
            textDecoration: "none",
            backgroundColor: "transparent",
            borderRadius: " 0.8rem",
          }}
          to={`${process.env.PUBLIC_URL}/movie/${movie.id}`}
        >
          <MovieImg
            error={error ? 1 : 0}
            onLoad={() => setLoaded(true)}
            style={!loaded ? { display: "none" } : {}}
            src={`${baseUrl}w342${movie.poster_path}`}
            // If no image, error will occurr, we set error to true
            // And only change the src to the nothing svg if it isn't already, to avoid infinite callback
            onError={(e) => {
              setError(true);
              if (e.target.src !== `${NothingSvg}`) {
                e.target.src = `${NothingSvg}`;
              }
            }}
          />
        </Link>
        <DetailsWrapper>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link
              style={{
                textDecoration: "none",
                backgroundColor: "transparent",
                borderRadius: " 0.8rem",
              }}
              to={`${process.env.PUBLIC_URL}/movie/${movie.id}`}
            >
              <Title>{movie.title}</Title>
            </Link>
            {/* //    font-weight */}
            {window.location.pathname !== "/favorite" && (
              <IconStyle onClick={handleClick}>
                {/* <i class="fas fa-heart"></i> */}
                <FontAwesomeIcon
                  icon="fas fa-heart"
                  size="2x"
                  color={fav() ? "red" : "transparent"}
                />
              </IconStyle>
            )}
          </div>

          <RatingsWrapper>
            <Rating number={movie.vote_average / 2} />
            <Tooltip>
              {movie.vote_average} average rating on {movie.vote_count} votes
            </Tooltip>
          </RatingsWrapper>
        </DetailsWrapper>
      </MovieWrapper>
    </LazyLoad>
  );
};

// Get state from store and pass as props to component
const mapStateToProps = ({ person, geral, moviesPerson }) => ({
  person,
  geral,
  moviesPerson,
});

export default connect(mapStateToProps, {
  getPerson,
  clearPerson,
  getMoviesforPerson,
  clearMoviesforPerson,
  adddeleteFavoriteFilm,
})(MovieItem);