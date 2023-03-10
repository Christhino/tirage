import React, { useState, useEffect } from "react";
import anime from "animejs";

import "./App.css";


function App() {
  const [teams, setTeams] = useState([
    { id: 1, name: "Tetsuya" },
    { id: 2, name: "CODEO" },
    { id: 3, name: "EIGST" },
    { id: 4, name: "Yasai " },
    { id: 5, name: "CodeVerse" },
    { id: 6, name: "Storm" },
    { id: 7, name: "CONST" },
    { id: 8, name: "UC Team" },
    { id: 9, name: "AC63" },
    { id: 10, name: "Teknium" },
  ]);

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [shuffle, setShuffle] = useState(false);
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
    if (!shuffle) {
      setSelectedTeam(team);
      const index = teams.findIndex((t) => t.id === team.id);
      const nextIndex = (index + 1) % teams.length;
      const temp = teams[nextIndex];
      teams[nextIndex] = team;
      teams[index] = temp;
      setTeams([...teams]);
    }
  };
   
  const Anime =  () => {
      const params = {
          targets: '.team',
          translateY: [
            { value: -60, duration: 500 },
            { value: 0, duration: 800, easing: 'spring(1, 80, 10, 0)' },
          ],
          delay: (el, i) => i * 50,
          complete: () => {
            const  teamRandom  = shuffleTeams();
            setSelectedTeam(teamRandom)
          }
      }

      anime(params)
  }
  

  const handleStartDrawing = () => {
    setIsDrawing(true);
    const animation = anime({
      targets: ".cage",
      translateX: [
        { value: 20, duration: 1000 },
        { value: -20, duration: 1000 },
        { value: 0, duration: 1000 }
      ],
      loop: true,
      easing: "linear",
      complete: () => {
        setSelectedTeam(teams[Math.floor(Math.random() * teams.length)]);
        setIsDrawing(false);
        animation.pause();
      }
    });
  };
  
  return (
    <div className="App">
      <h1>Jeu de tirage aléatoire des équipes</h1>
      <div className="teams">
        {teams.map((team) => (
          <div
            key={team.id}
            className={`team ${team === selectedTeam ? "selected" : ""} ${
              shuffle ? "animated tada" : ""
            }`}
            onClick={() => handleTeamClick(team)}
          >
            {team.name}
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