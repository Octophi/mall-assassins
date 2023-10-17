import React, { Component } from 'react';
import TaskCard from '../../components/TaskCard';
import MassiveButton from '../../components/MassiveButton';
import '../../components/TaskCardFormat.css';
class PlayerMainExperiencePage extends Component {
  state = {
    
  };

  toggleMoreInfo = () => {
    this.setState({ showMoreInfo: true });
  }

  render() {
    const { showMoreInfo } = this.state;

    return (
      <div>
        <MassiveButton text="Task Card" onClick={this.toggleMoreInfo}/> {/* Render MassiveButton */}
        {(
          <div>
            <TaskCard
              taskDescription="Take a picture of Nolan Zeng."
              points={100}
              taskId={1}
              taskStatus="Not Complete"
            />
            <TaskCard
              taskDescription="Give Kevin a hug."
              points={60}
              taskId={2}
              taskStatus="Not Complete"
            />
          </div>
        )}
      </div>
    );
  }
}

export default PlayerMainExperiencePage;