import React from "react";
import ListLayout from "../components/ListLayout";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { styled } from "@mui/styles";
const Home = ({
  users,
  setUsers,
  likeUser,
  setLikeUser,
  handleChange,
  allInputVals,
  createUser,
  selectedPerson,
  openSelected,
  inputValsToUpdate,
  setInputValsToUpdate,
  updateUser,
  deleteUser,
  changeLikeProp,
}) => {
  const MyButton = styled(Button)({
    border: 0,
    borderRadius: 3,
    background: "linear-gradient(45deg, ##a7b8a8 30%, #a7b8a8 90%)",
    boxShadow: "0 2px 4px 2px rgba(30, 199, 230, .3)",
    color: "#93bb96",
    height: 38,
    padding: "0 30px",
  });
  return (
    <Grid item>
      <Typography variant="h5" gutterBottom component="div">
        Create user and quote
      </Typography>
      <Grid container>
        <Grid item>
          <TextField
            sx={{
              marginRight: "10px",
            }}
            size="small"
            value={allInputVals.name}
            name="name"
            label="Type name"
            onChange={handleChange}
          />
          <TextField
            size="small"
            type="number"
            value={allInputVals.age}
            name="age"
            label="Type age"
            onChange={handleChange}
          />
          <TextField
            name="quote"
            value={allInputVals.quote}
            label="Type quote"
            fullWidth
            onChange={handleChange}
            sx={{ marginTop: "10px" }}
          />
          <MyButton
            sx={{ marginTop: "8px" }}
            size="small"
            onClick={() => createUser(allInputVals)}
          >
            Create user
          </MyButton>
        </Grid>
      </Grid>
      {users.map((user, index) => {
        return (
          <ListLayout
            key={user.id}
            users={users}
            setUsers={setUsers}
            likeUser={likeUser}
            setLikeUser={setLikeUser}
            user={user}
            index={index}
            selectedPerson={selectedPerson}
            openSelected={openSelected}
            inputValsToUpdate={inputValsToUpdate}
            setInputValsToUpdate={setInputValsToUpdate}
            updateUser={updateUser}
            deleteUser={deleteUser}
            changeLikeProp={changeLikeProp}
            allInputVals={allInputVals}
            handleChange={handleChange}
            createUser={createUser}
          />
        );
      })}
    </Grid>
  );
};
export default Home;
