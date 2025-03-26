import React, { useState } from 'react';
import { ChangeAdminPassword, ChangeAdminRole, ChangeAdminDetails } from '../components/index.js';

function ChangeAdminDetail({ initialRole = false, initialDetails = false, initialPassword = false }) {
    const [role, setRole] = useState(initialRole);
    const [details, setDetails] = useState(initialDetails);
    const [password, setPassword] = useState(initialPassword);

    if (role) {
        return (
            <div className='w-full h-screen bg-zinc-800 flex flex-wrap justify-center'>
                <ChangeAdminRole />
            </div>
        );
    } 
    else if (details) {
        return (
            <div className='w-full h-screen bg-zinc-800 flex flex-wrap justify-center'>
                <ChangeAdminDetails />
            </div>
        );
    } 
    else if (password) {
        return (
            <div className='w-full h-screen bg-zinc-800 flex flex-wrap justify-center'>
                 <ChangeAdminPassword />
            </div>
        );
    } 
    else {
        return (
            <div className='w-full h-screen bg-zinc-800 flex flex-wrap justify-center items-center'>
                <p className="text-white text-lg">No action selected</p>
            </div>
        );
    }
    

   
}

export default ChangeAdminDetail;
