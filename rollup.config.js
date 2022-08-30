const { nodeResolve } = require('@rollup/plugin-node-resolve')
const json = require('@rollup/plugin-json')
const clear = require('rollup-plugin-clear')
const cleanup = require('rollup-plugin-cleanup')
const { terser } = require('rollup-plugin-terser')
const { visualizer } = require('rollup-plugin-visualizer')
const commonjs = require('@rollup/plugin-commonjs')
const typescript = require('rollup-plugin-typescript2')

const path = require('path')
const fs = require('fs-extra')

const buildTarget = process.env.TARGET || 'web'

const packagesPath = path.resolve(__dirname, 'packages')

const buildTargetPackage = path.resolve(packagesPath, buildTarget)

const outputDir = path.resolve(buildTargetPackage, 'dist')

const commonConfig = {
  input: `${buildTargetPackage}/src/index.ts`,
  output: {
    exports: 'auto'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    cleanup({
      comments: 'none'
    }),
    clear({
      targets: [outputDir]
    }),
    typescript({
      tsconfig: 'tsconfig.build.json',
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationMap: false,
          declarationDir: `${outputDir}/types/`, // 类型声明文件的输出目录
          module: 'ES2015'
          // paths
        }
      },
      include: ['*.ts+(|x)', '**/*.ts+(|x)', '../**/*.ts+(|x)']
    })
  ]
}

const esmConfig = {
  ...commonConfig,
  output: {
    file: `${outputDir}/${buildTarget}.esm.js`,
    format: 'es',
    name: 'MONITOR',
    sourcemap: true,
    ...commonConfig.output
  },
  plugins: [...commonConfig.plugins]
}

const cjsPackage = {
  ...commonConfig,
  external: [],
  output: {
    file: `${outputDir}/${buildTarget}.js`,
    format: 'cjs',
    name: 'MONITOR',
    sourcemap: true,
    minifyInternalExports: true,
    ...commonConfig.output
  },
  plugins: [...commonConfig.plugins]
}

const iifePackage = {
  ...commonConfig,
  external: [],
  output: {
    file: `${outputDir}/${buildTarget}.min.js`,
    format: 'iife',
    name: 'MONITOR',
    ...commonConfig.output
  },
  plugins: [...commonConfig.plugins, terser()]
}

module.exports = [esmConfig, cjsPackage, iifePackage]
