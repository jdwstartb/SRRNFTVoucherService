process.env.SRR_MINTER_DB_FILE = '.data/db-test.json'

process.on('unhandledRejection', (err) => {
    console.error(err)
    fail(err)
})
