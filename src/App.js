import './App.css';
import MapLeaflet from './components/MapLeaflet'
import {Box, Button, Grid, Paper, styled} from "@mui/material";

function App() {

    // Grid Item
    const Item = styled(Box)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


    return (
        <Grid container>
            <Grid item xs={8}>
                <Item>
                    <MapLeaflet/>
                </Item>
            </Grid>
        </Grid>
    );
}

export default App;
