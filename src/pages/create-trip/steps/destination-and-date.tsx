import React, { useState } from 'react'
import { MapPin, Calendar, ArrowRight, Settings2, X } from 'lucide-react' // biblioteca de icones
import { Button } from '../../../components/button'
import { DayPicker } from 'react-day-picker'
import "react-day-picker/dist/style.css";

// estrutura que armazena as propriedades necessarias do elemento pai p/ elemento filho
interface DestinationAndDateStepProps {
    isGuestsInputOpen: boolean
    openGuestsInput: () => void
    closeGuestsInput: () => void
}

export function DestinationAndDateStep({
    isGuestsInputOpen, // função recebe propriedades como parametro
    openGuestsInput,
    closeGuestsInput,
}: DestinationAndDateStepProps) {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

    function openDatePicker() {
        setIsDatePickerOpen(true)
    }

    function closeDatePicker() {
        setIsDatePickerOpen(false)
    }

    return (
        <div className='h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3'>

            <div className='flex items-center gap-2 flex-1'>
                <MapPin className='size-5 text-zinc-400'/>
                <input disabled={isGuestsInputOpen} type="text" placeholder='Para onde você vai?' className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1'/>
            </div>

            <button onClick={openDatePicker} disabled={isGuestsInputOpen} className='flex items-center gap-2 text-left'>
                <Calendar className='size-5 text-zinc-400'/>
                <span className='text-lg text-zinc-400 w-40'>
                    Quando?
                </span>
            </button>
            {/* modal */}
            {isDatePickerOpen && (
                <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
                    <div className='rounded-xl py-5 px-6 bg-zinc-900 shadow-shape space-y-5'>
                        <div className='space-y-2'>
                            <div className='flex items-center justify-between'>
                                <h2 className='text-lg font-semibold' >Selecionar data</h2>
                                <button onClick={closeDatePicker} type='button'>
                                <X className='size-5 text-zinc-400'/>
                                </button>
                            </div>      
                        </div>
                        <DayPicker mode="range" />
                    </div>  
                </div>
            )}

            <div className='w-px h-6 bg-zinc-800'/>

            {isGuestsInputOpen ? (
                <Button onClick={closeGuestsInput} variant='secundary'>
                    Alterar local/data 
                    <Settings2 className='size-5'/>
                </Button>
            ) : (
                <Button onClick={openGuestsInput} variant='primary'>
                    Continuar
                    <ArrowRight className='size-5'/>
                </Button>
            )}

        </div>
    )
}