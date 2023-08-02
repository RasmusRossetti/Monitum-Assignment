import { styled } from "styled-components"
import { useFetch } from "../hooks/useFetch"
import { useEffect } from "react"
import { StockModel } from "../models/dataModel"

const Container = styled.div`
  width: 90%;
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

const Button = styled.button`
  font-size: 20px;
  padding: 15px 35px 15px 35px;
  cursor: pointer;
  border: 1.5px solid;
  margin-bottom: 30px;
  border-color: #ccc;
  color: #333;

  &:hover {
    background-color: #c0c0c0;
    border-color: #999;
    color: #222;
  }
`

export const StockPage: React.FC = () => {
  const apiKey = import.meta.env.VITE_API_KEY
  const currentUrl = window.location.href
  const symbol = currentUrl.split("/stock/")[1]
  const searchUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`

  const { data, loading, fetchData } = useFetch<StockModel>(searchUrl)
  console.log(data)

  const handleGoBack = (): void => {
    window.history.back()
  }

  useEffect(() => {
    fetchData()
  }, [symbol])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <Button onClick={handleGoBack}>Go back</Button>
      <Title>{data?.Name}</Title>
      <SubTitle>{data?.Address}</SubTitle>
      <SubTitle>{data?.MarketCapitalization}</SubTitle>
      <Description>{data?.Description}</Description>
    </Container>
  )
}
