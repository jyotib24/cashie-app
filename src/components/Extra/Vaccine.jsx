import React,{useState,useEffect} from 'react';
import { paginate, makeArrayFromANumber,sorting} from "../utils/utils";


import { Link } from "react-router-dom";
var allUsers = [];
function Vaccine(props) {
    let [users, setUsers] = useState([]);
    const [pageSize, setPageSize] = useState(7);
	const [currentPage, setCurrentPage] = useState(0);
	const [sortColumn, setSortColumn] = useState("id"
		// queryData.sortBy ? queryData.sortBy : "id",
	);
	const [sortOrder, setSortOrder] = useState("asc"
		// queryData.sortOrder ? queryData.sortOrder : "asc",
	);
	//pagination
	let data = paginate(users, currentPage, pageSize);
	//sorting
	data = data.length && sorting(data, sortColumn, sortOrder);
	let totalLink = Math.ceil(users.length / pageSize);
	let linksArray = makeArrayFromANumber(totalLink);

    useEffect(() => {
        async function getUsers(){
            let result =await fetch("https://60faedc391156a0017b4c6f5.mockapi.io/api/v/vaccination");
            let data= await result.json();
			allUsers = data;
            setUsers(data);
        }
        getUsers();
        console.log(users);
    }, []);

    const handlePageChange = (linkNo) => {
		if (linkNo === "previous") setCurrentPage(currentPage - 1);
		else if (linkNo === "next") setCurrentPage(currentPage + 1);
		else setCurrentPage(linkNo);
	};
	const handleSort = (key) => {
		setSortColumn(key);
		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
	};
	const handleSearch = (e) => {
		let searchKeywords = e.target.value.toLowerCase();

		let filtered = allUsers.filter((user) => {
			let a = user.name.toLowerCase();
			return a.search(searchKeywords) !== -1;
		});
		setUsers(filtered);
	};
	const handleFiltering = (e) => {
		let filtered = allUsers.filter(
			(user) => user.gender === e.target.checked,
		);
		setUsers(filtered);
	};
	const handleDropdown = (e) => {
		let filtered = allUsers.filter(
			(user) => user.isVaccinated === e.target.checked,
	
		);
		setUsers(filtered);
	}
    return (
        <div>
			<div className="mb-3 mt-5 search-bar-wrapper">
				<input
					onKeyUp={handleSearch}
					type="email"
					className="form-control"
					id="exampleFormControlInput1"
					placeholder="Search the users...."
				/>
			</div>
            <div className="wrap shadow-sm p-3 rounded">
                <table className="table m-table wrapper">
					<thead >
						<tr className="thead">
							<th>Id</th>
                            <th onClick={() => handleSort("name")}>Name</th>
                            <th onClick={() => handleSort("age")}>Age</th>
                            <th>Photo</th>
                            <th >Phone Number</th>
                            <th onClick={() => handleSort("email")}>Email</th>
                            <th>
							{" "}
								Gender{" "}
								<input
									onClick={handleFiltering}
									className="ml-4"
									type="checkbox"/>
							</th>
                            <th>{" "}
								IsVaccinated{" "}
								<input
									onClick={handleDropdown}
									className="ml-4"
									type="checkbox"/>
							</th>
						</tr>
					</thead>
					<tbody>
							{data.length && data.map((user) => (
								<tr key={user.id}>
									<td>{user.id}</td>
									<td >{user.name}</td>
                                    <td>{user.age}</td>
									<td><img className="avatar" src={user.avatar} alt="" /></td>
									<td>{user.mobilenumber}</td>
									<td>{user.email}</td>
                                    <td>{user.gender?"Female":"Male"}</td>
									<td>{user.isVaccinated ? "Vaccinated" : "NOT Vaccinated"}</td>
								</tr>
							))}
					</tbody>
				</table>
            </div>

            <div className="pagination-block">
				<nav aria-label="Page navigation example">
					<ul className="pagination">
						<li onClick={() => handlePageChange("previous")} class="page-item ">
							<a class="page-link" href="#" tabindex="-1" aria-disabled="true">
								Previous
							</a>
						</li>
						{linksArray.map((link) => (
							<li
								onClick={() => handlePageChange(link)}
								className={`page-item ${currentPage === link && "active"} `}>
								<a className="page-link" href="#">
									{link + 1}
								</a>
							</li>
						))}
						<li onClick={() => handlePageChange("next")} class="page-item ">
							<a class="page-link" href="#" tabindex="-1" aria-disabled="true">
								Next
							</a>
						</li>
					</ul>
				</nav>
			</div>

        </div>
    )
}
export default Vaccine
