import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cards from "./Cards";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../slice";
import { createContext } from "react";

const Data=createContext();

const Main = () => {
  const query = useSelector((state) => state.isTheme.query);
  const dispatch = useDispatch();
  const [details, setdetails] = useState({});
  // const [forcastdata, setforcastdata] = useState({})
  // const [query, setquery] = useState("siyana");
  const api_key = "86a6bc57d191ed2066cc5fa3ad17144d";

  // const handleSearch = (cityName) => {
  //   if (!cityName) return;
  //   const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${api_key}`;
  //  axios
  //     .get(url)
  //     .then((res) => {
  //       // console.log("response",res.data);
  //       setdetails(res.data);
  //     }).catch((err) => console.log("err", err));
  // };
  const handleForcast = (cityName) => {
    if (!cityName) return;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${api_key}`;
   axios
      .get(url)
      .then((res) => {
        console.log("response",res.data);
        // setforcastdata(res.data);
        setdetails(res.data);
      }).catch((err) => console.log("err", err));
  };

  // useEffect(() => {
  //   handleSearch("meerut");
  // }, []);
  useEffect(() => {
    // handleSearch(query);
    handleForcast(query);
  }, [query]);

  // console.log(details);

  return (
    <>
      <div className="main">
        <h1>React Weather App</h1>

        <label className="switch">
          <input type="checkbox" onClick={() => dispatch(toggleTheme())} />
          <span className="slider round"></span>
        </label>
      </div>
      {Object.keys(details).length>0 && 
      <Data.Provider value={details}>
      <Cards/>
      </Data.Provider>
      }
    </>
  );
};

export default Main;
export {Data};
