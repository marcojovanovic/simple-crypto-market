import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { CryptoContext } from '../context';

function EhtereumEUR() {
  const { ethereumEUR, setEthereumEUR } = React.useContext(CryptoContext);

  // OPEN CONNECTION

  const wss = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

  // SEND MESSAGES

  wss.onopen = () => {
    wss.send(
      JSON.stringify({
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tETHEUR',
        pair: 'tETHEUR',
      })
    );
  };

// WEBSOCKETS GET MESSAGES AND SETSTATE

  wss.onmessage = (msg) => {
    let res = JSON.parse(msg.data);

    const inputDetails = {
      cid: Date.now(),
      type: 'LIMIT',
      symbol: 'ETHEUR',
      amount: '',
      price: '',
    };

    let hb = res[1];

    if (hb !== 'hb') {
      if (res) {
        let responder = res[1];
        if (responder) {
          let dailyChange = Number(responder[4].toFixed(2));
          let volume = Number(responder[7].toFixed(2));
          let lastPrice = Number(responder[6].toFixed(2));

          //console.log(responder);

          setEthereumEUR({
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
      <TableRow>
        <StyledTableCell align="left">4</StyledTableCell>
        <StyledTableCell align="left">{ethereumEUR.symbol}</StyledTableCell>
        <StyledTableCell align="left">
          {ethereumEUR.dailyChange}
        </StyledTableCell>
        <StyledTableCell align="left">{ethereumEUR.volume}</StyledTableCell>
        <StyledTableCell align="left">{ethereumEUR.lastPrice}</StyledTableCell>
      </TableRow>
    </>
  );
}

export default EhtereumEUR;
