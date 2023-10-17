import Swal from "sweetalert2";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const UpdateUser = () => {
    const [newGender, setNewGender] = useState('');
    const [newStatus, setNewStatus] = useState('');

    const user = useLoaderData();
    const { _id, name, email, gender, status } = user;

    const handleGenderChange = (e) => {
        e.preventDefault();
        setNewGender(e.target.value);
    }
    const handleStatusChange = (e) => {
        e.preventDefault();
        setNewStatus(e.target.value);
    }

    const handleUpdateUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;

        console.log(name, email, newGender, newStatus);

        const updatedUser = { name, email, newGender, newStatus };

        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success',
                        text: 'User updated successfully',
                        icon: 'success',
                        confirmButtonText: 'Done'
                    })
                }
                form.reset();
            })

    }

    return (
        <div className=" my-10 w-4/5 mx-auto">
            <div className="text-center space-y-3">
                <h2 className="text-3xl font-bold">Update User Info</h2>
                <p className="text-xl font-thin">Use the below form to create a new account</p>
            </div>
            <form onSubmit={handleUpdateUser} className="card-body space-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Name" className="input input-bordered" name="name" defaultValue={name} required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Email" name="email" defaultValue={email} className="input input-bordered" required />
                </div>
                <div>
                    <label className="mr-4">Gender:</label>
                    <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        defaultChecked={gender === 'male'}
                        onChange={handleGenderChange}
                    />
                    <label className="mr-7" htmlFor="male">Male</label>

                    <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        defaultChecked={gender === 'female'}
                        onChange={handleGenderChange}
                    />
                    <label htmlFor="female">Female</label>
                </div>
                <div>
                    <label className="mr-6">Status:</label>
                    <input
                        type="radio"
                        id="active"
                        name="status"
                        value="active"
                        defaultChecked={status === 'active'}
                        onChange={handleStatusChange}
                    />
                    <label className="mr-8" htmlFor="active">Active</label>

                    <input
                        type="radio"
                        id="inactive"
                        name="status"
                        value="inactive"
                        defaultChecked={status === 'inactive'}
                        onChange={handleStatusChange}
                    />
                    <label htmlFor="inactive">Inactive</label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-success text-xl">Update</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;