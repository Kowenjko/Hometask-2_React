import {
  faArchive,
  faShoppingCart,
  faLightbulb,
  faHeadSideVirus,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const NoteArchivesItem = (props) => {
  const { name, created, category, content, dates, onBackArchive } = props;
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
        <FontAwesomeIcon className='icon' onClick={onBackArchive} icon={faArchive} />
      </td>
    </tr>
  );
};

export default NoteArchivesItem;
