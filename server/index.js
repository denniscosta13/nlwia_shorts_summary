import cors from "cors"
import express from "express"

import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/summary/:id", async (request, response) => {
  const { id } = request.params

  await download(id)
  const result = await transcribe()

  response.json({ result })
})

app.post("/summary", async (request, response) => {
  const result = await summarize(request.body.text)

  return response.json({ result })
})

app.listen(3333, () => console.log("Server is running on port 3333"))
