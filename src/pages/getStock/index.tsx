import * as React from 'react';

// const getStock = ({contact, handleEditClick, handleDeleteClick }): JSX.Element => {
const getStock = (): JSX.Element => {

  return (
    <tr>
      {/* <td>{contact.Name}</td>
      <td>{contact.Price}</td>
      <td>{contact.Stock}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td> */}
    </tr>
  );
};

export default getStock;