import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3005/graphql',
  cache: new InMemoryCache()
});

const getProductsQuery = () => gql`
  query GetProducts {
    allProducts {
      id
      name
      price
    }
  }
`;

const createProductQuery = () => gql`
  mutation CreateProduct($name: String!, $price: Float!){
    addProduct(name: $name, price: $price) {
      id
      name
      price
    }
  }
`;

const updateProductQuery = () => gql`
  mutation UpdateProduct($id: ID!, $name: String!, $price: Float!){
    updateProduct(id: $id, name: $name, price: $price) {
      id
      name
      price
    }
  }
`;

const deleteProductQuery = () => gql`
  mutation DeleteProduct($id: ID!) {
    removeProduct(id: $id) {
      id
      name
    }
  }
`;


const mainSlice = createSlice({
  name: 'main',
  initialState: {
    tab: null,
    section: null,
    content: {}
  },
  reducers: {
    showClients: (state, action) => {
      state.tab = 'clients';
      state.section = 'Clients';
      state.content = action.payload;
    },
    showProducts: (state, action) => {
      state.tab = 'products';
      state.section = 'Products';
      state.content = action.payload;
    }
  }
});

const { showClients, showProducts } = mainSlice.actions;

export const getClients = () => dispatch => {
  axios.get('http://localhost:3004/clients/')
    .then(resp => {
      const clients = resp.data.reduce((map, client) => {
        map[client.id] = client;
        return map;
      }, {});
      dispatch(showClients(clients));
    })
    .catch(error => {
      console.log(error);
    })
};

export const createClient = (name, category) => dispatch => {
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    data: {
      name,
      category
    },
    url: 'http://localhost:3004/clients/'
  };
  axios(options)
    .then(() => {
      dispatch(getClients());
    })
    .catch(error => {
      console.log(error);
    })
};

export const updateClient = (id, name, category) => dispatch => {
  const data = {};
  if(name) {
    data.name = name;
  }
  if(category) {
    data.category = category;
  }
  const options = {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    data,
    url: `http://localhost:3004/clients/${id}`
  };
  axios(options)
    .then(() => {
      dispatch(getClients());
    })
    .catch(error => {
      console.log(error);
    })
};

export const deleteClient = id => dispatch => {
  axios.delete(`http://localhost:3004/clients/${id}`)
    .then(() => {
      dispatch(getClients());
    })
    .catch(error => {
      console.log(error);
    })
};

export const getProducts = () => dispatch => {

  client
  .query({
    query: getProductsQuery()
  })
  .then(result => {
    const products = result.data.allProducts.reduce((map, product) => {
        map[product.id] = product;
        return map;
      }, {});
    dispatch(showProducts(products));
  })
  .catch(error => console.log(error));
};

export const createProduct = (name, price) => dispatch => {
  client
  .mutate({
    variables: { name, price: parseFloat(price) },
    mutation: createProductQuery()
  })
  .then(result => {
    console.log("Added:", result.data.addProduct);
    dispatch(getProducts());
  })
  .catch(error => console.log(error));
};

export const updateProduct = (id, name, price) => dispatch => {
  client
  .mutate({
    variables: { id, name, price: parseFloat(price) },
    mutation: updateProductQuery()
  })
  .then(result => {
    console.log("Updated:", result.data.updateProduct);
    dispatch(getProducts());
  })
  .catch(error => console.log(error));
};

export const deleteProduct = id => dispatch => {
  client
  .mutate({
    variables: { id },
    mutation: deleteProductQuery()
  })
  .then(result => {
    console.log("Deleted:", result.data.removeProduct);
    dispatch(getProducts());
  })
  .catch(error => console.log(error));
};

export const selectActiveTab = state => state.main.tab;
export const selectSectionName = state => state.main.section;
export const selectContent = state => state.main.content;

export default mainSlice.reducer;
