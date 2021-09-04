import { Toolbar, Typography } from "@material-ui/core";
import clsx from "clsx";
import { useToolbarStyles } from "../helper/table.helper";

const EnhancedTableToolbar = (props: { title: string }) => {
	const { title } = props;
	const classes = useToolbarStyles();
	return (
		<Toolbar className={clsx(classes.root)}>
			<Typography className={classes.title} variant="h6" id="tableTitle" component="div">
				{title}
			</Typography>
		</Toolbar>
	);
};

export default EnhancedTableToolbar;
