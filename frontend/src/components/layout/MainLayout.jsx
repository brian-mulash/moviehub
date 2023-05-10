import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";
import Header from "../common/Header";
import Footer from "../common/Footer";

const MainLayout = () => {
   return (
      <>
      {/* gloabal loading */}
      <GlobalLoading/>
      {/* gloabal loading */}

      {/* login model */}
      {/* login model */}

      <Box display="flex" minHeight="100vh" >
         {/* top header */}
         <Header/>
         {/* top header */}

         {/* main */}
            <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh" >
               <Outlet />
            </Box>
         {/* main */}
      </Box>
         {/* footer */}
         <Footer />
         {/* footer */}

      </>
   )
}

export default MainLayout