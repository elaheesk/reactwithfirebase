import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Badge, Link } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const NavigationBar = ({ likeUser }) => {
  return (
    <Grid container sx={{ marginLeft: 5 }}>
      <Grid item>
        <Link component={RouterLink} to="/" color="inherit" variant="h6">
          Home
        </Link>

        <Link
          component={RouterLink}
          to="mylikes"
          color="inherit"
          variant="h6"
          sx={{ marginLeft: 2 }}
        >
          My likes
        </Link>
        <Badge color="secondary" badgeContent={likeUser.length}>
          {likeUser.length ? (
            <FavoriteIcon style={{ fill: "red" }} fontSize="small" />
          ) : (
            <FavoriteIcon style={{ fill: "gray" }} fontSize="small" />
          )}
        </Badge>
      </Grid>
    </Grid>
  );
};
export default NavigationBar;
