import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { CryptoContext } from '../context';

function EthereumUSD() {
  const { ethereumUSD, setEthereumUSD } = React.useContext(CryptoContext);

  // OPEN WEBSOCKET CONNECTION

  const wss = new WebSocket('wss://api-pub.bitfinex.com/ws/2');


  // WEBSOCKET SEND MESSAGES

  wss.onopen = () => {
    wss.send(
      JSON.stringify({
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tETHUSD',
        pair: 'tETHUSD',
      })
    );
  };

  // WEBSOCKETS GET MESSAGES AND SETSTATE

  wss.onmessage = (msg) => {
    let res = JSON.parse(msg.data);

    const inputDetails = {
      cid: Date.now(),
      type: 'LIMIT',
      symbol: 'ETHUSD',
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

          setEthereumUSD({
            dailyChange: dailyChange,
            volume: volume,
            lastPrice: lastPrice,
            symbol: inputDetails.symbol,
          });
        }
      }
    }
  };

  // Material UI

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
        <StyledTableCell align="left">3</StyledTableCell>
        <StyledTableCell align="left">{ethereumUSD.symbol}</StyledTableCell>
        <StyledTableCell align="left">
          {ethereumUSD.dailyChange}
        </StyledTableCell>
        <StyledTableCell align="left">{ethereumUSD.volume}</StyledTableCell>
        <StyledTableCell align="left">{ethereumUSD.lastPrice}</StyledTableCell>
      </TableRow>
    </>
  );
}

export default EthereumUSD;
