import './App.css';
import Extensions from './Extensions-list';
import Header from './Header';
import {useState , useEffect} from 'react';

function App() {
   const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
   setDarkMode(!darkMode);
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="flex justify-center items-start w-full h-full min-h-dvh px-4 py-6 
      bg-gradient-to-b from-light-gradient-1 to-light-gradient-2 dark:bg-gradient-to-b 
      dark:from-dark-gradient-1 dark:to-dark-gradient-2 lg:px-6">
      <div className="App w-full h-full xl:w-[80%]">

        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
        <Extensions />
      </div>
    </div>
  );
}

export default App;