import React from 'react';
import { useSelector } from 'react-redux';
import { 
  selectActiveTab,
  selectContent
} from '../mainwindow/mainSlice';
import ClientContent from './ClientContent';
import ProductContent from './ProductContent';
import './content.sass';

const Content = ({section}) => {
  const activeTab = useSelector(selectActiveTab);
  const content = useSelector(selectContent);

  switch(activeTab) {
    case 'clients':
      return (
        <ClientContent content={content} />
      );
    case 'products':
      return (
        <ProductContent content={content} />
      );
    default:
      return null;
  }
};

export default Content;
