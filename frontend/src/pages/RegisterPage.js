import { useState } from "react"


export default function RegisterPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function onSubmit(ev) {
        ev.preventDefault()
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'content-type': 'application/JSON' }
        })
        if (response.ok === false) {
            alert("Registration failed.Try different username")
        } else{
            alert("Registration successful")
        }
    }
    return (
        <form className="register" onSubmit={onSubmit}>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={ev => setUsername(ev.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={ev => setPassword(ev.target.value)}
            />
            <button>Register</button>
        </form>
    )
}