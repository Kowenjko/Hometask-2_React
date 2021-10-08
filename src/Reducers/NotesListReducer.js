import { v4 as uuidv4 } from "uuid";
const initialState = {
  List: [
    {
      id: uuidv4(),
      name: "Shoping list",
      created: "Sun Oct 03 2021",
      category: "Task",
      content: "Tomatoes, bread",
      dates: "",
    },
    {
      id: uuidv4(),
      name: "New Feature",
      created: "Sun Oct 02 2021",
      category: "Idea",
      content: "Implement new...",
      dates: "",
    },
    {
      id: uuidv4(),
      name: "William Gaddis",
      created: "Sun Oct 03 2021",
      category: "Quote",
      content: "Power doesn't co...",
      dates: "",
    },
    {
      id: uuidv4(),
      name: "The theory of evolut...",
      created: "Sun Oct 01 2021",
      category: "Random Thought",
      content: "The evolut..",
      dates: "",
    },
    {
      id: uuidv4(),
      name: "The theory of evolut...",
      created: "Sun Oct 01 2021",
      category: "Quote",
      content: "The evolut..",
      dates: "",
    },
    {
      id: uuidv4(),
      name: "The theory of evolut...",
      created: "Sun Oct 01 2021",
      category: "Random Thought",
      content: "The evolut..",
      dates: "",
    },
    {
      id: uuidv4(),
      name: "New Feature",
      created: "Sun Oct 02 2021",
      category: "Idea",
      content: "Implement new...",
      dates: "",
    },
  ],
  ListArchive: [],
  notesTotal: [
    { id: uuidv4(), category: "Task", active: 0, archive: 0 },
    { id: uuidv4(), category: "Quote", active: 0, archive: 0 },
    { id: uuidv4(), category: "Random Thought", active: 0, archive: 0 },
    { id: uuidv4(), category: "Idea", active: 0, archive: 0 },
  ],
  editCreate: false,
  archiveView: false,
  CurrentNotes: null,
  editTrue: false,
};

const NotesListReducer = (state = initialState, action) => {
  console.log("action", action);
  switch (action.type) {
    // -----------------------
    case "NOTES_ADD":
      return {
        ...state,
        List: action.payload,
      };
    case "ARCHIVE_ADD":
      return {
        ...state,
        ListArchive: action.payload,
      };
    case "ARCHIVE_VIEW":
      return {
        ...state,
        archiveView: action.payload,
      };
    case "ON_CREATE":
      return {
        ...state,
        editCreate: action.payload,
      };
    // -----------------------
    case "EDIT_TRUE":
      return {
        ...state,
        editTrue: action.payload,
      };
    // -----------------------
    case "CURRENT_NOTES":
      return {
        ...state,
        CurrentNotes: action.payload,
      };
    // -----------------------
    case "NOTES_TOTAL":
      return {
        ...state,
        notesTotal: action.payload,
      };
    // -----------------------
    default:
      return state;
  }
};
export default NotesListReducer;
