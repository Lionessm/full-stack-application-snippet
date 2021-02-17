import React from 'react';
import Header from './Header';
import {Redirect} from "react-router-dom";
import config from "./config";

class updateCourse extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            courses: {
                title: [],
                description: [],
                estimatedTime: [],
                materialsNeeded: [],
                user: {},
                userId: []
            },
            redirect: false,
            update: false
        };
    }

    componentDidMount() {
        console.log("this.props.match.params.id ", this.props.match.params.id)
        fetch(config.apiBaseUrl + `/courses/${this.props.match.params.id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("data", data);
                this.setState({ courses: data });
            })
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    setUpdate = () => {
        this.setState({
            update: true
        })
    }

    renderUpdate = () => {
        if (this.state.update) {
            const body = this.state.body;

            fetch(config.apiBaseUrl + `/courses/${this.props.match.params.id}`, {
                method: 'PUT',
                body: JSON.stringify(body),
                mode: 'cors'
            })
                .then(res => res.json())
                .then(res => console.log("RES ", res))
                .catch(err => console.log(err));
        }
    }

    render() {
        const { courses } = this.state;
        const materials = courses.materialsNeeded;

        return (
        <div>
            <Header/>
            <div className="bounds course--detail">
            <h1>Update Course</h1>
            <div>
                <form>
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." defaultValue={`${courses.title}`}/></div>
                            <p>{courses.user.firstName} {courses.user.lastName}</p>
                        </div>
                        <div className="course--description">
                            <div><textarea id="description" name="description" className placeholder="Course description..." defaultValue={`${courses.description}`}/></div>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={`${courses.estimatedTime}`} /></div>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div><textarea id="materialsNeeded" name="materialsNeeded" className placeholder="List materials..." defaultValue={`${courses.materialsNeeded}`} /></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid-100 pad-bottom">
                        {this.renderUpdate()}
                        <button className="button"
                                onClick={this.setUpdate}>Update Course</button>
                        {this.renderRedirect()}
                        <button className="button button-secondary"
                                onClick={this.setRedirect}>Cancel</button></div>
                </form>
            </div>
        </div>
        </div>
        )
    }
}

export default updateCourse;