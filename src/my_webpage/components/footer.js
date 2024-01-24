'use strict';

const e = React.createElement;

class Footer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="footer" className="dark align-center">
                <div className="column-20" align="center">&nbsp;</div>
                <div className="column-60" align="center">
                    <h3>Web Project</h3>
                    <h4>Mastering Docker</h4>
                </div>
                <div align="center" className="column-20">

                </div>
                <div className="clear"></div>
            </div>
        )
    }
}