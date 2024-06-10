import React, { useEffect, useState, useCallback } from 'react'
import CheckField from './CheckField'
import Graph from './Graph'
import axios from 'axios'
import { useResponsiveStyles } from '../styles'

const Main = (): React.ReactElement => {
  const Styles = useResponsiveStyles()
  const [prefectures, setPrefectures] = useState<{
    message: null
    result: {
      prefCode: number
      prefName: string
    }[]
  } | null>(null)
  const [prefPopulation, setPrefPopulation] = useState<
    { prefName: string; data: { year: number; value: number }[] }[]
  >([])
  const [populationType, setPopulationType] = useState<string>('総人口')
  const [error, setError] = useState<string | null>(null)  // エラーメッセージの状態を追加

  useEffect(() => {
    axios
      .get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: { 'X-API-KEY': process.env.VITE_API_KEY }
      })
      .then((results) => {
        setPrefectures(results.data)
        setError(null)  // エラーメッセージをクリア
      })
      .catch((err) => {
        console.error('Error fetching prefectures:', err)
        setError('Error fetching prefectures')  // エラーメッセージを設定
      })
  }, [])

  const fetchPopulationData = useCallback((prefCode: number, prefName: string) => {
    axios
      .get(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
        {
          headers: { 'X-API-KEY': process.env.VITE_API_KEY }
        }
      )
      .then((results) => {
        const populationData: {
          label: string
          data: { year: number; value: number }[]
        }[] = results.data.result.data
        const data =
          populationData.find((d) => d.label === populationType)?.data || []
        setPrefPopulation((prev) =>
          prev.map((p) =>
            p.prefName === prefName ? { prefName, data } : p
          )
        )
        setError(null)  // エラーメッセージをクリア
      })
      .catch((err) => {
        console.error(`Error fetching population data for ${prefName}:`, err)
        setError(`Error fetching population data for ${prefName}`)  // エラーメッセージを設定
      })
  }, [populationType])

  const handleClickCheck = (
    prefName: string,
    prefCode: number,
    check: boolean
  ) => {
    if (check) {
      setPrefPopulation((prev) => {
        if (prev.some((value) => value.prefName === prefName)) return prev
        fetchPopulationData(prefCode, prefName)
        return [...prev, { prefName, data: [] }]
      })
    } else {
      setPrefPopulation((prev) =>
        prev.filter((value) => value.prefName !== prefName)
      )
    }
  }

  useEffect(() => {
    prefPopulation.forEach((pref) => {
      const prefCode = prefectures?.result.find(
        (p) => p.prefName === pref.prefName
      )?.prefCode
      if (prefCode) {
        fetchPopulationData(prefCode, pref.prefName)
      }
    })
  }, [populationType, fetchPopulationData, prefectures])

  const handlePopulationTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPopulationType(event.target.value)
  }

  // Clearボタンが押されたときの処理
  const handleClear = () => {
    setPrefPopulation([]); // 人口データを空にする
  };

  return (
    <main data-testid="main" style={Styles.main}>
      <h2 style={Styles.label}>都道府県</h2>
      {error && <div data-testid="error-message" style={{ color: 'red' }}>{error}</div>}
      {prefectures && (
        <CheckField
          prefectures={prefectures.result}
          onChange={handleClickCheck}
          onClear={handleClear} // Clearボタンのコールバック関数を渡す
        />
      )}

      <h2 style={Styles.label}>人口推移グラフ</h2>
      <div style={Styles.dropdownContainer}>
        <select
          aria-label="人口推移グラフ"
          data-testid="population-type-dropdown"
          style={Styles.dropdown}
          value={populationType}
          onChange={handlePopulationTypeChange}
        >
          <option value='総人口'>総人口</option>
          <option value='年少人口'>年少人口</option>
          <option value='生産年齢人口'>生産年齢人口</option>
          <option value='老年人口'>老年人口</option>
        </select>
      </div>
      <Graph populationdata={prefPopulation} />
    </main>
  )
}

export default Main
