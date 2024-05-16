"use client";
import { useEffect, useState } from 'react';

export default function Users() {

    const [data, setData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});
     const [newUserData, setNewUserData] = useState({});
     const [isCreating, setIsCreating] = useState(false); // Add isCreating state

  useEffect(() => {
    fetch('http://localhost:3030/users/') 
      .then(response => response.json())
      .then(data => {
         const sortedData = data.sort((a, b) => b.id - a.id);
                 setData(sortedData);
      })
          .catch((error) => console.error("Error fetching data:", error));
  }, []);

      const handleEdit = (user) => {
        setIsEditing(true);
        setIsCreating(false);
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
        setIsEditing(false);
        setIsCreating(true);
                // setNewUserData({});

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
         if (name && value) {
        setEditedData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }
    };
    const handleNew = (e) => {
        const { name, value } = e.target;
         if (name && value) {
        setNewUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }
    };
     const handleSubmitNewUser = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
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
            setIsCreating(false);
            setNewUserData({});
            
             alert('User created successfully');
            // Refresh data or update UI as needed
        })
        .catch(error => {
            console.error('Error creating user:', error);
            // Show error message to user
            alert('Error creating user. Please try again later.');
        });
            console.log("New User Data:", newUserData); // Log newUserData
            

    };

  return (
    <main>
      <div>
        {isCreating && (
          <div>
            <h2 className="text-indigo-600 font-bold">Create New User</h2>
            <form onSubmit={handleSubmitNewUser}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent email address where you can receive mails.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone_number"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number:
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          name="phone_number"
                          id="phone_number"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={newUserData.phone_number || ""}
                          onChange={handleNew}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email:
                      </label>
                      <div className="mt-2">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={newUserData.email || ""}
                          onChange={handleNew}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {!isCreating && (
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Users
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the users in the database including their IDs,
                Email and Contact Number.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                onClick={handleCreateUser}
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add user
              </button>
            </div>
          </div>
        )}

        {/* Render user table */}
        {/* <button onClick={handleCreateUser}>Create New User</button> */}
        {!isCreating && (
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
                  {" "}
                  Action
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
                      {isEditing && editedData.id === user.id ? (
                        <input
                          type="email"
                          name="email"
                          value={editedData.email || ""}
                          onChange={handleChange}
                        />
                      ) : (
                        user.email || ""
                      )}
                    </td>

                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                      {user.playerId}
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
        )}
      </div>
    </main>
  );
}