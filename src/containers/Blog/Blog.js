import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.cypress.io/posts').then(
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
            });
    }

    postSelectedHandler = (id) => {
        this.setState({
            selectedPostId: id
        });

    }

    render () {
        const posts = this.state.posts.map(
            post => {
                return <Post key={post.id} clicked={() => this.postSelectedHandler(post.id)} author={post.author} title={post.title} />;
            }
        )

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;