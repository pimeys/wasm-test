default:
	cargo build --target=wasm32-unknown-unknown
	wasm-bindgen --target nodejs --out-dir dist target/wasm32-unknown-unknown/debug/wasm_test.wasm;
