import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyLikes from "./pages/MyLikes";

import NavigationBar from "./components/NavigationBar";
import { Grid, Typography } from "@mui/material";

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
			[evt.target.name]:
				evt.target.value.charAt(0).toUpperCase() + evt.target.value.slice(1),
			[evt.target.age]: evt.target.value,
			[evt.target.quote]: evt.target.value,
		});
	};

	const openSelected = (user, index) => {
		toggleInputs(selectedPerson === index ? -1 : index);

		const copyUsersInfo = [...users];
		copyUsersInfo[index] = {
			id: user.id,
			name: user.name,
			age: user.age,
			quote: user.quote,
			liked: user.liked,
		};
		setUsers(copyUsersInfo);

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

	React.useEffect(() => {
		const getUsers = async () => {
			const data = await getDocs(usersCollectionRef);
			setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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

	return (
		<Grid className="PictureGrid" container>
			<Grid container justifyContent="center">
				<Grid item>
					<Typography sx={{ fontFamily: "cursive" }} variant="h4" gutterBottom>
						Elahes Quote List
					</Typography>
					<Typography variant="h6" gutterBottom>
						(The data gets stored in firebase database)
					</Typography>
				</Grid>
			</Grid>
			<Grid item>
				<NavigationBar likeUser={likeUser} />
			</Grid>
			<Grid item>
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
	);
}

export default App;
