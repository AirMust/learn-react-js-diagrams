import { DefaultPortModelOptions } from '@projectstorm/react-diagrams'

export type CustomNodeModelProps = DefaultPortModelOptions & {
  name: string
  formatData: string
  isInput: boolean
  required?: boolean
  id: string
}
