// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/";
const COHORT = "2508 -Caiti"; // Make sure to change this!
const API = BASE + COHORT;

// === State ===
let parties = [];
let selectedParty = {};

/** Updates state with all parties from the API */
const getParties = async () => {
  try {
    const res = await fetch(`${API}/events`);
    const result = await res.json();
    parties = result.data;
  } catch (err) {
    console.log(err);
  }
};

getParties();
console.log(parties);

/** Updates state with a single party from the API */
const getEvent = async (id) => {
  try {
    const res = await fetch(`${API}/events/${id}`);
    const result = await res.json();
    console.log(result.data);
  } catch (err) {
    console.log(err);
  }
};

getEvent();

// === Components ===

/** Party name that shows more details about the party when clicked */

/** A list of names of all parties */

/** Detailed information about the selected party */

/** List of guests attending the selected party */

// === Render ===
