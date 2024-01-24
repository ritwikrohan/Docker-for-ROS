'use strict'

const e = React.createElement

class ActionSquare extends React.Component {
    constructor(props) {
        super(props)
        this.taskName = 'Do a square'
        this.taskNumber = 3
        this.taskInterval = null
        this.state = {
            step: 0
        }
        this.countSquareSide = 0
        console.log('render component')
    }

    onStartClick = (e) => {
        e.preventDefault()
        this.props.setTask(3)
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
            let deg010ToRad = 0.174533
            let deg080ToRad = 1.39626
            let deg100ToRad = 1.74533
            let deg170ToRad = 2.36
            let deg190ToRad = -2.36
            let deg260ToRad = -1.74533
            let deg280ToRad = -1.39626

            // msgs
            let turnLeftMsg = { linear: { x: 0 }, angular: { z: 0.4 } }
            let goStraightAheadMsg = { linear: { x: 0.8 }, angular: { z: 0 } }
            let stopMsg = { linear: { x: 0 }, angular: { z: 0 } }

            // go straight params
            let goStraightIterations = 20

            switch (this.state.step) {
                case 0:
                    // turn left
                    let neg = -1 * deg010ToRad
                    if (this.props.yaw > neg && this.props.yaw < deg010ToRad) {
                        this.countSquareSide = 0
                        this.setState({ step: 1 })
                        console.log(this.state)
                    }
                    msg = turnLeftMsg
                    break
                case 1:
                    // go straight ahead
                    if (this.countSquareSide > goStraightIterations) {
                        this.setState({ step: 2 })
                        console.log(this.state)
                    }
                    msg = goStraightAheadMsg
                    this.countSquareSide++
                    break
                case 2:
                    // turn left
                    if (this.props.yaw > deg080ToRad && this.props.yaw < deg100ToRad) {
                        this.countSquareSide = 0
                        this.setState({ step: 3 })
                        console.log(this.state)
                    }
                    msg = turnLeftMsg
                    break
                case 3:
                    // go straight ahead
                    if (this.countSquareSide > goStraightIterations) {
                        this.setState({ step: 4 })
                        console.log(this.state)
                    }
                    msg = goStraightAheadMsg
                    this.countSquareSide++
                    break
                case 4:
                    // turn left
                    if (this.props.yaw > deg170ToRad && this.props.yaw < deg190ToRad) {
                        this.countSquareSide = 0
                        this.setState({ step: 5 })
                        console.log(this.state)
                    }
                    msg = turnLeftMsg
                    break
                case 5:
                    // go straight ahead
                    if (this.countSquareSide > goStraightIterations) {
                        this.setState({ step: 6 })
                        console.log(this.state)
                    }
                    msg = goStraightAheadMsg
                    this.countSquareSide++
                    break
                case 6:
                    // turn left
                    if (this.props.yaw > deg260ToRad && this.props.yaw < deg280ToRad) {
                        this.countSquareSide = 0
                        this.setState({ step: 7 })
                        console.log(this.state)
                    }
                    msg = turnLeftMsg
                    break
                case 7:
                    // go straight ahead
                    if (this.countSquareSide > goStraightIterations) {
                        this.stopTask()
                    }
                    msg = goStraightAheadMsg
                    this.countSquareSide++
                    break
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
