// let's go!
import React from 'react';
import Order from './Order';
import Inventory from './Inventory';
import Header from './Header';
import sampleFishes from '../sample-fishes'
import Fish from './Fish';
import { getFunName } from '../helpers'
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            fishes: {},
            order: {},
        }
        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.removeOrder = this.removeOrder.bind(this);
    }
    componentWillMount() {
        const localStorageRefFishes = localStorage.getItem('fishes');
        const localStorageRefOrder = localStorage.getItem('order');
        let fishes = this.state.fishes
        let order = this.state.order
        if (localStorageRefFishes) {
            fishes = JSON.parse(localStorageRefFishes)
        }
        if (localStorageRefOrder) {
            order = JSON.parse(localStorageRefOrder)
        }
        this.setState({ 
            order,
            fishes
        })
    }
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('fishes', JSON.stringify(nextState.fishes))
        localStorage.setItem('order', JSON.stringify(nextState.order))
    }
    updateFish(key, updatedFish) {
        const fishes = {...this.state.fishes}
        fishes[key] = updatedFish
        this.setState({ fishes })
    }
    addFish(fish) {
        const fishes = {...this.state.fishes};
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        this.setState({ fishes })
    }
    removeFish(key) {
        const fishes = {...this.state.fishes};
        delete fishes[key]
        this.setState({ fishes })
    }
    removeOrder(key) {
        const order = {...this.state.order};
        delete order[key]
        this.setState({ order })
    }
    loadSamples() {
        this.setState({
            fishes: sampleFishes
        })
    }
    addToOrder(key) {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({ order }); 
    }
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Food"/>
                    <ul className="list-of-fishes">
                        {
                            Object
                                .keys(this.state.fishes)
                                .map(key => <Fish 
                                                key={key} 
                                                index={key}
                                                details={this.state.fishes[key]}
                                                addToOrder={this.addToOrder}
                                            />
                                    )
                        }
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order}
                    removeOrder={this.removeOrder}
                />
                <Inventory 
                    fishes={this.state.fishes} 
                    addFish={this.addFish} 
                    loadSamples={this.loadSamples}
                    updateFish={this.updateFish}
                    removeFish={this.removeFish}
                />
            </div>
        )
    }
}

export default App;