export interface IDataPosts {
    body: string;
    id: number;
    title: string;
    userId: number;
}

class Dump2Services {
    private static URL = 'https://jsonplaceholder.typicode.com/posts/'

    static get(): Promise<IDataPosts[]> {
        return fetch(this.URL)
            .then((res) => res.json())
    }

    static delete(id: IDataPosts['id']) {
        return fetch(`${this.URL}/${id}`, {
            method: 'DELETE',
        }).then((res) => res.json())
    }

    static update(id: IDataPosts['id'], options: IDataPosts) {
        return fetch(`${this.URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ ...options, userId: 1 }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((res) => res.json())
    }

    static create(options: Omit<IDataPosts, 'id'>) {
        return fetch(this.URL, {
            method: 'POST',
            body: JSON.stringify(options),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((res) => res.json())
    }
}

export default Dump2Services
