import './todo.css';

import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

import { db } from "./firebase_config";


export default function TodoListItem({ todo, inprogress, id, timestamp}) {

	function deleteTodo(){
		db.collection("todos").doc(id).delete();
	}

	function toggleInProgress() {
	    db.collection("todos").doc(id).update({
	      inprogress: !inprogress,
	    });
	}

	return (
		<div className="ListItem" >
		  <ListItem style={{maxWidth:"500px"}}>
		    <ListItemText primary={todo} secondary={timestamp}/>
		  </ListItem>
		  <Button onClick={toggleInProgress} style={{marginTop:10,height:40,maxWidth:70,width:70}} variant="outlined" >
		  	{inprogress ? "Done":"UnDone"}
		  </Button>

		  <Button onClick={deleteTodo} 
		  	style={{
		  		marginTop:10,
		  		height:40,
		  		color:"black",
		  		marginLeft:10
		  	}} 
		  	variant="outlined">X</Button>
		</div>
	);
}