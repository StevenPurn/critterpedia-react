import React, { useState, useMemo } from "react";

import search from "./search";

import Github from "./components/github";

import HemisphereSelect from "./components/hemisphere-select";
import CritterSelect from "./components/critter-select";
import Results from "./components/results";

import Spacer from "./components/spacer";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [hemisphere, setHemisphere] = useState("northern");
  const [leavingNow, setLeavingNow] = useState(false);
  const [critterType, setCritterType] = useState("both");

  const resultsList = useMemo(
    () => search({ searchText, leavingNow, hemisphere, critterType }),
    [searchText, leavingNow, critterType]
  );

  const handleChange = event => setSearchText(event.target.value);

  const changeHemisphere = ({ value }) => {
    setHemisphere(value);
  };

  const LeavingNow = () => (
    <label>
      Leaving this month
      <input
        type="checkbox"
        onChange={() => {
          setLeavingNow(!leavingNow);
        }}
        checked={leavingNow}
      />
    </label>
  );

  const CritterType = () => {};

  return (
    <div className="main">
      <h1>Animal Crossing Critter Search</h1>
      <div className="search-wrapper">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search By Name"
            value={searchText}
            onChange={handleChange}
          ></input>
        </div>
        <Spacer width="40px" />
        <HemisphereSelect handleChange={changeHemisphere} />
      </div>
      <div className="filters">
        <LeavingNow />
        <CritterSelect handleChange={({ value }) => setCritterType(value)} />
      </div>
      <Results results={resultsList} hemisphere={hemisphere} />
      <Github />
    </div>
  );
};

export default App;
