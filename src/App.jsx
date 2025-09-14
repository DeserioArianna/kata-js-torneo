import { useEffect } from "react";
import fighters from "./data/fighters";
import weapons from "./data/weapons";

function App() {
  useEffect(() => {
    console.log("=== TORNEO BOOLKAICHI ===");

    // 🔥 Fase 1 - Scelta Armi
    let availableWeapons = [...weapons];
    const fightersWithWeapons = fighters.map(f => {
      const randomIndex = Math.floor(Math.random() * availableWeapons.length);
      const chosenWeapons = availableWeapons[randomIndex];
      availableWeapons.splice(randomIndex, 1);
      return { ...f, weapon: chosenWeapons };
    });
    console.log("Fase 1 - Scelta Armi:", fightersWithWeapons);

    // 💪 Fase 2 - Allenamento
    const trainedFighters = fightersWithWeapons.map(f => {
      const multiplier = Math.floor(Math.random() * 100) + 1;
      return { ...f, power: f.power * multiplier };
    });
    console.log("Fase 2 - Allenamento:", trainedFighters);

    // 🎯 Fase 3 - Qualificazione
    const qualifiedFighters = trainedFighters.filter(f =>
      f.power >= 2000
    );
    console.log("Fase 3 - Qualificazione:", qualifiedFighters);

    // ⚔️ Fase 4 - Combattimento
    let fightersForBattle = [...qualifiedFighters];

    while (fightersForBattle.length > 4) {
      let winners = [];
      console.log("\n--- Nuovo round ---");
      console.log("Partecipanti al round:", fightersForBattle.map(f => f.name));



      for (let i = 0; i < fightersForBattle.length; i += 2) {
        const fighter1 = fightersForBattle[i];
        const fighter2 = fightersForBattle[i + 1];

        if (!fighter1 || !fighter2) {
          console.log("⚠️ Coppia incompleta, salto...");
          continue;
        }

        console.log(`Sfida: ${fighter1.name} (power: ${fighter1.power}) vs ${fighter2.name} (power: ${fighter2.power})`);
        const winner = fighter1.power >= fighter2.power ? fighter1 : fighter2;
        console.log(`🏆 Vincitore: ${winner.name}`);
        winners.push(winner);
      }

      console.log("Vincitori del round:", winners.map(f => f.name));
      fightersForBattle = winners;
    }

    // 🏅 SEMIFINALI
    if (fightersForBattle.length % 2 !== 0) {
      fightersForBattle.push({ name: "Robot", power: 4000, weapon: "Ascia" });
      console.log("🤖 Robot aggiunto! Nuovi partecipanti:", fightersForBattle.map(f => f.name));
    }

    let semifinalisti = [...fightersForBattle];
    let semifinalWinners = [];
    let semifinalLosers = [];

    // Semifinale 1
    const semi1_f1 = semifinalisti[0];
    const semi1_f2 = semifinalisti[1];
    const semi1_winner = semi1_f1.power >= semi1_f2.power ? semi1_f1 : semi1_f2;
    const semi1_loser = semi1_f1.power >= semi1_f2.power ? semi1_f2 : semi1_f1;
    semifinalWinners.push(semi1_winner);
    semifinalLosers.push(semi1_loser);
    console.log("\n--- Semifinale 1 ---");
    console.log(`Sfida: ${semi1_f1.name} (power: ${semi1_f1.power}) vs ${semi1_f2.name} (power: ${semi1_f2.power})`);
    console.log(`🏆 Vincitore: ${semi1_winner.name}`);

    // Semifinale 2
    const semi2_f1 = semifinalisti[2];
    const semi2_f2 = semifinalisti[3];
    const semi2_winner = semi2_f1.power >= semi2_f2.power ? semi2_f1 : semi2_f2;
    const semi2_loser = semi2_f1.power >= semi2_f2.power ? semi2_f2 : semi2_f1;
    semifinalWinners.push(semi2_winner);
    semifinalLosers.push(semi2_loser);
    console.log("\n--- Semifinale 2 ---");
    console.log(`Sfida: ${semi2_f1.name} (power: ${semi2_f1.power}) vs ${semi2_f2.name} (power: ${semi2_f2.power})`);
    console.log(`🏆 Vincitore: ${semi2_winner.name}`);

    // 🏆 FINALE (1° e 2° posto)
    const final_f1 = semifinalWinners[0];
    const final_f2 = semifinalWinners[1];
    const firstPlace = final_f1.power >= final_f2.power ? final_f1 : final_f2;
    const secondPlace = final_f1.power >= final_f2.power ? final_f2 : final_f1;
    console.log("\n--- Finale ---");
    console.log(`Sfida: ${final_f1.name} (power: ${final_f1.power}) vs ${final_f2.name} (power: ${final_f2.power})`);
    console.log(`🏆 Vincitore: ${firstPlace.name}`);


    // 🥉 FINALINA (3° posto)
    let thirdPlace = null;
    if (semifinalLosers.length === 2) {
      const third_f1 = semifinalLosers[0];
      const third_f2 = semifinalLosers[1];
      thirdPlace = third_f1.power >= third_f2.power ? third_f1 : third_f2;
      console.log("\n--- Finale per il 3 posto ---");
      console.log(`Sfida: ${third_f1.name} (power: ${third_f1.power}) vs ${third_f2.name} (power: ${third_f2.power})`);
      console.log(`🏆 Vincitore: ${thirdPlace.name}`);
    }

    // Podio ordinato
    const podium = [firstPlace, secondPlace, thirdPlace].filter(Boolean);

    //console.log("Semifinalisti:", semifinalisti);
    //console.log("Finalisti:", semifinalWinners);
    //console.log("Sconfitti delle semifinali:", semifinalLosers);
    console.log("Fase 5 - Premiazione (podio):", podium);

  }, []);

  return <h1>Torneo Boolkaichi</h1>;
}

export default App;