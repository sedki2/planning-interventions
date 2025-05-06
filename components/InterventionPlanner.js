
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

export default function InterventionPlanner() {
  const [interventions, setInterventions] = useState([])
  const [form, setForm] = useState({
    lieu: '',
    type: '',
    duree: '',
    urgence: '',
    techniciens: ''
  })
  const [planning, setPlanning] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const addIntervention = () => {
    setInterventions([...interventions, form])
    setForm({ lieu: '', type: '', duree: '', urgence: '', techniciens: '' })
  }

  const generatePlanning = async () => {
    const res = await fetch('/api/generate-planning', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ interventions })
    })
    const data = await res.json()
    setPlanning(data.result)
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Planificateur d'interventions</h1>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Input name="lieu" placeholder="École / Adresse" value={form.lieu} onChange={handleChange} />
        <Input name="type" placeholder="Type d'intervention" value={form.type} onChange={handleChange} />
        <Input name="duree" placeholder="Durée estimée (h)" value={form.duree} onChange={handleChange} />
        <Input name="urgence" placeholder="Urgence (faible/moyenne/élevée)" value={form.urgence} onChange={handleChange} />
        <Input name="techniciens" placeholder="Techniciens nécessaires" value={form.techniciens} onChange={handleChange} />
      </div>
      <Button onClick={addIntervention}>Ajouter l'intervention</Button>

      <h2 className="text-xl font-semibold mt-6 mb-2">Interventions enregistrées</h2>
      {interventions.map((item, i) => (
        <Card key={i} className="mb-2">
          <CardContent className="p-2 text-sm">
            📍 {item.lieu} — {item.type} ({item.duree}h) — Urgence : {item.urgence} — 👥 {item.techniciens} techs
          </CardContent>
        </Card>
      ))}

      <Button onClick={generatePlanning} className="mt-4">Générer le planning</Button>

      {planning && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Planning généré</h2>
          <Textarea readOnly value={planning} className="w-full h-64" />
        </div>
      )}
    </div>
  )
}
