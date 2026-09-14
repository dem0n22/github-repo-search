import React from 'react';

import FiltersRow from './components/filters_row'
import RepoCardsBoard from './components/repo_cards_board';

import RepoCardsBoardSkeleton from './components/repo_cards_board_skeleton';

import { Sun, Moon } from 'lucide-react';

import './App.css'
import  'react-loading-skeleton/dist/skeleton.css'

function App() {
  const [state, setState] = React.useState({status: 'idle', repos: [], error: null});
  const [mode, setMode] = React.useState((() => localStorage.getItem('mode') ?? 'dark'));

  React.useEffect(() => {
    localStorage.setItem('mode', mode)
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode])

  async function getResults(query) {
    setState({status: 'loading', repos:[], error: null});

    try {
      const response = await fetch(`https://api.github.com/search/repositories?q=${query}`);
      
      if(response.ok) {
        const data = await response.json();
        setState({status: 'load', repos: data.items, error: null})
      } else {
        setState({status: 'error_http', repos: [], error: response.status});
      }
    } catch(error) {
      setState({status: 'error_fetch', repos: [], error})
    }
  }

  let result;
  switch (state.status) {
    case 'idle': {
      result = <p className='state_search'>Busca un repositorio...</p>;
      break;
    }
    case 'loading': {
      result = <RepoCardsBoardSkeleton repos_count={25}/>
      break;
    }
    case 'load': {
      result = state.repos.length > 0 
        ? <RepoCardsBoard repos={state.repos}/>  
        : (
          <div className='state_wrapper state_not-found'>  
            <p>{"(≥_<)}"}</p>
            <p>No se encontraron respositorios.</p>);
          </div>
        )
      
      break;
    };
    case 'error_http': {
      result = (
        <div className='state_wrapper'>
          <p className='error_state'>{state.error}</p>
          <p className='error_description'>No se pudo completar la busqueda.</p>
        </div>
      );
      break;
    };
    case 'error_fetch': {
      result = (
        <div className='state_wrapper state_error-fetch'>
          <p className='error_state'>...</p>;
          <p className='error_description'>Sin conexión. Revisa tu red e intenta de nuevo.</p>
        </div>
      )
      break;
    };
    default:
      throw new Error(`Estado no manejado: ${state.status}`);
  }

  return (
    <div className='wrapper_content'>
      <div className='content_header'>
        <FiltersRow onSearch={getResults}/>
        <button type='button' onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
          {mode === 'light' ? <Moon className='icon'/> : <Sun className='icon' />}
        </button>
      </div>
      <div className="content_body">
        {result}
      </div>
    </div>
  )
}

export default App
