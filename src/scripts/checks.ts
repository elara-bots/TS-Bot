export function checkIfDeploy() {
    if (process.argv.find((c) => c.includes("deploy.ts"))) {
        return true;
    }
    return false;
}
