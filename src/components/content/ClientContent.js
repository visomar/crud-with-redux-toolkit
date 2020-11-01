import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createClient, updateClient, deleteClient } from '../mainwindow/mainSlice';
import './content.sass';

const ClientContent = ({content}) => {
  const [client, setClient] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientCategory, setClientCategory] = useState("");
  const [clientToDelete, setClientToDelete] = useState(0);
  const dispatch = useDispatch();

  const handleSubmit = event => {
    const id = client;
    const name = clientName;
    const category = clientCategory;

    if(id) {
      dispatch(updateClient(id, name, category));
    } else {
      dispatch(createClient(name, category));
    }

    clear();
    event.preventDefault();
  }

  const handleChange = setter => event => {
    setter(event.target.value);
  }

  const handleRow = id => event => {
    setClient(id);
    setClientName(content[id].name);
    setClientCategory(content[id].category);

    event.preventDefault();
  }

  const clear = () => {
    setClient("");
    setClientName("");
    setClientCategory("");
  }

  const handleClear = event => {
    clear()

    event.preventDefault();
  }

  const handleDelete = () => {
    const id = clientToDelete;
    dispatch(deleteClient(id));

    setClientToDelete(0);
  }

  return (
    <div className="container content">
      <h1 className="title">
        Clients
      </h1>
      <div className="columns is-desktop is-justify-content-center">
        <div className="column is-one-quarter-desktop mb-4 form-container">
          <div className="subtitle mb-0">
            {client && (
              <>
                <span>Update client</span>
                <a href="#" onClick={handleClear} className="icon" title="Clear">
                  <i className="fas fa-times"></i>
                </a>
              </>
            )}
            {!client && "Create client"}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input is-rounded is-full-mobile is-full-desktop"
                  type="text"
                  name="name"
                  value={clientName}
                  onChange={handleChange(setClientName)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <input
                  className="input is-rounded is-full-mobile is-full-desktop"
                  type="text"
                  name="category"
                  value={clientCategory}
                  onChange={handleChange(setClientCategory)}
                />
              </div>
            </div>
            <div className="field is-grouped button-controls">
              <div className="control">
                <button className="button is-primary" type="submit">Send</button>
              </div>
            </div>
          </form>
        </div>
        <div className="column is-full-mobile is-three-quarters-desktop">
          <table className="table is-striped is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th><abbr title="Identifier">Id</abbr></th>
                <th>Name</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(content).map(client => {
                return (
                  <tr key={client.id}>
                    <th>{client.id}</th>
                    <td><a href="#" onClick={handleRow(client.id)} title={`Edit ${client.name}`}>{client.name}</a></td>
                    <td>{client.category}</td>
                    <td><a onClick={() => setClientToDelete(client.id)} className="icon is-medium"><i className="fas fa-lg fa-trash"></i></a></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`modal ${clientToDelete && 'is-active'}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <section className="modal-card-body">
            Are you sure you want to delete this client?
          </section>
          <footer className="modal-card-foot">
            <button onClick={handleDelete} className="button is-success">Yes</button>
            <button onClick={() => setClientToDelete(0)} className="button">No, go back</button>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default ClientContent;

