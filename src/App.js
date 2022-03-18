import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyLikes from "./pages/MyLikes";

import NavigationBar from "./components/NavigationBar";
import { Grid, Typography, Paper } from "@mui/material";

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
  const [likeUser, setLikeUser] = React.useState([]);
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
      liked: user.liked,
    };
    setUsers(copyUsersArray);

    setInputValsToUpdate({ name: user.name, age: user.age, quote: user.quote });
  };
  const createUser = async (allInputVals) => {
    await addDoc(usersCollectionRef, {
      name: allInputVals.name,
      age: allInputVals.age,
      quote: allInputVals.quote,
      liked: false,
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
    console.log("Elaheeeee", users);
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

  React.useEffect(() => {
    if (users.length !== 0) {
      const myLikedUsers = users.filter((user) => {
        if (user.liked === true) {
          return user;
        }
      });
      setLikeUser(myLikedUsers);
    }
  }, [users]);

  const changeLikeProp = (likedUser) => {
    if (users.length !== 0) {
      const newArr = users.map((user) => {
        if (user.id === likedUser.id) {
          return { ...likedUser, liked: !user.liked };
        } else {
          return user;
        }
      });
      setUsers(newArr);
    }
  };

  console.log("usersLength", users.length);

  return (
    <Grid spacing={2} container>
      <Grid
        item
        container
        justifyContent="space-evenly"
        sx={{
          backgroundColor: "#a7b8a8",
          boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
        }}
      >
        <Grid position="fixed" item container>
          <NavigationBar likeUser={likeUser} />
        </Grid>
        <Grid item>
          <Typography
            sx={{ fontFamily: "cursive" }}
            variant="h4"
            gutterBottom
            component="div"
          >
            Elahes Quote site
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={12} md={12}>
        <Grid container justifyContent="space-evenly" item>
          <Routes>
            <Route
              path="mylikes"
              element={
                <MyLikes
                  likeUser={likeUser}
                  setLikeUser={setLikeUser}
                  changeLikeProp={changeLikeProp}
                />
              }
            />
            <Route
              path="/"
              element={
                <Home
                  users={users}
                  setUsers={setUsers}
                  likeUser={likeUser}
                  setLikeUser={setLikeUser}
                  selectedPerson={selectedPerson}
                  openSelected={openSelected}
                  inputValsToUpdate={inputValsToUpdate}
                  setInputValsToUpdate={setInputValsToUpdate}
                  createUser={createUser}
                  updateUser={updateUser}
                  deleteUser={deleteUser}
                  changeLikeProp={changeLikeProp}
                  allInputVals={allInputVals}
                  handleChange={handleChange}
                />
              }
            />
          </Routes>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
