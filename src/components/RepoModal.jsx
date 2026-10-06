import React from "react"
import { Modal } from "./Modal"
import { ModalContext } from "../App"

import { 
  X,
  Star,
  Tag, 
  Eye,
  GitFork
} from "lucide-react"

import styles from "./repo_modal.module.css"
import { calculatePercentages, formatNumber, getElapsedTime, capitalizeFirstLetter } from "../utils"
import { LanguageColors } from "../constants/colors"

export default function RepoModal({ repo }) {
  const [state, setState] = React.useState({status: 'idle', repos: [], error: null})
  const {setOpenModal, setRepoSelected} = React.useContext(ModalContext);

  const {
    full_name,
    visibility,
    description,
    topics,
    stargazers_count,
    watchers,
    forks,
    releases_url,
    languages_url,
    owner: {
      login,
      avatar_url,
    }
  } = repo;

  React.useEffect(() => {
    let ignore = false;

    setState({status: 'loading', repos:[], error: null});

    Promise.all([
      fetch(releases_url.replace(/\{.*?\}/, "")),
      fetch(languages_url.replace(/\{.*?\}/, ""))
    ]).then(response => {
      const invalidResponse = response.find(resp => !resp.ok);
      if(invalidResponse) {
        if(!ignore) setState({status: 'error_http', repos: [], error: invalidResponse.status})
        return;
      } 

      return Promise.all(response.map(res => res.json()))
        .then(data => {
          if(!ignore) setState({status: 'success', repos: data, error: null}) 
        })
    })
    .catch(error => {
      if(!ignore) setState({ status: 'error_fetch', error });
    }) 

    return () => { ignore = true }
  }, [releases_url, languages_url]);

  const releases = state.status === 'success' ? state.repos[0] : [];
  const languages = state.status === 'success' ? state.repos[1] : {};
  const lastRelease = releases.length > 0 ? releases.find(release => !release.prerelease) : null; 

  return (
    <Modal className={styles.repo_modal} onCloseEnd={() => setRepoSelected(null)}>
      <div className={styles.modal_header}>
        <div className={styles.repo_title}>
          <h1 className={styles.repo_name}>
            {full_name}
          </h1>
          <div className={styles.repo_owner}>
            <img className={styles.owner_avatar} src={avatar_url} alt="avatar" />
            <span className={styles.owner_name}>{login}</span>
            <span className="privacy_label">{capitalizeFirstLetter(visibility)}</span>
          </div>
        </div>
        <button 
          type="button"
          onClick={() => setOpenModal(false)}
          className="button_base button_icon button_close"
        >
          <X className="icon-close"/>
        </button>
      </div>
      <div className={styles.modal_body}>
        <div className={styles.modal_top_section}>
          <h2 className={styles.modal_section__heading}>About</h2>
          <p className={styles.modal_description}>{description}</p>
          <div className={styles.modal_subsection_top}>
            <ul className={styles.metrics}>
              <li className={styles.metric_item}>
                <Star className={styles.metric_icon}/>
                <strong className={styles.metric_number}>{formatNumber(stargazers_count)}</strong> 
                { } stars
              </li>
              <li className={styles.metric_item}>
                <Eye className={styles.metric_icon}/>
                <strong className={styles.metric_number}>{formatNumber(watchers)}</strong>
                { } watchers
              </li>
              <li className={styles.metric_item}>
                <GitFork className={styles.metric_icon}/>
                <strong className={styles.metric_number}>{formatNumber(forks)}</strong>
                { } forks
              </li>
            </ul>
          </div>
          <div className={styles.modal_subsection}>
            <ul className={styles.topic_tags}>
              {topics.map(topic => <li key={topic} className={styles.topic_tag}>{topic}</li>)}
            </ul>
          </div>
        </div>
        <div className={styles.modal_section}>
          <h2 className={styles.modal_section__heading}>
            <span>Releases</span>
          </h2>
          <div className={styles.release_content}>
            {state.status === 'loading' && <p>Cargando releases...</p>}
            {state.status === 'error_http' && <p>Error al cargar los datos.</p>}
            {state.status === 'success' && (
              lastRelease ? (
                <>
                  <Tag className={styles.release_icon} />
                  <div className={styles.release_info}>
                    <div className={styles.release_name_row}>
                      <span className={styles.release_name}>{lastRelease.name}</span>
                      <span className="latest_label">Latest</span>
                    </div>
                    <span className={styles.release_elapsed_time}>
                      Hace {getElapsedTime(lastRelease.published_at)}
                    </span>
                  </div>
                </>
              ) : (
                <p>Sin releases publicados.</p>
              )
            )}
          </div>
        </div>
        <div className={styles.modal_section}>
          <h2 className={styles.modal_section__heading}>Lenguajes</h2>
          {state.status === 'loading' && <p>Cargando lenguajes...</p>}
          {state.status === 'error_http' && <p>Error al cargar los datos.</p>}
          {state.status === 'success' && (
            languages ? (
              <>
                <div className={styles.languages_bar_wrapper}>
                  <span className={styles.languages_bar}>
                    {Object.entries(calculatePercentages(languages)).map(([key, value]) => 
                      (
                        <span 
                          key={key}
                          className={'bg-' + LanguageColors[key]}
                          style={{flexBasis: `${value}%`}}
                        ></span>
                      )
                    )}
                  </span>
                </div>
                <ul className={styles.languages_list}>
                  {Object.entries(calculatePercentages(languages)).map(([key, value]) => 
                    (
                      <li key={key} className={styles.language_list_item}>
                        <span className={`${styles.language_dot} ${'bg-' + LanguageColors[key]}`}></span>
                        <span className={styles.language_name}>{key}</span>
                        <span className={styles.language_percentage}>{value}%</span>
                      </li>
                    )
                  )}
                </ul>
              </>
            ) :(
              <p>Sin lenguajes usados.</p>
            ) 
          )}
          </div>
        </div>
    </Modal>
  )
}