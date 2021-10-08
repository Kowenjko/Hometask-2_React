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
  // --------------------------------------
  delOneElement = (obj, i, obj_2) => {
    const { AddArchive, notesTotalNote } = this.props;
    let partOne = obj.slice(0, i);
    let partTwo = obj.slice(i + 1);
    AddArchive([...partOne, ...partTwo]);
    notesTotalNote(obj_2);
  };
  // Вертаємо назад з архіву------
  onBackArchive = (id) => {
    const { ListArchive, notesTotal, List, onAddNotes, archiveViewNote } = this.props;
    const index = ListArchive.findIndex((elem) => elem.id === id);
    let tmpNotesTotal = notesTotal.slice();
    const indexTotal = tmpNotesTotal.findIndex(
      (elem) => elem.category === ListArchive[index].category
    );
    tmpNotesTotal[indexTotal].active++;
    tmpNotesTotal[indexTotal].archive--;

    let tmpList = List.slice();
    tmpList.push(ListArchive[index]);
    onAddNotes(tmpList);
    archiveViewNote(false);
    this.delOneElement(ListArchive, index, tmpNotesTotal);
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
