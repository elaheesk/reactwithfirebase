import React from "react";
import ListLayout from "../components/ListLayout";
import { Button, Grid, TextField, Typography } from "@mui/material";
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
  return (
    <Grid item sx={{}}>
      <Grid container>
        <Grid item>
          <TextField
            sx={{ marginRight: "10px" }}
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
          <Button onClick={() => createUser(allInputVals)}>Create user</Button>
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
