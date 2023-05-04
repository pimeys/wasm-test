import { Field, ModelField } from './field'

export class Model {
  name: string
  fields: Field[]
  uniqueFields: string[][]
  isSearch: boolean
  isLive: boolean

  constructor(name: string) {
    this.name = name
    this.fields = []
    this.uniqueFields = []
    this.isSearch = false
    this.isLive = false
  }

  public field(definition: ModelField): Model {
    this.fields.push(new Field(definition.name, definition.type))

    return this
  }

  public unique(fields: string[]): Model {
    this.uniqueFields.push(fields)

    return this
  }

  public search(): Model {
    this.isSearch = true;

    return this
  }

  public live(): Model {
    this.isLive = true;

    return this
  }

  public toString(): string {
    const search = this.isSearch ? " @search" : ""
    const live = this.isLive ? " @live" : ""
    const header = `type ${this.name} @model${search}${live} {`

    const fields = this
      .fields
      .map((field) => `  ${field}`).join("\n")

    const footer = '}'

    return `${header}\n${fields}\n${footer}`
  }
}
