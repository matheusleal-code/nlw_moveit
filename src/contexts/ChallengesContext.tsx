import { createContext, ReactNode, useEffect, useState } from 'react'
import challenges from '../../challenges.json'

interface Challenge{
    type: 'body' | 'eie',
    description: string,
    amount:number
}

interface ChallengeContextData{
    level: number, 
    currentExperience: number, 
    challengeCompleted: number,
    activeChallenge: Challenge,
    experienceToNextLevel: number,
    levelUp: () => void, 
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void
}

interface ChallengesProviderProps {
    children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengeContextData)

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengeCompleted, setChallengeCompleted] = useState(0)

    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    },[])

    function levelUp() {
        setLevel(level + 1)
    }

    function resetChallenge(){
        setActiveChallenge(null)
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio 🙂 ', {
                body: `Valendo ${challenge.amount} xp!`
            })
        }
    }

    function completeChallenge(){
        if(!activeChallenge){
            return null
        }

        const {amount} = activeChallenge

        let finalExperience = currentExperience + amount

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengeCompleted(challengeCompleted + 1)
    }

    return (
        <ChallengesContext.Provider value={{
            level, 
            levelUp, 
            currentExperience, 
            challengeCompleted ,
            experienceToNextLevel,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            completeChallenge
        }}
        >
            {children}
        </ChallengesContext.Provider>
    )
}