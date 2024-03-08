import { useState } from 'react'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  return (
    <form className="flex max-w-md flex-col gap-4 p-4 border border-black rounded-md m-4">
      <div className="text-center text-2xl"> Sign Up </div>
      <div className=" flex flex-col gap-2">
        <span> Username </span>
        <input
          className="outline-none border border-slate-500 rounded-sm"
          type=" text"
          placeholder="durgesh@example.com"
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        ></input>
      </div>
      <div className=" flex flex-col gap-2">
        <span> Password </span>
        <input
          className="outline-none border border-slate-500 rounded-sm"
          type=" text"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        ></input>
      </div>
      <div className=" flex flex-col gap-2">
        <span> First Name </span>
        <input
          className="outline-none border border-slate-500 rounded-sm"
          type=" text"
          onChange={(e) => {
            setFirstName(e.target.value)
          }}
        ></input>
      </div>
      <div className=" flex flex-col gap-2">
        <span> Last Name </span>
        <input
          className="outline-none border border-slate-500 rounded-sm"
          type=" text"
          onChange={(e) => {
            setLastName(e.target.value)
          }}
        ></input>
      </div>
      <button
        className="border border-slate-500 rounded-sm text-white bg-black"
        onClick={async () => {
          try {
            const response = await fetch('http://localhost:3000/createUser', {
              method: 'POST',
              body: JSON.stringify({
                username: username,
                firstName: firstName,
                lastName: lastName,
                password: password,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            })

            if (response.ok) {
              const data = await response.json()
              console.log(data) // Log the response data
            } else {
              console.error('Failed to create user')
            }
          } catch (error) {
            console.error('Error creating user:', error)
          }
        }}
      >
        Signup
      </button>
    </form>
  )
}
