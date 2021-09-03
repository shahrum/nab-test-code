import React from "react";
import EnhancedTable from "../components/material/table/table.component";
import { MaterialTable } from "../models";
const headCells: MaterialTable.HeadCells[] = [
	{ id: "id", numeric: false, disablePadding: true, label: "ID" },
	{ id: "email", numeric: false, disablePadding: false, label: "EMAIL" },
	{ id: "first_name", numeric: false, disablePadding: false, label: "FIRSTNAME" },
	{ id: "last_name", numeric: false, disablePadding: false, label: "LASTNAME" },
	{ id: "avatar", numeric: false, disablePadding: false, label: "AVATAR" }
];
const HomePage = () => <EnhancedTable headCells={headCells} />;

export default HomePage;
