process.on('unhandledRejection', (err) => {
  console.error(err)
  fail(err)
})
