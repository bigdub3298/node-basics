const users = [];

const responseHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-type", "text/html");
    res.write(`
    <html>
      <header><title>Users Assignment</title></header>
      <body>
        <form action='/create-user' method='POST'>
          <input type='text' name='username'/>
          <button type='submit'>Submit</button>
        </form>
      </body>
    </html>
    `);
    return res.end();
  }

  if (url === "/users") {
    let output = "";

    users.forEach(username => {
      output += `<li>${username}</li>`;
    });

    res.setHeader("Content-type", "text/html");
    res.write(`
    <html>
      <header><title>Users Assignment</title></header>
      <body>
        <ul>
        ${output}
        </ul>
      </body>
    </html>
    `);
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", chunk => body.push(chunk));

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1].replace(/\+/g, " ");

      users.push(message);
      res.statusCode = 302;
      res.setHeader("Location", "/users");
      return res.end();
    });
  }
};

exports.handler = responseHandler;
