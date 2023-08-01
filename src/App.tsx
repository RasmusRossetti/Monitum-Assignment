import React, { useState } from "react"
import Header from "./components/header/Header"
import Main from "./pages/Main"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { StockPage } from "./pages/StockPage"
import { PortfolioContext } from "./context/usePortfolioContext"
import { PortfolioItem } from "./models/dataModel"

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />
    },
    {
      path: "stock/:Id",
      element: <StockPage />
    }
  ])

  // State for portfolio data
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([
    {
      companyName: "string",
      symbol: "string"
    }
  ])

  return (
    <PortfolioContext.Provider value={{ portfolioData, setPortfolioData }}>
      <>
        <Header />
        <RouterProvider router={router} />
      </>
    </PortfolioContext.Provider>
  )
}

export default App
