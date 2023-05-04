// import { Grafbase } from './dist/wasm_test';

// This we export
// const g = new Grafbase();

import { Model } from './model'
import { FieldDefinition, FieldType } from './field'
import { Config } from './config'

class Grafbase {
  public model(name: string): Model {
    return new Model(name)
  }

  public string(): FieldDefinition {
    return new FieldDefinition(FieldType.String)
  }

  public email(): FieldDefinition {
    return new FieldDefinition(FieldType.Email)
  }

  public int(): FieldDefinition {
    return new FieldDefinition(FieldType.Int)
  }
}

const g = new Grafbase()

function config(): Config {
  return new Config()
}

const user = g
  .model("User")
  .field({ name: "name", type: g.string().unique(["email"]) })
  .field({ name: "email", type: g.email().unique().optional() })
  .field({ name: "description", type: g.string().search().optional()})
  .field({ name: "age", type: g.int().default(18).length({min: 0}) })
  .field({ name: "length", type: g.int().default(18).length({min: 1, max: 220}) })
  .unique(["name", "email"])
  .search()
  .live()

const cfg = config()
  .schema({
    models: [user]
  })

console.log(cfg.toString())
