import { styled } from "styled-components"
import { useFetch } from "../hooks/useFetch"
import { useEffect } from "react"
import { StockModel } from "../models/dataModel"

const Container = styled.div`
  width: 80%;
  margin: 20px auto;
`

const Title = styled.h1`
  font-size: 38px;
  margin-bottom: 10px;
`

const SubTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 5px;
`

const Description = styled.p`
  font-size: 16px;
`

export const StockPage: React.FC = () => {
  const apiKey = import.meta.env.VITE_API_KEY
  const currentUrl = window.location.href
  const symbol = currentUrl.split("/stock/")[1]
  const searchUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`
  console.log(symbol)

  useEffect(() => {
    fetchData()
  }, [searchUrl])

  const { data, loading, fetchData } = useFetch<StockModel>(searchUrl)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <Title>{data?.Name}</Title>
      <SubTitle>{data?.Address}</SubTitle>
      <SubTitle>{data?.MarketCapitalization}</SubTitle>
      <Description>{data?.Description}</Description>
    </Container>
  )
}
