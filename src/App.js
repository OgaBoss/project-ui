import React from 'react';
import Search from "./components/Search";
import styles from './styles/style.module.css'
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Response from "./components/Response";
function App() {
  return (
    <div className="w-full min-h-screen relative">
      <div className="w-full h-full">
        <div className={`h-12 px-8 py-3 w-full flex justify-between ${styles.header}`}>
          <a href="/" className="font-bold text-pink-500">DrinksSafety.com</a>
          <div className="flex justify-start">
            <FontAwesomeIcon className="text-2xl" icon={faUserCircle} />
          </div>
        </div>
        <div className="max-w-xs lg:max-w-2xl mx-auto mt-32">
          <Search />
          <Response />
        </div>
      </div>
    </div>
  );
}

export default App;
