import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'
import { LoginPage } from '../components/LoginPage'

interface Challenge {
    type: 'body' | 'eie',
    description: string,
    amount: number
}

interface ChallengeContextData {
    level: number,
    currentExperience: number,
    challengeCompleted: number,
    activeChallenge: Challenge,
    experienceToNextLevel: number,
    username: string,
    handleChangeUserName:(e) => void,
    levelUp: () => void,
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void,
    closeLevelUpModal: () => void,
    getIn: () => void
}

interface ChallengesProviderProps {
    children: ReactNode,
    level: number,
    currentExperience: number,
    challengeCompleted: number
}

export const ChallengesContext = createContext({} as ChallengeContextData)

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengeCompleted, setChallengeCompleted] = useState(rest.challengeCompleted ?? 0)

    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
    const [isLogged, setIsLogged] = useState(false)

    const [username, setUserName] = useState("")

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengeCompleted', String(challengeCompleted))
    }, [level, currentExperience, challengeCompleted])

    function levelUp() {
        setLevel(level + 1)
        setIsLevelUpModalOpen(true)
    }

    function handleChangeUserName(e){
        setUserName(e)
    }

    function getIn(){
        setIsLogged(true)
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false)
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🙂 ', {
                body: `Valendo ${challenge.amount} xp!`
            })
        }
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return null
        }

        const { amount } = activeChallenge

        let finalExperience = currentExperience + amount

        if (finalExperience >= experienceToNextLevel) {
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
            challengeCompleted,
            experienceToNextLevel,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            completeChallenge,
            closeLevelUpModal,
            username,
            handleChangeUserName,
            getIn
        }}
        >
            {children}

            {!isLogged && <LoginPage />}
            {isLevelUpModalOpen && <LevelUpModal/> }
        </ChallengesContext.Provider>
    )
}