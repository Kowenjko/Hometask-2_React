// Змінюємо основну таблицю---------
export const onAddNotes = (newnote) => {
  return {
    type: "NOTES_ADD",
    payload: newnote,
  };
};
// Змінюємо архівну таблицю---------
export const AddArchive = (newnote) => {
  return {
    type: "ARCHIVE_ADD",
    payload: newnote,
  };
};
// Змінюємо основну таблицю---------
export const archiveViewNote = (newnote) => {
  return {
    type: "ARCHIVE_VIEW",
    payload: newnote,
  };
};

// показуємо таблицю для додаівання чи редагування---------
export const onCreateNotes = (onNote) => {
  return {
    type: "ON_CREATE",
    payload: onNote,
  };
};
// режим редагування-------
export const editTrueNote = (value) => {
  return {
    type: "EDIT_TRUE",
    payload: value,
  };
};
// тимчасово зберігаємо для редагування
export const CurrentNotes = (value) => {
  return {
    type: "CURRENT_NOTES",
    payload: value,
  };
};
// Змінюємо підсумкову таблицю---------
export const notesTotalNote = (value) => {
  return {
    type: "NOTES_TOTAL",
    payload: value,
  };
};
