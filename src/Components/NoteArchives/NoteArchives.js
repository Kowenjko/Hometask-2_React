import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Container, Row, Table } from "react-bootstrap";
import NoteArchivesItem from "./NoteArhivesItem/NoteArchivesItem";
import { connect } from "react-redux";
import {
  AddArchive,
  onAddNotes,
  archiveViewNote,
  notesTotalNote,
} from "../../Actions/NoteListActions";

class NoteArchives extends Component {
  // Вертаємо назад з архіву
  onBackArchive = (id) => {
    const {
      ListArchive,
      notesTotal,
      List,
      AddArchive,
      onAddNotes,
      archiveViewNote,
      notesTotalNote,
    } = this.props;
    const index = ListArchive.findIndex((elem) => elem.id === id);
    let tmpNotesTotal = notesTotal.slice();
    const indexTotal = tmpNotesTotal.findIndex(
      (elem) => elem.category === ListArchive[index].category
    );
    tmpNotesTotal[indexTotal].active++;
    tmpNotesTotal[indexTotal].archive--;
    let partOne = ListArchive.slice(0, index);
    let partTwo = ListArchive.slice(index + 1);
    let tmpListArchive = [...partOne, ...partTwo];
    let tmpList = List.slice();
    tmpList.push(ListArchive[index]);
    onAddNotes(tmpList);
    AddArchive(tmpListArchive);
    archiveViewNote(false);
    notesTotalNote(tmpNotesTotal);
  };

  render() {
    const { ListArchive } = this.props;
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
                <th>
                  <FontAwesomeIcon icon={faArchive} />
                </th>
              </tr>
            </thead>
            <tbody>
              {ListArchive.length > 0 ? (
                ListArchive.map((note) => {
                  return (
                    <NoteArchivesItem
                      key={note.id}
                      {...note}
                      onBackArchive={() => this.onBackArchive(note.id)}
                    />
                  );
                })
              ) : (
                <h3 className='text-secondary'>Notes list is not</h3>
              )}
            </tbody>
          </Table>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = ({ NotesListReducer }) => {
  const { ListArchive, notesTotal, List } = NotesListReducer;
  return { ListArchive, notesTotal, List };
};
const mapDispatchToProps = { AddArchive, onAddNotes, archiveViewNote, notesTotalNote };

export default connect(mapStateToProps, mapDispatchToProps)(NoteArchives);
