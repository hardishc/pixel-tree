import './App.css';
import MapLeaflet from './components/MapLeaflet'
import {Box, Icon, Switch, Grid, Paper, styled, Typography, CircularProgress} from "@mui/material";
import {useEffect, useState} from "react";
import Header from "./components/Header";
import {AnimatePresence, motion} from "framer-motion";
import Loading from "./components/Loading";

function App() {

    const [day, setDay] = useState(true)
    const [loading, setLoading] = useState(false)

    // Grid Item
    const Item = styled(Box)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        display: 'flex',
        justifyContent: "center"
    }));

    useEffect(()=>{
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)

    },[])

    if (loading) {
        return (
            <Item sx={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}>
                <Loading/>
            </Item>
        )
    }

    return (
        <>
            <>
                <motion.div
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{delay: 0.05}}
                >
                    <Grid container
                          alignItems="center"
                          sx={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}}>
                        <Grid item xs={6}>
                            <Item>
                                <Header/>
                            </Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item>
                                {day ?
                                    <>
                                        <Typography variant={'h5'}>Light Map</Typography>
                                        <Switch checked={!day} onChange={() => setDay(!day)}/>
                                        <motion.div
                                            initial={{opacity:1}}
                                            animate={{opacity:0.5}}
                                            transition={{ duration: 0.00 }}
                                        >
                                            <Typography variant={'h5'}>Dark Map</Typography>
                                        </motion.div>
                                    </>
                                    :
                                    <>
                                        <motion.div
                                            initial={{opacity:1}}
                                            animate={{opacity:0.5}}
                                            transition={{ duration: 0 }}
                                        >
                                            <Typography variant={'h5'} sx={{visibility: 'visible'}}>Light Map</Typography>
                                        </motion.div>
                                        <Switch checked={!day} onChange={() => setDay(!day)}/>

                                        <Typography variant={'h5'} >Dark Map</Typography>

                                    </>
                                }
                            </Item>
                        </Grid>
                    </Grid>
                    {!loading &&
                        <Grid container>
                            <Grid item xs={12}>
                                <Item>
                                    <MapLeaflet day={day}/>
                                </Item>
                            </Grid>
                        </Grid>
                    }
                </motion.div>
            </>

        </>
    );
}

export default App;
