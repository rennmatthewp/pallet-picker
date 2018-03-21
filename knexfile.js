module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/color_blocks',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};