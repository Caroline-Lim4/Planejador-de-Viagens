import React, { ComponentProps, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants' // biblioteca que permite criar variantes dos componentes

const buttonVariants = tv({
    // criando um estilo de base para todos os botoes
    base: 'rounded-lg px-5 font-medium flex items-center justify-center gap-2',
    variants: {
        variant: {
            // classificando diferentes tipos dos botoes usado no projeto
            primary: 'bg-lime-300 text-lime-950 hover:bg-lime-400',
            secundary: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700',
        },

        size: {
            default: 'py-2',
            full: 'w-full h-11',
        },
    },

    // definindo qual é a variante padrão, caso nao seja informado
    defaultVariants: {
        variant: 'primary',
        size: 'default',
    }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants>{ // Extende as propriedades do button/html para a função button
    children: ReactNode // Permite que possa ser alterado o conteudo do button para diferentes tipos de dados
}

export function Button({children, variant, size,...props}: ButtonProps) { // ...props - atribui todas as propriedades do button de uma só vez
    return (
        <button {...props} className={buttonVariants({ variant, size })}>
            {children}
        </button>
    )
}   