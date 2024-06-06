import React, { useEffect, useState } from "react";
import CheckField from "./CheckField";
import Graph from "./Graph";
import axios from "axios";
import { useResponsiveStyles } from "../styles";

const Main: React.FC = () => {
  const Styles = useResponsiveStyles();
  const [prefectures, setPreFectures] = useState<{
    message: null;
    result: {
      prefCode: number;
      prefName: string;
    }[];
  } | null>(null);
  const [prefPopulation, setPrefPopulation] = useState<
    { prefName: string; data: { year: number; value: number }[] }[]
  >([]);
  const [populationType, setPopulationType] = useState<string>("総人口");

  useEffect(() => {
    axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": import.meta.env.VITE_API_KEY },
      })
      .then((results) => {
        setPreFectures(results.data);
      })
      .catch((error) => {
        console.error("Error fetching prefectures:", error);
      });
  }, []);

  const handleClickCheck = (prefName: string, prefCode: number, check: boolean) => {
    let c_prefPopulation = [...prefPopulation];

    if (check) {
      if (c_prefPopulation.some((value) => value.prefName === prefName)) return;

      axios
        .get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`, {
          headers: { "X-API-KEY": import.meta.env.VITE_API_KEY },
        })
        .then((results) => {
          const populationData = results.data.result.data;
          const data = populationData.find((d: any) => d.label === populationType)?.data || [];
          c_prefPopulation.push({
            prefName: prefName,
            data: data,
          });
          setPrefPopulation(c_prefPopulation);
        })
        .catch((error) => {
          console.error(`Error fetching population data for ${prefName}:`, error);
        });
    } else {
      setPrefPopulation(c_prefPopulation.filter((value) => value.prefName !== prefName));
    }
  };

  const handlePopulationTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPopulationType(event.target.value);
  };

  return (
    <main style={Styles.main}>
      <h2 style={Styles.label}>都道府県</h2>
      {prefectures && <CheckField prefectures={prefectures.result} onChange={handleClickCheck} />}

      <h2 style={Styles.label}>人口推移グラフ</h2>
      <div style={Styles.dropdownContainer}>
        <select style={Styles.dropdown} value={populationType} onChange={handlePopulationTypeChange}>
          <option value="総人口">総人口</option>
          <option value="年少人口">年少人口</option>
          <option value="生産年齢人口">生産年齢人口</option>
          <option value="老年人口">老年人口</option>
        </select>
      </div>
      <Graph populationdata={prefPopulation} />
    </main>
  );
};

export default Main;
