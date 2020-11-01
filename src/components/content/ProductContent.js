import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct, deleteProduct } from '../mainwindow/mainSlice';
import './content.sass';

const ProductContent = ({content}) => {
  const [product, setProduct] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productToDelete, setProductToDelete] = useState(0);
  const dispatch = useDispatch();

  const handleSubmit = event => {
    const id = product;
    const name = productName;
    const price = productPrice;

    if(id) {
      dispatch(updateProduct(id, name, price));
    } else {
      dispatch(createProduct(name, price));
    }

    clear();
    event.preventDefault();
  }

  const handleChange = setter => event => {
    setter(event.target.value);
  }

  const handleRow = id => event => {
    setProduct(id);
    setProductName(content[id].name);
    setProductPrice(content[id].price);

    event.preventDefault();
  }

  const clear = () => {
    setProduct("");
    setProductName("");
    setProductPrice("");
  }

  const handleClear = event => {
    clear();

    event.preventDefault();
  }

  const handleDelete = () => {
    const id = productToDelete;
    dispatch(deleteProduct(id));

    setProductToDelete(0);
  }

  return (
    <div className="container content">
      <h1 className="title">
        Products
      </h1>
      <div className="columns is-desktop is-justify-content-center">
        <div className="column is-one-quarter-desktop mb-4 form-container">
          <div className="subtitle mb-0">
            {product && (
              <>
                <span>Update product</span>
                <a href="#" onClick={handleClear} className="icon" title="Clear">
                  <i className="fas fa-times"></i>
                </a>
              </>
            )}
            {!product && "Create product"}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input is-rounded is-full-mobile is-full-desktop"
                  type="text"
                  name="name"
                  value={productName}
                  onChange={handleChange(setProductName)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Price</label>
              <div className="control">
                <input
                  className="input is-rounded is-full-mobile is-full-desktop"
                  type="text"
                  name="price"
                  value={productPrice}
                  onChange={handleChange(setProductPrice)}
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
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(content).map(product => {
                return (
                  <tr key={product.id}>
                    <th>{product.id}</th>
                    <td><a href="#" onClick={handleRow(product.id)} title={`Edit product ${product.id}`}>{product.name}</a></td>
                    <td>{product.price}</td>
                    <td><a onClick={() => setProductToDelete(product.id)} className="icon is-medium"><i className="fas fa-lg fa-trash"></i></a></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`modal ${productToDelete && 'is-active'}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <section className="modal-card-body">
            Are you sure you want to delete this product?
          </section>
          <footer className="modal-card-foot">
            <button onClick={handleDelete} className="button is-success">Yes</button>
            <button onClick={() => setProductToDelete(0)} className="button">No, go back</button>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default ProductContent;

