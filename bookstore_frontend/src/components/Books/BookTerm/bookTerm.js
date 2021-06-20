import React from 'react';
import {Link} from 'react-router-dom';

const bookTerm = (props) => {
    return (
        <tr>
            <td>{props.term.name}</td>
            <td>{props.term.category}</td>
            <td>{props.term.author.name} {props.term.author.surname}</td>
            <td>{props.term.availableCopies}</td>
            <td className={"text-right"}>
                <Link className={"btn btn-success"}
                      onClick={() => props.onMarkAsTaken(props.term.bookId)}>
                    Mark as taken
                </Link>
                <a title={"Delete"} className={"btn btn-danger"}
                   onClick={() => props.onDelete(props.term.bookId)}>
                    Delete
                </a>
                <Link className={"btn btn-info ml-2"}
                      onClick={() => props.onEdit(props.term.bookId)}
                      to={`/books/edit/${props.term.bookId}`}>
                    Edit
                </Link>
            </td>
        </tr>
    )
}

export default bookTerm;