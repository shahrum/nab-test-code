import { useEffect, useState } from "react";
import EnhancedTable from "../components/material/table/table.component";
import { MaterialTable, User } from "../models";
import axios from "../api/axios";
import CircularIndeterminate from "../components/material/spinner/spinner.component";
const headCells: MaterialTable.HeadCells[] = [
	{ id: "id", numeric: false, disablePadding: false, label: "ID" },
	{ id: "email", numeric: false, disablePadding: false, label: "EMAIL" },
	{ id: "first_name", numeric: false, disablePadding: false, label: "FIRSTNAME" },
	{ id: "last_name", numeric: false, disablePadding: false, label: "LASTNAME" }
];
const HomePage = () => {
	const [user, setUser] = useState<User>();
	const [rowPerPageOnApi, setRowPerPageOnApi] = useState(5);
	const [pageNumber, setPageNumber] = useState(1);
	const [paginationInfo, setPaginationInfo] = useState<MaterialTable.PaginationInfo>();
	useEffect(() => {
		const getUsers = (): void => {
			setUser(undefined);
			axios
				.get(`/api/users?page=${pageNumber}&per_page=${rowPerPageOnApi}`)
				.then((axiosResponse) => {
					const {
						data: { data, page, per_page, total, total_pages }
					} = axiosResponse;
					const mappedUserData = data.map((userData: any) => {
						const { avatar, ...rest } = userData;
						return rest;
					});
					setPaginationInfo({ page, perPage: per_page, total, totalPages: total_pages });
					setUser(mappedUserData);
				})
				.catch((error) =>
					console.error(
						"API error, we could also log our error however its better to log them in the axios base config and handle it with an interceptor",
						error
					)
				);
		};
		console.log("row per page effect:", rowPerPageOnApi);
		getUsers();
		return () => {
			console.log("Clean-up goes here, as eg remove subscibers");
			// if (subscriber) {
			// 	subscriber.remover();
			// 	subscriber = null;
			// }
		};
	}, [rowPerPageOnApi, pageNumber]);

	const onRowPerPageChanged = (row: number): void => {
		console.log("row", row);
		setPageNumber(1);
		setRowPerPageOnApi(row);
	};

	const pageNumberChanged = (pNumber: number): void => {
		console.log("pageNumberChanged", pNumber);
		setPageNumber(pageNumber + pNumber);
	};

	return user ? (
		<EnhancedTable
			title="Users"
			rowFromProps={user}
			headCells={headCells}
			paginationInfo={paginationInfo}
			rowPerPageChanged={onRowPerPageChanged}
			pageNumberChanged={pageNumberChanged}
		/>
	) : (
		<CircularIndeterminate />
	);
};

export default HomePage;
