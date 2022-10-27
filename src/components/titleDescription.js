import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function TitleDescription() {
    return (
        <div>
            <Container disableGutters maxWidth="lg" component="main" sx={{ pt: 6, pb: 6 }}>
                <Typography component="h6" variant="h5" align="center"
                    color="text.secondary" gutterBottom >
                     <ul>****Deposit ETH  to earn interst****</ul> 
                     <ul>--using Aave V3 (görli testnet)--</ul>
                </Typography>
                <Typography variant="button" align="center" color="text.secondary" component="p">
                    Get test eth:   
                </Typography>
                <Typography variant="caption" align="center" color="text.secondary" component="p">
                    <a href="https://goerlifaucet.com/" target="_blank" rel="noreferrer">ETH GÖRLI</a>
                </Typography>
               
            </Container>
        </div>)
}