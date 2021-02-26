import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './Columns'
import './History.css'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'

const History = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable({
        columns,
        data
    })

    const { getTableProps,
            getTableBodyProps, 
            headerGroups, 
            rows, 
            prepareRow } = tableInstance 

    return (
        <div>
        <NavBar loggedIn={true}/>
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map( column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map( cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
            <h4>Version 1.0.0</h4>
            <Link to='/'>Go Back</Link>
            
        </table>
        </div>
        
    )
}

export default History
