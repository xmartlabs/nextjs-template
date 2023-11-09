import { classnames } from '@/helpers/utils';
import styles from './home.module.scss';

const randomIndex = (): number => {
  const random = Math.random();
  const index = Math.floor(random * 151);
  return index;
}

const fetchKantoPokemon = async () => {
  const kantoPokemons = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151', { next: { revalidate: 10 } })
  .then(response => response.json())
  return kantoPokemons;
}

const  Home = async () => {
  const kantoPokes = await fetchKantoPokemon();
  const pokes = kantoPokes.results;
  const randomPoke = pokes[randomIndex()];
  console.log(randomPoke)
  return (
    <div className={classnames(styles.container)}>
      <div>
        <p className={styles.header}>
          This is the homepage.
        </p>
        <p className={styles.subheader}>
          Feel free to spruce me up 😊
        </p>
        <p className={styles.subheader}>The randomly chosen Pokemon is: <b>{randomPoke.name}</b></p>
      </div>
    </div>
    )
}

export default Home;
