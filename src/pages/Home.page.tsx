import { useEffect, useState } from "react";
import EnhancedTable from "../components/material/table/table.component";
import { MaterialTable } from "../models";
import axios from "../api/axios";
import CircularIndeterminate from "../components/material/spinner/spinner.component";
const headCells: MaterialTable.HeadCells[] = [
	{ id: "id", numeric: false, disablePadding: true, label: "ID" },
	{ id: "email", numeric: false, disablePadding: false, label: "EMAIL" },
	{ id: "first_name", numeric: false, disablePadding: false, label: "FIRSTNAME" },
	{ id: "last_name", numeric: false, disablePadding: false, label: "LASTNAME" }
];
const HomePage = () => {
	const [user, setUser] = useState(null);
	useEffect(() => {
		getUsers();
	}, []);

	const rowPerPageChanged = (row: number) => {
		console.log("row", row);
		getUsers(row);
	};

	const getUsers = (rowPerPage = 5) => {
		axios
			.get(`/api/users?page=0&per_page=${rowPerPage}`)
			.then((axiosResponse) => {
				const {
					data: { data }
				} = axiosResponse;
				console.log("response", data);
				const mappedUserData = data.map((userData: any) => {
					const { avatar, ...rest } = userData;
					return rest;
				});
				setUser(mappedUserData);
			})
			.catch((error) => console.error("API error", error));
	};
	return user ? <EnhancedTable headCells={headCells} rowFromProps={user} rowPerPageChanged={rowPerPageChanged} /> : <CircularIndeterminate />;
};

export default HomePage;
