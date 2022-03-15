import React from "react";
import "./index.css";
import {
  Button,
  Grid,
  List,
  ListItem,
  Divider,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

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
  };

  const updateUser = async (allInputVals, id) => {
    const userDoc = doc(db, "users", id);
    const newFields = {
      age: allInputVals.age,
      name: allInputVals.name,
      quote: allInputVals.quote,
    };
    await updateDoc(userDoc, newFields);
    openSelected();
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  React.useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data.docs);
    };
    getUsers();
  }, []);

  console.log(users, "users");
  return (
    <Grid container>
      <Grid container justifyContent="space-evenly" item>
        <Grid item>
          <TextField name="name" placeholder="name" onChange={handleChange} />
          <TextField name="age" placeholder=" age" onChange={handleChange} />
          <TextField name="quote" placeholder="quote" onChange={handleChange} />
          <Button onClick={() => createUser(allInputVals)}>Create user</Button>
        </Grid>
        <Grid item> </Grid>
      </Grid>

      <Grid>
        {users.map(({ name, id, age, quote }, index) => {
          return (
            <List
              key={`item-${index}`}
              //key={user.id}
              className={`item ${selectedPerson === index ? "open" : ""}`}
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
            >
              <Grid container item justifyContent="space-between">
                <Grid item>
                  {" "}
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {name}, {age} years
                          </Typography>
                          <Typography> Quote: {quote}</Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </Grid>
                <Grid item>
                  <Button
                    className="question"
                    onClick={() => openSelected(index)}
                  >
                    Edit
                  </Button>
                </Grid>
              </Grid>

              <Grid className="answer">
                <TextField
                  name="name"
                  placeholder="name"
                  onChange={handleChange}
                />
                <TextField
                  name="age"
                  placeholder=" age"
                  onChange={handleChange}
                />

                <TextField
                  name="quote"
                  placeholder="quote"
                  onChange={handleChange}
                />

                <Button
                  onClick={() => {
                    updateUser(allInputVals, id);
                  }}
                >
                  update user
                </Button>
              </Grid>

              <Button
                onClick={() => {
                  deleteUser(id);
                }}
              >
                Delete user
              </Button>
              <Divider variant="inset" component="li" />
            </List>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default App;
