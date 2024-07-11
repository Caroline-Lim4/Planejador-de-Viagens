import React, { FormEvent, useState } from 'react'
import { X, User } from 'lucide-react' // biblioteca de icones
import { Button } from '../../components/button'

// estrutura que armazena as propriedades necessarias do elemento pai p/ elemento filho
interface ConfirmTripModalProps {
    closeConfirmTripModal: () => void
    createTrip: (event: FormEvent<HTMLFormElement>) => void
}

export function ConfirmTripModal({
    closeConfirmTripModal, // função recebe propriedades como parametro
    createTrip,
}: ConfirmTripModalProps) {
    return (
      <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] rounded-xl py-5 px-6 bg-zinc-900 shadow-shape space-y-5'>
  
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold' >Confirmar criação de viagem</h2>
                <button onClick={closeConfirmTripModal} type='button'>
                  <X className='size-5 text-zinc-400'/>
                </button>
              </div>   
              <p className='text-sm text-zinc-400'>
              Para concluir a criação da viagem para <span className='text-zinc-100 font-semibold'>Florianópolis, Brasil</span> nas datas de <span className='text-zinc-100 font-semibold'>16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:
              </p>
            </div>
  
            {/* input e-mail */}
            <form onSubmit={createTrip} className='space-y-3'>
  
              <div className='h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                <User className='size-5 text-zinc-400'/>
                <input
                name='name' 
                placeholder='Seu nome completo' 
                className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1'/>
              </div>
  
              <div className='py-2.5 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                <User className='size-5 text-zinc-400'/>
                <input 
                type="email" 
                name='email' 
                placeholder='Seu e-mail pessoal' 
                className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1'/>
              </div>
  
              <Button variant='primary' size='full'>
                Confirmar criação da viagem
              </Button>
  
            </form>
  
          </div>
      </div>
    )
}