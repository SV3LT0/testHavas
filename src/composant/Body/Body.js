import React, { useState, useEffect  } from 'react';



function Body() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [characters, setcharacters] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [pageSuivante, setPageSuivante] = useState("");
    const [pagePreced, setPagePreced] = useState("");
    const [buttonNext, setButtonNext] = useState("button");
    const [buttonPrevious, setButtonPrevious] = useState("buttonNone");
    const [selectPerso, setSelectPerso] = useState([]) 
    
    const moreInfo = name => {
      fetch("https://swapi.dev/api/people/?search="+name)
              .then(res => res.json())
              .then(
              (result) => {
                  setIsLoaded(true);
                  setSelectPerso(result.results);
              },
              (error) => {
                  setIsLoaded(true);
                  setError(error);
                }
              )
    }

    const handleChange = e => {
      setSearchName(e.target.value);
      setButtonNext("button");
      if (e.target.value) {
        setButtonNext("buttonNone");
        setButtonPrevious("buttonNone");
      }
      fetch("https://swapi.dev/api/people/?search="+e.target.value)
      .then(res => res.json())
      .then(
      (result) => {
          setIsLoaded(true);
          setcharacters(result.results);
          
      },
      (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    };


    const previousPage = () => {
      if (pagePreced) {
         fetch(pagePreced)
              .then(res => res.json())
              .then(
              (result) => {
                  setIsLoaded(true);
                  setcharacters(result.results);
                  setPagePreced(result.previous);
                  setPageSuivante(result.next);
                  setButtonNext("button");
                  if (!result.previous) {
                    setButtonPrevious("buttonNone")
                  }
              },
              (error) => {
                  setIsLoaded(true);
                  setError(error);
                }
              )
      }
    }

    const nextPage = () => {
      if (pageSuivante) {
          fetch(pageSuivante)
              .then(res => res.json())
              .then(
              (result) => {
                  setIsLoaded(true);
                  setcharacters(result.results);
                  setPagePreced(result.previous);
                  setPageSuivante(result.next);
                  setButtonPrevious("button");
                  if (!result.next) {
                    setButtonNext("buttonNone")
                  }
              },
              (error) => {
                  setIsLoaded(true);
                  setError(error);
              }
              ) 
      }
    }

    useEffect(() => {
        fetch("https://swapi.dev/api/people/")
            .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setcharacters(result.results);
                setPageSuivante(result.next);
                setButtonNext("button");
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
            ) 
        
    }, [])


    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement...</div>;
    } else {
      return (
        <div id="body">
          <div id="listPerso">
              <input
                  id="searchbarre"
                  type="text"
                  placeholder="Search"
                  value={searchName}
                  onChange={handleChange}
              />
              <ul id="listName">
              {characters.map(character => (
                  <button onClick={()=>moreInfo(character.name)}><li key={character.name}>
                  {character.name}
                  </li></button>
              ))}
              </ul>
                <div id="buttons">
              <input  id="buttonprevious" className={buttonPrevious} type="button" value ="<<" onClick={previousPage}/>
              <input  id="buttonnext" className={buttonNext} type="button" value =">>" onClick={nextPage}/> 
                </div>
          </div>
          <div id="infoPerso">
             {selectPerso.map(persoInfo => (
               <ul>
                <li>{persoInfo.name}</li>
                <li>{persoInfo.birth_year}</li>
                <li>{persoInfo.gender}</li>
                <li>{persoInfo.height} cm</li>
                <li>{persoInfo.mass} kg</li>
                <li>{persoInfo.hair_color}</li>
              </ul>
             ))}
          </div>
        </div>    
      );
    }
}

export default Body;




// <li className={persoInfo.name} key={persoInfo.name}>{persoInfo.name}</li>
// <li className={persoInfo.birth_year} key={persoInfo.birth_year}>{persoInfo.birth_year}</li>
// <li className={persoInfo.gender} key={persoInfo.gender}>{persoInfo.gender}</li>
// <li className={persoInfo.height} key={persoInfo.height}>{persoInfo.height} cm</li>
// <li className={persoInfo.mass} key={persoInfo.mass}>{persoInfo.mass} kg</li>
// <li className={persoInfo.hair_color} key={persoInfo.hair_color}>{persoInfo.hair_color}</li>