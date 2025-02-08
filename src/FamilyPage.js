import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tree } from 'react-d3-tree';

const FamilyPage = () => {
    const [family, setFamily] = useState([]);

    useEffect(() => {
        const apiUrl = process.env.API_HOST;
        console.log(`process.env ${console.log(process.env)}`);
        console.log('API URL:', apiUrl);

        // Fetch family data from the backend API
        axios
            .get(`${process.env.API_HOST}/api/family`) // Replace with the actual backend API endpoint
            .then(response => {
                const data = response.data || []; // Ensure response.data is an array
                setFamily(data);
                console.log('Fetched family data:', data);
            })
            .catch(error => console.error('Error fetching family data:', error));
    }, []);

    // Transform the data into a hierarchical format usable by react-d3-tree
    const createTreeData = (members, parentId = null) => {
        return members
            .filter(member => member.parentId === parentId)
            .map(member => ({
                name: member.name || 'Unknown',
                attributes: { ID: member.id },
                children: createTreeData(members, member.id),
            }));
    };

    const treeData = createTreeData(family);

    return (
        <div>
            <h1>Family Tree</h1>
            {treeData.length > 0 ? (
                <div style={{ width: '100%', height: '600px' }}>
                    {/* Render the tree */}
                    <Tree
                        data={treeData}
                        orientation="vertical" // Display the tree vertically
                        translate={{ x: 300, y: 50 }} // Adjust tree positioning
                        pathFunc="step" // Customize the tree line style
                        collapsible={true} // Allow collapsing/expanding nodes
                    />
                </div>
            ) : (
                <p>No family data available to display.</p>
            )}
        </div>
    );
};

export default FamilyPage;
