'use strict'

const e = React.createElement

class ActionCircles extends React.Component {
    constructor(props) {
        super(props)
        this.taskName = 'Run in circles'
        this.taskNumber = 1
    }

    onStartClick = (e) => {
        e.preventDefault()
        this.props.setTask(this.taskNumber)
        this.startTask()
    }
    onStopClick = (e) => {
        e.preventDefault()
        this.props.releaseTask()
        this.stopTask()
    }

    startTask = () => {
        const msg = {
            linear: { x: 0.3 },
            angular: { z: 0.7 },
        }
        this.props.publishCmdVel(msg)
    }
    stopTask = () => {
        const msg = {
            linear: { x: 0 },
            angular: { z: 0 },
        }
        this.props.publishCmdVel(msg)
    }

    render() {
        return (
            <div className="control align-center">
                <label>{this.taskName}</label>
                <button
                    className="btn btn-info"
                    onClick={this.onStartClick}
                    disabled={this.props.taskRunning !== 0}
                >Start</button>
                <br />
                <button
                    className="btn btn-danger"
                    onClick={this.onStopClick}
                    disabled={this.props.taskRunning !== this.taskNumber}
                >Stop</button>
            </div>
        )
    }
}
