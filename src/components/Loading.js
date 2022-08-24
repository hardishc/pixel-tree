import tree from './assets/tree-color-icon.svg';
import {motion} from "framer-motion";
import {Box} from "@mui/material";

function Loading() {
    return(
        <motion.div
        initial={{rotate:0}}
        animate={{rotate:[-15,15]}}
        transition={{ repeat: Infinity, repeatType:'reverse', duration:0.5 }}>
            <Box component={"img"} src={tree} alt={"Loading Icon"} sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
            }}/>
        </motion.div>
    )
}

export default Loading
