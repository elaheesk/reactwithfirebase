import React from "react";
import { Grid, Typography, Badge, Link, Button } from "@mui/material";
const MyLikes = ({ likeUser, changeLikeProp }) => {
  return (
    <Grid>
      {likeUser.length ? (
        likeUser.map((theLiked) => (
          <Grid key={theLiked.id}>
            <Grid>{theLiked.name}</Grid>
            <Grid>{theLiked.age}</Grid>
            <Grid>{theLiked.quote}</Grid>
            <Button onClick={() => changeLikeProp(theLiked)}>
              Remove from likes
            </Button>
          </Grid>
        ))
      ) : (
        <Grid> No likes yet</Grid>
      )}
    </Grid>
  );
};
export default MyLikes;
