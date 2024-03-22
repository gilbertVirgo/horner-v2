export default ({ title, content }) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>

    <style>
    body {
        margin: 0; padding: 0;
        font-family: "Helvetica Neue", Helvetica, Arial;
    }

    body, h1, h2, h3, p, span, button, ul, li {
        display: block;
        margin: 0;
        padding: 0;
    }

    main {
        width: calc(100% - 30px);
        max-width: 500px;
        margin: 15px auto;

        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;

        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    li {
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: center;
    }
    
    input[type="checkbox"] {
        width: 22px;
        height: 22px;
    }

    input[type="checkbox"]:checked + span {
        text-decoration: line-through;
        color: grey;
    }

    button {
        font-size: 16px;
    }
    </style>
</head>
<body>
    <main>
        ${content}
    </main>
</body>
</html>
`;
