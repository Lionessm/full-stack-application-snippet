import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return(
            <div className="header">
                <div className="bounds">
                    <h1 className="header--logo">Courses</h1>
                </div>
            </div>

        )
    }
}

export default Header;
