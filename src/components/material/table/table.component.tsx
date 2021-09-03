import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { descendingComparator, getComparator, stableSort, useStyles, useToolbarStyles } from "../helper/table.helper";
// import { lighten, makeStyles } from "@material-ui/core/styles";
// import IconButton from "@material-ui/core/IconButton";
// import Tooltip from "@material-ui/core/Tooltip";
// import FilterListIcon from "@material-ui/icons/FilterList";
// import DeleteIcon from "@material-ui/icons/Delete";
// import { MaterialTable } from "../../../models";
// import Switch from "@material-ui/core/Switch";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";

function EnhancedTableHead(props: any) {
	const { classes, order, orderBy, onRequestSort, headCells } = props;
	const createSortHandler = (property: any) => (event: any) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell: any) => (
					<TableCell
						key={headCell.id}
						align={headCell?.numeric ? "right" : "left"}
						padding={headCell?.disablePadding ? "none" : "normal"}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : "asc"} onClick={createSortHandler(headCell.id)}>
							{headCell.label}
							{orderBy === headCell.id ? <span className={classes.visuallyHidden}>{order === "desc" ? "sorted descending" : "sorted ascending"}</span> : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
	headCells: PropTypes.array.isRequired
};

const EnhancedTableToolbar = (props: any) => {
	const classes = useToolbarStyles();

	return (
		<Toolbar className={clsx(classes.root)}>
			{
				<Typography className={classes.title} variant="h6" id="tableTitle" component="div">
					Users
				</Typography>
			}
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired
};

const EnhancedTable = (props: any) => {
	const { headCells, rowFromProps } = props;
	const classes = useStyles();
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("calories");
	const [selected, setSelected] = React.useState<any>([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (event: any, property: any) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event: any) => {
		if (event.target.checked) {
			const newSelecteds: any = rowFromProps.map((n: any) => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event: any, name: any) => {
		const selectedIndex: any = selected.indexOf(name);
		let newSelected: any = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected: any = (name: any) => selected.indexOf(name) !== -1;

	const returnRowInDetail = (row: any) => {
		const objectKeys = [];
		for (let key in row) {
			objectKeys.push(`${key}`);
		}
		return objectKeys;
	};
	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<EnhancedTableToolbar numSelected={selected.length} />
				<TableContainer>
					<Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
						<EnhancedTableHead
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rowFromProps.length}
							headCells={headCells}
						/>
						<TableBody>
							{stableSort(rowFromProps, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row: any, index: any) => {
									const isItemSelected = isSelected(row.id);
									// const labelId = `enhanced-table-checkbox-${index}`;
									const mappedRow = returnRowInDetail(row);
									return (
										<TableRow
											hover
											onClick={(event) => handleClick(event, row.id)}
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.id}
											selected={isItemSelected}
										>
											{mappedRow.map((rowData, index) => (
												<TableCell align="left" key={index}>
													{row[rowData]}
												</TableCell>
											))}
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rowFromProps.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
};

export default EnhancedTable;
