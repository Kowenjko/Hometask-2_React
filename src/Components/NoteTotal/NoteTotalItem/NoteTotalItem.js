import {
  faShoppingCart,
  faLightbulb,
  faHeadSideVirus,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const NoteTotalItem = (props) => {
  const { category, active, archive, onViewArchive } = props;
  const iconCategory = {
    Task: faShoppingCart,
    Quote: faQuoteRight,
    "Random Thought": faHeadSideVirus,
    Idea: faLightbulb,
  };
  return (
    <tr className='icon' onClick={onViewArchive}>
      <td>
        <FontAwesomeIcon icon={iconCategory[category]} />
      </td>
      <td>{category}</td>
      <td>{active}</td>
      <td>{archive}</td>
    </tr>
  );
};

export default NoteTotalItem;
