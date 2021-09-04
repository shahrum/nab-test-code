import React from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { getComparator, stableSort, useStyles } from "../helper/table.helper";
import SimpleSelect from "../select/select.component";
import { convertObjectKeysIntoArray, SORT_ORDER } from "../../../shared";
import EnhancedTableToolbar from "./table-toolbar.component";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

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

const EnhancedTable = (props: any) => {
	const { title, headCells, rowFromProps, rowPerPageChanged, paginationInfo, pageNumberChanged } = props;
	const defaultRowsPerPage = 5;
	// console.log("paginationInfo: ", paginationInfo);
	const classes = useStyles();
	const [order, setOrder] = React.useState(SORT_ORDER.asc);
	const [orderBy, setOrderBy] = React.useState("calories");
	const [selected, setSelected] = React.useState<any>([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);

	React.useEffect(() => {
		setRowsPerPage(paginationInfo?.perPage || defaultRowsPerPage);
	}, [paginationInfo]);

	const handleRequestSort = (event: any, property: any) => {
		const isAsc = orderBy === property && order === SORT_ORDER.asc;
		setOrder(isAsc ? SORT_ORDER.desc : SORT_ORDER.asc);
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

	const isSelected: any = (name: any) => selected.indexOf(name) !== -1;
	const previousPage = () => {
		pageNumberChanged(-1);
	};
	const nextPage = () => {
		pageNumberChanged(+1);
	};
	const returnRowInDetail = (row: any) => convertObjectKeysIntoArray(row);
	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<EnhancedTableToolbar title={title} />
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
				<div className={classes.customFooter}>
					{paginationInfo?.page > 1 ? (
						<button className={classes.pagination} onClick={previousPage}>
							<ArrowBackIcon />
						</button>
					) : null}
					<SimpleSelect
						fieldName="Rows per page"
						selectOptions={[5, 10, 25]}
						defaultOption={paginationInfo?.perPage}
						width={150}
						onSelectValueChanged={rowPerPageChanged}
					/>
					{paginationInfo?.page === paginationInfo?.totalPages ? null : (
						<button className={classes.pagination} onClick={nextPage}>
							<ArrowForwardIcon />
						</button>
					)}
				</div>
			</Paper>
		</div>
	);
};

export default EnhancedTable;
