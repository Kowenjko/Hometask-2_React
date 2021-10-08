import React, { Component } from "react";
import { Container, Table, Row, Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
// Redux
import { connect } from "react-redux";
import {
  onAddNotes,
  notesTotalNote,
  onCreateNotes,
  editTrueNote,
} from "../../Actions/NoteListActions";
class CreateNotes extends Component {
  state = {
    name: "",
    category: "Task",
    content: "",
  };
  // -----------------------------------
  getName = (e) => {
    const name = e.target.value;
    const nameNote = e.target.name;
    this.setState({ [nameNote]: name });
  };
  getDate = (name) => {
    const pattern = /(\d{1,2})[\.|\-\/](\d{1,2})[\.|\-|\/](\d{4})/g;
    return name.match(pattern) ? name.match(pattern).toString() : null;
  };
  // -----------------------------------
  SendForm = (e) => {
    e.preventDefault();
    const { name, category, content } = this.state;
    const { onCreateNotes, editTrue, editTrueNote, List, onAddNotes, notesTotal, CurrentNotes } =
      this.props;

    const newNotes = {
      id: editTrue ? CurrentNotes.id : uuidv4(),
      name: name ? name : editTrue ? CurrentNotes.name : name,
      created: new Date().toDateString(),
      category: category ? category : editTrue ? CurrentNotes.category : category,
      content: content ? content : editTrue ? CurrentNotes.content : content,
      dates: content ? this.getDate(content) : editTrue ? CurrentNotes.dates : null,
    };
    let tmpList = List.slice();
    let tmpNotesTotal = notesTotal.slice();
    const indexTotal = tmpNotesTotal.findIndex((elem) => elem.category === newNotes.category);
    console.log(indexTotal);
    const index = List.findIndex((elem) => elem.id === newNotes.id);
    // якщо додаємо
    if (!editTrue) {
      tmpList.push(newNotes);
      tmpNotesTotal[indexTotal].active++;
      onAddNotes(tmpList);
      notesTotalNote(tmpNotesTotal);
      editTrueNote(false);
      onCreateNotes(false);
    }
    // якщо редагуємо
    else {
      tmpList[index] = newNotes;
      onAddNotes(tmpList);
      onCreateNotes(false);
      editTrueNote(false);
    }
  };
  // -----------------------------------
  render() {
    const { onCreate, CurrentNotes, editTrue } = this.props;
    const { name, category, content } = this.state;
    return (
      <Container>
        <Row>
          <Form onSubmit={this.SendForm} id='myForm'>
            <Table striped hover className='mt-5'>
              <thead className='table-dark'>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Content</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Form.Control
                      type='text'
                      name='name'
                      onChange={this.getName}
                      value={editTrue ? (name ? name : CurrentNotes.name) : name}
                      form='myForm'
                    />
                  </td>
                  <td>
                    <Form.Select
                      type='text'
                      onChange={this.getName}
                      form='myForm'
                      value={editTrue ? (category ? category : CurrentNotes.category) : category}
                      name='category'
                    >
                      <option value='Task' selected disabled>
                        Open this select category
                      </option>
                      <option value='Task'>Task</option>
                      <option value='Quote'>Quote</option>
                      <option value='Random Thought'>Random Thought</option>
                      <option value='Idea'>Idea</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Form.Control
                      type='text'
                      name='content'
                      onChange={this.getName}
                      value={editTrue ? (content ? content : CurrentNotes.content) : content}
                      form='myForm'
                    />
                  </td>
                </tr>
              </tbody>
            </Table>

            <div className='d-flex justify-content-end'>
              {" "}
              <Button onClick={onCreate} variant='secondary' className='mx-3'>
                Cancel
              </Button>
              <Button type='submit' variant='secondary'>
                {editTrue ? "Edit" : "Add"}
              </Button>
            </div>
          </Form>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = ({ NotesListReducer }) => {
  const { List, editTrue, editCreate, notesTotal, CurrentNotes } = NotesListReducer;
  return { List, editTrue, editCreate, notesTotal, CurrentNotes };
};
const mapDispatchToProps = { onAddNotes, notesTotalNote, onCreateNotes, editTrueNote };
export default connect(mapStateToProps, mapDispatchToProps)(CreateNotes);
