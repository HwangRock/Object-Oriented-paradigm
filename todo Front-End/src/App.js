import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { Paper, List, Container } from '@material-ui/core';  // Container 추가 import
import './App.css';
import { call } from './service/ApiService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  add = (item) => {
    call("/todo", "POST", item)
      .then((response) => {
        this.setState({ items: response.data }, () => {
          console.log("items:", this.state.items);
          this.componentDidMount();
        });
      });
  }

  delete = (item) => {
    call("/todo", "DELETE", item)
      .then((response) => {
        this.setState({ items: response.data }, () => {
          console.log("Update Items : ", this.state.items);
          this.componentDidMount();
        });
      });
  }

  update = (item) => {
    call("/todo", "PUT", item)
      .then((response) => {
        this.setState({ items: response.data }, () => {
          console.log("Update Items : ", this.state.items);
          this.componentDidMount();
        });
      });
  }

  componentDidMount = () => {
    call("/todo", "GET", null)
      .then((response) => {
        this.setState({ items: response.data });
      });
  }

  render() {
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
          ))}
        </List>
      </Paper>
    );

    return (
      <div className="App">
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );
  }
}

export default App;
