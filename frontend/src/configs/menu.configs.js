import {
   MdOutlineHome,
   MdOutlineSlideshow,
   MdOutlineLiveTv,
   MdOutlineFavoriteBorder,
   MdOutlineSearch,
   MdOutlineRateReview,
   MdOutlineLockReset,
} from "react-icons/all";

const main = [
   {
      display: "home",
      path: "/",
      icon: MdOutlineHome,
      state: "home"
   },

   {
      display: "movies",
      path: "/movie",
      icon: MdOutlineSlideshow,
      state: "movie"
   },

   {
      display: "tv series",
      path: "/tv",
      icon: MdOutlineLiveTv,
      state: "tv"
   },

   {
      display: "search",
      path: "/search",
      icon: MdOutlineSearch,
      state: "search"
   },

];

const user = [
   {
      display: "favorites",
      path: "/favorites",
      icon: MdOutlineFavoriteBorder,
      state: "favorite"
   },

   {
      display: "reviews",
      path: "/reviews",
      icon: MdOutlineRateReview,
      state: "reviews"
   },

   {
      display: "password update",
      path: "/password-update",
      icon: MdOutlineLockReset,
      state: "password.update"
   },
];

const menuConfigs = {main, user};

export default menuConfigs;