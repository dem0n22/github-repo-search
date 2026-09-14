import {
  Star,
  SquareArrowOutUpRight
} from 'lucide-react';

import styles from "../components/repo_card.module.css"

const Colors = {
  "0": "red",
}

const LanguageColors = {
  "Python": "blue",
  "C#": "purple-200",
  "JavaScript": "yellow-100",
  "Java": "yellow-200",
  "Jupyter Notebook": "orange-100",
  "TypeScript": "dark-blue",
  "HTML": "turquoise",
  "CSS": "blue-200",
  "C++": "pink-100",
  "SCSS": "pink-200",
  "PHP": "blue-500",
  "C": "gray",
  "Swift": "orange-200",
  "Rust": "cream",
  "Kotlin": "purple-100",
}

export default function RepoCard({ repo }) {
  console.log(repo)

  const {
    name, 
    stargazers_count,
    language,
    owner: {login, avatar_url}
  } = repo

  return (
    <div className={styles.wrapper}>

      <div className={styles.card_header}>
        <p className={styles.card_repo_name}>{name}</p>
        <div className={styles.card_repo_user}>
          <img className={styles.card_avatar} src={avatar_url} alt="avatar"/>
          <p>{login}</p>
        </div>
      </div>

      <div className={styles.card_body}>

        <div className={styles.card_metrics}>
          <div className={styles.language_wrapper}>
            {(language !== null) && <div className={`${styles.language_dot} ${styles['bg_' + getColor(language)]}`}></div>}
            <p>{language !== null ? language : 'Sin lenguaje'}</p>
          </div>
          <div className={styles.stars_wrapper}>
            <Star className='icon'/>
            <p>{formatNumber(stargazers_count)}</p>
          </div>
        </div>

        <a className={styles.icon_github} href={repo.html_url} target='blank' rel='noopener noreferrer'>
          <SquareArrowOutUpRight className='icon-link'/>
        </a>
      </div>
    </div>
  )
}

// En un utils.js
function getColor(language) {
  console.log(language)
  if(LanguageColors[language]) return LanguageColors[language];

  let hash = 0;
  for(const char of language ) {
    hash += char.charCodeAt(0);
  }

  return Colors[hash % Colors.length];
}

function formatNumber(value){
  const number = Number(value);
  if(Number.isNaN(number)) {
    throw new Error('El valor del parámetro value debe ser de tipo number o string.')
  }

  return number > 1000 ? (number / 1000).toFixed(1) + "k" : number + "";
}