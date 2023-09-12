import './list.css'
import { useMemo, useState } from 'react'

// class Node {
//     constructor(data, next = null) {
//         this.data = data;
//         this.next = next;
//     }
// }
//
// class List {
//     constructor() {
//         this.head = null;
//         this.tail = null;
//         this.length = 0;
//     }
//
//     add(value) {
//         const node = new Node(value);
//
//         if (!this.head) {
//             this.head = node;
//             this.tail = node;
//         } else {
//             this.tail.next = node;
//             this.tail = node;
//         }
//
//         this.length += 1;
//
//         return this;
//     }
//
//     remove(value) {
//         let prev = this.head;
//         let current = this.head;
//
//         while(current) {
//             if (current.data === value) {
//                 if (current === this.head) {
//                     this.head = this.head.next;
//                 }
//
//                 if (current === this.tail) {
//                     this.tail = prev;
//                 }
//
//                 prev.next = current.next;
//
//                 this.length -= 1
//             } else {
//                 prev = current;
//             }
//
//             current = current.next;
//         }
//     }
// }

export const List: React.FC = () => {
    const [inputValue, setInputValue] = useState('')
    const [isEmpty, setIsEmpty] = useState(true)
    const [list, setList] = useState<{ head: any; tail: any; length: number  }>({
        head: null,
        tail: null,
        length: 0,
    })

    const handleClickAdd = () => {
        const node = {
            data: inputValue,
            next: null,
        }

        if (!list.head) {
            list.head = node
            list.tail = node
        } else {
            list.tail.next = node
            list.tail = node
        }

        setList({
            ...list,
            length: list.length += 1
        })

        setInputValue('')
        setIsEmpty(true)
    }

    const handleChangeInputValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = evt.target.value.trim()
        setInputValue(value)
        setIsEmpty(!value)
    }

    const handleClickDelete = (index: number) => () => {
        let current = list.head
        let previous = list.head
        let count = 0

        while (current) {
            if (count === index) {
                if (current === list.head) {
                    list.head = list.head.next
                }

                if (current === list.tail) {
                    list.tail = previous
                }

                previous.next = current.next
                list.length -= 1
            } else {
                previous = current
            }

            current = current.next
            count += 1
        }

        setList({...list})
    }

    const renderList = useMemo(() => {
        const items = []
        let current = list.head
        let count = 0

        while (current) {
            items.push(
                <div className="list-item">
                    <span>{current.data}</span>
                    <button onClick={handleClickDelete(count)}>x</button>
                </div>
            )

            current = current.next
            count += 1
        }

        return items
    }, [list])

    return (
        <div className="container">
            <input type="text" value={inputValue} onChange={handleChangeInputValue} />
            <div>
                <button
                    disabled={isEmpty}
                    onClick={handleClickAdd}
                >
                    Add
                </button>
            </div>
            <span>Length: {list.length}</span>
            <div className="list">
                { renderList }
            </div>
        </div>
    )
}
