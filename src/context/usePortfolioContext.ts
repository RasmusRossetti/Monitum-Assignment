import { createContext, useContext } from "react"

interface PortfolioItem {
  companyName: string
  symbol: string
}

interface PortfolioContextValue {
  portfolioData: PortfolioItem[]
  setPortfolioData: React.Dispatch<React.SetStateAction<PortfolioItem[]>>
}

export const PortfolioContext = createContext<PortfolioContextValue>({
  portfolioData: [],
  setPortfolioData: () => {}
})

export const usePortfolioContext = () => useContext(PortfolioContext)
