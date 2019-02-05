import pkg from "./package.json";
import shell from "shelljs";

const entries = Object.entries(pkg.peerDependencies);

let deps = ["yarn add"];

entries.forEach(([dep, version]) => {
  deps[deps.length] = `${dep}@${version}`;
});

deps.push("--peer");
const cmd = deps.join(" ");
console.log("Installing peer deps!\n -----", cmd);
const result = shell.exec(cmd);
if (result.code !== 0) {
  shell.echo("Error: installing peer dependencies");
  shell.exit(1);
}
