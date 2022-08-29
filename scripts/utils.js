const fs = require('fs-extra')
const path = require('path')
const execa = require('execa')

const CWD = process.cwd()

const packagePath = path.resolve(CWD, 'packages')

const getArgv = () => {
  return require('minimist')(process.argv.slice(2))
}

const getLibrary = () => {
  const dirs = fs.readdirSync(packagePath)

  function isLibraryDir(dir) {
    if (!fs.statSync(path.resolve(packagePath, dir)).isDirectory()) {
      return false
    }
    const pkgPath = path.resolve(packagePath, dir, 'package.json')
    if (!fs.pathExistsSync(pkgPath)) {
      return false
    }
    return true
  }

  const library = dirs.filter((dir) => isLibraryDir(dir))
  console.log(library)
  return library
}

const binRun = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts })

module.exports = { CWD, packagePath, getArgv, getLibrary, binRun }
