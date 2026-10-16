## Setting up the environment

This repository uses [`yarn@v1`](https://classic.yarnpkg.com/lang/en/docs/install).
Other package managers may work but are not officially supported for development.

To set up the repository, run:

```sh
$ yarn
$ yarn build
```

This will install all the required dependencies and build output files to `dist/`.

## Modifying/Adding code

Most of the SDK is generated code. Modifications to code will be persisted between generations, but may
result in merge conflicts between manual patches and changes from the generator. The generator will never
modify the contents of the `src/lib/` and `examples/` directories.

## Adding and running examples

All files in the `examples/` directory are not modified by the generator and can be freely edited or added to.

```ts
// add an example to examples/<your-example>.ts

#!/usr/bin/env -S npm run tsn -T
…
```

```sh
$ chmod +x examples/<your-example>.ts
# run the example against your api
$ yarn tsn -T examples/<your-example>.ts
```

## Using the repository from source

If you’d like to use the repository from source, you can either install from git or link to a cloned repository:

To install via git:

```sh
$ npm install git+ssh://git@github.com:prelude-so/node-sdk.git
```

Alternatively, to link a local copy of the repo:

```sh
# Clone
$ git clone https://www.github.com/prelude-so/node-sdk
$ cd node-sdk

# With yarn
$ yarn link
$ cd ../my-package
$ yarn link @prelude.so/sdk

# With pnpm
$ pnpm link --global
$ cd ../my-package
$ pnpm link --global @prelude.so/sdk
```

## Running tests

Most tests require you to [set up a mock server](https://github.com/dgellow/steady) against the OpenAPI spec to run the tests.

```sh
$ ./scripts/mock
```

```sh
$ yarn run test
```

## Linting and formatting

This repository uses [prettier](https://www.npmjs.com/package/prettier) and
[eslint](https://www.npmjs.com/package/eslint) to format the code in the repository.

To lint:

```sh
$ yarn lint
```

To format and fix all lint issues automatically:

```sh
$ yarn fix
```

## Publishing and releases

Changes made to this repository via the automated release PR pipeline are staged on npm automatically. A
maintainer then approves the staged version with 2FA, either in the Staged Packages tab of the package on
npmjs.com or with `npm stage approve <stage-id>`. The version is not installable until it is approved. If the
changes aren't made through the automated pipeline, you may want to make releases manually.

### Publish with a GitHub workflow

You can stage a release by using [the `Publish NPM` GitHub action](https://www.github.com/prelude-so/node-sdk/actions/workflows/publish-npm.yml). It authenticates to npm through trusted publishing (GitHub OIDC), so it needs no npm token. The trusted publisher is configured in the settings of the `@prelude.so/sdk` package on npmjs.com.

### Publish manually

If you need to manually stage a release, log in with `npm login` and run the `bin/publish-npm` script. It requires
npm 11.15.0 or later and Node.js 22.14.0 or later.
