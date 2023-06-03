import {onRequest} from "firebase-functions/v2/https";

export const proxyObsidian = onRequest(async (req, res) => {
  const url = "https://publish.obsidian.md/serve?url=notes.franklin.dev";
  try {
    const headers: [string, string][] = [];
    for (let i = 0; i < req.rawHeaders.length - 1; i += 1) {
      headers.push([req.rawHeaders[i], req.rawHeaders[i + 1]]);
    }
    const options: RequestInit = {
      method: req.method,
      headers: headers,
      redirect: "follow",
    };

    if (req.method !== "GET") {
      options.body = req.rawBody;
    }

    const response = await fetch(url, options);
    const data = await response.text();
    res.status(response.status).set(response.headers).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
