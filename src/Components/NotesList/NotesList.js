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
  componentDidUpdate() {
    this.onTotal();
  }
  // Підраховуємо категорії----
  findNotes = (obj) => {
    let res = Object.values(
      obj.reduce((a, { category }) => {
        a[category] = a[category] || { category, count: 0 };
        a[category].count++;
        return a;
      }, Object.create(null))
    );
    return res;
  };
  // -----записуємо в store------
  onTotal = () => {
    const { notesTotal, List, ListArchive } = this.props;
    let ListNote = List.slice();
    let ListArchiveNote = ListArchive.slice();
    let notesTotalNote = notesTotal.slice();
    let TotalList = this.findNotes(ListNote);
    let TotalArchiveList = this.findNotes(ListArchiveNote);

    for (let i = 0; i < notesTotalNote.length; i++) {
      for (let j = 0; j < TotalList.length; j++) {
        if (notesTotal[i].category === TotalList[j].category) {
          notesTotal[i].active = TotalList[j].count;
        }
      }
      for (let n = 0; n < TotalArchiveList.length; n++) {
        if (notesTotal[i].category === TotalArchiveList[n].category) {
          notesTotal[i].archive = TotalArchiveList[n].count;
        }
      }
    }
  };
  // ---------------------------------------------
  onCreate = () => {
    const { onCreateNotes, editCreate, editTrueNote, CurrentNotes } = this.props;
    onCreateNotes(editCreate ? false : true);
    editTrueNote(false);
    CurrentNotes(null);
  };
  // ---------------------------------------------
  onEdit = (id) => {
    const { onCreateNotes, editCreate, editTrueNote, CurrentNotes, List } = this.props;
    const index = List.findIndex((elem) => elem.id === id);
    CurrentNotes(List[index]);
    onCreateNotes(editCreate ? false : true);
    editTrueNote(true);
  };
  // ---------------------------------------------
  onDelete = (id) => {
    const { onAddNotes, List, notesTotal, notesTotalNote } = this.props;
    const index = List.findIndex((elem) => elem.id === id);
    let tmpNotesTotal = notesTotal.slice();
    const indexTotal = tmpNotesTotal.findIndex((elem) => elem.category === List[index].category);
    tmpNotesTotal[indexTotal].active--;
    let partOne = List.slice(0, index);
    let partTwo = List.slice(index + 1);
    let tmpList = [...partOne, ...partTwo];
    onAddNotes(tmpList);
    notesTotalNote(tmpNotesTotal);
  };
  // ---------------------------------------------
  onArchive = (id) => {
    const { onAddNotes, List, notesTotal, notesTotalNote, AddArchive, ListArchive } = this.props;
    const index = List.findIndex((elem) => elem.id === id);
    let tmpNotesTotal = notesTotal.slice();
    const indexTotal = tmpNotesTotal.findIndex((elem) => elem.category === List[index].category);
    tmpNotesTotal[indexTotal].active--;
    tmpNotesTotal[indexTotal].archive++;
    let partOne = List.slice(0, index);
    let partTwo = List.slice(index + 1);
    let tmpList = [...partOne, ...partTwo];
    let tmpListArchive = ListArchive.slice();
    tmpListArchive.push(List[index]);
    onAddNotes(tmpList);
    AddArchive(tmpListArchive);
    notesTotalNote(tmpNotesTotal);
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
