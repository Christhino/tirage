/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import anime from "animejs";
import { css } from "@emotion/react";

import Lottie from 'react-lottie';
import animationData from './assets/Annimation/anime.json';

import Logo from  './assets/Alternative2.png'

import "./App.css";


function App() {
  const [teams, setTeams] = useState([
    { id: 1, name: "Tetsuya", src: require('./assets/Tetsuya.png'), alt: 'Tetsuya' , numero: 1},
    { id: 2, name: "CODEO", src: require('./assets/Ampi.png'), alt: 'CODEO' , numero: 2},
    { id: 3, name: "EIGST" , src: require('./assets/eigst.png'), alt: 'EIGST' , numero: 3},
    { id: 4, name: "Yasai " , src: require('./assets/yasai.png'), alt: 'Yasai', numero: 4},
    { id: 5, name: "CodeVerse" , src: require('./assets/codeverse.png'), alt: 'CodeVerse', numero: 5},
    { id: 6, name: "Storm" , src: require('./assets/storm.jpg'), alt: 'Storm', numero: 6},
    { id: 7, name: "CONST" , src: require('./assets/const.png'), alt: 'CONST', numero: 7},
    { id: 8, name: "UC Team" , src: require('./assets/UCTeams.png'), alt: 'UC Team', numero: 8},
    { id: 9, name: "AC63", src: require('./assets/ac63.png'), alt: 'AC63' , numero: 9},
    { id: 10, name: "Teknium" , src: require('./assets/teknium.png'), alt: 'Teknium', numero: 10},
  ]);

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [shuffle, setShuffle] = useState(false);
  const [loading, setLoading] = useState(false);

  const [order, setOrder] = useState([]);

  const [isDrawing, setIsDrawing] = useState(false);

  const shuffleTeams = () => {
    setShuffle(true);
    setTimeout(() => {
      const shuffledTeams = shuffleArray([...teams]);
      setTeams(shuffledTeams);
      setShuffle(false);
      setSelectedTeam(null);
    }, 3000);
  };

  useEffect(() => {
    if (selectedTeam !== null) {
      const timer = setTimeout(() => {
        setSelectedTeam(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedTeam]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleTeamClick = (team) => {
   

    setTimeout(() => {
        const newTeams = [...teams];
        for (let i = newTeams.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newTeams[i], newTeams[j]] = [newTeams[j], newTeams[i]];
        }
        setTeams(newTeams);
        setOrder(newTeams.slice().sort());

    }, 3000); 

    
  };  

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const Anime =  () => {
      
      const params = {
          targets: '.team',
          translateY: [
            { value: -60, duration: 500 },
            { value: 0, duration: 800, easing: 'spring(1, 100, 90, 0)' },
          ],
          delay: (el, i) => i * 50,
          complete: () => {
            const  teamRandom  = shuffleTeams();
            setSelectedTeam(teamRandom)
          }
      }
      anime(params)
  }
  

  
  return (
    <div className="App">
      <div className="AEENI_Logo">
           <img   className="AEENI_Logo" src={Logo} alt="logo"/>
      </div>
      <div className="devhunt">
          <h1 >DEVHUNT</h1>  
      </div>
      <div className="final">
          <h1 className="">LA FINALE</h1>
      </div>
      <h1>10 équipes en lice  pour 2 tickets à l'HIU</h1>
     
        <div className="teams">
          {loading && (
              <div className="loading-animation">
                <Lottie options={defaultOptions} height={200} width={200} />
              </div>
          )}

          {teams.map((team,index) => (
            <div
              key={team.id}
              className={`team ${team === selectedTeam ? "selected" : ""} ${
                shuffle ? "animated tada" : ""
              }`}
              onClick={() => handleTeamClick(team)}
            >  
              <div className="rank">
                  <div className="index">{index + 1}</div>
              </div>
              <div className="about">
                  <img className="logo" src={team.src} alt={team.alt} />
                  <div className="teams_names">{team.name}</div>
                  
              </div>
            </div>
          ))}
        </div>
     

      <button className="btn" onClick={Anime}>
        Lancer le tirage au sort
      </button>
    </div>
  );
}

export default App;