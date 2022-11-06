import React, { useEffect, useState } from "react";
import "./App.css";
import md5 from "md5";
import axios from "axios";

const App = () => {
  const [apiKey, setApiKey] = useState("MakZxZRrNBk7K2FEYuLWbRZHQCVWQaNH");
  const [secretKey, setSecretKey] = useState(
    "zT7rR6XOFtwuYM28r9luV4IbTVMvh4cIkdyVzjpv"
  );
  const [signature, setSignature] = useState("");
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime / 1000);
    setTimestamp(timestamp);
    setSignature(md5(apiKey + secretKey + timestamp));
  }, []);

  useEffect(() => {
    //getClassMarkerInit();
    //getTestLinksResults();
    getTestGroupsResults();
  }, [signature]);

  const getTestGroupsResults = async () => {
    if (!!signature?.length) {
      let url = `https://api.classmarker.com/v1/groups/recent_results.json?api_key=${apiKey}&signature=${signature}&timestamp=${timestamp}`;
      await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log("response: ", response);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    }
  };

  const getClassMarkerInit = async () => {
    if (!!signature?.length) {
      let url = `https://api.classmarker.com/v1.json?api_key=${apiKey}&signature=${signature}&timestamp=${timestamp}`;
      await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log("response: ", response);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    }
  };

  const getTestLinksResults = async () => {
    if (!!signature?.length) {
      let url = `https://api.classmarker.com/v1/links/recent_results.json?api_key=${apiKey}&signature=${signature}&timestamp=${timestamp}`;
      await axios
        .get(url, {
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
          },
        })
        .then((response) => {
          console.log("response: ", response);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    }
  };

  return <div className="App"></div>;
};

export default App;
