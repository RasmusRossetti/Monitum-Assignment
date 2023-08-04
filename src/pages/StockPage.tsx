import { styled } from "styled-components"
import { useFetch } from "../hooks/useFetch"
import { useEffect } from "react"
import { StockModel } from "../models/dataModel"
import { Link } from "react-router-dom"

const Container = styled.div`
  width: 90%;
  margin: 20px auto;
`

const Title = styled.h1`
  font-size: 38px;
  margin-top: 60px;
  margin-bottom: 10px;
`

const SubTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 5px;
`

const Description = styled.p`
  font-size: 16px;
`

const LimitExceededMessage = styled.p`
  font-size: 20px;
  padding: 15px 35px 15px 35px;
  border: 1.5px solid;
  margin-top: 60px;
  border-color: #ccc;
  color: #333;
`
const StyledLink = styled(Link)`
  font-size: 20px;
  padding: 15px 35px 15px 35px;
  cursor: pointer;
  border: 1.5px solid;
  margin-bottom: 30px;
  border-color: #ccc;
  color: #333;
  text-decoration: none;
  position: relative;
  top: 30px;

  &:hover {
    background-color: #c0c0c0;
    border-color: #999;
    color: #222;
  }
`

const ErrorMessage = styled.div`
  margin-top: 70px;
`

export const StockPage: React.FC = () => {
  const apiKey = import.meta.env.VITE_API_KEY
  const currentUrl = window.location.href
  const symbol = currentUrl.split("/stock/")[1]
  const searchUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`

  const { data, loading, fetchData } = useFetch<StockModel>(searchUrl)
  console.log(data)

  useEffect(() => {
    fetchData()
  }, [symbol])

  if (loading) {
    return <div>Loading...</div>
  }

  if (
    data &&
    data.Note &&
    data.Note.includes("Thank you for using Alpha Vantage!")
  ) {
    return (
      <Container>
        <StyledLink to={`/`}>Go back</StyledLink>
        <LimitExceededMessage>{data.Note}</LimitExceededMessage>
      </Container>
    )
  }

  if (!data || Object.keys(data).length === 0 || undefined) {
    return (
      <Container>
        <StyledLink to={`/`}>Go back</StyledLink>
        <ErrorMessage>Error: Data not found.</ErrorMessage>
      </Container>
    )
  }

  return (
    <Container>
      <StyledLink to={`/`}>Go back</StyledLink>
      <Title>{data?.Name}</Title>
      <SubTitle>{data?.Address}</SubTitle>
      <SubTitle>{data?.MarketCapitalization}</SubTitle>
      <Description>{data?.Description}</Description>
    </Container>
  )
}
