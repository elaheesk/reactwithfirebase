import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Typography, Badge, Link } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const NavigationBar = ({ likeUser, setLikeUser }) => {
  return (
    <Grid item container>
      <Typography
        fontWeight={"light"}
        variant="h6"
        sx={{
          marginRight: 3,
        }}
      >
        <Link component={RouterLink} to="/">
          Home
        </Link>
      </Typography>

      <Typography fontWeight={"light"} variant="h6" sx={{ marginLeft: 2 }}>
        <Link component={RouterLink} to="mylikes">
          My likes
        </Link>
        <Badge color="secondary" badgeContent={likeUser.length}>
          {likeUser.length ? (
            <FavoriteIcon style={{ fill: "red" }} fontSize="small" />
          ) : (
            <FavoriteIcon style={{ fill: "gray" }} fontSize="small" />
          )}
        </Badge>
      </Typography>
    </Grid>
  );
};
export default NavigationBar;
