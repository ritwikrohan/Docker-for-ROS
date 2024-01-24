'use strict';

const e = React.createElement;

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="header" className="dark align-center">
                <h2>Turtlebot 3 control panel</h2>
            </div>
        )
    }
}