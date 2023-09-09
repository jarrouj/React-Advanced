import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvidor } from './context/User';
import { BrowserRouter as Route } from 'react-router-dom';
import { QueryClient,QueryClientProvider } from 'react-query';

const queryClient = new QueryClient ({
  defaultOptions:{

    queries:{
      cacheTime:1000*60*60*24,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <Route>
    <UserProvidor>

    <App />
    

    </UserProvidor>
    </Route>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
