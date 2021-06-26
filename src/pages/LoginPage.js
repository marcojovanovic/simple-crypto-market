import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { CryptoContext } from '../context';

const useStyles = makeStyles({
  container: {
    height: '95vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImage: {
    width: '250px',
    objectFit: 'cover',
    borderRadius: '20px',
  },
  nameUser: {
    fontSize: '25px',
    margin: '30px 0',
  },
  emailUser: {
    fontSize: '18px',
    marginBottom: '50px',
  },
});

function LoginPage() {
  const classes = useStyles();

  const { user, setUser, getRandomUserImage } = React.useContext(CryptoContext);

  return (
    <div className={classes.container}>
      <img className={classes.mainImage} src={user.image} alt="user image" />
      <h2 className={classes.nameUser}>{user.name}</h2>
      <h2 className={classes.emailUser}>{user.email}</h2>

      <Button
        onClick={getRandomUserImage}
        variant="contained"
        color="secondary"
      >
        Toggle avatar
      </Button>
    </div>
  );
}

export default LoginPage;
