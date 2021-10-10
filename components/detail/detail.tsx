import React from 'react'
import { RecipeWithId } from '../../interfaces/recipe'
import dateFormat from 'dateformat'
import styles from '../../styles/Detail.module.css';

interface Props {
  entry : RecipeWithId;
}

const Detail = ({ entry } : Props) => {
  return (
    <div className={styles.recipe}>
      <div className={styles.recipe__info}>
        <div className={styles.recipe__info__header}>{entry.name}</div>
        <div className={styles.recipe__info__date}>{dateFormat(entry.publishDate, "dd.mm.yyyy")}</div>
      </div>

        <img className={styles.recipe__img} src={entry.image} alt="recipe_hero_img" />
        <div className={styles.recipe__desc}>{entry.shortDescription}</div>
        <div className={styles.recipe__extra}>
          <div className={styles.recipe__extra__time}>Cooking time: {entry.cookingTime} min</div>
          <div className={styles.recipe__extra__pers}>Serving: {entry.servings} persons</div>
        </div>
          <h4 className={styles.recipe__titleIng}>Ingredients</h4>
          <ul className={styles.recipe__ing}>{entry.ingredients.map((ing) => <li className={styles.recipe__ing__item} key={ing.sys.id}>{ing.fields.quantity} {ing.fields.unit} {ing.fields.name}</li>)}</ul>
          <h4 className={styles.recipe__titleIng}>Directions</h4>
          <div className={styles.recipe__steps}>{entry.description}</div>
      </div>
  )
}

export default Detail;

