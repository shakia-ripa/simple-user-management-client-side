import { Link, useLoaderData } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import Swal from "sweetalert2";

const Users = () => {

    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers)


    const handleDelete = (_id) => {
        console.log(_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/users/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'User has been deleted.',
                                'success'
                            )

                            const remainingUsers = users.filter(user => user._id !== _id);
                            setUsers(remainingUsers);
                        }
                    })

            }
        })
    }

    return (
        <div>
            <h2 className="text-3xl text-center my-6">All user: {users.length}</h2>
            <div className="overflow-x-auto mb-7">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>@Email</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        users?.map((user, idx) => <tbody key={idx}>
                            <tr>
                                <th>{idx + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>{user.status}</td>
                                <td>{
                                    <div className="space-x-4">
                                        <Link to={`/updateuser/${user._id}`}>
                                            <button >
                                                <GrEdit></GrEdit>
                                            </button>
                                        </Link>
                                        <button onClick={() => handleDelete(user._id)}>
                                            <ImCross></ImCross>
                                        </button>
                                    </div>
                                }</td>
                            </tr>
                        </tbody>)
                    }
                </table>
            </div>
        </div>
    );
};

export default Users;