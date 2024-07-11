import React from 'react'
import { Link2, Plus } from 'lucide-react'
import { Button } from '../../components/button'

export function ImportanteLinks() {
    return (
        <div className='space-y-6'>
            <h2 className='font-semibold text-xl'>Links importantes</h2>
            <div className='space-y-5'>
                <div className='flex items-center justify-between gap-4'>
                    <div className='space-y-1.5'>
                        <span className='block font-medium text-zinc-100'>Reserva do AirBnB</span>
                        <a href='#' className='block text-xs text-zinc-400 truncate hover:text-zinc-200'>
                            https://www.airbnb.com.br/rooms/104700011965594995119151981915
                        </a>
                    </div>
                    <Link2 className='text-zinc-400 size-5 shrink-0'/>
                </div>
                <div className='flex items-center justify-between gap-4'>
                    <div className='space-y-1.5'>
                        <span className='block font-medium text-zinc-100'>Reserva do AirBnB</span>
                        <a href='#' className='block text-xs text-zinc-400 truncate hover:text-zinc-200'>
                            https://www.airbnb.com.br/rooms/104700011965594995119151981915
                        </a>
                    </div>
                    <Link2 className='text-zinc-400 size-5 shrink-0'/>
                </div>
            </div>
            <Button variant='secundary' size='full'>
                <Plus className='size-5'/>
                Cadastrar novo link
            </Button>
        </div> 
    )
}