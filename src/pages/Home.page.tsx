import React from "react";
import EnhancedTable from "../components/material/table/table.component";
import { MaterialTable } from "../models";
const headCells: MaterialTable.HeadCells[] = [
	{ id: "id", numeric: false, disablePadding: true, label: "ID" },
	{ id: "email", numeric: false, disablePadding: false, label: "EMAIL" },
	{ id: "first_name", numeric: false, disablePadding: false, label: "FIRSTNAME" },
	{ id: "last_name", numeric: false, disablePadding: false, label: "LASTNAME" }
];

const rowFromProps = [
	{
		id: 7,
		email: "michael.lawson@reqres.in",
		first_name: "Michael",
		last_name: "Lawson"
	},
	{
		id: 8,
		email: "lindsay.ferguson@reqres.in",
		first_name: "Lindsay",
		last_name: "Ferguson"
	},
	{
		id: 9,
		email: "tobias.funke@reqres.in",
		first_name: "Tobias",
		last_name: "Funke"
	},
	{
		id: 10,
		email: "byron.fields@reqres.in",
		first_name: "Byron",
		last_name: "Fields"
	},
	{
		id: 11,
		email: "george.edwards@reqres.in",
		first_name: "George",
		last_name: "Edwards"
	},
	{
		id: 12,
		email: "rachel.howell@reqres.in",
		first_name: "Rachel",
		last_name: "Howell"
	}
];
const HomePage = () => <EnhancedTable headCells={headCells} rowFromProps={rowFromProps} />;

export default HomePage;
