import React from "react";
import "../App.css";
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
		border: 3,
		borderRadius: 7,
		boxShadow: "0 2px 4px 2px navy",
		height: 38,
		padding: "0 30px",
		marginTop: "10px",
	});
	return (
		<Grid item container justifyContent="center">
			<Typography
				variant="h6"
				sx={{ color: "navy", textShadow: "1px 1px black" }}>
				Create your own quote list
			</Typography>
			<Grid
				item
				container
				direction="column"
				justifyContent="center"
				alignItems="center">
				<TextField
					sx={{ boxShadow: "0px 1px 10px 1px  black inset", borderRadius: 1 }}
					size="small"
					value={allInputVals.name}
					name="name"
					label="Type name"
					onChange={handleChange}
					margin="dense"
				/>{" "}
				<TextField
					sx={{ boxShadow: "0px 1px 10px 1px  black inset", borderRadius: 1 }}
					size="small"
					type="number"
					value={allInputVals.age}
					name="age"
					label="Type age"
					onChange={handleChange}
					margin="dense"
				/>{" "}
				<TextField
					sx={{ boxShadow: "0px 1px 10px 1px  black inset", borderRadius: 1 }}
					name="quote"
					value={allInputVals.quote}
					label="Type quote"
					onChange={handleChange}
					multiline
					rows={3}
					margin="dense"
				/>
				<MyButton size="small" onClick={() => createUser(allInputVals)}>
					Create user
				</MyButton>
			</Grid>
			<Grid item sx={{ marginTop: "30px" }}>
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
		</Grid>
	);
};
export default Home;
