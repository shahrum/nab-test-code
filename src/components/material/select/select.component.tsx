import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

interface StyleProps {
	width: number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: ({ width }) => width
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));

const SimpleSelect = (props: any) => {
	const { fieldName, selectOptions, defaultOption, width, onSelectValueChanged } = props;
	const classes = useStyles({ width });
	const [select, setSelect] = React.useState(defaultOption);

	const handleChange = (event: any) => {
		setSelect(event.target.value);
		onSelectValueChanged(event.target.value);
	};

	return (
		<FormControl className={classes.formControl}>
			<InputLabel id={`${fieldName}-label`}>{fieldName}</InputLabel>
			<Select labelId={`${fieldName}-label`} id={fieldName} value={select} onChange={handleChange}>
				{selectOptions.map((option: string | number) => (
					<MenuItem value={option} key={option}>
						{option}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SimpleSelect;
