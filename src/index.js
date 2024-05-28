import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './component/login/Login';
import UserInformation from './component/UserInformation';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,  RouterProvider,} from "react-router-dom";
import axios from 'axios'; 
import PrinterInfor from './component/printer/PrinterInfor';
import Computer from './component/computer/Computer';
import Document from './component/document/Document';
import Register from './component/register/Register';
import ChangePassword from './component/changePassword/ChangePassword';
import PhoneInfor from './component/phone/PhoneInfor';
import History from './component/history/History';
import Cabinet from './component/cabinet/Cabinet';
import ItAsset from './component/itAsset/ItAsset';
import CabinetAsset from './component/cabinetAsset/CabinetAsset';

const root = ReactDOM.createRoot(document.getElementById('root'));


const router = createBrowserRouter([
  {
    path: "/",
    element: <UserInformation />,
  },
  {
    path: "/home",
    element: <UserInformation />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/changePassword",
    element: <ChangePassword />,
  },
  {
    path: "/printer",
    element: <PrinterInfor />,
  },
  {
    path: "/computer",
    element: <Computer />,
  },
  {
    path: "/document",
    element: <Document />,
  },
  {
    path: "/phone",
    element: <PhoneInfor />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/cabinet",
    element: <Cabinet />,
  },
  {
    path: "/itAsset",
    element: <ItAsset />,
  },
  {
    path: "/cabinetAsset",
    element: <CabinetAsset />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
