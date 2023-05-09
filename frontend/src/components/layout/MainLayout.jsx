import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
   return (
      <>
      {/* gloabal loading */}
      {/* gloabal loading */}

      {/* login model */}
      {/* login model */}

      <Box display="flex" minHeight="100vh" >
         {/* top header */}
         {/* top header */}

         {/* main */}
            <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh" >
               <Outlet />
            </Box>
         {/* main */}
      </Box>
         {/* footer */}

         {/* footer */}

      </>
   )
}

export default MainLayout