const { events, Job } = require("brigadier");

events.on("deploy_service", deployService);
events.on("cloudevent", deployTenant);
//events.on("cloudevent", deployTenant);

async function deployService(e, p) {
    let j1 = new Job("j1", "busybox", ["env | sort"]);
    let j2 = new Job("j2", "busybox", ["echo " + p]);

    payload = JSON.parse(e.payload);
    j1.env = {
        FOO: payload.foo,
    };
    await j1.run();
    await j2.run();
    console.log("done");
}

async function deployTenant(e, p) {
    let j = new Job("j", "busybox", ["echo " + e.payload]);
    await j.run();
    console.log("done");
}
