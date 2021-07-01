import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { CryptoContext } from '../context';

function BitkoinEUR() {
  const { bitkoinEUR, setBitkoinEUR } = React.useContext(CryptoContext);

  useEffect(() => {
    // OPEN WEBSOCKET CONNECTION

    const wss = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

    // WEBSOCKET SEND MESSAGES

    wss.onopen = () => {
      wss.send(
        JSON.stringify({
          event: 'subscribe',
          channel: 'ticker',
          symbol: 'tBTCEUR',
          pair: 'tBTCEUR',
        })
      );
    };

    // WEBSOCKETS GET MESSAGES AND SETSTATE

    wss.onmessage = (msg) => {
      const inputDetails = {
        cid: Date.now(),
        type: 'LIMIT',
        symbol: 'BTCEUR',
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

            setBitkoinEUR({
              dailyChange: dailyChange,
              volume: volume,
              lastPrice: lastPrice,
              symbol: inputDetails.symbol,
            });
          }
        }
      }
    };
  }, []);

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
        <StyledTableCell align="left">2</StyledTableCell>
        <StyledTableCell align="left">{bitkoinEUR.symbol}</StyledTableCell>
        <StyledTableCell align="left">{bitkoinEUR.dailyChange}</StyledTableCell>
        <StyledTableCell align="left">{bitkoinEUR.volume}</StyledTableCell>
        <StyledTableCell align="left">{bitkoinEUR.lastPrice}</StyledTableCell>
      </TableRow>
    </>
  );
}

export default BitkoinEUR;
