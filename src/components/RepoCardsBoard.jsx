import RepoCard from "./RepoCard"

import styles from "../components/repo_cards_board.module.css"

export default function RepoCardsBoard({repos}) {
  return (
    <div className={styles.repos_board}>
      {repos.map((repo) => 
        <RepoCard key={repo.id} repo={repo}/>
      )}
    </div>
  )
}