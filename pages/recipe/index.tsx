import React from 'react'
import { ContentfulService } from '../../core/contentful'
import { RecipeWithId } from '../../interfaces/recipe'
import Layout from '../../components/layout/layout'
import Detail from '../../components/detail/detail'


type Props = {
  entry : RecipeWithId;
}

const RecipePage = (props:Props) => {
  const { entry } = props;
  return (
    <Layout>
      <Detail  entry={entry}/>
    </Layout>
  )
}

RecipePage.getInitialProps = async({query}) => {
  const contentfulService = new ContentfulService();  

  const { name } = query;
  const recipeResult = await contentfulService.getRecipeBySlug(name);
  console.log(recipeResult);
  return { entry: recipeResult };
}

export default RecipePage;
