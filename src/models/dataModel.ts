export interface SearchResult {
  bestMatches: {
    "1. symbol": string
    "2. name": string
    "3. type"?: string // Optional, if it's not always present
    "4. region"?: string // Optional, if it's not always present
    "5. marketOpen"?: string // Optional, if it's not always present
    // Other properties as needed
  }[]
}
export interface StockModel {
  Address: string
  MarketCapitalization: string
  Name: string
  Description: string
}
export interface PortfolioItem {
  companyName: string
  symbol: string
}
