import React, { useEffect, useState } from 'react';
import service from '../services/auth.js';
import { Button } from '../components'; // Ensure Button component exists
import ChangeAdminDetail from './ChangeAdminDetail.jsx'; 

function Admin() {
    const [adminData, setAdminData] = useState(null);
    const [showComponent, setShowComponent] = useState(null); // State to control which component to show

    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const admin = await service.getAdminDetails();
                setAdminData(admin || null);
            } catch (error) {
                console.error("Error fetching admin details:", error);
                setAdminData(null);
            }
        };

        fetchAdminDetails();
    }, []);

    // Function to control component rendering
    const handleShowComponent = (type) => {
        setShowComponent(type);
    };

    if (!adminData) {
        return <div className="text-center text-red-500 font-semibold">Admin Not Found</div>;
    }

    return (
        <div className="flex w-full justify-center items-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-150 text-center">
                <h1 className="text-2xl font-bold mb-2">{adminData.name}</h1>
                <p className="text-lg text-gray-300 mb-1"><strong>Email:</strong> {adminData.email}</p>
                <p className="text-lg text-gray-300 mb-4"><strong>Role:</strong> {adminData.role}</p>

                {/* Buttons */}
                <div className="flex justify-center gap-4">
                    <Button bgColor="bg-blue-500" onClick={() => handleShowComponent("details")}>
                        Change Admin Details
                    </Button>
                    <Button bgColor="bg-green-500" onClick={() => handleShowComponent("role")}>
                        Change Role
                    </Button>
                    <Button bgColor="bg-red-500" onClick={() => handleShowComponent("password")}>
                        Change Password
                    </Button>
                </div>

                {showComponent && (
                    <ChangeAdminDetail 
                    initialRole={showComponent === "role"} 
                    initialDetails={showComponent === "details"} 
                    initialPassword={showComponent === "password"} 
                    />
                )}
            </div>
        </div>
    );
}

export default Admin;
