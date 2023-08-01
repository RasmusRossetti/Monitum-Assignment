import { useState } from "react"

// The type for the response should match the SearchResult interface
export interface SearchResult {
  bestMatches: {
    "1. symbol": string
    "2. name": string
    "3. type": string
    "4. region": string
    "5. marketOpen": string
  }[]
}

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const fetchedData = await response.json()
      setData(fetchedData)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      setLoading(false)
    }
  }

  return { data, loading, fetchData }
}
