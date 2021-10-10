import React, { useState } from 'react'
import { ContentfulService } from '../core/contentful'
import { Recipe, RecipeWithId } from '../interfaces/recipe'
import Card from '../components/card/card'
import Layout from '../components/layout/layout'
import styles from '../styles/Home.module.css';

type Props = {
  entries: RecipeWithId[];
  url: string;
  total: number;
}

const cards = (entries: RecipeWithId[], isVegan:boolean) => entries.filter(e => !isVegan || checkVeganRecipe(e)).map((entry, index) => (<Card info={entry} key={index} />));

const checkVeganRecipe = (recipe: Recipe): boolean => {
  const ingredientsFields = recipe.ingredients.map(i => i.fields);

  return !ingredientsFields.find(v => !v.vegan);
}
const IndexPage = (props:Props) => {
  const [isVegan, setVeganStatus] = useState<boolean>(false) 
  const entries = props.entries.length ? props.entries : [];

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => setVeganStatus(e.target.checked)

  return (
    <Layout>
      <div className={styles.heroImg}><img className={styles.heroImg__img} src='https://lp-cms-production.imgix.net/2021-04/shutterstock_1410408836.jpg?auto=format&fit=crop&sharp=10&vib=20&ixlib=react-8.6.4&w=850&q=50&dpr=2' /></div>
      <div className={styles.checkbox}>
        <input className={styles.checkbox__input} type="checkbox" id="vegan" name="vegan" hidden onChange={handleChange} />
        <label className={styles.checkbox__label} htmlFor="vegan">{isVegan ? 'Show all' : 'Show only Vegan'}</label>
      </div>
      <div className={styles.recipes}>
        <div className={styles.recipes__cards}>
          {cards(entries, isVegan)}
        </div>
      </div>
    </Layout>
  )
}

IndexPage.getInitialProps = async() => {
  const contentfulService = new ContentfulService();

  return await contentfulService.getRecipeEntries();
}

export default IndexPage;
