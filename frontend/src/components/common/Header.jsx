import { useSelector, useDispatch } from "react-redux";
import {MdMenu, MdOutlineDarkMode, MdOutlineWbSunny} from "react-icons/all"
import { AppBar, Box, Button, IconButton, Stack, Toolbar, useScrollTrigger } from "@mui/material";
import { cloneElement, useState } from "react"
import { NavLink } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import themeConfigs from "../../configs/theme.configs";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import Logo from "./Logo";

const ScrollUpBar = ({ children, window }) => {
    const { themeMode } = useSelector((state) => state.themeMode)

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        target: window ? window() : undefined,
        threshold: 50
    })

    return cloneElement(children, {
        
    })
}

const Header = () => {
    return (
        <div>Header</div>
    )
}

export default Header