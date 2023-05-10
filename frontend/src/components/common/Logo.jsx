import { Typography, useTheme } from "@mui/material" 
import LogoImg from "../../assets/play-button (1).png"

const Logo = () => {

    const theme = useTheme()

    return (
        <Typography fontWeight={700} fontSize={"1.7rem"}>
            Movie<span style={{ color: theme.palette.primary.main }}>hub</span>
        </Typography>
    )
}

export default Logo