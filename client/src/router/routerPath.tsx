import React from 'react'

import { Dump } from '../components/dump/dump'
import { Dump2 } from '../components/dump2/dump2'
import { LifeCycleHookFC } from '../components/lifeCycleHook/lifeCycleHook'
import { Portal } from '../components/portal/portal'
import { Timer } from '../components/timer/timer'
import { Events } from '../components/events/events'
import { Memory } from '../games/memory/memory'
import { Examples } from '../pages'
import Games from '../pages/games'
import { PATH } from './routerPath.constants'

import LifeCycleCC from '../components/lifeCycleCC/lifeCycleCC'

const ROUTER_PATH = [
    {
        path: PATH.COMMON,
        element: <div>Home page</div>,
    },
    {
        path: PATH.PAGE_EXAMPLES,
        errorElement: <div>Error Examples pages</div>,
        children: [
            {
                index: true,
                element: <Examples />,
            },
            {
                path: PATH.PAGE_EXAMPLES_TIMER,
                element: <Timer />,
            },
            {
                path: PATH.PAGE_EXAMPLES_LIFE_CYCLE_FC,
                element: <LifeCycleHookFC />,
            },
            {
                path: PATH.PAGE_EXAMPLES_LIFE_CYCLE_CC,
                element: <LifeCycleCC />,
            },
            {
                path: PATH.PAGE_EXAMPLES_DUMP,
                element: <Dump />,
            },
            {
                path: PATH.PAGE_EXAMPLES_DUMP_2,
                element: <Dump2 />,
            },
            {
                path: PATH.PAGE_EXAMPLES_EVENTS,
                element: <Events />,
            },
            {
                path: PATH.PAGE_EXAMPLES_PORTAL,
                element: <Portal />,
            },
        ],
    },
    {
        path: PATH.PAGE_GAMES,
        errorElement: <div>Error Games pages</div>,
        children: [
            {
                index: true,
                element: <Games />,
            },
            {
                path: PATH.PAGE_GAMES_MEMORY,
                element: <Memory />,
            },
        ]
    }
]

export default ROUTER_PATH
