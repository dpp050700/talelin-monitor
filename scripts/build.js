const { getArgv, getLibrary, binRun } = require('./utils')

const libraries = getLibrary()

const build = async function () {
  const argv = getArgv()

  const buildPromise = libraries.map(async (library) => {
    const args = ['-c', '--environment', [`TARGET:${library}`].join(',')]

    argv.watch && args.push('--watch')

    await binRun('rollup', args)
  })

  return Promise.all(buildPromise)
}

build()
