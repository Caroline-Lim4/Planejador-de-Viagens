import React from 'react'
import { Calendar, Tag, X } from 'lucide-react'
import { Button } from '../../components/button'

interface CreateActivityModalProps {
    closeCreateActivityModal: () => void
}

export function CreateActivityModal({
    closeCreateActivityModal,
}: CreateActivityModalProps) {
    return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
        <div className='w-[640px] rounded-xl py-5 px-6 bg-zinc-900 shadow-shape space-y-5'>

            <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-lg font-semibold' >Cadastrar atividade</h2>
                    <button onClick={closeCreateActivityModal} type='button'>
                        <X className='size-5 text-zinc-400'/>
                    </button>
                </div>   
                <p className='text-sm text-zinc-400'>
                Todos convidados podem visualizar as atividades.
                </p>
            </div>

            {/* input atividade */}
            <form className='space-y-3'>
                <div className='h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                    <Tag className='size-5 text-zinc-400'/>
                    <input
                    name='title' 
                    placeholder='Qual atividade?' 
                    className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1'/>
                </div>

                <div className='flex items-center gap-2'>
                    <div className='flex-1 py-2.5 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                        <Calendar className='size-5 text-zinc-400'/>
                        <input 
                        type="datetime-local" 
                        name='occurs_at' 
                        placeholder='Data e horário da atividade' 
                        className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1'/>
                    </div>
                </div>

                <Button variant='primary' size='full'>
                    Salvar atividade                
                </Button>
            </form>

        </div>
    </div>
    )
}