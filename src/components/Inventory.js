// let's go!
import React from 'react';
import AddFishForm from './AddFishForm';
class Inventory extends React.Component {
    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e, key) {
        const fish = this.props.fishes[key]
        const updatedFish = {
            ...fish, 
            [e.target.name]: e.target.value
        }
        this.props.updateFish(key, updatedFish)
    }
    renderInventory(key) {
        const fish = this.props.fishes[key]
        return (
            <div className="fish-edit" key={key}>
                <input 
                    ref={(input) => this.name = input} 
                    type="text" 
                    placeholder="Fish Name" 
                    value={fish.name}
                    onChange={(e) => this.handleChange(e, key)}
                    name="name"
                />
                <input 
                    ref={(input) => this.price = input}  
                    type="text" 
                    placeholder="Fish Price" 
                    value={fish.price}
                    onChange={(e) => this.handleChange(e, key)}
                    name="price"
                />
                <select 
                    ref={(input) => this.status = input} 
                    value={fish.status}
                    onChange={(e) => this.handleChange(e, key)}
                    name="status"
                >
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea 
                    ref={(input) => this.desc = input}  
                    placeholder="Fish Desc"
                    value={fish.desc}
                    onChange={(e) => this.handleChange(e, key)}
                    name="desc"
                >
                    
                </textarea>
                <input 
                    ref={(input) => this.image = input}  
                    type="text" 
                    placeholder="Fish Image" 
                    value={fish.image}
                    onChange={(e) => this.handleChange(e, key)}
                    name="image"
                />
                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
    }
    render() {
        return (
            <div className="">
                <h2>Inventory</h2>
                {
                    Object
                        .keys(this.props.fishes)
                        .map(this.renderInventory.bind(this))
                }
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        )
    }
}

export default Inventory;