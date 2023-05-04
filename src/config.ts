import { Model } from './model'

export type Schema = {
  models: Model[]
}

export class Config {
  graphqlSchema?: Schema;

  constructor() {}

  public schema(schema: Schema): Config {
    this.graphqlSchema = schema

    return this
  }

  public toString(): string {
    const models = this.graphqlSchema?.models.map(String).join("\n") ?? ""

    return models
  }
}
