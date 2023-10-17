import React from 'react';
import { Button } from '@chakra-ui/react'; 
import './TaskCardFormat.css'; 
class TaskCard extends React.Component {
  state = {
  };

  toggleModal = () => {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  }

  handleButtonClick = () => {
    const currentUrl = window.location.pathname;
    window.location.href = `${currentUrl}/submit`;
  }
  render() {
    const { taskDescription, points, taskId, taskStatus } = this.props;
    const { showModal } = this.state;

    return (
      <div className="task-card-container">
        <button className="task-card-button" onClick={this.toggleModal}>
          {taskDescription}
          {(
            <div className="task-details-modal">
              <h2>Task ID: {taskId}</h2>
              <p>Task Points: {points}</p>
              <p>Task Status: {taskStatus}</p>
            </div>
          )}
        </button>

        <Button colorScheme="teal" size="sm" onClick={this.handleButtonClick}>
          Submit
        </Button>
      </div>
    );
  }
}

export default TaskCard;