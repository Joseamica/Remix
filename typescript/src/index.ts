let sales: number = 123_456_789;
let course: string = "typescript"
let is_published: boolean = true

let numbers: number[] = [1,2,2]

let user: [number, string] = [1,"number"]

enum Size { Small = 121, Medium = 124, Large}

let mySize: Size = Size.Large

console.log(mySize)

function calculateTax(income:number, taxYear = 2022) : number{
    if(taxYear < 50_000){
        return income * 1.2
    }
  
    return income * 1.3
}



type Employe = {
    id: number,
    name: string

}

let employee: Employe = {id: 1, name: "jose"}

type Draggable = {
    drag : ( )=> void
}
type Resizable = {
    resize: () => void
}

type UIWidget = Draggable & Resizable

let textBox: UIWidget = {
    drag: () => {},
    resize: ()=>{}
}