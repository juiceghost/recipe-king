export const URLS = {
    'oldRandomRecipes': 'https://api.spoonacular.com/recipes/random',
    'randomRecipes': 'http://localhost:5000/randomRecipes',
    'oldRecipeInfo': (id) => (`https://api.spoonacular.com/recipes/${id}/information`),
    'recipeInfo': (id) => (`http://localhost:5000/recipe/${id}`)
}
