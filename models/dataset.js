module.exports = (sequelize, Sequelize) => {
	const DataTypes = Sequelize.DataTypes;
	const Dataset = sequelize.define(
		'Dataset',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			link: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: DataTypes.TEXT,
			tags: DataTypes.TEXT,
			categories: DataTypes.STRING,
			isPaid: DataTypes.BOOLEAN,
		},
		{
			tableName: 'datasets',
		}
	);

	return Dataset;
};
