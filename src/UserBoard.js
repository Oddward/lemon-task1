import React, { Component } from 'react'

const apiURL = "https://crudcrud.com/api/2125387248e441a685e9a1c564aaf577/"
/* If api request limit reached (https://crudcrud.com/Dashboard/***), go to
 * website and get new api URL to replace.
 * Clear site cookies to refresh & get new api URL (resets data)
 */

export default class UserBoard extends Component {
    constructor( props ){
        super( props )
        this.state = {
            fullName: "",
            address: "",
            gender: "male",
            mobile: "",
            email: "",
            job: "",
            salary: 0,
            id: "",
            users: [],
            editMode: false // form is for editing or adding user
        }
        this.updateInputChange = this.updateInputChange.bind( this )
        this.addUser = this.addUser.bind( this )
        this.getUsers = this.getUsers.bind( this )
        this.getUserFillData = this.getUserFillData.bind( this )
        this.updateEditedUser = this.updateEditedUser.bind( this )
        this.deleteUser = this.deleteUser.bind( this )
    }

    componentDidMount() {
        this.getUsers()
        // Have an initial user record
        // if (this.state.users.length < 1) {
        //     let url = apiURL + 'users/'

        //     fetch(url, {
        //         headers: {"Content-Type": "application/json; charset=utf-8"},
        //         method: "POST",
        //         body: JSON.stringify({
        //             full_name: "Ahmed Khalid Ali",
        //             address: "Khartoum, Sudan",
        //             gender: "male",
        //             mobile: "+24999999999",
        //             email: "example@hotmail.com",
        //             job: "Software Engineer",
        //             salary: 10000,
        //         })
        //     })
        // }
    }

    addUser() {
        let url = apiURL + 'users'

        fetch(url, {
            headers: {"Content-Type": "application/json; charset=utf-8"},
            method: "POST",
            body: JSON.stringify({
                full_name: this.state.fullName,
                address: this.state.address,
                gender: this.state.gender,
                mobile: this.state.mobile,
                email: this.state.email,
                job: this.state.job,
                salary: this.state.salary,
            })
        })
    }

    getUsers() {
        let url = apiURL + 'users'

        fetch(url)
        .then(response => response.json())
        .then(data => this.setState({
            users: data
        }))
        .catch( err => console.log( err ))
    }

    getUserFillData( id ) {
        this.setState({ editMode: true })
        let url = apiURL + 'users/' + id

        fetch(url)
        .then(response => response.json())
        .then(data => this.setState({
            id: data._id,
            fullName: data.full_name,
            address: data.address,
            gender: data.gender,
            mobile: data.mobile,
            email: data.email,
            job: data.job,
            salary: data.salary,
        }))
        .catch( err => console.log( err ))
    }

    updateEditedUser() {
        let url = apiURL + 'users/' + this.state.id

        fetch(url, {
            headers: {"Content-Type": "application/json; charset=utf-8"},
            method: "PUT",
            body: JSON.stringify({
                full_name: this.state.fullName,
                address: this.state.address,
                gender: this.state.gender,
                mobile: this.state.mobile,
                email: this.state.email,
                job: this.state.job,
                salary: this.state.salary,
            })
        })
    }

    deleteUser( id ) {
        let url = apiURL + 'users/' + id

        fetch(url, {
            method: "DELETE"
        })
        .then( () => this.getUsers() )
    }

    updateInputChange( e ) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    

    render() {
        return (
            <div>
                <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                        <h1 className="m-0">User Management</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">User Management</li>
                        </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>

                {/* Main content */}
                <section className="content">
                <div className="container-fluid">

                <div className={"card " + (this.state.editMode ? "card-warning" : "card-primary")}>
                    <div className="card-header">
                        { this.state.editMode ? 
                            <h3 className="card-title">Edit User <small>{this.state.id}</small></h3>
                            :
                            <h3 className="card-title">Add User</h3>
                        }
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                        {/* FORM START */}
                        <form>
                        
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="fullName">Full Name</label>
                                    <input type="text" className="form-control" id="fullName" placeholder="Enter full name" name="fullName" value={ this.state.fullName } onChange={ this.updateInputChange } />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="emailAddress">Email address</label>
                                    <input type="email" className="form-control" id="emailAddress" placeholder="Enter valid email" name="email" value={ this.state.email} onChange={ this.updateInputChange } />
                                </div>
                            </div>
                        </div>
                        
                        {/* GENDER & ADDRESS */}
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Gender</label>
                                    <select className="form-control" name="gender" value={ this.state.gender } onChange={ this.updateInputChange }>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" className="form-control" id="address" placeholder="Enter address [city, country]" name="address" value={ this.state.address } onChange={ this.updateInputChange } />
                                </div>
                            </div>
                        </div>

                        {/* Telephone number */}
                        <div className="row">
                            <div className="col-sm-4">
                                <label>Country (code)</label>
                                <input type="text" className="form-control" id="code" value="Sudan (249)" disabled />
                            </div>
                            <div className="col-sm-8">
                                <label>Phone Number</label>
                                <input type="tel" className="form-control" id="fullName" placeholder="--" name="mobile" value={ this.state.mobile } onChange={ this.updateInputChange } />
                            </div>
                        </div>

                        {/* JOBS & SALARY */}
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="job">Job</label>
                                    <select className="form-control" id="job" name="job" value={ this.state.job } onChange={ this.updateInputChange }>
                                        <option>Software Engineer</option>
                                        <option>Web Developer</option>
                                        <option>IT Technician</option>
                                        <option>Network Admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="salary">Salary ($)</label>
                                    <input type="number" className="form-control" id="salary" placeholder="Enter your salary" name="salary" value={ this.state.salary } onChange={ this.updateInputChange } />
                                </div>
                            </div>
                        </div>
                        {/* DYNAMIC FORM ACTION BUTTONS */}
                        <div class="card-footer">
                            <button type="submit" class="btn btn-primary" onClick={ () => this.state.editMode ? this.updateEditedUser() : this.addUser() }>Save changes</button>
                            { this.state.editMode == true && 
                                <button type="submit" class="btn btn-secondary ml-2" onClick={ () => this.setState({ editMode: false }) }>Cancel</button>
                            }
                        </div>

                        </form>
                    </div>
                    {/* /.card-body */}
                </div>

                </div>
                </section>

                <section classname="content">
                    <div classname="container-fluid">
                        {/* /.row */}
                        <div className="row">
                        <div className="col-12">
                            <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Users</h3>
                                <div className="card-tools">
                                <div className="input-group input-group-sm" style={{width: 150}}>
                                    <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                                    <div className="input-group-append">
                                    <button type="submit" className="btn btn-default">
                                        <i className="fas fa-search" />
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body table-responsive p-0">
                                <table className="table table-hover text-nowrap">
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Gender</th>
                                    <th>Mobile</th>
                                    <th>Job</th>
                                    <th>Salary</th>
                                    <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.users.map((( user, index ) => 
                                        <tr key={ user._id }>
                                            <td>{ index }</td>
                                            <td>{ user.full_name}</td>
                                            <td>{ user.email }</td>
                                            <td>{ user.address }</td>
                                            <td>{ user.gender }</td>
                                            <td>{ user.mobile }</td>
                                            <td>{ user.job }</td>
                                            <td>{ user.salary }</td>
                                            <td>
                                                <button className="btn btn-info" onClick={ () => this.getUserFillData( user._id ) }>Edit</button>
                                                <button className="btn btn-danger" onClick={ () => this.deleteUser( user._id ) }><span className="fa fa-trash"></span></button>
                                            </td>
                                        </tr>)) }
                                </tbody>
                                </table>
                            </div>
                            {/* /.card-body */}
                            </div>
                            {/* /.card */}
                        </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>
        )
    }
}
