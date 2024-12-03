export type CategoriaCartaoEntity={
    id:number,
    descricao:string
}
export type CartaoEntity={
    id:number,
    rotulo: string,
    imagemCartao: string,
    categoria:CategoriaCartaoEntity
}