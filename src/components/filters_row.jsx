import React from "react";
import styles from "../components/filters_row.module.css";

import { Search } from "lucide-react";

export default function FiltersRow({onSearch}) {
  const [inputValue, setInputValue] = React.useState('');

  function handlerSubmit(event) {
    event.preventDefault();
    onSearch(inputValue)
  }

  return (
    <div>
      <form 
        onSubmit={handlerSubmit}
      >
        <div className={styles.search_wrapper}>
          <div className={styles.search_box}>
            <Search className="icon" />
            <input 
              type="text"
              value={inputValue}
              placeholder="Busca un repositorio"
              onChange={(event) => setInputValue(event.target.value)} 
            />
          </div>
        </div>

        {/* OTROS FILTROS FUTUROS */}
      </form>
    </div>
  )
}