import React from 'react'
import { Timer } from '../components/timer/timer'
import { Examples } from '../pages'

const ROUTER_PATH = [
    {
        path: '/',
        element: <div>Home page</div>,
    },
    {
        path: 'examples',
        errorElement: <div>Error Examples pages</div>,
        children: [
            {
                index: true,
                element: <Examples />,
            },
            {
                path: 'timer',
                element: <Timer />,
            },
        ],
    },
]

export default ROUTER_PATH
