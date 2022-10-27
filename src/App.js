import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import * as React from 'react';
import { useWeb3React } from '@web3-react/core'
import { useState } from 'react';
import {depositETHtoAave, withdrawETHfromAave} from './lendingPoolAaveV3';
import { userBalances } from './balances';
import { ethers, Signer } from 'ethers';
import ConnectMetamask from './components/connectMetamask'
import TitleDescription from './components/titleDescription'
import networks from './brownie-config.json'
import {sx_header,sx_card} from './stile'

import { SumerObserver } from "sumer-sdk";

function App() {
  const { active, chainId, account, library: provider } = useWeb3React();
  const [inputEthDeposit, setInputEthDeposit] = useState("");
  const [inputEthWithdraw, setInputEthWithdraw] = useState("");
  function clearInputs() {
    setInputEthDeposit("")
    setInputEthWithdraw("")
  }
  //balances
  const [aWethBalance, setAWethBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);

  const updateUserData = () => {
    if (active && chainId === 5) {
      userBalances("ether", provider, account).then((value) => {
        setEthBalance(value)
      })
      userBalances(networks.networks.goerli.aWETH, provider, account).then((value) => {
        setAWethBalance(value)
      })
    }
  }

  updateUserData();


  /**
   *  handle user  actions ...
   */
  const handleInputETHDeposit = (event) => {
    const input = event.target.value;
    if (!isNaN(input)) {
      setInputEthDeposit(input);
    } else {
      alert("enter a valid imput")
      clearInputs()
    }
    event.preventDefault();
  }
  const handleInputETHWithdraw = (event) => {
    const input = event.target.value;
    if (!isNaN(input)) {
      setInputEthWithdraw(input);
    } else {
      clearInputs()
    }
    event.preventDefault();
  }

  // dont check against balance--->allow, errors
  const handleDepositETH = (balance, amount) => {
    depositETHtoAave(account, 0, provider, ethers.utils.parseEther(amount)).then(() => {
      clearInputs();
      updateUserData();
    })
  }
  const handleWithdrawETH = (balance, amount) => {
    withdrawETHfromAave(account, provider, ethers.utils.parseEther(amount)).then(() => {
      clearInputs();
      updateUserData();
    })
  }

  const failTx = async () => {
    if (active) {

      const abi = [
        {
          "inputs": [],
          "name": "thisFails",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
      const signer = provider.getSigner()
      const contractAddres = '0xC51FceEc013cD34aE2e95E6D64E9858F2aC28fFf'
      console.log("prov",provider.apikey)
      const USDTContract = SumerObserver.Contract(contractAddres, abi, signer, provider.apikey, chainId)
      await USDTContract.thisFails({ gasLimit: 21711 });

    } else alert("connect wallet")
  }



  return (
<React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar position="static" elevation={0}
        sx={sx_header}>
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography color={"black"} variant="h6" noWrap sx={{ flexGrow: 1 }}>
            &#129436;
          </Typography>
          <ConnectMetamask />
        </Toolbar>
      </AppBar>
      {/* Title */}
      <TitleDescription />
      {/* */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={1} alignItems="flex-end">
          {/* */}
          <Grid item xs={2} sm={4} md={6}>
            <Card>
              <CardHeader title={"ETH"} titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }} sx={sx_header} />
              <CardContent>
                <Box sx={sx_card}>
                  <Typography component="h1" variant="body1">
                    <ul> APY: {'000000000000'} %</ul>
                    <ul> Balance: {ethBalance}</ul>
                    <br></br>
                    <ul> Deposited: <h2>{aWethBalance}</h2></ul>
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <ul>
                  <TextField variant="outlined" label="enter amount" size="small"
                    value={inputEthDeposit}
                    onChange={handleInputETHDeposit}
                  />
                  <Button onClick={() => { handleDepositETH(ethBalance, inputEthDeposit) }}
                    fullWidth variant="outlined">
                    Deposit{' '}
                  </Button>
                </ul>
                <ul>
                  <TextField variant="outlined" label="enter amount" size="small"
                    value={inputEthWithdraw}
                    onChange={handleInputETHWithdraw}
                  />
                  <Button onClick={() => { handleWithdrawETH(aWethBalance, inputEthWithdraw) }}
                    fullWidth variant={"outlined"}>
                    withdraw{' '}
                  </Button>
                </ul>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Card>
              <CardHeader title={"....."} titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }} sx={sx_header} />
              <CardContent>
                <Box sx={sx_card}>
                  <Typography component="h1" variant="body1">

                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <ul>
                  <Button onClick={() => { failTx() }}
                    fullWidth variant="outlined">
                    fail transaction{' '}
                  </Button>
                </ul>

              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <br></br>
      <br></br>
      <br></br>
      <Typography variant="overline" align="center" color="text.secondary">
        <h2>&#129436; MAAAAAKE ME FAAAAAAAIL &#129436;</h2>

      </Typography>
    </React.Fragment>
  );
}

export default App;
