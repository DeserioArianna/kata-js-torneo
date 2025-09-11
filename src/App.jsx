import { useEffect } from "react";
import fighters from "./data/fighters";
import weapons from "./data/weapons";

function App() {
  useEffect(() => {
    console.log("=== TORNEO BOOLKAICHI ===");

    // 🔥 Fase 1 - Scelta Armi
    // ogni combattente sceglie un'arma casuale
    let availableWeapons = [...weapons]; 
    const fightersWithWeapons = fighters.map(f => {
      // TODO: logica scelta arma con Math.random()
      const randomIndex = Math.floor(Math.random() * availableWeapons.length);
      const chosenWeapons = availableWeapons[randomIndex]; 
      availableWeapons.splice(randomIndex, 1);
      return { ...f, weapon: chosenWeapons };
    });
    console.log("Fase 1 - Scelta Armi:", fightersWithWeapons);

    // 💪 Fase 2 - Allenamento
    // moltiplica la potenza per un numero casuale tra 1 e 100
    const trainedFighters = fightersWithWeapons.map(f => {
      // TODO: logica incremento potenza
      const multiplier = Math.floor(Math.random() * 100) + 1;
      return { ...f, power: f.power * multiplier};
    });
    console.log("Fase 2 - Allenamento:", trainedFighters);

    // 🎯 Fase 3 - Qualificazione
    // restano solo i combattenti con potenza >= 2000
    const qualifiedFighters = trainedFighters.filter(f => 
      // TODO: condizione per tenere chi ha almeno 2000 di potenza
      f.power >= 2000
    );
    console.log("Fase 3 - Qualificazione:", qualifiedFighters);

    // ⚔️ Fase 4 - Combattimento
    // i combattenti si affrontano a coppie
    let winners = [];
    let fightersForBattle = [...qualifiedFighters];

    // TODO: se i combattenti sono dispari, aggiungere Robot con power 4000
    if(fightersForBattle.length % 2 !== 0){
        fightersForBattle.push({ name: "Robot", power: 4000, weapon: "Ascia"});
    }
    console.log("Fighters for battle:", fightersForBattle);

    for (let i = 0; i < fightersForBattle.length; i += 2) {
      const fighter1 = fightersForBattle[i];
      const fighter2 = fightersForBattle[i + 1];
      // TODO: logica per stabilire il vincitore
      const winner = fighter1.power >= fighter2.power ? fighter1 : fighter2;
      winners.push(winner); // placeholder
    }
    console.log("Fase 4 - Combattimento:", winners);

    // 🏆 Fase 5 - Premiazione
    // prendi i 3 con più potenza
    const podium = winners
      .sort((a, b) => b.power - a.power)
      .slice(0, 3);

    console.log("Fase 5 - Premiazione:", podium);

  }, []);

  return <h1>Torneo Boolkaichi</h1>;
}

export default App;