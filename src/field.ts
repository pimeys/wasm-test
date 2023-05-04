import { RequireAtLeastOne } from 'type-fest'

export interface ModelField {
  name: string,
  type: FieldDefinition,
}

export class Field {
  name: string
  type: FieldDefinition

  constructor(name: string, type: FieldDefinition) {
    this.name = name
    this.type = type
  }

  public toString(): string {
    return `${this.name}: ${this.type}`
  }
}

export enum FieldType {
  String = "String",
  Int = "Int",
  Email = "Email",
}

export type ScalarType = string | number | Date | object | Array<ScalarType>;

class UniqueConstraint {
  compoundScope?: string[]

  constructor(scope?: string[]) {
    this.compoundScope = scope
  }

  public toString(): string {
    const scope = this.compoundScope?.map((field) => `"${field}"`).join(", ")
    const scopeArray = scope ? `[${scope}]` : null

    return scopeArray ? `@unique(fields: ${scopeArray})` : "@unique"
  }
}

interface FieldLength {
  min?: number
  max?: number
}

function renderLength(length: RequireAtLeastOne<FieldLength, 'min' | 'max'>): string {
  if (length.min != null && length.max != null) {
    return `@length(min: ${length.min}, max: ${length.max})`
  } else if (length.min != null) {
    return `@length(min: ${length.min})`
  } else {
    return `@length(max: ${length.max})`
  }
}

export class FieldDefinition {
  fieldType: FieldType
  uniqueConstraint?: UniqueConstraint
  fieldLength?: RequireAtLeastOne<FieldLength, 'min' | 'max'>
  isOptional: boolean
  isSearch: boolean
  // we might want a compile check to see this is of right type
  defaultValue?: ScalarType

  constructor(fieldType: FieldType) {
    this.fieldType = fieldType
    this.isOptional = false
    this.isSearch = false
  }

  public unique(scope?: string[]): FieldDefinition {
    this.uniqueConstraint = new UniqueConstraint(scope)

    return this
  }

  public optional(): FieldDefinition {
    this.isOptional = true

    return this
  }

  public search(): FieldDefinition {
    this.isSearch = true

    return this
  }

  public default(defaultValue: ScalarType): FieldDefinition {
    this.defaultValue = defaultValue

    return this
  }

  public length(fieldLength: RequireAtLeastOne<FieldLength, 'min' | 'max'>): FieldDefinition {
    this.fieldLength = fieldLength;

    return this
  }

  public toString(): string {
    const required = this.isOptional ? "" : "!"
    const unique = this.uniqueConstraint ? ` ${this.uniqueConstraint}` : ""
    const search = this.isSearch ? " @search" : ""
    const defaultValue = this.defaultValue ? ` @default(value: ${this.defaultValue})` : ""
    const length = this.fieldLength ? ` ${renderLength(this.fieldLength)}` : ""

    return `${this.fieldType}${required}${unique}${search}${defaultValue}${length}`
  }
}
