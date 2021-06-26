import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { CryptoContext } from '../context';

function BitkoinUSD() {
  const { bitkoinUSD, setBitkoinUSD } = React.useContext(CryptoContext);

  // WEBSOCKET CONNECTION

  const wss = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

  // WEBSOCKET SEND MESSAGES

  wss.onopen = () => {
    wss.send(
      JSON.stringify({
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tBTCUSD',
        pair: 'tBTCUSD',
      })
    );
  };

  // WEBSOCKETS GET MESSAGES AND SETSTATE

  wss.onmessage = (msg) => {
    const inputDetails = {
      cid: Date.now(),
      type: 'LIMIT',
      symbol: 'BTCUSD',
      amount: '',
      price: '',
    };

    let res = JSON.parse(msg.data);

    let hb = res[1];

    if (hb !== 'hb') {
      if (res) {
        let responder = res[1];
        if (responder) {
          let dailyChange = Number(responder[4].toFixed(2));
          let volume = Number(responder[7].toFixed(2));
          let lastPrice = Number(responder[6].toFixed(2));

          setBitkoinUSD({
            dailyChange: dailyChange,
            volume: volume,
            lastPrice: lastPrice,
            symbol: inputDetails.symbol,
          });
        }
      }
    }
  };

  // MATERIAL UI

  const useStyles = makeStyles({
    table: {
      minWidth: '1700px',
    },
  });

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 40,
    },
  }))(TableCell);

  const classes = useStyles();

  return (
    <>
      <TableRow>
        <StyledTableCell align="left">1</StyledTableCell>
        <StyledTableCell align="left">{bitkoinUSD.symbol}</StyledTableCell>
        <StyledTableCell align="left">{bitkoinUSD.dailyChange}</StyledTableCell>
        <StyledTableCell align="left">{bitkoinUSD.volume}</StyledTableCell>
        <StyledTableCell align="left">{bitkoinUSD.lastPrice}</StyledTableCell>
      </TableRow>
    </>
  );
}

export default BitkoinUSD;
