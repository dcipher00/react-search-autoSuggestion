import "./styles.css";
import React, { useState, useEffect } from "react";
import * as searchdata from "./data.json";

export default function App() {
  const [data, setData] = useState("");
  const [prediction, setPrediction] = useState([]);

  useEffect(() => {
    if (data) {
      searching();
    } else {
      setPrediction([]);
    }
  }, [data]);

  const handlePress = (e) => {
    if ((e.keyCode === 9 || e.keyCode === 39) && prediction.length > 0) {
      setData(prediction[0].model);
    }
  };

  // const debounce = function (fn, d) {
  //   let timer;
  //   return function () {
  //     let context = this,
  //       args = arguments;
  //     clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       searching.apply(context, arguments);
  //     }, d);
  //   };
  // };

  // const debounceFunction = useCallback(debounce(searching, 300),[data]);

  function searching() {
    let search = searchdata;
    var re = new RegExp(`^${data}`, "gi");
    let predict = search.cars.filter((text) => text.model.match(re));
    setPrediction(predict);
  }

  return (
    <div className="App">
      <h1>Search</h1>
      <h4>Auto Suggestions</h4>
      <input
        className="input"
        name="item"
        placeholder="Search"
        value={data}
        autoComplete="off"
        onKeyDown={handlePress}
        onChange={(e) => setData(e.target.value)}
      />
      {/* <div
        class="editable"
        data-placeholder={`${prediction.length > 0 ? prediction[0].model : ""}`}
      ></div> */}
      {prediction.length > 0 && (
        <div className="list">
          {prediction.map((text, index) => {
            return (
              <li className="listEle" key={index}>
                {text.model}
              </li>
            );
          })}
        </div>
      )}
      {prediction.length ? (
        <span>press Right Arrow or Tab to complete auto suggestion</span>
      ) : (
        ""
      )}
    </div>
  );
}
