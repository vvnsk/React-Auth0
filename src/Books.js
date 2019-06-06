import React, { Component } from "react";

class Books extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    fetch("/books", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ books: response.books }))
      .catch(error => this.setState({ message: error.message }));

    fetch("/admin", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => console.log(response))
      .catch(error => this.setState({ message: error.message }));
  }

  render() {
    return (
      <ul>
        {this.state.books.map(book => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    );
  }
}

export default Books;
