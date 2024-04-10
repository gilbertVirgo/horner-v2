import fs from "fs";
import getDirname from "./getDirname.js";
import path from "path";

const cssStyles = fs.readFileSync(
	path.resolve(getDirname(import.meta.url), "style.css")
);

export default ({ title, content }) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>

    <style>${cssStyles}</style>
</head>
<body>
    <main>
        ${content}
    </main>
</body>
</html>
`;
