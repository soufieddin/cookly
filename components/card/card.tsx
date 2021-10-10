import Link from 'next/link';
import { getHref } from '../../core/helpers';
import { RecipeWithId } from "../../interfaces/recipe"
import LinesEllipsis from 'react-lines-ellipsis';
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
          <LinesEllipsis
            text={info.shortDescription}
            maxLine='1'
            ellipsis='...'
            trimRight
            basedOn='letters'
          />
        </div>
      </a>
    </Link>
  )
};

export default Card;