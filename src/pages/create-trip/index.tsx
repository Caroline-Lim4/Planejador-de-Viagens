
import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestsModal } from './invite-guests-modal'
import { ConfirmTripModal } from './confirm-trip-modal'
import { DestinationAndDateStep } from './steps/destination-and-date'
import { InviteGuestsStep } from './steps/invite-guests-step'

export default function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  const [emailsToInvite, setEmailsToInvite] = useState([
    'caroline.delisantos@gmail.com'
  ])

  // abre o input
  function openGuestsInput() {
    setIsGuestsInputOpen(true)
  }

  // fecha o input
  function closeGuestsInput() {
    setIsGuestsInputOpen(false)
  }

  // abre o modal
  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }

  // fecha o modal
  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }

  // adiciona email ao modal
  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault() // retira o comportamento padrao do formulario de carregar p/ pg inicial

    // armazena os dados9email) do formulario
    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    // retorna nada se o input estiver vazio
    if (!email) {
      return
    }

    // nao permite o usuario adicionar emails repetidos
    if (emailsToInvite.includes(email)) {
      return
    }

    // faz uma copia do array da const emailToInvite e adiciona o novo email incluido pelo usuario
    setEmailsToInvite([
      ...emailsToInvite,
      email
    ])

    // reseta o input do email apos dar o submit
    event.currentTarget.reset()
  }

  // remove email ao modal
  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(invited => invited !== emailToRemove)
    setEmailsToInvite(newEmailList)
  }

  // abre modal confirmar viagem
  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  // fecha modal confirmar viagem
  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }
// navega o usuario para a pagina da viagem criada
  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault() // retira o comportamento padrao do formulario de carregar p/ pg inicial

    navigate('/trips/123')
  }

  return (
    <div className='flex items-center h-screen justify-center bg-pattern bg-no-repeat bg-center'>
      <div className='max-w-3xl w-full px-6 space-y-10'>
        
        <div className='flex flex-col items-center gap-3'>
          <img src="/logo.svg" alt="plann.er" />
          <p className='text-zinc-300 text-lg'>Convide seus amigos e planeje sua próxima viagem!</p>
        </div>
      
        {/* input */}
        <div className='space-y-4'>
            {/* Envia as propriedades para o elemento filho que está requisitando */}
            <DestinationAndDateStep 
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
            />

          {isGuestsInputOpen && (
            <InviteGuestsStep 
            openGuestsModal={openGuestsModal}
            emailsToInvite={emailsToInvite}
            openConfirmTripModal={openConfirmTripModal}
            />
        )}

        </div> 
        
        <div className='flex items-center justify-center'>
          <p className='text-sm text-zinc-500'>Ao planejar sua viagem pela plann.er você automaticamente concorda <br/>
            com nossos <a className='text-zinc-300 underline' href="#">termos de uso</a> e <a className='text-zinc-300 underline' href="#">políticas de privacidade</a>.</p>
        </div>

      </div>
          
        {/* Email modal 1 */}
        {/* Envia as propriedades para o elemento filho que está requisitando */}
      {isGuestsModalOpen && (
        <InviteGuestsModal 
        emailsToInvite={emailsToInvite} 
        addNewEmailToInvite={addNewEmailToInvite}
        closeGuestsModal={closeGuestsModal}
        removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

        {/* Email modal 2 */}
        {/* Envia as propriedades para o elemento filho que está requisitando */}
      {isConfirmTripModalOpen && (
        <ConfirmTripModal 
        closeConfirmTripModal={closeConfirmTripModal}
        createTrip={createTrip}
        />
      )}

    </div>
  )
}