import React from 'react';
import { ModalContext } from '../App';

import { getElapsedTime, formatNumber } from '../utils';

import { Star } from 'lucide-react';

import styles from "../components/repo_card.module.css"
import { LanguageColors } from '../constants/colors';

export default function RepoCard({ repo }) {
  const { setOpenModal, setRepoSelected } = React.useContext(ModalContext);

  const {
    name, 
    description,
    stargazers_count,
    language,
    pushed_at,
    owner: {login, avatar_url}
  } = repo

  return (
    <button
      className={styles.card}
      type='button' 
      onClick={() => {
        setRepoSelected(repo);
        setOpenModal(true);
      }}
    >

      <div className={styles.card_header}>
        <h3 className={styles.card_repo_name}>{name}</h3>
        <div className={styles.card_repo_user}>
          <img className={styles.card_avatar} src={avatar_url} alt="avatar"/>
          <span className={styles.user_name}>{login}</span>
        </div>
      </div>

      <div className={styles.card_content}>
        <span>{description}</span>
      </div>

      <ul className={styles.card_footer}>
        <li className={styles.footer_item}>
          <span className={`${styles.language_dot} ${'bg-' + LanguageColors[language]}`}></span>
          <span className={styles.language_name}>{language}</span>
        </li>
        <span className={styles.footer_spacer}>·</span>
        <li className={styles.footer_item}>
          <Star className={`icon ${styles.stars_icon}`}/>
          <span className={styles.stars_untco}>{formatNumber(stargazers_count)}</span>
        </li>
        <span className={styles.footer_spacer}>·</span>
        <li className={styles.footer_item}>
          {getElapsedTime(pushed_at)}
        </li>
      </ul>

    </button>
  )
}