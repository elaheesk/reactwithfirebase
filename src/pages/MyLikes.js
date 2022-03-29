import React from "react";
import { Grid, Typography, Button } from "@mui/material";

const MyLikes = ({ likeUser, changeLikeProp }) => {
  return (
    <Grid container justifyContent="center" sx={{ marginTop: "50px" }}>
      {likeUser.length ? (
        likeUser.map((theLiked) => (
          <Grid
            item
            key={theLiked.id}
            sx={{
              boxShadow: "0px 1px 10px 1px  black inset",

              padding: 1,
              borderRadius: 5,
              width: "450px",
              margin: "10px",
            }}
          >
            <Grid item>
              {" "}
              <Typography gutterBottom component="div" variant="h6">
                {theLiked.name}, {theLiked.age} years
              </Typography>
              <Typography variant="body2" gutterBottom component="div">
                {" "}
                Quote: {theLiked.quote}
              </Typography>
              <Button
                color="inherit"
                sx={{
                  background:
                    "linear-gradient(45deg, rgb(107, 104, 104) 30%, #bcaaa4 90%)",
                  boxShadow: "0 2px 4px 2px rgba(30, 199, 230, .3)",
                  borderRadius: 3,
                }}
                onClick={() => changeLikeProp(theLiked)}
              >
                Remove from likes
              </Button>
            </Grid>
          </Grid>
        ))
      ) : (
        <Grid item>
          <Typography variant="h5" gutterBottom component="div">
            No likes yet
          </Typography>{" "}
        </Grid>
      )}
    </Grid>
  );
};
export default MyLikes;
