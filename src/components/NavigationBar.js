import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Typography, Badge, Link } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const NavigationBar = ({ likeUser, setLikeUser }) => {
  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Typography fontWeight={"light"} variant="body" sx={{ marginRight: 3 }}>
          <Link component={RouterLink} to="/">
            Home
          </Link>
        </Typography>

        <Typography fontWeight={"light"} variant="body" sx={{ marginLeft: 2 }}>
          <Link component={RouterLink} to="mylikes">
            My likes
          </Link>
        </Typography>

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
