import Skeleton from "react-loading-skeleton";

import board_styles from "../components/repo_cards_board.module.css"
import card_styles from "../components/repo_card.module.css"

export default function RepoCardsBoardSkeleton({ repos_count }) {
  return (
    <div className={board_styles.repos_board}>
      {toArray(repos_count).map(num => (
        <div key={num} className={card_styles.wrapper}>
          <div className={card_styles.card_header}>
            <Skeleton 
              containerClassName={card_styles.container_skeleton} 
              height={24.7}
              enableAnimation={true}
            />
            <div className={card_styles.card_repo_user}>
              <Skeleton 
                containerClassName={card_styles.container_skeleton} 
                width={20} 
                height={20} 
                circle
              />
              <Skeleton 
                containerClassName={card_styles.container_skeleton} 
                height={20.8} 
                width={100}
              />
            </div>
          </div>

          <div className={card_styles.card_body}>
            <div className={card_styles.card_metrics}>
              <div className={card_styles.language_wrapper}>
                <Skeleton 
                  containerClassName={card_styles.container_skeleton} 
                  height={12} 
                  width={12}
                  circle
                />
                <Skeleton 
                  containerClassName={card_styles.container_skeleton} 
                  height={17.6} 
                  width={50}
                />
              </div>
              <div className={card_styles.stars_wrapper}>
                <Skeleton 
                  containerClassName={card_styles.container_skeleton} 
                  height={16} 
                  width={16}
                  circle
                />
                <Skeleton 
                  containerClassName={card_styles.container_skeleton} 
                  height={17.6} 
                  width={50}
                />
              </div>
            </div>
            <Skeleton 
              containerClassName={card_styles.container_skeleton} 
              height={16} 
              width={16}
            />
          </div>
        </div>
      ))}
    </div>
  )
} 

function toArray( number ) {
  const arr = [];

  for(let i = 0; i < number; i++) {
    arr.push(i);
  }

  return arr;
}