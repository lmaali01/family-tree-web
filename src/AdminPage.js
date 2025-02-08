import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [familyMembers, setFamilyMembers] = useState([]);
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState('');

    useEffect(() => {
        // Fetch current family data
        axios.get(`${process.env.API_HOST}/api/family`)
            .then(response => setFamilyMembers(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleAddFamilyMember = (e) => {
        e.preventDefault();
        // Add new family member to the backend API
        axios.post(`${process.env.API_HOST}/api/family`, { name, parentId })
            .then(response => {
                setFamilyMembers([...familyMembers, response.data]);
                setName('');
                setParentId('');
            })
            .catch(error => console.error(error));
    };
    console.log(`${process.env.API_HOST}/api/family`);
    return (
        <div>
            <h1>Admin - Manage Family Tree</h1>
            <form onSubmit={handleAddFamilyMember}>
                <input
                    type="text"
                    placeholder="Enter Family Member's Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <select value={parentId} onChange={(e) => setParentId(e.target.value)}>
                    <option value="">Select Parent</option>
                    {familyMembers.map(member => (
                        <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                </select>
                <button type="submit">Add Family Member</button>
            </form>
        </div>
    );
};

export default AdminPage;
