import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import AccDetails from './AccDetails.json'
import { ACCCOLUMNS } from './AccColumns'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'

const AccountDetails = () => {

    const columns = useMemo(() => ACCCOLUMNS, [])
    const data = useMemo(() => AccDetails, [])

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
        <>
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
        </>
    )
}

export default AccountDetails
