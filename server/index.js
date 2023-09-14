import cors from "cors"
import express from "express"

import { convert } from "./convert.js"
import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/summary/:id", async (request, response) => {
  try {
    const { id } = request.params

    await download(id)
    const audioConverterd = await convert()

    const result = await transcribe(audioConverterd)

    response.json({ result })
  } catch (error) {
    console.log(error)
    response.json({ error })
  }
})

app.post("/summary", async (request, response) => {
  try {
    const result = await summarize(request.body.text)

    return response.json({ result })
  } catch (error) {
    console.log(error)
    response.json({ error })
  }
})

app.listen(3333, () => console.log("Server is running on port 3333"))
