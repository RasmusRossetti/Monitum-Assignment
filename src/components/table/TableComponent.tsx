import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const StyledTable = styled.table`
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
const Button = styled.button`
  border: none;
  cursor: pointer;
  color: #333;
  width: 60%;
  &:hover {
    background-color: #c0c0c0;
    border-color: #999;
    color: #222;
  }
`

interface TableProps {
  portfolioData: { companyName: string; symbol: string }[]
  handleDeleteButtonClick: (index: number) => void
}

const TableComponent: React.FC<TableProps> = ({
  portfolioData,
  handleDeleteButtonClick
}) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Symbol</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {portfolioData.map((item, index) => (
          <tr key={index}>
            <td>
              <Link to={`/stock/${item.symbol}`}>{item.companyName}</Link>
            </td>
            <td>{item.symbol}</td>

            <td>
              <Button onClick={() => handleDeleteButtonClick(index)}>
                Remove
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}

export default TableComponent
