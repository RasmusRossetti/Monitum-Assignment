import { createContext, useContext } from "react"
import { PortfolioItem } from "../models/dataModel"

interface PortfolioContextValue {
  portfolioData: PortfolioItem[]
  setPortfolioData: React.Dispatch<React.SetStateAction<PortfolioItem[]>>
}

export const PortfolioContext = createContext<PortfolioContextValue>({
  portfolioData: [],
  setPortfolioData: () => {}
})

export const usePortfolioContext = () => useContext(PortfolioContext)
