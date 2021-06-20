import React from 'react';
import {useHistory} from 'react-router-dom';

const BookEdit = (props) => {
    const history = useHistory();
    const [formData, updateFormData] = React.useState({
        name: "",
        category: 1,
        authorId: 1,
        availableCopies: 0
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name !== "" ? formData.name : props.book.name;
        const category = formData.category !== 1 ? formData.category : props.book.category;
        const authorId = formData.authorId !== 1 ? formData.authorId : props.book.author.authorId;
        const availableCopies = formData.availableCopies !== 0 ? formData.availableCopies : props.book.availableCopies;

        props.onEditBook(props.book.bookId, name, category, authorId, availableCopies);
        history.push("/books");
    }

    return (
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               placeholder={props.book.name}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="form-control" onChange={handleChange}>
                            {props.categories.map((term) => {
                                if (props.book.category !== undefined &&
                                    props.book.category === term)
                                    return <option selected={props.book.category} value={term}>
                                        {term}
                                    </option>
                                else return <option value={term}>
                                    {term}
                                </option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <select name="authorId" className="form-control" onChange={handleChange}>
                            {props.authors.map((term) => {
                                if (props.book.author !== undefined &&
                                    props.book.author.authorId === term.authorId)
                                    return <option selected={props.book.author.authorId}
                                                   value={term.authorId}>
                                        {term.name} {term.surname}
                                    </option>
                                else return <option value={term.authorId}>
                                    {term.name} {term.surname}
                                </option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="availableCopies">Available copies</label>
                        <input type="text"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               placeholder={props.book.availableCopies}
                               onChange={handleChange}
                        />
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default BookEdit;