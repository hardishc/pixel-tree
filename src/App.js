import './App.css';
import MapLeaflet from './components/MapLeaflet'
import {Button, Container, Grid, Paper, styled} from "@mui/material";

function App() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return (
        <Grid container spacing={2}>
            <Item> <MapLeaflet/></Item>
        </Grid>

    );
}

export default App;
