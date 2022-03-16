import React from "react";
import "./index.css";
import {
  Button,
  Grid,
  List,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

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

  const openSelected = (index) => {
    toggleInputs(selectedPerson === index ? -1 : index);
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

  const updateUser = async (allInputVals, id) => {
    const userDoc = doc(db, "users", id);

    const newFields = {
      id: id,
      age: allInputVals.age,
      name: allInputVals.name,
      quote: allInputVals.quote,
    };

    await updateDoc(userDoc, newFields);

    const data = await getDocs(usersCollectionRef);

    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setAllInputVals({ name: "", age: "", quote: "" });
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
      sx={{ rowGap: "30px", marginTop: "30px", backgroundColor: "floralwhite" }}
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
        {users.map(({ name, id, age, quote }, index) => {
          return (
            <Grid item key={`item-${index}`}>
              <List
                className={`item ${selectedPerson === index ? "open" : ""}`}
                sx={{
                  width: "900px",

                  bgcolor: "floralwhite",
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
                      {name}, {age} years
                    </Typography>
                    <Typography variant="body2" gutterBottom component="div">
                      {" "}
                      Quote: {quote}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      className="editButton"
                      onClick={() => openSelected(index)}
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                  </Grid>
                </Grid>

                <Grid sx={{ marginTop: "20px" }} className="editTextFields">
                  <TextField
                    value={allInputVals.name}
                    name="name"
                    label="Type name"
                    onChange={handleChange}
                    size="small"
                    sx={{ marginRight: "10px", width: 150 }}
                  />
                  <TextField
                    value={allInputVals.age}
                    name="age"
                    label="Type age"
                    type="number"
                    placeholder=" age"
                    onChange={handleChange}
                    size="small"
                    sx={{ marginRight: "10px", width: 150 }}
                  />

                  <TextField
                    id="outlined-multiline-static"
                    label="Type quote"
                    multiline
                    rows={3}
                    value={allInputVals.quote}
                    name="quote"
                    onChange={handleChange}
                  />

                  <Button
                    startIcon={<DoneIcon />}
                    onClick={() => {
                      updateUser(allInputVals, id);
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
                    deleteUser(id);
                  }}
                >
                  Delete
                </Button>

                <Divider sx={{ marginTop: "5px" }} component="li" />
              </List>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default App;
