import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { CryptoContext } from '../context';

function EosUSD() {
  const { eosUSD, setEosUSD } = React.useContext(CryptoContext);

  // btc usd

  const wss = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

  wss.onopen = () => {
    wss.send(
      JSON.stringify({
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tEOSUSD',
        pair: 'tEOSUSD',
      })
    );
  };

  wss.onmessage = (msg) => {
    const inputDetails = {
      cid: Date.now(),
      type: 'LIMIT',
      symbol: 'EOSUSD',
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

          //console.log(responder);

          setEosUSD({
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
        <StyledTableCell align="left">5</StyledTableCell>
        <StyledTableCell align="left">{eosUSD.symbol}</StyledTableCell>
        <StyledTableCell align="left">{eosUSD.dailyChange}</StyledTableCell>
        <StyledTableCell align="left">{eosUSD.volume}</StyledTableCell>
        <StyledTableCell align="left">{eosUSD.lastPrice}</StyledTableCell>
      </TableRow>
    </>
  );
}

export default EosUSD;