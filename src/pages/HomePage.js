import React from 'react';
// IMORT MATERIAL UI

import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';

// IMPORT COMPONENTS

import {
  BitkoinUSD,
  BitkoinEUR,
  EthereumUSD,
  EhtereumEUR,
  EosUSD,
} from '../components/index';

// IMPORT CONTEX.API

import { CryptoContext } from '../context';

// USING MATERIAL UI

const useStyles = makeStyles({
  container: {
    height: '93vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    width: '50%',
    margin: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function HomePage() {
  const { login } = React.useContext(CryptoContext);
  const classes = useStyles();

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 40,
    },
  }))(TableCell);

  return (
    <>
      <div className={classes.container}>
        <>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>Symbol</StyledTableCell>
                <StyledTableCell align="left">Daily Change</StyledTableCell>
                <StyledTableCell align="left">Volume</StyledTableCell>
                <StyledTableCell align="left">Last Price</StyledTableCell>
              </TableHead>

              <BitkoinUSD />
              <BitkoinEUR />
              <EthereumUSD />
              <EhtereumEUR />
              <EosUSD />
            </Table>
          </TableContainer>
        </>
      </div>
    </>
  );
}
export default HomePage;
