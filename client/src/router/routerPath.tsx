import React from 'react'

import { Dump } from '../components/dump/dump'
import { Dump2 } from '../components/dump2/dump2'
import { Dump3 } from '../components/dump3/dump3'
import { HocVSRenderProps } from '../components/hokvsrenderprops/hocVSRenderProps'
import { cards } from '../components/hokvsrenderprops/hocVSRenderProps.constants'
import { LifeCycleHookFC } from '../components/lifeCycleHook/lifeCycleHook'
import { List } from '../components/list/list'
import { Portal } from '../components/portal/portal'
import { QueueVSStack } from '../components/queueVSStack/queueVSStack'
import { Timer } from '../components/timer/timer'
import { Events } from '../components/events/events'
import { Memorization } from '../games/memorization/memorization'
import { Memory } from '../games/memory/memory'
import { Examples } from '../pages'
import DataStructure from '../pages/dataStructure'
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
                path: PATH.PAGE_EXAMPLES_DUMP_3,
                element: <Dump3 />,
            },
            {
                path: PATH.PAGE_EXAMPLES_EVENTS,
                element: <Events />,
            },
            {
                path: PATH.PAGE_EXAMPLES_PORTAL,
                element: <Portal />,
            },
            {
                path: PATH.PAGE_EXAMPLES_HOC_VS_RENDER_PROPS,
                element: <HocVSRenderProps cards={cards}/>
            }
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
            {
                path: PATH.PAGE_GAMES_MEMORIZATION,
                element: <Memorization />
            }
        ]
    },
    {
        path: PATH.PAGE_DATA_STRUCTURE,
        errorElement: <div>Error data structure pages</div>,
        children: [
            {
                index: true,
                element: <DataStructure />,
            },
            {
                path: PATH.PAGE_DATA_STRUCTURE_QUEUE_STACK,
                element: <QueueVSStack />,
            },
            {
                path: PATH.PAGE_DATA_STRUCTURE_LIST,
                element: <List />,
            },
        ]
    }
]

export default ROUTER_PATH
