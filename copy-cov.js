const fs = require("fs")
const path = require("path")

fs.mkdirSync('coverage/work', {
    recursive: true,
});

([
    { source: 'coverage/ut/coverage-final.json', name: 'ut.json' },
    { source: 'coverage/server/coverage-final.json', name: 'server.json' },
    { source: 'coverage/client/coverage-final.json', name: 'client.json' },
]).forEach(({ source, name }) => {
    const sourcePath = path.normalize(source)
    const destPath = path.resolve('coverage/work', name)
    fs.copyFileSync(sourcePath, destPath)
})

