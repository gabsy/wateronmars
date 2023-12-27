const FormButtons = ({ onClose }) => {
	return (
		<div className="pt-5">
			<button type="submit" className="btn">
				Save
			</button>
			<button className="btn btn-text ml-4 border-0" onClick={onClose}>
				Cancel
			</button>
		</div>
	);
};

export default FormButtons;
