// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/";
const COHORT = "2508"; // Make sure to change this!
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

/** Updates state with a single party from the API */
const getEvent = async (id) => {
  try {
    const res = await fetch(`${API}/events/${id}`);
    const result = await res.json();
    selectedParty = result.data;
  } catch (err) {
    console.log(err);
  }
};

// === Components ===
/** Detailed information about the selected party */
function PartyDetails(sp) {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to learn more.";
    return $p;
  }

  const $party = document.createElement("section");
  $party.classList.add("party");
  $party.innerHTML = `
    <h3>${sp.name} #${sp.id}</h3>
    <figure>
      <img alt=${sp.name} src=${sp.imgUrl} />
    </figure>
    <p>${sp.description}</p>
    <button>Remove artist</button>
  `;

  return $party;
}

/** Party name that shows more details about the party when clicked */
function PartyListItem(party) {
  const $li = document.createElement("li");
  console.log(party)
  $li.innerHTML = `
    <a href="#selected">${party.name}</a>
  `;
  $li.addEventListener("click", () => {
    getEvent(party.id)
    PartyDetails(party)
  });
  
  return $li;
};

/** A list of names of all parties */
function PartyList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("PartySchedule")

  const $parties = parties.map((party) => PartyListItem(party));
  $ul.replaceChildren(...$parties);

  return $ul;
}


/** List of guests attending the selected party */
// function NewPartyForm() {
//   const $form = document.createElement("form");
//   $form.innerHTML `
//     <label>
//       Name
//       <input name="name" required />
//     </ label>
//     <label>
//       Description
//       <input name="description" required />
//     </label>
//     <label>
//       Profile Picture
//       <input name="imgUrl" required />
//     </label>
//     <button>Create Party</button>
//   `;

//   return $form;
// }


// === Render ===

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
  <h1>Party Planner Admin</h1>
    <main>
      <section>
        <h2>Party Schedule</h2>
        <PartyList></PartyList>
        <h3>Create a New Party</h3>
        <NewPartyForm></NewPartyForm>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <PartyDetails></PartyDetails>
      </section>
    </main>
  `;
  $app.querySelector("PartyList").replaceWith(PartyList());
  // $app.querySelector("NewPartyForm").replaceWith(NewPartyForm());
  $app.querySelector("PartyDetails").replaceWith(PartyDetails());
}

async function init() {
  await getParties();
  render();
}

init();
