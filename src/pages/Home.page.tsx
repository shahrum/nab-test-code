import { useEffect, useState } from "react";
import EnhancedTable from "../components/material/table/table.component";
import { MaterialTable, User } from "../models";
import axios from "../api/axios";
import CircularIndeterminate from "../components/material/spinner/spinner.component";
const headCells: MaterialTable.HeadCells[] = [
	{ id: "id", numeric: false, disablePadding: true, label: "ID" },
	{ id: "email", numeric: false, disablePadding: false, label: "EMAIL" },
	{ id: "first_name", numeric: false, disablePadding: false, label: "FIRSTNAME" },
	{ id: "last_name", numeric: false, disablePadding: false, label: "LASTNAME" }
];
const HomePage = () => {
	const [user, setUser] = useState<User>();
	const [paginationInfo, setPaginationInfo] = useState<MaterialTable.PaginationInfo>();
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
				console.log("🚀 ~ file: Home.page.tsx ~ line 28 ~ .then ~ axiosResponse", axiosResponse);
				const {
					data: { data, page, per_page, total, total_pages }
				} = axiosResponse;
				console.log("response", data);
				const mappedUserData = data.map((userData: any) => {
					const { avatar, ...rest } = userData;
					return rest;
				});
				setUser(mappedUserData);
				setPaginationInfo({ page, perPage: per_page, total, totalPages: total_pages });
			})
			.catch((error) => console.error("API error", error));
	};
	return user ? (
		<EnhancedTable title="Users" headCells={headCells} rowFromProps={user} rowPerPageChanged={rowPerPageChanged} paginationInfo={paginationInfo} />
	) : (
		<CircularIndeterminate />
	);
};

export default HomePage;
