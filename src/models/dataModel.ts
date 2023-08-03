export interface SearchResult {
  bestMatches: {
    "1. symbol": string
    "2. name": string
    "3. type"?: string
    "4. region"?: string
    "5. marketOpen"?: string
  }[]
}
export interface StockModel {
  Address: string
  MarketCapitalization: string
  Name: string
  Description: string
  Note?: string
}
export interface PortfolioItem {
  companyName: string
  symbol: string
}
