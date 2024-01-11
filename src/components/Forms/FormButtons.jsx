const FormButtons = ({ onClose }) => {
	return (
		<div className="pt-5">
			<button className="btn btn-text mr-4 border-0" onClick={onClose}>
				Cancel
			</button>
			<button type="submit" className="btn">
				Save
			</button>
		</div>
	);
};

export default FormButtons;
