# FEATURES

-[x] Authentication
-[x] Create Post
-[x] Like & Comment on Post
-[x] Create stories (Will last 24 hours)
-[] Save post
-[] Follow & Unfollow

cross-env : Makes the scripts multiplatform. Windows has a lot of issues when running enviroment variabes through commands console.
ts-node: is a TypeScript execution engine and REPL for Node.js.
ts-config: Use this to load modules whose location is specified in the paths section of tsconfig.json or jsconfig.json. Both loading at run-time and via API are supported.

Typescript compiler can resolve paths from tsconfig but we try to execute the compiled files with node or node-ts , typescript only will look in the node_module folders all the way up to the root of the filesystem and thus will not find the modules specified by paths in tsconfig.