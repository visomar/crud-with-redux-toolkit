import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../login/loginSlice';
import { 
  selectActiveTab,
  getClients,
  getProducts
} from './mainSlice';
import TabsNavigator from '../tabsnavigator/TabsNavigator';
import Content from '../content/Content';

function MainWindow() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const activeTab = useSelector(selectActiveTab);

  const handleShowClients = () => {
    dispatch(getClients());
  };
  const handleShowProducts = () => {
    dispatch(getProducts());
  };

  return (
  	<>
    	{user && <h1 className="title">Welcome {user}</h1>}

    	<TabsNavigator 
    		active={activeTab}
    		onShowClients={handleShowClients} 
    		onShowProducts={handleShowProducts}
    	/>

    	{!activeTab && <h2 className="subtitle">Select one of the tabs above</h2>}
    	{activeTab && <Content />}
    </>
  );
}

export default MainWindow;