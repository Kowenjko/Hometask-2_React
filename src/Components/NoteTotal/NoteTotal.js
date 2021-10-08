import React, { Component } from "react";
import NoteTotalItem from "./NoteTotalItem/NoteTotalItem";
import { Container, Row, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { archiveViewNote, notesTotalNote } from "../../Actions/NoteListActions";
import NoteArchives from "../NoteArchives/NoteArchives";

class NoteTotal extends Component {
  // ------------------------------------
  onViewArchive = () => {
    const { archiveView, archiveViewNote } = this.props;
    archiveViewNote(archiveView ? false : true);
  };
  render() {
    const { notesTotal, archiveView } = this.props;
    return (
      <Container>
        <Row>
          <Table striped hover className='mt-5'>
            <thead className='table-dark'>
              <tr>
                <th></th>
                <th>Category</th>
                <th>Active</th>
                <th>Archive</th>
              </tr>
            </thead>
            <tbody>
              {notesTotal.length > 0 ? (
                notesTotal.map((note) => {
                  return (
                    <NoteTotalItem
                      key={note.id}
                      {...note}
                      onViewArchive={() => this.onViewArchive()}
                    />
                  );
                })
              ) : (
                <h3 className='text-secondary'>Notes list is not</h3>
              )}
            </tbody>
          </Table>
          {archiveView ? <NoteArchives /> : null}
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = ({ NotesListReducer }) => {
  const { notesTotal, archiveView, List, ListArchive } = NotesListReducer;
  return { notesTotal, archiveView, List, ListArchive };
};
const mapDispatchToProps = { archiveViewNote, notesTotalNote };
export default connect(mapStateToProps, mapDispatchToProps)(NoteTotal);
