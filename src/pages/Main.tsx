import styled from "styled-components"
import { useState } from "react"
import { useFetch } from "../hooks/useFetch"
import { SearchResult } from "../models/dataModel"
import TableComponent from "../components/table/TableComponent"
import { usePortfolioContext } from "../context/usePortfolioContext"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const LeftSection = styled.div`
  width: 50%;
  padding: 20px;
`

const RightSection = styled.div`
  width: 50%;
  padding: 20px;
`

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`

const Input = styled.input`
  width: 80%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
`

const SearchButton = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  margin: 10px 0px 10px 10px;
`

const SearchResultBox = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  min-height: 200px;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
  }
`
const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Align items vertically centered and push the "Add" button to the end */
`

const SymbolAndName = styled.div`
  display: flex;
  align-items: center;
`

const Symbol = styled.p`
  margin: 0;
  padding: 0;
  font-weight: bold;
`

const Name = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 400;
`

const AddButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px;
  margin: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
`

const Main: React.FC = () => {
  const apiKey = import.meta.env.VITE_API_KEY
  const [searchKeyword, setSearchKeyword] = useState("")
  const searchUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchKeyword}&apikey=${apiKey}`

  //Fetch hook
  const { data, loading, fetchData } = useFetch<SearchResult>(searchUrl)
  console.log(data)
  //Context state
  const { portfolioData, setPortfolioData } = usePortfolioContext()

  const handleSearchClick: () => void = () => {
    fetchData()
  }

  const handleAddButtonClick: (item: SearchResult["bestMatches"][0]) => void = (
    item
  ) => {
    const newItem = {
      companyName: item["2. name"],
      symbol: item["1. symbol"]
    }
    setPortfolioData((prevData) => [...prevData, newItem])
  }

  const handleDeleteButtonClick: (index: number) => void = (index) => {
    setPortfolioData((prevData) => {
      const newData = [...prevData]
      newData.splice(index, 1)
      return newData
    })
  }

  return (
    <Container>
      <LeftSection>
        <Title>Company Name</Title>
        <Input
          type="text"
          placeholder="Enter company name"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <SearchButton onClick={handleSearchClick}>Search</SearchButton>
        <Title>Search Results</Title>
        <SearchResultBox>
          {loading ? (
            "Loading..."
          ) : (
            <ul>
              {data?.bestMatches?.map((match, index) => (
                <div key={index}>
                  <FlexContainer>
                    <SymbolAndName>
                      <Symbol>{match["1. symbol"]} </Symbol>
                      <Name> -{match["2. name"]}</Name>
                    </SymbolAndName>
                    <AddButton onClick={() => handleAddButtonClick(match)}>
                      +
                    </AddButton>
                  </FlexContainer>
                </div>
              ))}
            </ul>
          )}
        </SearchResultBox>
      </LeftSection>
      <RightSection>
        <Title>Your Portfolio</Title>
        <TableComponent
          portfolioData={portfolioData}
          handleDeleteButtonClick={handleDeleteButtonClick}
        />
      </RightSection>
    </Container>
  )
}

export default Main
