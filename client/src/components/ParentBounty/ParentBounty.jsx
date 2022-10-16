import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import "./ParentBounty.css";
import "../Bounty/Bounty.css";
import API from "../utils/API";

function ParentBounty(props) {


  const [tasks, setTasks] = useState([]);
  const [formObject, setFormObject] = useState({});
  let [points, setPoints] = useState(Number);
  const [totalPoints, setTotalPoints] = useState(Number);
  const [previousPoints, setPreviousPoints] = useState("");
  
  
  useEffect(() => {
    loadTasks();
    loadPoints();
  }, []);


  //load all tasks and sets them to tasks
    function loadTasks() {
      API.getTasks()
        .then((res) => {
          setTasks(res.data);
        })
        .catch((err) => console.log(err));
    }

    // Deletes a task from the database with a given id, then reloads task from the db
    function deleteTask(id) {
        API.deleteTask(id)
        .then(res => loadTasks())
        .catch((err) => console.log(err));
        
    }

    function loadPoints() {
      API.getPoints()
        .then((res) => {setPreviousPoints(res.data.points)})
        .catch((err) => console.log(err));
    }

    function handleIncrement (task) {
      // We always use the setState method to update a component's state
      let newPoints = points;
      newPoints = parseInt(newPoints) + parseInt(task.points);
      console.log("line 65", newPoints);
      points = newPoints;
      console.log(points);
      // points.valueOf = newPoints;
      // saveTotalPoints(newPoints);
      API.putPoints("5faf3d071e12384bf094c8ce", newPoints)
        .then((res) => {console.log("Current points: ", newPoints)})
        .catch(err => console.log(err));
      setPoints(newPoints);
      setTotalPoints(newPoints);
      deleteTask(task._id);
    };

  //handles updating component state when user types into input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // When the form is submitted, use the API.saveTask method to save the task data
  // Then reload tasks from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.task && formObject.points) {
      API.saveTask({
        task: formObject.task,
        location: formObject.location,
        description: formObject.description,
        points: formObject.points,
      })
        .then((res) => loadTasks())
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
    <div className="bounty-page">
        <div className="row">
            <div className="col-md-3"></div>
            <div id="boardTitle" className="col-md-5">
            Mission Board
            </div>
            <div className="col-md-3">
                <h3>Points: {points}</h3>          
            </div>
        </div>

        <div className="row bounty-container">
            <div className="col-md-2"></div>
            <div className="bountyContainer col-md-8">
            <div className="row" id="row1">
                {tasks.map((task) => (
                <>
                    <div key={task.identifier} className="taskContainer col-md-3">
                        <button className="delete-task" onClick={() => deleteTask(task._id)}>
                          <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-x"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                              <path
                              fill-rule="evenodd"
                              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                              />
                          </svg>
                        </button> 
                        <div id="taskPoints">Bounty: ${task.points}</div>   
                        <hr />
                        <div id="taskName">  
                            <strong>{task.task}</strong>  
                        </div>
                        <hr />
                        <div id="placeText">
                            <strong>Place: </strong> {task.location} 
                        </div>
                        <div id="notesText"><strong>Notes: </strong>{task.description}</div>
                        <button className="check-btn" onClick={() => handleIncrement(task)}>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                            </svg>
                        </button>
                    </div>
                </>
                ))}
            </div>
            </div>
            <div className="col-md-2"></div>
        </div>
        </div>
      <br />
      <form className="row addTaskBox">
        <div className="col-md-2"></div>
        <div id="taskForm" className="col-md-7">
          <div className="row">
            <div className="col-md-3"></div>
            <div id="formTitle" className="col-md-5">
              Add a Mission!
            </div>
            <div className="col-md-3"></div>
          </div>
          <div className="row">
            <div className="col-md-3"></div>
            <div id="formBox" className="col-md-5">
              <label>Mission Name</label>
              <input
                name="task"
                onChange={handleInputChange}
                id="taskInput"
                placeholder="Task name?"
                required
              ></input>
            </div>
            <div className="col-md-3"></div>
          </div>
          <div className="row">
            <div className="col-md-3"></div>
            <div id="formBox" className="col-md-5">
              <label>Location</label>
              <input
                name="location"
                onChange={handleInputChange}
                id="locationInput"
                placeholder="Where?..."
                required
              ></input>
            </div>
            <div className="col-md-3"></div>
          </div>
          <div className="row">
            <div className="col-md-3"></div>
            <div id="formBox" className="col-md-5">
              <label>Description</label>
              <input
                name="description"
                onChange={handleInputChange}
                id="descriptionInput"
                placeholder="Describe the task..."
                required
              ></input>
            </div>
            <div className="col-md-3"></div>
          </div>
          <div className="row">
            <div className="col-md-3"></div>
            <div id="formBox" className="col-md-5">
              <label>Reward</label>
              <input
                name="points"
                onChange={handleInputChange}
                id="rewardInput"
                placeholder="Points..."
                required
              ></input>
            </div>
            <div className="col-md-3"></div>
          </div>
          <div className="row">
            <div className="col-md-3"></div>
            <div id="formBox" className="col-md-5">
              <button
                onClick={handleFormSubmit}
                id="addTask"
                className="submit"
              >
                Add Mission
              </button>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
        <div className="col-md-2"></div>
        <div className="col-sm-2 text-center">
            <Link
                  type="submit"
                  className="btn btn-primary button btn-lg  text-center sign-in-btn"
                  to="/"
                >
                  Logout
              </Link>
            </div>
      </form>
    </>
  );
}

export default ParentBounty;