import { faArchive, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Container, Row, Table, Button } from "react-bootstrap";
import NoteItem from "./NoteItem/NoteItem";
// Redux
import { connect } from "react-redux";
import {
  onCreateNotes,
  editTrueNote,
  CurrentNotes,
  onAddNotes,
  notesTotalNote,
  AddArchive,
} from "../../Actions/NoteListActions";
import CreateNotes from "../CreateNotes/CreateNotes";

class NotesList extends Component {
  // ---------------------------------------------
  sendActions = (current, edit) => {
    const { onCreateNotes, editCreate, editTrueNote, CurrentNotes } = this.props;
    onCreateNotes(editCreate ? false : true);
    CurrentNotes(current);
    editTrueNote(edit);
  };

  // ---------------------------------------------
  onCreate = () => {
    this.sendActions(null, false);
  };
  // ---------------------------------------------
  onEdit = (id) => {
    const { List } = this.props;
    const index = List.findIndex((elem) => elem.id === id);
    this.sendActions(List[index], true);
  };
  // ---------------------------------------------
  delElement = (id, select) => {
    const { onAddNotes, notesTotalNote, notesTotal, List } = this.props;
    const index = List.findIndex((elem) => elem.id === id);
    let tmpNotesTotal = notesTotal.slice();
    const indexTotal = tmpNotesTotal.findIndex((elem) => elem.category === List[index].category);
    let partOne = List.slice(0, index);
    let partTwo = List.slice(index + 1);
    onAddNotes([...partOne, ...partTwo]);
    tmpNotesTotal[indexTotal].active--;
    if (select) {
      tmpNotesTotal[indexTotal].archive++;
    }
    notesTotalNote(tmpNotesTotal);
  };
  // ---------------------------------------------
  onDelete = (id) => {
    this.delElement(id, false);
  };
  // ---------------------------------------------
  onArchive = (id) => {
    const { List, AddArchive, ListArchive } = this.props;
    const index = List.findIndex((elem) => elem.id === id);
    let tmpListArchive = ListArchive.slice();
    tmpListArchive.push(List[index]);
    AddArchive(tmpListArchive);
    this.delElement(id, true);
  };
  // ---------------------------------------------
  render() {
    const { List, editCreate } = this.props;
    return (
      <Container>
        <Row>
          <Table striped hover className='mt-5'>
            <thead className='table-dark'>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Created</th>
                <th>Category</th>
                <th>Content</th>
                <th>Dates</th>
                <th></th>
                <th>
                  <FontAwesomeIcon icon={faArchive} />
                </th>
                <th>
                  <FontAwesomeIcon icon={faTrash} />
                </th>
              </tr>
            </thead>
            <tbody>
              {List.length > 0 ? (
                List.map((note) => {
                  return (
                    <NoteItem
                      key={note.id}
                      {...note}
                      onDelete={() => this.onDelete(note.id)}
                      onEdit={() => this.onEdit(note.id)}
                      onArchive={() => this.onArchive(note.id)}
                    />
                  );
                })
              ) : (
                <h3 className='text-secondary'>Notes list is not</h3>
              )}
            </tbody>
          </Table>
          <div className='d-flex justify-content-end'>
            {" "}
            {editCreate ? null : (
              <Button variant='secondary' onClick={this.onCreate}>
                Create Note
              </Button>
            )}
          </div>
          {editCreate ? <CreateNotes onCreate={this.onCreate} /> : null}
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = ({ NotesListReducer }) => {
  const { List, editCreate, notesTotal, ListArchive } = NotesListReducer;
  return { List, editCreate, notesTotal, ListArchive };
};
const mapDispatchToProps = {
  onAddNotes,
  onCreateNotes,
  editTrueNote,
  CurrentNotes,
  notesTotalNote,
  AddArchive,
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(NotesList));
