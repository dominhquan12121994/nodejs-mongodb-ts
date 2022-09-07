const num: number = 5
const str: string = 'hello world'
const carBrands: string[] = ['honda', 'toyota', 'ford']
const people : Person[] = []
const man: Array<Person> = []

interface Person extends Human {
    age: number,
    peaceful: boolean,
}

let newMan: Person = {
    age: 10,
    head: true,
    peaceful: false,
}

people.push(newMan)

interface Human {
    head: true
}

const quandm: Person = {
    age: 28,
    peaceful: true,
    head: true
}

let quandm1 = {...quandm}
quandm.age = 29;
console.log(quandm1)

let newBrand = [...carBrands]
carBrands[0] = 'changed'
console.log(newBrand)

for (const person of people) {
    console.log(person.age)
}

enum PersonType {
    Coder, Student
}

console.log(PersonType.Coder)

const add = (a: number, b: number): number => {
    return a + b
}

// number, string, type, interface
// array, generic: array with element type
// ts-node: direct run ts
// normal: build ts to js, run by node
// advance: utility type, type intersection, ts code structure, oop type and interface