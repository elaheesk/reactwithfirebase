import React from "react";
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
  const [showTextfields, setShowTextfields] = React.useState(false);
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

  const handleClick = (theUser) => {
    users.map((user) => {
      if (user.id === theUser.id) {
        setShowTextfields(!showTextfields);
      }

      return user;
    });
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
        {users.map((user) => {
          return (
            <List
              key={user.id}
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
                            {user.name}, {user.age} years
                          </Typography>
                          <Typography> Quote: {user.quote}</Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </Grid>
                <Grid item>
                  <Button onClick={() => handleClick(user)}>
                    {showTextfields ? "Go back" : "Edit"}
                  </Button>
                </Grid>
              </Grid>

              {showTextfields && (
                <Grid>
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
                      updateUser(allInputVals, user.id);
                    }}
                  >
                    update user
                  </Button>
                </Grid>
              )}
              <Button
                onClick={() => {
                  deleteUser(user.id);
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
