export const checkIfDeploy = () =>
    process.argv.find((c) => c.includes(`deploy.ts`)) ? true : false;
