import React, { Component } from 'react';
import axios from 'axios';


class List extends Component {

    state = {
        posts: [],
        value: false
    };


    componentDidMount() {

        axios.get('https://jsonplaceholder.typicode.com/albums')
            .then(response => {
                console.log(response);
                this.setState({ posts: response.data });
            })
            .catch(error => {
                console.log(error);
            })
    }


    handleChange = e => {
        const id = e.target.id;
        this.setState(prevState => {
            return {
                posts: prevState.posts.map(
                    li => (li.id === +id ? {
                        ...li,
                        value: !li.value
                    } : li)
                )
            };
        });
    };
 

    handleClick = () => {
        this.setState(prevState => {
            return {
                posts: prevState.posts.filter(li => !li.value)
            };
        });
    };


    render() {

        let newList = { ...this.state.posts };
        console.log("newList ", newList);

        return (
            <div className="App">
                {this.state.posts.map(e => (
                    <div key={e.id}>{e.title}
                        <input
                            type="checkbox"
                            id={e.id}
                            onChange={this.handleChange}
                        />
                        <label htmlFor={e.id}>{e.label}</label>
                    </div>
                ))}
                <button onClick={this.handleClick}>Delete</button>
            </div>
        );
}
}

export default List;