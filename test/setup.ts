process.env.SRR_MINTER_DB_FILE = '.data/db-test.json'
process.env.SRR_MINTER_ENV = 'test'


process.on('unhandledRejection', (err) => {
    console.error(err)
    fail(err)
})
