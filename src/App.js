import './App.css';
import MapLeaflet from './components/MapLeaflet'
import {Box, Button, Switch, Grid, Paper, styled, Typography, FormControlLabel} from "@mui/material";
import {useState} from "react";

function App() {

    const [day, setDay] = useState(true)

    // Grid Item
    const Item = styled(Box)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Grid container
              justifyContent="center"
              rowSpacing={6}>
            <Grid item xs={12}>
                <Item>
                    <Typography  sx={{ typography: { sm: 'h2', lg: 'h3' } }}>Heritage Trees in Calgary</Typography>
                </Item>
            </Grid>
            <Grid item xs={6}>
                <Item>
                    <FormControlLabel control={<Switch defaultChecked checked={day} onChange={()=>setDay(!day)}/>} label={day?'Light Map' : 'Dark Map'}/>
                </Item>
            </Grid>
            <Grid item xs={6}>
                <Item>
                    <FormControlLabel control={<Switch defaultChecked checked={day} onChange={()=>setDay(!day)}/>} label={day?'Light Map' : 'Dark Map'}/>
                </Item>
            </Grid>
            <Grid item xs={12}>
                <Item>
                    <MapLeaflet day={day}/>
                </Item>
            </Grid>
        </Grid>
    );
}

export default App;
