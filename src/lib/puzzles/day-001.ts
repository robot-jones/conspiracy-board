import type { Puzzle } from "@/types";

const pigeons = { name: "Pigeons", symbol: "🐦" };
const moon = { name: "The Moon", symbol: "🌙" };
const decaf = { name: "Decaf Coffee", symbol: "☕" };
const towers = { name: "Radio Towers", symbol: "📡" };
const yawning = { name: "Yawning", symbol: "😴" };
const salt = { name: "Salt", symbol: "🧂" };
const staticNoise = { name: "Static", symbol: "📺" };
const dst = { name: "Daylight Saving", symbol: "🕰️" };
const wisdomTeeth = { name: "Wisdom Teeth", symbol: "🦷" };
const fog = { name: "Morning Fog", symbol: "🌫️" };

const puzzle: Puzzle = {
  date: "2026-05-09",
  subjects: [pigeons, moon, decaf, towers, yawning, salt, staticNoise, dst, wisdomTeeth, fog],
  solution: {
    connections: [
      { source: towers, type: "Controls", target: pigeons },
      { source: pigeons, type: "Harvests", target: staticNoise },
      { source: staticNoise, type: "Signals", target: fog },
      { source: fog, type: "Masks", target: salt },
      { source: salt, type: "Distracts from", target: wisdomTeeth },
      { source: wisdomTeeth, type: "Signals", target: moon },
      { source: moon, type: "Controls", target: yawning },
      { source: yawning, type: "Distracts from", target: decaf },
      { source: decaf, type: "Masks", target: dst },
      { source: dst, type: "Controls", target: towers },
    ],
  },
};

export default puzzle;
