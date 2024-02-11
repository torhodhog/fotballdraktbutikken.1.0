type Params = {
   id: string,
}

type SearchParams = {
   name: string, 
   image: string,
   unit_amount: number | null,
   id: string, 
   description: string | null,
   features: string[] // Change this line
}

export type SearchParamTypes = {
  params: Params,
  searchParams: SearchParams
}