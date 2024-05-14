"use client";
import { useEffect, useState } from 'react';

export default function People() {

    const [data, setData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});
     const [newUserData, setNewUserData] = useState({});


  useEffect(() => {
    fetch('http://localhost:3030/users/') 
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

      const handleEdit = (user) => {
        setIsEditing(true);
        setEditedData(user);
    };
const handleSave = () => {
    fetch(`http://localhost:3030/users/${editedData.id}`, {
        method: 'PUT', // or 'PATCH' if only updating specific fields
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
    })
     .then(response => response.json())
  .then(updatedUser => {
        if (updatedUser.error) {
            // Handle the case where the server returns an error
            console.error('Error updating data:', updatedUser.error);
            
            //  alert('User data edited successfully');
            // alert('Error updating data. Please try again later.');
           
        } else {
            // Update data state with the updated user
            setData(prevData => prevData.map(user => user.id === updatedUser.id ? updatedUser : user));
            // Show alert message
            // setIsEditing(false);
            alert('Error updating data. Please try again later.');
            // Reset isEditing state after saving
        }
    })
      .catch(error => {
        console.error('Error updating data:', error);
        // Show error message
        // alert('Error updating data. Please try again later.');
        setIsEditing(false);
         alert('User data edited successfully');
         window.location.reload();
    });
};
const handleCreateUser = () => {
        setIsEditing(true);
    };
// const handleCreateUser = () => {
//         fetch(`http://localhost:3030/users`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 name: 'New User', // Change the values as needed
//                 email: 'newuser@example.com',
//                 password: 'password123',
//             }),
//         })
//             .then(response => response.json())
//             .then(createdUser => {
//                 if (createdUser.error) {
//                     console.error('Error creating user:', createdUser.error);
//                     alert('Error creating user. Please try again later.');
//                 } else {
//                     setData(prevData => [...prevData, createdUser]);
//                     alert('User created successfully');
//                 }
//             })
//             .catch(error => {
//                 console.error('Error creating user:', error);
//                 alert('Error creating user. Please try again later.');
//             });
//     };

    const handleChange = (e) => {
        const { name, value } = e.target;
         if (name && value) {
        setEditedData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }
    };
     const handleSubmitNewUser = () => {
        fetch(`http://localhost:3030/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUserData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(createdUser => {
            // Handle success
            console.log('New user created:', createdUser);
            setIsEditing(false);
            setNewUserData({});
            // Refresh data or update UI as needed
        })
        .catch(error => {
            console.error('Error creating user:', error);
            // Show error message to user
            alert('Error creating user. Please try again later.');
        });
    };

  return (

      <main>
            <div>
                <h1>Users Table</h1>
                 {isEditing ? (
                    <div>
                        <h2>Create New User</h2>
                        <form onSubmit={handleSubmitNewUser}>
                            <label htmlFor="name">Name:</label>
                            <input type="text" name="name" value={newUserData.name || ''} onChange={handleChange} />
                            {/* Add input fields for other user attributes similarly */}
                            <button type="submit">Create User</button>
                        </form>
                    </div>
                ) : (
                    <button onClick={handleCreateUser}>Create New User</button>
                )}
                {/* Render user table */}
                 {/* <button onClick={handleCreateUser}>Create New User</button> */}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>UUID</th>
                            <th>Phone</th>
                             <th>Email</th>
                            <th>PlayerID</th>
                            <th>ConnectionID</th>
                            <th>CreatedAt</th>
                            <th>is_subscribed</th>
                            <th>deleted</th>
                            <th>deleted_at</th>
                        </tr>
                    </thead>
                    <tbody>
                          {data && data.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.uuid}</td>
                                <td>{isEditing && editedData.id === user.id ? <input type="number" name="phone_number" value={editedData.phone_number || ''} onChange={handleChange} /> : user.phone_number || ''}</td>
                                {/* <td>{user.phone_number}</td> */}
                                <td>{user.email}</td>
                                {/* <td>{user.playerId}</td> */}
                                  <td>{isEditing && editedData.id === user.id ? <input type="text" name="playerId" value={editedData.playerId || ''} onChange={handleChange} /> : user.playerId || ''}</td>
                                <td>{user.connectionId}</td>
                                <td>{user.created_at }</td>
                                <td>{user.is_subscribed}</td>
                                <td>{user.deleted}</td>
                                <td>{user.deleted_at}</td>
                                   <td>
                                    {isEditing && editedData.id === user.id ? (
                                        <button onClick={handleSave}>Save</button>
                                    ) : (
                                        <button onClick={() => handleEdit(user)}>Edit</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
   
  );
}