import CardActionItem from './CardActionItem';

const CardActions = ({ editComponent, deleteComponent }) => {
	return (
		<>
			<CardActionItem
				reference="editItem"
				// component={<EditReadingForm readingId={targetId} />}
				component={editComponent}
				actionType="edit"
			/>
			<CardActionItem
				reference="deleteItem"
				// component={<DeleteReading readingId={targetId} />}
				component={deleteComponent}
				actionType="delete"
			/>
		</>
	);
};

export default CardActions;
