import { useState, useEffect } from 'react';
import styled from 'styled-components';

import * as API from '../constants/urls';
const controller = new AbortController();
const { signal } = controller;

const numberOfHits = 20;
/*
box-sizing: border-box;
    border: 2px solid rgba(0, 0, 0, .15);
    box-shadow: 0 0 10px rgba(0, 0, 0, .25), inset 0 0 2px 0px white;
    background: rgba(0, 0, 0, .0125);
    overflow: hidden;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(3px);*/
    
const RecipeListContainer = styled.div`
width: 100%
`
const RecipeListUL = styled.ul`
list-style: none;
display: flex;
flex-direction: row;
flex-wrap: wrap;
align-items: center;
justify-content: center;
`
const RecipeListLI = styled.li`
width: 180px;
min-height: 180px;
border: 1px solid black;
border-radius: 15px;
padding: 20px;
margin: 0.5rem;
background-color: #CBC3E3;
`
const DetailImageContainer = styled.div`
/* background: ${props => `url(${props.image}) no-repeat top center`}; */
& > img {
    width: 100%;
    height: 146px;
    top:0;
  }
`


const RecipeItem = (props) => {
    const [recipeDetail, setRecipeDetail] = useState(null);

    return (
        <>
            <RecipeListLI onClick={() => setRecipeDetail(props.recipe.id)}>
                {props.recipe.title}
                {recipeDetail && <FetchRecipe recipe={props.recipe} />}
            </RecipeListLI>
        </>
    );
}

const RecipeList = (props) => (
    <RecipeListUL>
        {props.recipes.map(recipe => (
            <RecipeItem recipe={recipe} key={recipe.id} />
        ))}
    </RecipeListUL>
);

const FetchRecipe = (props) => {
    const [data, setData] = useState(null);
    // hämta detlajer om recept med id = props.recipe.id
    // in i statet
    // rendera ut bilden :)
    useEffect(() => {
        fetch(`${API.URLS.recipeInfo(props.recipe.id)}`)
            .then(response => response.json())
            .then(resData => {
                // nu har vi fått ett resp
                // in i statet, uppdatera points remaining i state & localStorage
                setData(resData);
                console.log(resData)
            })
            .catch(error => console.log(error))

            return () => {

            }
    }, []);

    return (
        <>{data &&
             <DetailImageContainer onClick={() => setData(null)}>
                <img src={data.image} alt='Picture of food' />
            </DetailImageContainer> 
           /*  <DetailImageContainer image={data.image} /> */

        }
        </>
    )

}
const FetchRecipes = () => {
    const [data, setData] = useState(null);
    const [points, setPoints] = useState(Number(JSON.parse(localStorage.getItem('points'))) || 0)

    useEffect(() => {
        fetch(`${API.URLS.randomRecipes}?number=${numberOfHits}`)
            .then(response => response.json())
            .then(resData => {
                // nu har vi fått ett resp
                // in i statet, uppdatera points remaining i state & localStorage
                setData(resData.recipes);
                localStorage.setItem('points', points + 1);
                setPoints(points + 1);

            })
            .catch(error => console.log(error))
    }, []);

    return (<RecipeListContainer>
        {data && <RecipeList recipes={data} />}
    </RecipeListContainer>)
}

export default FetchRecipes;