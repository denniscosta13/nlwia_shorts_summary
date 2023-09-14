import { server } from "./server.js"

const form = document.querySelector("#form")
const inputUrl = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const videoURL = inputUrl.value

  if (!videoURL.includes("shorts")) {
    return (content.textContent = "Opa! Esse vídeo não parece ser um shorts.")
  }

  const [_, videoParams] = videoURL.split("/shorts/")
  const [videoID] = videoParams.split("?si")

  content.textContent = "Obtendo o texto do áudio..."

  const transcription = await server.get(`/summary/${videoID}`)

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
