import { useState, useEffect } from 'react'

export default function CountdownTimer ({ initialSeconds }){
    const [seconds, setSeconds] = useState(initialSeconds)
    useEffect(() => {
        if (seconds <= 0) {
            return
        }
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1)
        }, 1000) 
        return () => clearInterval(timer)
    }, [seconds])

    return <span style={{fontSize:"2rem", fontWeight:"bold"}}>{seconds}</span>
}