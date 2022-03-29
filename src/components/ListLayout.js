import React from "react";
import "../App.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/styles";
import { Button, Grid, List, TextField, Typography } from "@mui/material";
const ListLayout = ({
  user,
  index,
  selectedPerson,
  openSelected,
  inputValsToUpdate,
  setInputValsToUpdate,
  updateUser,
  deleteUser,
  changeLikeProp,
}) => {
  const handleChangeNewInputs = (evt) => {
    setInputValsToUpdate({
      ...inputValsToUpdate,
      [evt.target.name]:
        evt.target.value.charAt(0).toUpperCase() + evt.target.value.slice(1),
      [evt.target.age]: evt.target.value,
      [evt.target.quote]: evt.target.value,
    });
  };

  const MyHeading = styled(Grid)({
    border: 0,
    height: 32,
    borderRadius: 5,
    background: "linear-gradient(45deg, bisque 30%, rgb(136, 223, 214)90%)",
    boxShadow: "0 2px 4px 2px rgba(30, 199, 230, .5)",
    color: "white",
  });
  return (
    <Grid item key={`item-${index}`} sx={{ width: "600px" }}>
      <List
        className={`item ${selectedPerson === index ? "open" : ""}`}
        sx={{
          boxShadow: "0px 1px 10px 1px  black inset",
          marginBottom: "10px",
          padding: 2,
          borderRadius: 5,
        }}
      >
        <Grid container item justifyContent="space-between">
          <Grid item>
            {" "}
            <Typography
              component="div"
              variant="h6"
              sx={{
                color: "white",
                textShadow: "1px 1px black",
              }}
            >
              {user.name}, {user.age} years
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{
                color: "darkslategray",
              }}
            >
              {" "}
              Quote: {user.quote}
            </Typography>
          </Grid>
          <Grid item>
            <MyHeading>
              <Button
                className="editButton"
                onClick={() => openSelected(user, index)}
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
            </MyHeading>
          </Grid>
        </Grid>
        <Grid sx={{ marginTop: "20px" }} className="editTextFields">
          <TextField
            value={inputValsToUpdate.name}
            name="name"
            label="Type name"
            onChange={handleChangeNewInputs}
            size="small"
            sx={{
              marginRight: "10px",
              width: 150,
              boxShadow: "0px 1px 10px 1px  black inset",
              borderRadius: 1,
            }}
          />
          <TextField
            value={inputValsToUpdate.age}
            name="age"
            label="Type age"
            type="number"
            placeholder=" age"
            onChange={handleChangeNewInputs}
            size="small"
            sx={{
              marginRight: "10px",
              width: 150,
              boxShadow: "0px 1px 10px 1px  black inset",
              borderRadius: 1,
            }}
          />

          <TextField
            sx={{ boxShadow: "0px 1px 10px 1px  black inset", borderRadius: 1 }}
            id="outlined-multiline-static"
            label="Type quote"
            multiline
            rows={3}
            value={inputValsToUpdate.quote}
            name="quote"
            onChange={handleChangeNewInputs}
          />

          <Button
            variant="outlined"
            sx={{
              background:
                "linear-gradient(45deg, bisque 30%, rgb(136, 223, 214)90%)",
              boxShadow: "0 2px 4px 2px rgba(30, 199, 230, .5)",
            }}
            size="small"
            startIcon={<DoneIcon />}
            onClick={() => {
              updateUser(user.id);
            }}
          >
            update
          </Button>
        </Grid>{" "}
        <Grid item container justifyContent="space-between">
          <Grid item>
            <Button
              size="small"
              sx={{
                marginTop: "10px",
                background:
                  "linear-gradient(45deg, rgb(107, 104, 104) 30%, #bcaaa4 90%)",
                boxShadow: "0 2px 4px 2px rgba(30, 199, 230, .3)",
                borderRadius: 1,
              }}
              startIcon={<DeleteIcon sx={{ color: "white" }} />}
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Delete
            </Button>
          </Grid>
          <Grid item>
            <IconButton onClick={() => changeLikeProp(user)}>
              {user.liked ? (
                <FavoriteIcon style={{ fill: "red" }} />
              ) : (
                <FavoriteIcon style={{ fill: "gray" }} />
              )}
            </IconButton>
          </Grid>
        </Grid>
      </List>
    </Grid>
  );
};
export default ListLayout;
