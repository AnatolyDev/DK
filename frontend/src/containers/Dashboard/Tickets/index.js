import React, { useState, useEffect } from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { ticketsAPI } from '../../../api';

const columns = [
    { id: 'id', label: 'ID', minWidth: 30 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'date_pokupki', label: 'Дата покупки', minWidth: 170 },
    { id: 'event_date', label: 'Дата события', minWidth: 170 },
    { id: 'event_title', label: 'Событие', align: 'center', minWidth: 170 }
  ];

const Tickets = () => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = useState([]);

    useEffect(
        () => {
            async function getTicketsOfUser(userID) {
                const tickets = await ticketsAPI.getTickets(userID);
                setRows(tickets.tickets);
            }
            getTicketsOfUser(1);
        }
    )

    return (
        <Paper className='root'>
            <TableContainer className='container'>
                <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                    <TableRow>
                    {columns.map(column => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                    return (
                        <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                        {columns.map(column => {
                            const value = row[column.id];
                            return (
                            <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                            );
                        })}
                        </TableRow>
                    );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default Tickets;