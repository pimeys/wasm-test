use indexmap::IndexMap;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Grafbase;

#[wasm_bindgen]
impl Grafbase {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self
    }
}

#[wasm_bindgen]
pub struct Model {
    name: String,
    fields: IndexMap<String, String>,
}

#[wasm_bindgen]
pub enum FieldDefinition {
    String = "String",
    Int = "Int",
}

#[wasm_bindgen]
impl Grafbase {
    pub fn model(&self, name: &str, data: JsValue) -> Model {
        let fields = serde_wasm_bindgen::from_value(data).unwrap();

        Model {
            name: name.to_string(),
            fields,
        }
    }

    pub fn string(&self) -> FieldDefinition {
        FieldDefinition::String
    }

    pub fn int(&self) -> FieldDefinition {
        FieldDefinition::Int
    }
}
