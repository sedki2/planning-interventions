import { Configuration, OpenAIApi } from 'openai'

export default async function handler(req, res) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)

  const { interventions } = req.body
  const prompt = `Voici une liste d'interventions :\n${JSON.stringify(interventions, null, 2)}\n\nOrganise-les par jour en optimisant les trajets (Noisy-le-Sec), l'urgence, et le nombre de techniciens. Répartis les tâches selon une journée de travail de 8h. Donne-moi un planning clair.`
  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  })

  const result = response.data.choices[0].message.content
  res.status(200).json({ result })
}
