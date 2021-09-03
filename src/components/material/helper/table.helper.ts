import { lighten, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%"
	},
	paper: {
		width: "100%",
		marginBottom: theme.spacing(2)
	},
	table: {
		minWidth: 750
	},
	visuallyHidden: {
		border: 0,
		clip: "rect(0 0 0 0)",
		height: 1,
		margin: -1,
		overflow: "hidden",
		padding: 0,
		position: "absolute",
		top: 20,
		width: 1
	}
}));

export const useToolbarStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1)
	},
	highlight:
		theme.palette.type === "light"
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(theme.palette.secondary.light, 0.85)
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark
			  },
	title: {
		flex: "1 1 100%"
	}
}));

export const descendingComparator = (a: any, b: any, orderBy: any) => {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
};

export const getComparator = (order: string, orderBy: any) => {
	return order === "desc" ? (a: any, b: any) => descendingComparator(a, b, orderBy) : (a: any, b: any) => -descendingComparator(a, b, orderBy);
};

export const stableSort = (array: any, comparator: any) => {
	const stabilizedThis = array.map((el: any, index: any) => [el, index]);
	stabilizedThis.sort((a: any, b: any) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el: any) => el[0]);
};
