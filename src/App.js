import React from "react";
import ListLayout from "./components/ListLayout";

import { Button, Grid, TextField, Typography } from "@mui/material";

import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
function App() {
  const [users, setUsers] = React.useState([]);
  const [selectedPerson, toggleInputs] = React.useState(-1);
  const [allInputVals, setAllInputVals] = React.useState({
    id: "",
    name: "",
    age: "",
    quote: "",
  });

  const [inputValsToUpdate, setInputValsToUpdate] = React.useState({
    id: "",
    name: "",
    age: 0,
    quote: "",
  });

  const usersCollectionRef = collection(db, "users");

  const handleChange = (evt) => {
    setAllInputVals({
      ...allInputVals,
      [evt.target.name]: evt.target.value,
      [evt.target.age]: evt.target.value,
      [evt.target.quote]: evt.target.value,
    });
  };

  const openSelected = (user, index) => {
    toggleInputs(selectedPerson === index ? -1 : index);

    const copyUsersArray = [...users];
    copyUsersArray[index] = {
      id: user.id,
      name: user.name,
      age: user.age,
      quote: user.quote,
    };
    setUsers(copyUsersArray);

    setInputValsToUpdate({ name: user.name, age: user.age, quote: user.quote });
  };
  const createUser = async (allInputVals) => {
    await addDoc(usersCollectionRef, {
      name: allInputVals.name,
      age: allInputVals.age,
      quote: allInputVals.quote,
    });
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setAllInputVals({ name: "", age: "", quote: "" });
    // console.log("nyskapade users", users);
  };

  const updateUser = async (id) => {
    const userDoc = doc(db, "users", id);
    const newFields = {
      id: id,
      age: inputValsToUpdate.age,
      name: inputValsToUpdate.name,
      quote: inputValsToUpdate.quote,
    };
    await updateDoc(userDoc, newFields);
    const data = await getDocs(usersCollectionRef);
    console.log("vilket id", newFields.id);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setInputValsToUpdate({ name: "", age: "", quote: "" });
    openSelected();
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  React.useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log(data.docs);
    };
    getUsers();
  }, []);

  console.log(users, "users");
  return (
    <Grid
      sx={{ rowGap: "30px", marginTop: "30px", backgroundColor: "lightGray" }}
      container
    >
      <Grid container item justifyContent="center">
        {" "}
        <Typography variant="h4" gutterBottom component="div">
          Create quote list
        </Typography>
      </Grid>

      <Grid container justifyContent="space-evenly">
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

      <Grid container justifyContent="space-evenly" item>
        {users.map((user, index) => {
          return (
            <ListLayout
              user={user}
              index={index}
              selectedPerson={selectedPerson}
              openSelected={openSelected}
              inputValsToUpdate={inputValsToUpdate}
              setInputValsToUpdate={setInputValsToUpdate}
              updateUser={updateUser}
              deleteUser={deleteUser}
            />
          );
        })}
      </Grid>
    </Grid>
  );
}

export default App;
