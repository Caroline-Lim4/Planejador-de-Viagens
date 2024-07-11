
import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestsModal } from './invite-guests-modal'
import { ConfirmTripModal } from './confirm-trip-modal'
import { DestinationAndDateStep } from './steps/destination-and-date'
import { InviteGuestsStep } from './steps/invite-guests-step'
import { DateRange } from 'react-day-picker'
import api from 'axios'

export default function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

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

  try {
    // Chamada da API
    // conecta com a api do banco de daods Nodejs 
    async function createTrip(event: FormEvent<HTMLFormElement>) {
      event.preventDefault() // retira o comportamento padrao do formulario de carregar p/ pg inicial

      // validando se as variaveis foram preenchidas pelo usuario 
      console.log(destination)
      console.log(ownerName)
      console.log(ownerEmail)
      console.log(eventStartAndEndDates)
      console.log(emailsToInvite)

      // valida todos os campos importantes
      if (!destination) {
        return 
      }

      if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
        return
      }

      if (emailsToInvite.length == 0) {
        return
      }

      if (!ownerName || !ownerEmail) {
        return
      }

      // passa as variaveis para a api
      const response = await api.post('/trips/', {
        destination,
        starts_at: eventStartAndEndDates.from,
        ends_at: eventStartAndEndDates.to,
        emails_to_invite: emailsToInvite,
        owner_name: ownerName,
        owner_email: ownerEmail,
      })

      // armazena a resposta da conexao que é a id da viagem criada
      const { tripId } = response.data 
      // enfim redireciona o usuario para a pagina da trip criada
      navigate(`/trips/${tripId}`)
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
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
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
        setOwnerName={setOwnerName}
        setOwnerEmail={setOwnerEmail}
        />
      )}

    </div>
  )

  } catch (error) {
    // Tratamento do erro
    console.error('Erro ao criar a viagem:', error);
    // Tratar o erro de forma apropriada, por exemplo, exibindo uma mensagem para o usuário
  }

}