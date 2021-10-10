import Link from 'next/link';
import { getHref } from '../../core/helpers';
import { RecipeWithId } from "../../interfaces/recipe"
import styles from '../../styles/Card.module.css';

type Props = {
  info: RecipeWithId;
}
const Card = ({ info }: Props) => {
  
  return ( 
    <Link href={getHref(info.slug)} as={getHref(info.slug)} passHref>
      <a className={styles.card}>
        <img src={info.image} alt='recipe_image' className={styles.card__img} />
        <div className={styles.card__body}>
          <h3 className={styles.card__title}>{info.name}</h3>
          <p>{info.shortDescription.slice(0, 45).concat('...')}</p>
        </div>
      </a>
    </Link>
  )
};

export default Card;