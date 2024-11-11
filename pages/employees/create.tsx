import { useState } from 'react'
import { useRouter } from 'next/router'

const CreateEmployeePage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [position, setPosition] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch('/api/employees', {
      method: 'POST',
      body: JSON.stringify({ name, email, position }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      router.push('/employees')
    } else {
      alert('Failed to create employee')
    }
  }

  return (
    <div className="container">
      <h1 className="text-xl font-bold">Create New Employee</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 mb-4"
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 mb-4"
        />
        <label>Position</label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="w-full p-2 border border-gray-300 mb-4"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Create Employee
        </button>
      </form>
    </div>
  )
}

export default CreateEmployeePage
