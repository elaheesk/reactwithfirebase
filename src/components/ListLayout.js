import React from "react";
import "../index.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Button,
  Grid,
  List,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
const ListLayout = ({
  likeUser,
  handleChange,
  allInputVals,
  createUser,
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
      [evt.target.name]: evt.target.value,
      [evt.target.age]: evt.target.value,
      [evt.target.quote]: evt.target.value,
    });
  };

  return (
    <Grid item key={`item-${index}`}>
      <List
        className={`item ${selectedPerson === index ? "open" : ""}`}
        sx={{
          bgcolor: "lightGray",
        }}
      >
        <Grid container item justifyContent="space-between">
          <Grid item>
            {" "}
            <Typography
              gutterBottom
              sx={{ display: "inline" }}
              component="div"
              color="text.primary"
            >
              {user.name}, {user.age} years
            </Typography>
            <Typography variant="body2" gutterBottom component="div">
              {" "}
              Quote: {user.quote}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              className="editButton"
              onClick={() => openSelected(user, index)}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          </Grid>
        </Grid>

        <Grid sx={{ marginTop: "20px" }} className="editTextFields">
          <TextField
            value={inputValsToUpdate.name}
            name="name"
            label="Type name"
            onChange={handleChangeNewInputs}
            size="small"
            sx={{ marginRight: "10px", width: 150 }}
          />
          <TextField
            value={inputValsToUpdate.age}
            name="age"
            label="Type age"
            type="number"
            placeholder=" age"
            onChange={handleChangeNewInputs}
            size="small"
            sx={{ marginRight: "10px", width: 150 }}
          />

          <TextField
            id="outlined-multiline-static"
            label="Type quote"
            multiline
            rows={3}
            value={inputValsToUpdate.quote}
            name="quote"
            onChange={handleChangeNewInputs}
          />

          <Button
            startIcon={<DoneIcon />}
            onClick={() => {
              updateUser(user.id);
            }}
          >
            update
          </Button>
        </Grid>

        <Button
          size="small"
          sx={{ marginTop: "10px" }}
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => {
            deleteUser(user.id);
          }}
        >
          Delete
        </Button>
        <IconButton onClick={() => changeLikeProp(user)}>
          {user.liked ? (
            <FavoriteIcon style={{ fill: "red" }} />
          ) : (
            <FavoriteIcon style={{ fill: "gray" }} />
          )}
        </IconButton>

        <Divider sx={{ marginTop: "5px" }} component="li" />
      </List>
    </Grid>
  );
};
export default ListLayout;
