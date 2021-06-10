import { ModelFFNodeModelProps } from "../../Demo/components/ModelFF/node/ModelFFNode.model"

export interface StoreProps {
  lang: 'ru' | 'en',
  model: StoreModelProps,
}


export type StoreModelProps = {
  [k: string]: StoreNodeProps
}

export type StoreNodeProps = ModelFFNodeModelProps & {
  id: string
}
