import {Box, Divider, Typography} from "@mui/material";
import logo from './assets/logo.png'

function Header() {

    return (
        <>
            <Box component={"img"} src={logo} alt={"logo"}/>
            <Divider orientation="vertical" flexItem sx={{mx:'1rem'}}/>
            <Typography sx={{ typography: { xs: 'h4', lg: 'h2' }, color:'#21201E', mt:'1rem' }}>Heritage Trees in Calgary</Typography>
        </>
    )
}

export default Header;