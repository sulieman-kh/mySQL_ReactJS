module.exports = (sequelize, Sequelize) => {
	const Sul = sequelize.define('sul', {
		id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
			primaryKey: true
		},	
	    date: {
            type: Sequelize.INTEGER,
	    },
	    name: {
		  type: Sequelize.STRING
  	    },
	    amount: {
			type: Sequelize.INTEGER
	    },
	    distance: {
			type: Sequelize.INTEGER
        }
	});
	
	return Sul;
}