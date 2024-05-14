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


//   .then(response => response.json())

  .then(updatedUser => {
        if (updatedUser.error) {
            // Handle the case where the server returns an error
            console.error('Error updating data:', updatedUser.error);
            
            //  alert('User data edited successfully');
            // alert('Error updating data. Please try again later.');
           
        } else {
          // Update data state with the updated user
          setData((prevData) =>
            prevData.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            )
          );
          // Show alert message
          setIsEditing(false);
           alert('User data edited successfully');
                    window.location.reload();
          // alert('Error updating data. Please try again later.');
          // Reset isEditing state after saving
        }
    })
      .catch(error => {
        console.error('Error updating data:', error);
        // Show error message
        alert('Error updating data. Please try again later.');
        // setIsEditing(false);
        //  alert('User data edited successfully');
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
        {isEditing ? (
          <div>
            <h2>Create New User</h2>
            <form onSubmit={handleSubmitNewUser}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                value={newUserData.name || ""}
                onChange={handleChange}
              />
              {/* Add input fields for other user attributes similarly */}
              <button type="submit">Create User</button>
            </form>
          </div>
        ) : (
          <button onClick={handleCreateUser}>Create New User</button>
        )}
        {/* Render user table */}
        {/* <button onClick={handleCreateUser}>Create New User</button> */}
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
              >
                ID
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
              >
                UUID
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
              >
                Phone Number
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
              >
                Email
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
              >
                Player Id
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
              >
                Connection Id
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
              >
                created At
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
              >
                Is_Subscribed
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
              >
                Deleted
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
              >
                Deleted_At
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
              >
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((user) => (
                <tr key={user.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                    {user.id}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                    {user.uuid}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                    {isEditing && editedData.id === user.id ? (
                      <input
                        type="number"
                        name="phone_number"
                        value={editedData.phone_number || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      user.phone_number || ""
                    )}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                    {user.email}
                  </td>
                  <td>
                    {isEditing && editedData.id === user.id ? (
                      <input
                        type="text"
                        name="playerId"
                        value={editedData.playerId || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      user.playerId || ""
                    )}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                    {user.connectionId}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                    {user.created_at}
                  </td>
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