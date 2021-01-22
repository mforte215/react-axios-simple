import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import FullPost from '../../Blog/FullPost/FullPost';
import { Route } from 'react-router-dom';
import './Posts.css';

class Posts extends Component {

    state = {
        posts: [],
        }

    
    componentDidMount() {
        axios.get('/posts').then(
            response => {
                const posts = response.data.splice(0,4);
                const updatedPosts = posts.map( post => {
                    return {
                        ...post,
                        author: 'Mark',
                    }
                })
                this.setState({
                    posts: updatedPosts,
                });
            // console.log(response);
            }).catch(
                error => {
                    console.log(error);
                }
            );
    }

    postSelectedHandler = (id) => {
        //to load through program
        this.props.history.push({pathname: '/' + id});
    
        }



    
    render() {

        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if(!this.state.error) {
            posts = this.state.posts.map(
                post => {
                    return (
                        //<Link key={post.id} to={'/' + post.id}>
                        <Post key={post.id} clicked={() => this.postSelectedHandler(post.id)} author={post.author} title={post.title} />
                       // </Link>
                       );
                }
            )
        }

        return (
            <div>
            <section className="Posts">
                {posts}
            </section>
            <Route path="/:id" exact component={FullPost} />
            </div>
        );
    }

}


export default Posts;