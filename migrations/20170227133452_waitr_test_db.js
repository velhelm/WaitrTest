
exports.up = function(knex, Promise) {
  return Promise.all([

        knex.schema.createTable('drivers', function(table) {
            table.string('id').primary();
            table.string('name');
            table.decimal('longitude');
            table.decimal('latitude');
        }),

        knex.schema.createTable('reviews', function(table){
			table.string('delivery_id').primary();
			table.string('driver_id')
				.references('id')
				.inTable('drivers');
            table.integer('rating');
			table.string('description');
        })
    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
        knex.schema.dropTable('drivers'),
        knex.schema.dropTable('reviews')
    ])
};
