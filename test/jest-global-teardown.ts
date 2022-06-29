import { execFileSync } from 'child_process'

const main = (): Promise<void> =>
  new Promise((resolve) => {
    // Skip database shutdown as circle ci is configured to manage it
    // (see .circleci/config.yml)
    if (process.env.CI !== 'true') {
      execFileSync('./bin/stop-mysql-test')
      execFileSync('./bin/stop-redis-test')
    }
    resolve()
  })

export default main
