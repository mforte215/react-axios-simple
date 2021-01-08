import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    
    state = {
        loadedPost: null,
        error: false,
    }

    deletePostHanlder = () => {
        axios.delete('https://jsonplaceholder.cypress.io/postss/' + this.props.id).then(
            response => {
                console.log('delete');
                console.log(response);
                this.setState({loadedPost: response.data});
            }
        ).catch(error => {
            console.log(error);
            this.setState({
                error: true,
            });
        });
    }
    
    componentDidUpdate() {    
        if(this.props.id){
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {

            
            axios.get('https://jsonplaceholder.cypress.io/posts/' + this.props.id).then(
                response => {
                    this.setState({loadedPost: response.data});
                }
            ).catch(error => {
                console.log(error);
                this.setState({
                    error: true,
                });
            });
        }
    }
    }
    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.id) {
            <p style={{textAlign: 'center'}}>Loading...</p>;
        }
        if (this.state.loadedPost) {
    post = (
            <div className="FullPost">
                <h1>{this.state.loadedPost.title}</h1>
                <p>{this.state.loadedPost.body}</p>
                <div className="Edit">
                    <button onClick={this.deletePostHanlder} className="Delete">Delete</button>
                </div>
            </div>

        );
    }
        return post;
    }
}

export default FullPost;