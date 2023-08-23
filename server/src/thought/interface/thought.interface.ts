export interface IThought {
   readonly ownerId: number,
   readonly content: string,
   readonly date: number
}

export interface IThoughts {
   readonly data: IThought[],
   readonly count: number
}