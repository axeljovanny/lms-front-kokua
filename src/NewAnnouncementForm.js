import React, { Component } from 'react'
import {connect} from 'react-redux'
import {MDBBtn, MDBIcon} from "mdbreact";


class NewAnnouncementForm extends Component {
    state = {
        title: '',
        video_url: '',
        information: '',
        course_id: this.props.url
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        
    }

    handleOnSubmit = (e) => {
        const token = localStorage.getItem("token")
        e.preventDefault();
        // console.log(this.state)
        fetch(`https://lmskokua.herokuapp.com/api/v1/courses/${this.props.url}/announcements`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                announcement: this.state
            })
        })
        .then(resp => resp.json())
        .then(data => {
            // console.log(data)
            this.props.addAnnnouncement(data)
        })
        e.target.reset()
    }
    render() {
        // console.log(this.props)
        return (
            <form onSubmit={this.handleOnSubmit} className="ui tiny form">
                <div className="two fields">
                    <div className="field">
                    {/* <label>First Name</label> */}
                    <input onChange={this.handleOnChange} required placeholder="Título" type="text" name="title"/>
                    </div>
                    <div className="field">
                    {/* <label>Last Name</label> */}
                    <input onChange={this.handleOnChange} placeholder="URL del vídeo" type="text" name="video_url"/>
                    </div>
                </div>
                <div className="field">
                     {/* <label>Information</label> */}
                     <textarea onChange={this.handleOnChange} required name="information" placeholder="Información" rows="2" />
                 </div>
                <MDBBtn gradient="peach" type="submit" value="Post New Announcement" className="ui submit">Publicar nueva clase</MDBBtn>
            </form>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        addAnnnouncement: (announcementObj)=> {
            dispatch({type: "ADD_ANNOUNCEMENT", payload: announcementObj})
        }
    }
}

export default connect(null, mapDispatchToProps)(NewAnnouncementForm)
