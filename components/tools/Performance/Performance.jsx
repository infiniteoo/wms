"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { separateByUser } from "./utils/dataManipulation";
import DataDisplay from "./Data";
import React, { memo } from "react";
import Loading from "./Loading";

import { IGNORED_USERS } from "./utils/constants";

const Performance = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userObject, setUserObject] = useState(null);
  const [dataFinallyLoaded, setDataFinallyLoaded] = useState(false);
  const [calledAxios, setCalledAxios] = useState(false);

  useEffect(() => {
    // If data is already there, do not fetch again
    if (calledAxios === true) return;

    const fetchData = async () => {
      try {
        setCalledAxios(true);
        setLoading(true);

        let result = await axios.get(
          process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
            ? `/api/excel/excel`
            : `https://tecvex.com/api/excel`
        );

        if (result) {
          console.log("result: ", result);
          setLoading(false);
          const filteredData = result.data.filter(
            (item) => !IGNORED_USERS.includes(item.user)
          );
          setData(filteredData);
          let compiledUserObject = separateByUser(filteredData);

          const filteredUserObject = Object.fromEntries(
            Object.entries(compiledUserObject).filter(
              ([key]) => !IGNORED_USERS.includes(key)
            )
          );

          setUserObject(filteredUserObject);
          setLoading(false);
          setDataFinallyLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {!loading ? (
        <main className="flex mt-3 min-h-screen flex-col justify-around relative z-50 bg-gray-200 text-black ">
          {dataFinallyLoaded && (
            <DataDisplay data={data} userObject={userObject} />
          )}
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default React.memo(Performance);
