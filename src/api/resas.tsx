import axios from 'axios'

const apiKey = import.meta.env.VITE_API_KEY
const baseUrl = 'https://opendata.resas-portal.go.jp/api/v1'

// 都道府県一覧を取得する関数
export const getPrefectures = async () => {
  try {
    const response = await axios.get(`${baseUrl}/prefectures`, {
      headers: { 'X-API-KEY': apiKey }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching prefectures:', error)
    throw error
  }
}

// 指定した都道府県の人口データを取得する関数
export const getPopulationData = async (prefCode: number) => {
  try {
    const response = await axios.get(
      `${baseUrl}/population/composition/perYear?prefCode=${prefCode}`,
      {
        headers: { 'X-API-KEY': apiKey }
      }
    )
    return response.data
  } catch (error) {
    console.error(
      `Error fetching population data for prefecture code ${prefCode}:`,
      error
    )
    throw error
  }
}
