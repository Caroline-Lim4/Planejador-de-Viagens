import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { CreateActivityModal } from './create-activity-modal'
import { ImportanteLinks } from './important-links'
import { Guests } from './guests'
import { Activities } from './activities'
import { DestinationAndDateStep } from '../create-trip/steps/destination-and-date'
import { DestinationAndDateHeader } from './destination-and-date-header'

export default function TripDetailsPage() {
    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)


    function openCreateActivityModal() {
        setIsCreateActivityModalOpen(true)
    }

    function closeCreateActivityModal() {
        setIsCreateActivityModalOpen(false)
    }

    return (
    <div className='max-w-6xl px-6 py-10 mx-auto space-y-8'>
        
        {/* cabeçalho */}
        <DestinationAndDateHeader />

        <main className='flex gap-16 px-4'>
            {/* coluna 1 */}
            <div className='flex-1 space-y-6'>
                {/* titulo da atividade */}
                <div className='flex items-center justify-between'>
                    <h2 className='text-3xl font-semibold'>Atividades</h2>
                    <button onClick={openCreateActivityModal} className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'>
                        <Plus className='size-5'/>
                        Cadastrar atividade
                    </button>
                </div>
                
                {/* atividades */}
                <Activities />

            </div>

            {/* coluna 2 */}
            <div className='w-80 space-y-6'>
                {/* links importantes */}
                <ImportanteLinks /> 

                <div className='w-full h-px bg-zinc-800'/>  {/* linha de separação */}
                
                {/* convidados */}
                <Guests />
            </div>
        </main>

        {/* modal */}
        {isCreateActivityModalOpen && (
            <CreateActivityModal closeCreateActivityModal={closeCreateActivityModal} />
        )}
    </div>
    )
}