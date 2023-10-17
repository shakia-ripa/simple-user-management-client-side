import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";


const AddUser = () => {
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState('');

    const {createUser} = useAuth();

    const handleGenderChange = (e) => {
        e.preventDefault();
        setGender(e.target.value);
    }
    const handleStatusChange = (e) => {
        e.preventDefault();
        setStatus(e.target.value);
    }

    const handleAddUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        console.log(name, email, password, gender, status);

        const user = { name, email, password, gender, status };

        createUser(email, password)
        .then( result => {
            console.log(result.user);

            fetch('http://localhost:5000/users',{
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.insertedId){
                    Swal.fire({
                        title: 'Success',
                        text: 'User added successfully',
                        icon: 'success',
                        confirmButtonText: 'Done'
                      })
                }
                form.reset();
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div className=" my-10 w-4/5 mx-auto">
            <div className="text-center space-y-3">
                <h2 className="text-3xl font-bold">New User</h2>
                <p className="text-xl font-thin">Use the below form to create a new account</p>
            </div>
            <form onSubmit={handleAddUser} className="card-body space-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Name" className="input input-bordered" name="name" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Email" name="email" className="input input-bordered" required />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="Password" name="password" className="input input-bordered" required />
                </div>
                <div>
                    <label className="mr-4">Gender:</label>
                    <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        checked={gender === 'male'}
                        onChange={handleGenderChange}
                    />
                    <label className="mr-7" htmlFor="male">Male</label>

                    <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        checked={gender === 'female'}
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
                        checked={status === 'active'}
                        onChange={handleStatusChange}
                    />
                    <label className="mr-8" htmlFor="active">Active</label>

                    <input
                        type="radio"
                        id="inactive"
                        name="status"
                        value="inactive"
                        checked={status === 'inactive'}
                        onChange={handleStatusChange}
                    />
                    <label htmlFor="inactive">Inactive</label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-success text-xl">Save</button>
                </div>
            </form>
        </div>
    );
};

export default AddUser;