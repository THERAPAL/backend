module.exports = (sequelize, DataTypes) => {
    return sequelize.define('clients', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        preferenceId: DataTypes.UUID,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    })
}