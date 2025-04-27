import axios from "axios";
import { useEffect, useState } from "react"
import { Route, Routes } from 'react-router'

import Invoices from './Invoices'
import InvoiceForm from './InvoiceForm'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import NotFoundPage from "./NotFoundPage";
import { ProtectedRoute } from './ProtectRoute';

function App() {
    // TODO scramble id up as it's used for paths
    const [invoices, setInvoices] = useState(null);
    const [invoice, setInvoice] = useState(null);
    const [isReqOk, setIsReqOk] = useState(false);

    const handleSuccessfulRequest = () => setIsReqOk(prev => !prev);

  return (
    <> 
        <Routes>
          <Route index element={
              <ProtectedRoute>
                <Invoices/>
              </ProtectedRoute>
            }>
            </Route>
          <Route path="/invoice" >
              <Route index element={
                <ProtectedRoute>
                  <InvoiceForm invoice={invoice} submitCompleted={handleSuccessfulRequest}/>
                </ProtectedRoute>
              }>
              </Route>
              <Route path="add" element={
                <InvoiceForm invoice={null} submitCompleted={handleSuccessfulRequest}/>
              }> 
              </Route>
          </Route>
          <Route path="/auth">
              <Route path="login" element={<LoginForm submitCompleted={handleSuccessfulRequest} /> }></Route>  
              <Route path="register" element={<RegisterForm submitCompleted={handleSuccessfulRequest} /> }></Route>  
          </Route>
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </>
  )
}

export default App
