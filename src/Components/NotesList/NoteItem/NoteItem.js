import {
  faPen,
  faShoppingCart,
  faTrash,
  faArchive,
  faLightbulb,
  faHeadSideVirus,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const NoteItem = (props) => {
  const { name, created, category, content, dates, onDelete, onEdit, onArchive } = props;
  const iconCategory = {
    Task: faShoppingCart,
    Quote: faQuoteRight,
    "Random Thought": faHeadSideVirus,
    Idea: faLightbulb,
  };
  return (
    <tr>
      <td>
        <FontAwesomeIcon icon={iconCategory[category]} />
      </td>
      <td>{name}</td>
      <td>{created}</td>
      <td>{category}</td>
      <td>{content}</td>
      <td>{dates}</td>
      <td>
        <FontAwesomeIcon className='icon' onClick={onEdit} icon={faPen} />
      </td>
      <td>
        <FontAwesomeIcon className='icon' onClick={onArchive} icon={faArchive} />
      </td>
      <td>
        <FontAwesomeIcon className='icon' onClick={onDelete} icon={faTrash} />
      </td>
    </tr>
  );
};

export default NoteItem;
