import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './Columns'
import './History.css'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import {useState} from 'react'
import axios from 'axios'
import {Row, Col, Container} from 'react-bootstrap'
import * as ReactBootstrap from 'react-bootstrap'

const History = () => {
    const [userList, setUserList] = useState([])
    const componentDidMount = () => {
        axios.get('http://localhost:4000/history')
            .then(res => {
                setUserList(res.data);
                console.log(userList)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    componentDidMount()

    const renderHistory = (data, index) => {
        return(
            <tr>
                <td>{data.username}</td>
                <td>{data.gallons_requested}</td>
                <td>{data.delivery_address}</td>
                <td>{data.delivery_date}</td>
                <td>{data.price_per_gallon}</td>
                <td>{data.amount_due}</td>
            </tr>
        )
    }

    return (
        <div>
            <NavBar loggedIn={true}/>

            <ReactBootstrap.Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Gallons Requested</th>
                        <th>Delivery Address</th>
                        <th>Delivery Date</th>
                        <th>Price Per Gallon</th>
                        <th>Amount Due</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map(renderHistory)}
                </tbody>
            </ReactBootstrap.Table>

            {/*
            <Container>{userList.map((data, i) => {console.log(data.username); return <Row><Col>{data.username}</Col><Col>{data.gallons_requested}</Col></Row>;})}</Container>
            */}
        </div>
    )
/*
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
        
    )*/
}

export default History
