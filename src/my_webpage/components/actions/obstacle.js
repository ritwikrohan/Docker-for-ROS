'use strict'

const e = React.createElement

class ActionObstacle extends React.Component {
    constructor(props) {
        super(props)
        this.taskName = 'Obstacle Avoidance'
        this.taskNumber = 2
        this.taskInterval = null
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
        this.taskInterval = setInterval(() => {
            let msg
            if (this.props.forward < 0.5) {
                msg = { linear: { x: 0 }, angular: { z: 0.3 } }
            } else {
                msg = { linear: { x: 0.3 }, angular: { z: 0 } }
            }
            this.props.publishCmdVel(msg)
        }, 50)
    }
    stopTask = () => {
        const msg = {
            linear: { x: 0 },
            angular: { z: 0 },
        }
        this.props.publishCmdVel(msg)
        clearInterval(this.taskInterval)
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
