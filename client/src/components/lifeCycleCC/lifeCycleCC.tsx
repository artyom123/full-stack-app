import './lifeCycleCC.styles.css'
import React from 'react'
import { consoleUtil } from '@utils'

const MAGIC_NUMBER = 25

interface LifeCycleCCProps {}

interface LifeCycleCCState {
    isLoading: boolean;
    isShowed: boolean;
    count: number;
}

class LifeCycleCC extends React.Component<LifeCycleCCProps, LifeCycleCCState> {
    constructor(props: LifeCycleCCProps) {
        super(props)
        this.state = {
            isLoading: false,
            isShowed: false,
            count: 0,
        }
    }

    handleClickAdd = () => {
        this.setState({ isShowed: true })
    }

    handleClickDelete = () => {
        this.setState({ isShowed: false, count: 0 })
    }

    handleChangeValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ count: Number(evt.target.value) })
    }

    render() {
        return (
            <div className="life-cycle-cc">
                { this.state.isShowed && <input type="text" value={this.state.count} onChange={this.handleChangeValue} /> }
                { this.state.isShowed ?  <button onClick={this.handleClickDelete}>Delete component</button> : <button onClick={this.handleClickAdd}>Add component</button> }
                { this.state.isShowed && <LifeCycleCCChildren count={this.state.count} /> }
            </div>
        )
    }
}

interface LifeCycleCCChildrenProps {
    count: number;
}

interface LifeCycleCCChildrenState {
    count: number;
}

class LifeCycleCCChildren extends React.Component<LifeCycleCCChildrenProps, LifeCycleCCChildrenState> {
    constructor(props: LifeCycleCCChildrenProps) {
        super(props)
        consoleUtil.info('Mounting=>constructor', 'yellow')
        this.state = {
            count: 0,
        }
    }

    componentWillUnmount() {
        consoleUtil.info('Unmounting=>componentWillUnmount', 'red')
    }

    UNSAFE_componentWillReceiveProps(nextProps: Readonly<LifeCycleCCChildrenProps>, nextContext: any) {
        consoleUtil.debug(nextProps.count,'Mounting/Updating=>nextProps')
        consoleUtil.info('Updating=>getDerivedStateFromProps', 'green')
    }

    static getDerivedStateFromProps(props: LifeCycleCCChildrenProps, state: LifeCycleCCChildrenState) {
        consoleUtil.debug(props.count,'Mounting/Updating=>Props')
        consoleUtil.debug(state.count,'Mounting/Updating=>State')
        consoleUtil.info('Mounting/Updating=>getDerivedStateFromProps', 'yellow')

        if (props.count >= MAGIC_NUMBER) {
            return {
                count: props.count,
            }
        }

        return null
    }

    shouldComponentUpdate(nextProps: Readonly<LifeCycleCCChildrenProps>, nextState: Readonly<LifeCycleCCChildrenState>, nextContext: any): boolean {
        consoleUtil.debug(nextProps.count,'Mounting/Updating=>nextProps')
        consoleUtil.debug(nextState.count,'Mounting/Updating=>nextState')
        consoleUtil.info('Updating=>shouldComponentUpdate', 'green')
        return true
    }

    UNSAFE_componentWillMount() {
        consoleUtil.info('Mounting=>UNSAFE_componentWillMount', 'yellow')
    }

    handleClickIncrease = () => {
        let updatedCount = this.state.count

        this.setState({ count: ++updatedCount })
    }

    handleClickDecrease = () => {
        let updatedCount = this.state.count

        this.setState({ count: --updatedCount })
    }

    render() {
        consoleUtil.info('Mounting/Updating=>render', 'yellow')
        return (
            <div className="life-cycle-cc-children">
                Count: {this.state.count}
                <button onClick={this.handleClickIncrease}>increase</button>
                <button onClick={this.handleClickDecrease}>decrease</button>
            </div>
        )
    }

    static getSnapshotBeforeUpdate(prevProps: Readonly<LifeCycleCCChildrenProps>, prevState: Readonly<LifeCycleCCChildrenState>): any {
        consoleUtil.debug(prevProps,'Updating=>prevProps')
        consoleUtil.debug(prevState,'Updating=>prevState')
        consoleUtil.info('Mounting/Updating=>getDerivedStateFromProps', 'green')
    }

    componentDidMount() {
        consoleUtil.info('Mounting=>componentDidMount', 'yellow')
    }

    componentDidUpdate() {
        consoleUtil.info('Updating=>componentDidUpdate', 'green')
    }
}

export default LifeCycleCC
