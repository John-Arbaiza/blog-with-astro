---
title: "Guía práctica de TypeScript para principiantes"
description: "Todo lo que necesitas saber para empezar a escribir TypeScript con confianza: tipos, interfaces, generics y más."
pubDate: 2025-04-20
author: "J"
tags: ["typescript", "javascript", "guía"]
draft: false
toc: true 
layout: "../../layouts/PostLayoutTOC.astro"
---

## ¿Qué es TypeScript?

TypeScript es un superconjunto de JavaScript desarrollado por Microsoft que agrega **tipado estático opcional** al lenguaje. Esto significa que todo código JavaScript válido es también TypeScript válido, pero TypeScript te permite agregar anotaciones de tipo que el compilador verifica antes de ejecutar el código.

El resultado es un código más predecible, más fácil de refactorizar y con mejor soporte en editores como VS Code.

## Tipos básicos

Los tipos más usados en el día a día son los primitivos:

```ts
let nombre: string = "Ana";
let edad: number = 28;
let activo: boolean = true;
let nada: null = null;
let indefinido: undefined = undefined;
```

### Arrays y tuplas

Para colecciones de datos puedes usar arrays tipados o tuplas cuando el orden importa:

```ts
// Array de strings
const lenguajes: string[] = ["TypeScript", "Rust", "Go"];

// Tupla: posición 0 siempre string, posición 1 siempre number
const entrada: [string, number] = ["puntuación", 42];
```

### El tipo `any` y por qué evitarlo

`any` desactiva el sistema de tipos. Úsalo solo como último recurso porque anula todas las ventajas de TypeScript:

```ts
// ❌ Evitar
let dato: any = "podría ser cualquier cosa";

// ✅ Preferir unknown y hacer narrowing
let dato: unknown = obtenerDato();
if (typeof dato === "string") {
    console.log(dato.toUpperCase());
}
```

## Interfaces y tipos

Las interfaces describen la forma de un objeto. Son una de las herramientas más importantes de TypeScript:

```ts
interface Usuario {
    id: number;
    nombre: string;
    email: string;
    rol?: "admin" | "editor" | "lector"; // propiedad opcional
}

const usuario: Usuario = {
    id: 1,
    nombre: "Ana",
    email: "ana@ejemplo.com",
};
```

### `interface` vs `type`

Ambos son muy similares, pero tienen diferencias clave:

| | `interface` | `type` |
|---|---|---|
| Extensión | `extends` | intersección `&` |
| Reapertura | ✅ se puede reabrir | ❌ no se puede |
| Unions | ❌ no soporta | ✅ soporta |

En general, usa `interface` para objetos y `type` para unions, primitivos o cuando necesitas más flexibilidad.

## Funciones tipadas

Tipar funciones hace que el editor pueda avisarte cuando pasas argumentos incorrectos:

```ts
function sumar(a: number, b: number): number {
    return a + b;
}

// Con arrow function
const saludar = (nombre: string): string => {
    return `Hola, ${nombre}`;
};

// Parámetros opcionales y con valor por defecto
function conectar(host: string, puerto: number = 3000): void {
    console.log(`Conectando a ${host}:${puerto}`);
}
```

## Generics

Los generics permiten escribir código reutilizable que funciona con diferentes tipos sin perder la seguridad de tipos:

```ts
function primero<T>(arr: T[]): T | undefined {
    return arr[0];
}

const num = primero([1, 2, 3]);       // TypeScript infiere: number
const str = primero(["a", "b", "c"]); // TypeScript infiere: string
```

### Generics con restricciones

Puedes limitar qué tipos acepta un generic con `extends`:

```ts
interface TieneId {
    id: number;
}

function buscarPorId<T extends TieneId>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id);
}
```

## Utilidades de tipos

TypeScript incluye varios tipos utilitarios que te ahorran escribir transformaciones comunes:

```ts
interface Producto {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
}

// Partial: todas las propiedades opcionales (útil para updates)
type ProductoUpdate = Partial<Producto>;

// Pick: solo algunas propiedades
type ProductoResumen = Pick<Producto, 'id' | 'nombre'>;

// Omit: todas menos algunas
type ProductoSinId = Omit<Producto, 'id'>;

// Readonly: ninguna propiedad modificable
type ProductoFijo = Readonly<Producto>;
```

## Próximos pasos

Con estos conceptos ya puedes escribir TypeScript real en proyectos cotidianos. Para profundizar, los temas que siguen naturalmente son:

- **Enums** para conjuntos de constantes nombradas
- **Decorators** si trabajas con frameworks como Angular o NestJS
- **Module augmentation** para extender tipos de librerías externas
- **Template literal types** para tipos basados en strings

> El mejor aprendizaje es migrar un archivo JavaScript pequeño que ya conoces. Empieza por agregar tipos a las funciones y deja que el compilador te guíe.