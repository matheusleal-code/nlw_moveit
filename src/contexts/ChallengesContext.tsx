import { createContext, ReactNode, useState } from 'react'
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
    resetChallenge: () => void
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
        }}
        >
            {children}
        </ChallengesContext.Provider>
    )
}